import { Component, forwardRef } from '@angular/core';
import { ConfiguredSculpturePayload, Material, Sculpture } from '../../../../model/sculpture';
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
  _value: ConfiguredSculpturePayload[] = [{
    sculptureId: '',
    material: Material.WOOD
  }]; //sculptureId & Material

  constructor(private httpService: SculptureService) {
    
  }

  onChange: (value: ConfiguredSculpturePayload[]) => void = () => {};
  onTouch: () => void;

  writeValue(obj: any): void {
    if (obj) {
      this._value = obj;
    }
  }
  registerOnChange(fn: (value:any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  updateSculpture(sculptureId: string) {
    this._value[0].sculptureId = sculptureId;
    this.onChange(this._value);
  }

  updateMaterial(material: Material) {
    this._value[0].material = material;
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
    this.sculptures$ = this.httpService.getSculptures() as Observable<Sculpture[]>;
  }
}
