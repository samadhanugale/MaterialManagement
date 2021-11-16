import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialMenuComponent } from './material-menu/material-menu.component';
import { LoginComponent } from './login/login.component';
import { AddMaterialComponent } from './add-material/add-material.component';

@NgModule({
  declarations: [
    AppComponent,
    MaterialMenuComponent,
    LoginComponent,
    AddMaterialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
