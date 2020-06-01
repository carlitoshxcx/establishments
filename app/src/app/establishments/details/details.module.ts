import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '@libs/material.module';

import { DetailsRouterModule } from '@establishments/details/details-routing.module';
import { DetailsComponent } from '@establishments/details/details.component';

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    DetailsRouterModule
  ],
  exports: [DetailsComponent]
})
export class DetailsModule { }
