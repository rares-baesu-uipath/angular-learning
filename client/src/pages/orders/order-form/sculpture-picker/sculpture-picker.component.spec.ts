import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { SculpturePickerComponent } from './sculpture-picker.component';
import { SculptureService } from '../../../../services/sculpture/sculpture.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

fdescribe('SculpturePickerComponent', () => {
  let component: SculpturePickerComponent;
  let fixture: ComponentFixture<SculpturePickerComponent>;
  let sculptureService: SculptureService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SculpturePickerComponent],
      providers: [SculptureService, provideHttpClient(),
        provideHttpClientTesting(), provideRouter([]), provideAnimations()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SculpturePickerComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    sculptureService = TestBed.inject(SculptureService);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch sculptures', fakeAsync(() => {
    const mockData = [{
      id: '1',
      name: 'Test Sculpture',
      basePrice: 1,
      baseWeight: 1
    }]
    
    const sculptureSpy = spyOn(sculptureService, 'getSculptures').and.returnValue(of(mockData));
    //component.ngOnInit(); //<--- WHY ???
    fixture.detectChanges();
    console.log(component.sculptures)
    expect(sculptureSpy).toHaveBeenCalled();
  }));
});
