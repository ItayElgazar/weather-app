import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {WeathersModule} from './weathers/weathers.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    WeathersModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
