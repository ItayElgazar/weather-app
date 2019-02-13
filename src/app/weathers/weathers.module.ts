import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeathersListComponent } from './weathers-list/weathers-list.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';

@NgModule({
  declarations: [WeathersListComponent, WeatherCardComponent],
  imports: [
    CommonModule
  ],
  exports: [WeathersListComponent],
})
export class WeathersModule { }
