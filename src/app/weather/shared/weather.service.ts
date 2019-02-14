import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Weather} from './weather';
import {catchError, filter, map, take} from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';
import {Forecast} from './forecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly API_KEY = '0adff3d56e215542f6deb3b1c669be7e';
  private readonly API_URL = 'http://api.openweathermap.org/data/2.5';
  errorLoading$: Subject<boolean> = new Subject();

  constructor(private httpClient: HttpClient) {
  }

  getWeatherListByIds(citiesIds: number[]): Observable<Weather[]> {
    return this.httpClient.get(`${this.API_URL}/group?id=${citiesIds.toString()}&units=metric&appid=${this.API_KEY}`)
      .pipe(
        catchError((error) => {
          console.error('error loading the list of users', error);
          this.errorLoading$.next(true);
          return of();
        }))
      .pipe(map((result: any) => {
          return result.list.map(w => new Weather({
            id: w.id,
            name: w.name,
            wind: w.wind.speed,
            temp: Math.round(w.main.temp),
            tempAverage: (w.main.temp_min + w.main.temp_max) / 2,
            weatherStatus: w.weather[0].main,
            currentTime: new Date(w.dt * 1000).getHours()
          }));
        }
      ));
  }

  getForecastForWeather(cityId: number): Observable<Forecast[]> {
    return this.httpClient.get(`${this.API_URL}/forecast?id=${cityId}&units=metric&appid=${this.API_KEY}`)
      .pipe(map(result => {
        return {...result, list: result['list'].filter((w, i) => i < 5)};
      }))
      .pipe(map((result) => result['list'].map(w => {
        return {
          temp: Math.round(w.main.temp),
          date: w.dt_txt,
          weather: w.weather[0].main.toLowerCase()};
      })))
      .pipe(catchError(() => of([])));
  }


}
