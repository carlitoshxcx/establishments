import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BootstrapModule } from '@libs/bootstrap.module';
import { CardComponent } from '@establishments/card/card.component';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, BootstrapModule],
  exports: [CardComponent]
})
export class CardModule { }
