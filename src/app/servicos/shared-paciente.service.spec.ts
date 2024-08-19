import { TestBed } from '@angular/core/testing';

import { SharedPacienteService } from './shared-paciente.service';

describe('SharedPacienteService', () => {
  let service: SharedPacienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedPacienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
