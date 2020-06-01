import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { isValidCPF, formatCPF, isValidCNPJ, formatCNPJ } from '@brazilian-utils/brazilian-utils';

import { StorageService } from '@app/establishments/storage.service';
import { UtilsService } from '@shared/services/utils.service';
import { ToastrService } from 'ngx-toastr';
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

  /* Current establishment */
  public establishment: any;

  /* Current establishment index */
  private index: number;

  /* Loading details? */
  public loading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public storageService: StorageService,
    public utils: UtilsService,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
    const init = (id: string) => {
      this.establishment = this.storageService.establishments.find((establishment, index) => {
        if (establishment.id === id) {
          this.index = index;
          return establishment;
        }
      });
      this.loading = false;
    };

    this.activatedRoute$ = this.activatedRoute.params.subscribe(({ id }) => {
      if (!this.storageService.hasEstablishments) {
        this.establishmentsLoaded$ = this.storageService.loaded.subscribe(() => init(id));
        return;
      }
      init(id);
    });
  }

  ngOnDestroy(): void {
    if (this.establishmentsLoaded$) { this.establishmentsLoaded$.unsubscribe(); }
    this.activatedRoute$.unsubscribe();
  }

  /**
   * Navigate back to list
   */
  public backToList(): void {
    this.router.navigateByUrl('/');
  }

  /**
   * Validate Document
   * @param value Field value
   */
  public validateDocument(value: string): string {
    if (isValidCPF(value)) {
      value = formatCPF(value);
    } else if (isValidCNPJ(value)) {
      value = formatCNPJ(value);
    }

    return value;
  }

  private parseAddress() {
    const hasSemicolonSeparator = this.establishment.address.formatted.indexOf(',') >= 0;
    const hasHyphenSeparator = this.establishment.address.formatted.indexOf('-') >= 0;

    if (hasSemicolonSeparator) {
      if (hasHyphenSeparator) {
        const [street, neighbourhoodZipcode] = this.establishment.address.formatted.split(',');
        const [neighbourhood, zipcode] = neighbourhoodZipcode && neighbourhoodZipcode.split('-');

        this.establishment.address = {
          ...this.establishment.address,
          street: street.trim(),
          neighbourhood: neighbourhood.trim(),
          zipcode: zipcode.trim()
        };
      } else {
        const [street, neighbourhood] = this.establishment.address.formatted.split(',');

        this.establishment.address = {
          ...this.establishment.address,
          street: street.trim(),
          neighbourhood: neighbourhood.trim(),
          zipcode: ''
        };
      }
    } else if (hasHyphenSeparator) {
      const [street, zipcode] = this.establishment.address.formatted.split('-');

      this.establishment.address = {
        ...this.establishment.address,
        street: street.trim(),
        neighbourhood: '',
        zipcode: zipcode.trim()
      };
    } else {
      this.establishment.address = {
        ...this.establishment.address,
        street: this.establishment.address.formatted,
        neighbourhood: '',
        zipcode: ''
      };
    }
  }

  /**
   * Save current establishment to local storage
   */
  public save(): void {
    /* Parse address */
    this.parseAddress();

    this.storageService.update(this.establishment, this.index).then(() => {
      const config: any = {
        closeButton: true,
        progressBar: true,
        toastClass: 'toast bg-primary',
        titleClass: 'toast-title light fs-1',
        messageClass: 'toast-message regular mt-2 fs-2',
        progressAnimation: 'decreasing'
      };
      this.toaster.success('Informações salvas com sucesso.', `${this.establishment.name} atualizado!`, config);
    });
  }
}
