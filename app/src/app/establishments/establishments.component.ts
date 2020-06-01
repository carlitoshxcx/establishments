import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from '@app/establishments/storage.service';
import { Subscription } from 'rxjs';

import { fade } from '@shared/animations/fade';

@Component({
  selector: 'app-establishments',
  templateUrl: './establishments.component.html',
  animations: [fade]
})
export class EstablishmentsComponent implements OnInit, OnDestroy {
  /* Establishments loaded subscription */
  private establishmentsLoaded$: Subscription;

  /* Establishments Array */
  public establishments: any[];

  /* Loading establishments? */
  public loading = true;

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    if (this.storageService.hasEstablishments) {
      this.establishments = this.storageService.establishments;
      this.loading = false;
    } else {
      this.establishmentsLoaded$ = this.storageService.loaded.subscribe(establishments => {
        this.establishments = establishments;
        this.loading = false;
      });
    }
  }

  ngOnDestroy() {
    if (this.establishmentsLoaded$) { this.establishmentsLoaded$.unsubscribe(); }
  }
}
