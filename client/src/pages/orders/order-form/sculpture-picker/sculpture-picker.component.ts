import { Component, Input, forwardRef } from '@angular/core';
import { ConfiguredSculpture, Material, Sculpture } from '../../../../model/sculpture';
import { SculptureService } from '../../../../services/sculpture/sculpture.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormBuilder, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectionList } from '@angular/material/list';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';


@Component({
  selector: 'sculpture-picker',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, FormsModule, MatFormField, MatLabel, MatSelectionList, MatSelect, MatOption, MatError, MatIconModule, MatButtonModule, MatChipsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SculpturePickerComponent),
      multi: true
    }
  ],
  templateUrl: './sculpture-picker.component.html',
  styleUrl: './sculpture-picker.component.scss'
})
export class SculpturePickerComponent implements ControlValueAccessor {
  @Input() error?: string;
  sculptures: Sculpture[];
  _value: ConfiguredSculpture[] = [];
  sculpturePickerForm: FormGroup;

  constructor(private httpService: SculptureService, private formBuilder: FormBuilder
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
    const sculptureId = this.sculpturePickerForm.get('sculptureId')?.value;
    const sculpture = this.sculptures.find(s => s.id === sculptureId) as Sculpture;
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
    if (value !== this._value) {
      this._value = value;
    }
  }

  ngOnInit() {
    console.log('test')
    this.httpService.getSculptures().subscribe({
      next: (sculptures) => {this.sculptures = sculptures as Sculpture[]}
    })
  }
}
