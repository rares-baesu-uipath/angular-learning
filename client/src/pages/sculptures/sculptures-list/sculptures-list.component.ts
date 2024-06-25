import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sculpture } from '../../../model/sculpture';
import { SculptureService } from '../../../services/sculpture/sculpture.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-sculptures-list',
  standalone: true,
  imports: [RouterModule, CommonModule, MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule],
  templateUrl: './sculptures-list.component.html',
  styleUrl: './sculptures-list.component.scss'
})
export class SculpturesListComponent {
  sculptures$: Observable<Sculpture[]>;
  constructor(private httpService: SculptureService) { }

  ngOnInit() {
    this.sculptures$ = this.httpService.getSculptures() as Observable<Sculpture[]>;
  }
}
