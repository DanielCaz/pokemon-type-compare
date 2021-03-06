import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TypeInfoListsComponent } from './components/type-info-lists/type-info-lists.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [AppComponent, TypeInfoListsComponent, HeaderComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
