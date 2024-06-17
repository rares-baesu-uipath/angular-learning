import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SculptureFormComponent } from './sculpture-form.component';

describe('SculptureFormComponent', () => {
  let component: SculptureFormComponent;
  let fixture: ComponentFixture<SculptureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SculptureFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SculptureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
