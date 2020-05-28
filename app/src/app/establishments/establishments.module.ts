import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstablishimentsRouterModule } from './establishments-routing.module';
import { CardModule } from './card/card.module';
import { DetailsModule } from './details/details.module';
import { ListModule } from './list/list.module';
import { EstablishmentsComponent } from './establishments.component';

@NgModule({
  declarations: [EstablishmentsComponent],
  imports: [
    CommonModule,
    EstablishimentsRouterModule,
    CardModule,
    DetailsModule,
    ListModule
  ],
  exports: [EstablishmentsComponent]
})
export class EstablishmentsModule { }
