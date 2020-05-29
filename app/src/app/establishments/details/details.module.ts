import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRouterModule } from './details-routing.module';
import { DetailsComponent } from './details.component';

@NgModule({
  declarations: [DetailsComponent],
  imports: [CommonModule, DetailsRouterModule],
  exports: [DetailsComponent]
})
export class DetailsModule { }
