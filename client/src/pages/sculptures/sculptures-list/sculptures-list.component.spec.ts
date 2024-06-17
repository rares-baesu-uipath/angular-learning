import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SculpturesListComponent } from './sculptures-list.component';

describe('SculpturesListComponent', () => {
  let component: SculpturesListComponent;
  let fixture: ComponentFixture<SculpturesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SculpturesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SculpturesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
