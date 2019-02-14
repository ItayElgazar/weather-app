import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { WeatherListComponent } from './weather-list.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Forecast} from '../shared/forecast';
import {WeatherService} from '../shared/weather.service';
import {of} from 'rxjs';
import {Weather} from '../shared/weather';
import {WeatherCardComponent} from '../weather-card/weather-card.component';

describe('WeatherListComponent', () => {
  let component: WeatherListComponent;
  let weatherService: WeatherService;
  let fixture: ComponentFixture<WeatherListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherListComponent, WeatherCardComponent ],
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    })
    .compileComponents();
  }));

  beforeEach(inject([WeatherService], (ws) => {
    fixture = TestBed.createComponent(WeatherListComponent);
    component = fixture.componentInstance;
    weatherService = ws;
    fixture.detectChanges();
  }));

  it('should assign weatherList$ and errorLoading$ on ngOnInit()', () => {
    component.ngOnInit();
    expect(component.weatherList$).toBeDefined();
    expect(component.errorLoading$).toBeDefined();
  });

  it('should get forecast #getForecastForWeather()', () => {
      const forecastsMock: Forecast[] = [{
        temp: 4,
        date: new Date(),
        weather: 'clear'
      }];

      const weather = {id: 5} as Weather;
      spyOn(weatherService, 'getForecastForWeather').and.returnValue(of(forecastsMock));

      component.getForecastForWeather(weather);

      fixture.detectChanges();

      expect(weather.forecast).toEqual(forecastsMock);
  });
});
