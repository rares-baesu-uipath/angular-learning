import { Component, forwardRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, filter, of, switchMap } from 'rxjs';
import { Sculpture } from '../../../model/sculpture';
import { SculptureService } from '../../../services/sculpture/sculpture.service';
import { ControlValueAccessor, Form, FormBuilder, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { numberFieldValidator, textFieldValidator } from '../../../utils';

const EMPTY_SCULPTURE: Sculpture = {
  name: '',
  basePrice: 0,
  baseWeight: 0,
  id: ''
}

@Component({
  selector: 'app-sculpture-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SculptureFormComponent),
      multi: true
    }
  ],
  templateUrl: './sculpture-form.component.html',
  styleUrl: './sculpture-form.component.scss'
})
export class SculptureFormComponent {
  sculptureId: string;
  sculpture$: Observable<Sculpture>;
  sculptureForm: FormGroup = this.formBuilder.group<Sculpture>({ ...EMPTY_SCULPTURE });

  // _value: Sculpture;
  // onChange: () => void;
  // onTouch: () => void;
    // writeValue(obj: any): void {
  //   console.log('write value', obj)
  // }
  // registerOnChange(fn: any): void {
  //   this.onChange = fn;
  // }
  // registerOnTouched(fn: any): void {
  //   this.onTouch = fn;
  // }
  // setDisabledState?(isDisabled: boolean): void {
  // }

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private httpService: SculptureService, 
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.sculpture$ = this.route.params.pipe(
      filter(params => !!params['id']),
      switchMap(params => this.httpService.getSculpture(params['id']))
      // mai pun un switchMap pentru initForm ???
    ) as Observable<Sculpture>;

    this.sculpture$.subscribe({
      next: (sculpture) => {
        this.sculptureId = sculpture.id;
        this.initForm(sculpture)
      },
      error: (error) => console.error(error)
    })

    // this.routeSub = this.route.params.subscribe(params => {
    //   this.sculptureId = params['id']
    // });

    // if (this.sculptureId) {

    // }
    // this.httpService.getSculpture(this.sculptureId).subscribe(
    //   {
    //     next: (response) => this.sculpture = response as Sculpture,
    //     error: (err) => console.log(err)
    //   });
  }

  initForm(sculpture: Sculpture) {
    this.sculptureForm = this.formBuilder.group({
      name: [sculpture.name, textFieldValidator],
      basePrice: [sculpture.basePrice, numberFieldValidator],
      baseWeight: [sculpture.baseWeight, numberFieldValidator],
      id: [sculpture.id]
    });
  }

  onSubmit() {
    if (!this.sculptureForm.valid) {
      return;
    }
    if (this.sculptureId) {
      this.httpService.updateSculpture(this.sculptureForm.value).subscribe({
        next: () => this.router.navigate(['/sculptures'])
      });
    } else {
      this.httpService.createSculpture(this.sculptureForm.value).subscribe({
        next: () => this.router.navigate(['/sculptures'])
      });
    }
  }
  // ngOnDestroy() {
  //   this.routeSub.unsubscribe();
  // }
}
