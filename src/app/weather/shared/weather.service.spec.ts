import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Weather} from './weather';
import {Forecast} from './forecast';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;
  const responseMock = {
    list: [{
      id: 1,
      name: 'Amsterdam',
      wind: {
        speed: 3
      },
      main: {
        temp: 3,
        temp_min: 3,
        temp_max: 3
      },
      weather: [{
        main: 'clear'
      }],
      dt: 1550158420768,
      dt_txt: '2019-02-14 18:00:00',
    }]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.get(WeatherService);
    httpMock = TestBed.get(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getWeahterListByIds()', () => {
    it('should get weather list', (done: () => void) => {
      const weatherList: Weather[]  = [new Weather({
        id: 1,
        name: 'Amsterdam',
        wind: 3,
        temp: 3,
        tempAverage: 3,
        weatherStatus: 'clear',
        currentTime: 11
      })];

      service.getWeatherListByIds([2759794])
        .subscribe((weatherListResponse: Weather[]) => {
          expect(weatherListResponse).toEqual(weatherList);
          done();
        });
      const req = httpMock.expectOne(`http://api.openweathermap.org/data/2.5/group?id=2759794&units=metric&appid=0adff3d56e215542f6deb3b1c669be7e`);
      httpMock.verify();
      expect(req.request.method).toBe('GET');
      req.flush(responseMock);
    });
  });

  describe('#getForecastForWeather()', () => {
    it('should get forecast for specific weatherId', (done: () => void) => {
      service.getForecastForWeather(2759794)
        .subscribe((forecastsListResponse: Forecast[]) => {
          expect(forecastsListResponse).toEqual(
            [{
              temp: 3,
              date: '2019-02-14 18:00:00',
              weather: 'clear',
            }]
          );
          done();
        });

      const req = httpMock.expectOne(`http://api.openweathermap.org/data/2.5/forecast?id=2759794&units=metric&appid=0adff3d56e215542f6deb3b1c669be7e`);
      httpMock.verify();
      expect(req.request.method).toBe('GET');
      req.flush(responseMock);
    });
  });
});
