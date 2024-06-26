import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, filter, of, switchMap, tap, throwError } from 'rxjs';
import { Sculpture } from '../../../model/sculpture';
import { SculptureService } from '../../../services/sculpture/sculpture.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { State } from '../../../model/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sculpture-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatButtonModule, MatError, MatIcon],
  templateUrl: './sculpture-form.component.html',
  styleUrl: './sculpture-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SculptureFormComponent {
  sculptureForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    basePrice: ['', Validators.required],
    baseWeight: ['', Validators.required],
    id: ['']
  });
  sculptureId: string;
  state$ = new BehaviorSubject<State<Sculpture>>({ type: 'loading' });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sculptureService: SculptureService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      tap(params => {
        this.sculptureId = params['id']
      }),
      switchMap(params =>
        this.sculptureId ?
          this.sculptureService.getSculpture$(params['id']) :
          of<State<Sculpture>>({ type: 'data', data: { id: '', name: '', basePrice: 0, baseWeight: 0 } })
      ),
      tap(state => {
        if (state.type === 'data') {
          this.sculptureId = state.data.id;
          this.fillForm(state.data);
          this.state$.next({
            type: 'data',
            data: state.data
          });
        }
      }),
      catchError((state, obs) => {
        this.state$.next(state);
        return obs;
      })
    ).subscribe({
      next: data => this.state$.next(data),
      error: err => this.state$.error(err)
    });
  }

  fillForm(sculpture: Sculpture) {
    this.sculptureForm = this.formBuilder.group({
      name: [sculpture.name, Validators.required],
      basePrice: [sculpture.basePrice, Validators.required],
      baseWeight: [sculpture.baseWeight, Validators.required],
      id: [sculpture.id]
    });
  }

  onSubmit() {
    if (this.sculptureForm.invalid) {
      return;
    }

    this.state$.next({type: 'loading'});

    const httpCall = this.sculptureId
      ? this.sculptureService.updateSculpture$(this.sculptureForm.value)
      : this.sculptureService.createSculpture$(this.sculptureForm.value);

    httpCall.subscribe(() => this.router.navigate(['/sculptures']));
  }

  deleteSculpture() {
    if (!this.sculptureId) {
      return;
    }

    this.state$.next({type: 'loading'});

    this.sculptureService.deleteSculpture$(this.sculptureId).subscribe({
      next: () => this.router.navigate(['/sculptures'])
    });
  }
}
