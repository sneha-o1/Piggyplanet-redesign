import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetGoalPage } from './set-goal.page';

describe('SetGoalPage', () => {
  let component: SetGoalPage;
  let fixture: ComponentFixture<SetGoalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SetGoalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
