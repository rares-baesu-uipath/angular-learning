import { Component, forwardRef } from '@angular/core';
import { Sculpture } from '../../../../model/sculpture';
import { SculptureService } from '../../../../services/sculpture/sculpture.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'sculpture-picker',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
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
  sculptures$: Observable<Sculpture[]>;
  constructor(private httpService: SculptureService) { }

  _value: Sculpture;
  onChange: (value: Sculpture) => void = () => {};
  onTouch: () => void;
  writeValue(obj: any): void {
    this._value = obj;
    console.log(obj)
    this.onChange(obj)
  }
  registerOnChange(fn: (value:any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  get value(): Sculpture {
    return this._value;
  };

  set value(value: Sculpture) {
    if (value !== this._value) {
      this._value = value;
      this.onChange(value);
    }
  }
  ngOnInit() {
    this.sculptures$ = this.httpService.getSculptures() as Observable<Sculpture[]>
  }
}
