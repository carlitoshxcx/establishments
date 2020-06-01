import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BootstrapModule } from '@libs/bootstrap.module';
import { HeaderComponent } from '@header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    BootstrapModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
