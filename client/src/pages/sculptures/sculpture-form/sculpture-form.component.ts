import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, filter, switchMap } from 'rxjs';
import { Sculpture } from '../../../model/sculpture';
import { SculptureService } from '../../../services/sculpture/sculpture.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { numberFieldValidator, textFieldValidator } from '../../../utils';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sculpture-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './sculpture-form.component.html',
  styleUrl: './sculpture-form.component.scss'
})
export class SculptureFormComponent {
  sculptureId: string;
  sculpture$: Observable<Sculpture>;
  sculptureForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpService: SculptureService,
    private formBuilder: FormBuilder
  ) {
    this.fillForm();
  }

  ngOnInit() {
    this.sculpture$ = this.route.params.pipe(
      filter(params => !!params['id']),
      switchMap(params => {
        this.isLoading = true;
        return this.httpService.getSculpture(params['id'])
      })
    ) as Observable<Sculpture>;

    this.sculpture$.subscribe({
      next: (sculpture) => {
        this.sculptureId = sculpture.id;
        this.fillForm(sculpture)
        this.isLoading = false;
      },
      error: (error) => console.error(error)
    })
  }

  fillForm(sculpture?: Sculpture) {
    this.sculptureForm = this.formBuilder.group({
      name: [sculpture?.name || '', textFieldValidator],
      basePrice: [sculpture?.basePrice || '', numberFieldValidator],
      baseWeight: [sculpture?.baseWeight || '', numberFieldValidator],
      id: [sculpture?.id || '']
    });
  }

  onSubmit() {
    if (!this.sculptureForm.valid) {
      return;
    }

    const httpCall = this.sculptureId
      ? this.httpService.updateSculpture(this.sculptureForm.value)
      : this.httpService.createSculpture(this.sculptureForm.value);

    httpCall.subscribe(() => this.router.navigate(['/sculptures']));
  }
}
