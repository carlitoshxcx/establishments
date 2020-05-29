import { Component, OnInit, Input } from '@angular/core';
import { wiggle } from '../shared/animations/wiggle';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  animations: [wiggle]
})
export class HeaderComponent implements OnInit {

  @Input() logoAltText: string;
  @Input() logoTitle: string;
  @Input() logoWidth: string;
  @Input() logoHeight: string;
  @Input() logoSrc: string;

  constructor() { }

  ngOnInit() {
  }

}
