import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from '../card/card.module';
import { ListComponent } from './list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, CardModule],
  exports: [ListComponent]
})
export class ListModule { }
