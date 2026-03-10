import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Imagelist } from './imagelist';

describe('Imagelist', () => {
  let component: Imagelist;
  let fixture: ComponentFixture<Imagelist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Imagelist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Imagelist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
