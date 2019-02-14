import {Forecast} from './forecast';

export class Weather {
  id: number;
  name: string;
  wind: number;
  temp: number;
  tempAverage: number;
  weatherStatus: string;
  currentTime: number;
  forecast: Forecast[];
  constructor(weather: Partial<Weather>) {
    Object.assign(this, weather);

  }

}
