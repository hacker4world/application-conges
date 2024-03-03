import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandecongesComponent } from './demandeconges.component';

describe('DemandecongesComponent', () => {
  let component: DemandecongesComponent;
  let fixture: ComponentFixture<DemandecongesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandecongesComponent]
    });
    fixture = TestBed.createComponent(DemandecongesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
