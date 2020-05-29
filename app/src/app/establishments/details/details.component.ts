import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { EstablishmentsService } from '../establishments.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit, OnDestroy {
  /* Current route */
  private activatedRoute$: Subscription;

  /* Current establishment details */
  public details: any;

  /* Loading establishments? */
  public loading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private establishmentsService: EstablishmentsService
  ) { }

  ngOnInit() {
    this.activatedRoute$ = this.activatedRoute.params.subscribe(({ id }) => {
      this.details = this.establishmentsService.establishments.find(establishment => establishment.id === id);
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.activatedRoute$.unsubscribe();
  }

  public backToList(): void {
    this.router.navigateByUrl(`/`);
  }
}
