import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherListComponent } from './weather-list/weather-list.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [WeatherListComponent, WeatherCardComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [WeatherListComponent],
})
export class WeatherModule { }
