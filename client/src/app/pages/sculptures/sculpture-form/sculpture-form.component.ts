import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sculpture-form',
  standalone: true,
  imports: [],
  templateUrl: './sculpture-form.component.html',
  styleUrl: './sculpture-form.component.scss'
})
export class SculptureFormComponent {
  sculptureId: string;

  private routeSub: Subscription;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.sculptureId = params['id']
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
