import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Weather} from '../shared/weather';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent {

  @Input() weather: Weather;
  @Output() forecastForWeather: EventEmitter<Weather> = new EventEmitter();

  // the dt (unix timestamp) that returns from openweather is incorrect and shows the time in the user location somehow.
  isDay() {
    return this.weather.currentTime >= 6 && this.weather.currentTime <= 17;
  }

  getForecast() {
    this.forecastForWeather.emit(this.weather);
  }
}
