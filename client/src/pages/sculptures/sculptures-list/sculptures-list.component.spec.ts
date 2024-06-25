import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { SculpturesListComponent } from './sculptures-list.component';
import { SculptureService } from '../../../services/sculpture/sculpture.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from "@angular/router/testing";
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';


describe('SculpturesListComponent', () => {
  let component: SculpturesListComponent;
  let fixture: ComponentFixture<SculpturesListComponent>;
  let sculptureService: SculptureService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ SculpturesListComponent],
      declarations: [],
      providers: [SculptureService, provideHttpClient(),
        provideHttpClientTesting(), provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SculpturesListComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    sculptureService = TestBed.inject(SculptureService);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data', fakeAsync(() => {
    const mockData = [{
            id: '1',
      name: 'Test Sculpture',
      basePrice: 1,
      baseWeight: 1
    }]
    spyOn(sculptureService, 'getSculptures').and.returnValue(of(mockData));-
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('[role="listitem"]').length).toBe(1);
  }));
});
