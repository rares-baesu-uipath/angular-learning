import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SculpturePickerComponent } from './sculpture-picker.component';

describe('SculpturePickerComponent', () => {
  let component: SculpturePickerComponent;
  let fixture: ComponentFixture<SculpturePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SculpturePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SculpturePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
