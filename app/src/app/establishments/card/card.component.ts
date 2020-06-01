import { Component, Input } from '@angular/core';
import { fade } from '@shared/animations/fade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  animations: [fade]
})
export class CardComponent {

  @Input() data: any;

  constructor(private router: Router) { }

  public openDetails({id}): void {
    this.router.navigateByUrl(`${id}`);
  }
}
