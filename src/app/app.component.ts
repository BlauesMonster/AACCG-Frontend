import { environment } from "./../environments/environment";
import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "accgfrontend";
  ava1: string;
  ava2: string;
  resultIsActive: boolean;
  baseAddress: any = "https://gabby-gigantic-espadrille.glitch.me";

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}

  formGroup = this.fb.group({
    file: [null, [Validators.required]],
  });

  onFileChange(event) {
    console.log(event.target.files);
    const file: File = event.target.files[0];

    if (!this.formGroup.invalid) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.uploadGalleryFile(file.name, reader.result);
        this.formGroup.reset();
      };
    }
  }
  uploadGalleryFile(fileName: string, fileContent: string | ArrayBuffer) {
    this.httpClient
      .post<any>(`${this.baseAddress}/image`, {
        name: fileName,
        content: fileContent,
      })
      .subscribe((res) => {
        console.log(res);
        this.ava1 = res[0];
        this.ava2 = res[1];
        this.resultIsActive = true;
      });
  }
}
