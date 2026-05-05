import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantEdit } from './restaurant-edit';

describe('RestaurantEdit', () => {
  let component: RestaurantEdit;
  let fixture: ComponentFixture<RestaurantEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
