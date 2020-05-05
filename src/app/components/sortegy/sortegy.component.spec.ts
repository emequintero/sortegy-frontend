import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortegyComponent } from './sortegy.component';

describe('SortegyComponent', () => {
  let component: SortegyComponent;
  let fixture: ComponentFixture<SortegyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortegyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortegyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
