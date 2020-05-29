import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DetailsRouterModule } from './details-routing.module';
import { DetailsComponent } from './details.component';

@NgModule({
  declarations: [DetailsComponent],
  imports: [CommonModule, DetailsRouterModule, HttpClientModule],
  exports: [DetailsComponent]
})
export class DetailsModule { }
