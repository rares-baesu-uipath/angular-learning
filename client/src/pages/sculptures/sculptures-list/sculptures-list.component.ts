import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sculpture } from '../../../model/sculpture';
import { SculptureService } from '../../../services/sculpture/sculpture.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { BehaviorSubject, Observable } from 'rxjs';
import { State } from '../../../model/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-sculptures-list',
  standalone: true,
  imports: [RouterModule, CommonModule, MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule, MatProgressSpinnerModule],
  templateUrl: './sculptures-list.component.html',
  styleUrl: './sculptures-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SculpturesListComponent {
  state$ = new BehaviorSubject<State<Sculpture[]>>({ type: 'loading' });
  constructor(private sculptureService: SculptureService) { }

  ngOnInit() {
    this.sculptureService.getSculptures$().subscribe({
      next: data => this.state$.next(data),
      error: err => this.state$.error(err)
    });
  }
}
