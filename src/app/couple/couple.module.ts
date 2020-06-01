import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoupleComponent } from "./couple.component";
import { CoupleGeneratorComponent } from "./couple-generator/couple-generator.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  exports: [CoupleGeneratorComponent],
  declarations: [CoupleComponent, CoupleGeneratorComponent],
})
export class CoupleModule {}
