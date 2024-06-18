import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sculpture } from '../../../model/sculpture';
import { SculptureService } from '../../../services/sculpture/sculpture.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sculptures-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
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
