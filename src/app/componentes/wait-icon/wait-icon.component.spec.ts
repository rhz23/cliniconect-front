import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitIconComponent } from './wait-icon.component';

describe('WaitIconComponent', () => {
  let component: WaitIconComponent;
  let fixture: ComponentFixture<WaitIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaitIconComponent]
    });
    fixture = TestBed.createComponent(WaitIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
