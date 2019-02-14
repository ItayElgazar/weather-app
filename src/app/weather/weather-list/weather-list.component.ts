import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from '../shared/weather.service';
import {Weather} from '../shared/weather';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-weathers-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})
export class WeatherListComponent implements OnInit, OnDestroy {

  private citiesIds: number[] = [2759794, 2950159, 3054643, 2988507, 2643743, 1850147];
  weatherList$: Observable<Weather[]>;
  errorLoading$: Subject<boolean> = new Subject<boolean>();
  destroy$: Subject<Weather> = new Subject();
  constructor(private weathersService: WeatherService) { }

  ngOnInit() {
    this.weatherList$ = this.weathersService.getWeatherListByIds(this.citiesIds)
      .pipe(takeUntil(this.destroy$));

    this.errorLoading$ = this.weathersService.errorLoading$;
  }

  getForecastForWeather(weather: Weather): void {
    if (!weather.forecast || weather.forecast.length === 0) {
      this.weathersService.getForecastForWeather(weather.id)
        .subscribe((result) => {
          weather.forecast = result;
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
