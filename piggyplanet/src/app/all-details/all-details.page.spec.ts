import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllDetailsPage } from './all-details.page';

describe('AllDetailsPage', () => {
  let component: AllDetailsPage;
  let fixture: ComponentFixture<AllDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
