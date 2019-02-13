import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeathersListComponent } from './weathers-list.component';

describe('WeathersListComponent', () => {
  let component: WeathersListComponent;
  let fixture: ComponentFixture<WeathersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeathersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeathersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
