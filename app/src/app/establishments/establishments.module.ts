import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BootstrapModule } from '@libs/bootstrap.module';
import { EstablishimentsRouterModule } from '@establishments/establishments-routing.module';
import { CardModule } from '@establishments/card/card.module';
import { DetailsModule } from '@establishments/details/details.module';
import { ListModule } from '@establishments/list/list.module';
import { EstablishmentsComponent } from '@establishments/establishments.component';

@NgModule({
  declarations: [EstablishmentsComponent],
  imports: [
    CommonModule,
    BootstrapModule,
    EstablishimentsRouterModule,
    CardModule,
    DetailsModule,
    ListModule
  ],
  exports: [EstablishmentsComponent]
})
export class EstablishmentsModule { }
