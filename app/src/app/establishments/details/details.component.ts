import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { StorageService } from '@app/establishments/storage.service';
import { fade } from '@shared/animations/fade';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  animations: [fade]
})
export class DetailsComponent implements OnInit, OnDestroy {
  /* Establishments loaded subscription */
  private establishmentsLoaded$: Subscription;

  /* Current route */
  private activatedRoute$: Subscription;

  /* Current establishment details */
  public details: any;

  /* Loading details? */
  public loading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    const getDetails = (id: string) => {
      this.details = this.storageService.establishments.find(establishment => establishment.id === id);
      this.loading = false;
    };

    this.activatedRoute$ = this.activatedRoute.params.subscribe(({ id }) => {
      if (!this.storageService.hasEstablishments) {
        this.establishmentsLoaded$ = this.storageService.loaded.subscribe(() => getDetails(id));
        return;
      }
      getDetails(id);
    });
  }

  ngOnDestroy(): void {
    this.establishmentsLoaded$.unsubscribe();
    this.activatedRoute$.unsubscribe();
  }

  public backToList(): void {
    this.router.navigateByUrl('/');
  }
}
