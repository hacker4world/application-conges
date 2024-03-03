import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEComponent } from './liste-e.component';

describe('ListeEComponent', () => {
  let component: ListeEComponent;
  let fixture: ComponentFixture<ListeEComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeEComponent]
    });
    fixture = TestBed.createComponent(ListeEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
