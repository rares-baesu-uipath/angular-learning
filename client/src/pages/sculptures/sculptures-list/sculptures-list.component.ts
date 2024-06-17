import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sculpture } from '../../../model/sculpture';
import { SculptureService } from '../../../services/sculpture/sculpture.service';

@Component({
  selector: 'app-sculptures-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sculptures-list.component.html',
  styleUrl: './sculptures-list.component.scss'
})
export class SculpturesListComponent {
  sculptures: Sculpture[];
  constructor(private httpService: SculptureService) { }

  ngOnInit() {
    this.httpService.getSculptures().subscribe(
      {
        next: (response) => this.sculptures = response as Sculpture[],
        error: (err) => console.log(err)
      });
  }
}
