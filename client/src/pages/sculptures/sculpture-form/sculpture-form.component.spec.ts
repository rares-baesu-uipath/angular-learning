import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { SculptureFormComponent } from './sculpture-form.component';
import { SculptureService } from '../../../services/sculpture/sculpture.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';


describe('SculptureFormComponent', () => {
  let component: SculptureFormComponent;
  let fixture: ComponentFixture<SculptureFormComponent>;
  let sculptureService: SculptureService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SculptureFormComponent],
      providers: [SculptureService, provideHttpClient(),
        provideHttpClientTesting(), provideRouter([]), provideAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SculptureFormComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    sculptureService = TestBed.inject(SculptureService);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should validate input', () => {
    const createSculptureSpy = spyOn(sculptureService, 'createSculpture')
    component.sculptureForm.setValue({
      name: '',
      basePrice: 1,
      baseWeight: 1,
      id: ''
    });

    const button = (fixture.nativeElement as HTMLElement).querySelector('button[type="submit"]') as HTMLButtonElement;
    button.click();

    expect(createSculptureSpy).not.toHaveBeenCalled();
  });

  it('should create sculpture', fakeAsync(() => {
    const createSculptureSpy = spyOn(sculptureService, 'createSculpture')
    component.sculptureForm.setValue({
      name: 'test',
      basePrice: 1,
      baseWeight: 1,
      id: ''
    });

    const button = (fixture.nativeElement as HTMLElement).querySelector('button[type="submit"]') as HTMLButtonElement;
    button.click();

    expect(createSculptureSpy).toHaveBeenCalled();
  }))
});
