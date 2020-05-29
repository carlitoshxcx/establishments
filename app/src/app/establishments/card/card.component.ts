import { Component, OnInit, Input } from '@angular/core';
import { fade } from '../../shared/animations/fade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  animations: [fade]
})
export class CardComponent implements OnInit {

  @Input() data: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public openDetails({id}): void {
    this.router.navigateByUrl(`${id}`);
  }
}
