import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BootstrapModule } from './libs/bootstrap.module';
import { HeaderModule } from './header/header.module';
import { EstablishmentsModule } from './establishments/establishments.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BootstrapModule,
    HeaderModule,
    EstablishmentsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
