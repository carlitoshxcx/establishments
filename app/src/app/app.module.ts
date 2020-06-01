import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

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
    HeaderModule,
    EstablishmentsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
