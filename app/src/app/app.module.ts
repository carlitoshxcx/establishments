import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { AppRoutingModule } from '@app/app-routing.module';
import { BootstrapModule } from '@libs/bootstrap.module';
import { MaterialModule } from '@libs/material.module';
import { HeaderModule } from '@header/header.module';
import { EstablishmentsModule } from '@establishments/establishments.module';
import { AppComponent } from '@app/app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BootstrapModule,
    MaterialModule,
    ToastrModule.forRoot(),
    HeaderModule,
    EstablishmentsModule
  ],
  providers: [ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
