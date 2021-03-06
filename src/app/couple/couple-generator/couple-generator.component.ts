import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

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

  formGroup = this.fb.group({
    file: [null, [Validators.required]],
  });

  onFileChange(event) {
    const file: File = event.target.files[0];

    if (!this.formGroup.invalid) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.resultIsActive = false;
        this.loadingIsActive = true;
        this.uploadImage(file.name, reader.result);
        this.formGroup.reset();
      };
    }
  }
  uploadImage(fileName: string, fileContent: string | ArrayBuffer) {
    this.httpClient
      .post<string[]>(`${this.baseAddress}/image`, {
        name: fileName,
        content: fileContent,
      })
      .subscribe((res) => {
        console.log(res);
        this.avatarUrls = res;
        this.loadingIsActive = false;
        this.resultIsActive = true;
      });
  }
}
