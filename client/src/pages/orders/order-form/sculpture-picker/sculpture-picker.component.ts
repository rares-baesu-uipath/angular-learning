import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { ConfiguredSculpture, Material, Sculpture } from '../../../../model/sculpture';
import { SculptureService } from '../../../../services/sculpture/sculpture.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormBuilder, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectionList } from '@angular/material/list';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import { State } from '../../../../model/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';


@Component({
  selector: 'sculpture-picker',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, 
    CommonModule, FormsModule, 
    MatFormField, MatLabel, 
    MatSelectionList, MatSelect, 
    MatOption, MatError, MatIconModule, 
    MatButtonModule, MatChipsModule, MatProgressSpinner],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SculpturePickerComponent),
      multi: true
    }
  ],
  templateUrl: './sculpture-picker.component.html',
  styleUrl: './sculpture-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SculpturePickerComponent implements ControlValueAccessor {
  @Input() error?: string;
  state$ = new BehaviorSubject<State<Sculpture[]>>({ type: 'loading' });
  _value: ConfiguredSculpture[] = [];
  sculpturePickerForm: FormGroup;

  constructor(private sculptureService: SculptureService, private formBuilder: FormBuilder
  ) {
    this.sculpturePickerForm = this.formBuilder.group({
      sculptureId: [''],
      material: ['']
    })
  }

  onChange: (value: ConfiguredSculpture[]) => void = () => { };
  onTouch: () => void;

  writeValue(obj: any): void {
    if (obj) {
      this._value = obj;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  addSculpture() {
    if(this.state$.value.type !== 'data') {
      return
    }

    const sculptureId = this.sculpturePickerForm.get('sculptureId')?.value;
    const sculpture = this.state$.value.data.find(s => s.id === sculptureId) as Sculpture;
    if (sculpture) {
      this._value.push({
        sculpture: sculpture,
        material: this.sculpturePickerForm.get('material')?.value
      })
      this.onChange(this._value);
    } 
  }

  removeSculpture(index: number) {
    this._value.splice(index, 1)
    this.onChange(this._value);
  }

  get value() {
    return this._value;
  };

  set value(value) {
      this._value = value;
  }

  ngOnInit() {
    this.sculptureService.getSculptures$().subscribe({
      next: data => this.state$.next(data),
      error: err => this.state$.error(err)
    })
  }
}
