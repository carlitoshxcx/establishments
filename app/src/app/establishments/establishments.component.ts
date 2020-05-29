import { Component, OnInit, OnDestroy } from '@angular/core';
import { EstablishmentsService } from './establishments.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-establishments',
  templateUrl: './establishments.component.html'
})
export class EstablishmentsComponent implements OnInit, OnDestroy {
  /* Establishments loaded subscription */
  private establishmentsLoaded$: Subscription;

  /* Establishments Array */
  public establishments: any[];

  /* Loading establishments? */
  public loading = true;

  constructor(private establishmentsService: EstablishmentsService) { }

  ngOnInit() {
    if (this.establishmentsService.hasEstablishments) {
      this.establishments = this.establishmentsService.establishments;
      this.loading = false;
    } else {
      this.establishmentsLoaded$ = this.establishmentsService.loaded.subscribe(establishments => {
        this.establishments = establishments;
        this.loading = false;
      });
    }
  }

  ngOnDestroy() {
    if (this.establishmentsLoaded$) { this.establishmentsLoaded$.unsubscribe(); }
  }
}
