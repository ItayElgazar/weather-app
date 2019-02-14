import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCardComponent } from './weather-card.component';

describe('WeatherCardComponent', () => {
  let component: WeatherCardComponent;
  let fixture: ComponentFixture<WeatherCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherCardComponent);
    component = fixture.componentInstance;
    component.weather = {
      id: 1,
      name: 'Amsterdam',
      wind: 3,
      temp: 5.6,
      tempAverage: 4,
      weatherStatus: 'clear',
      currentTime: 5,
      forecast: []
    };
    fixture.detectChanges();
  });

  it('should emit $forecastForWeather', () => {
    spyOn(component.forecastForWeather, 'emit');
    component.getForecast();
    expect(component.forecastForWeather.emit).toHaveBeenCalledWith(component.weather);
  });

  it('#isDay() should return boolean', () => {
    expect(component.isDay().constructor).toBe(Boolean);
  });
});
