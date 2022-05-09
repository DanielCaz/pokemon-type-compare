import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TypeInfoListsComponent } from './componentes/type-info-lists/type-info-lists.component';
import { HeaderComponent } from './componentes/header/header.component';
import { TypeListComponent } from './componentes/type-list/type-list.component';

@NgModule({
  declarations: [AppComponent, TypeInfoListsComponent, HeaderComponent, TypeListComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
