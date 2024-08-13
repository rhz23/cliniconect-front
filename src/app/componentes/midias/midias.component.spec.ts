import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidiasComponent } from './midias.component';

describe('MidiasComponent', () => {
  let component: MidiasComponent;
  let fixture: ComponentFixture<MidiasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MidiasComponent]
    });
    fixture = TestBed.createComponent(MidiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
