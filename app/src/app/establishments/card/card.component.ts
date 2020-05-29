import { Component, OnInit, Input } from '@angular/core';
import { fade } from '../../shared/animations/fade';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  animations: [fade]
})
export class CardComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
