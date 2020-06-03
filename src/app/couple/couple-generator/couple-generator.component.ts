import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CoupleInfo } from "../CoupleInfo";

@Component({
  selector: "app-couple-generator",
  templateUrl: "./couple-generator.component.html",
  styleUrls: ["./couple-generator.component.scss"],
})
export class CoupleGeneratorComponent {
  avatarUrls: string[];
  loadingIsActive: boolean;
  resultIsActive: boolean;
  baseAddress: string = environment.baseUrl;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}

  formGroupFile = this.fb.group({
    file: [null, [Validators.required]],
  });

  formGroupUrl = this.fb.group({
    imageUrl: [null, [Validators.required]],
  });

  option: string = "url";

  selectOption(option: string) {
    this.formGroupFile.reset();
    this.formGroupUrl.reset();
    this.option = option;
  }

  onFileChange(event) {
    const file: File = event.target.files[0];

    if (!this.formGroupFile.invalid) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.resultIsActive = false;
        this.loadingIsActive = true;
        this.uploadFile(reader.result as string);
        this.formGroupFile.reset();
      };
    }
  }
  uploadFile(fileContent: string) {
    let coupleInfo: CoupleInfo = { fileContent: fileContent, imageUrl: null };
    this.httpClient
      .post<string[]>(`${this.baseAddress}/couples`, coupleInfo)
      .subscribe((res) => {
        console.log(res);
        this.avatarUrls = res;
        this.loadingIsActive = false;
        this.resultIsActive = true;
      });
  }
  uploadImage(): void {
    let coupleInfo: CoupleInfo = {
      fileContent: null,
      imageUrl: this.formGroupUrl.get("imageUrl").value,
    };
    this.resultIsActive = false;
    this.loadingIsActive = true;
    this.httpClient
      .post<string[]>(`${this.baseAddress}/couples`, coupleInfo)
      .subscribe((res) => {
        console.log(res);
        this.avatarUrls = res;
        this.loadingIsActive = false;
        this.resultIsActive = true;
      });

    this.formGroupUrl.reset();
  }
}
