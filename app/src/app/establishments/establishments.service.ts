import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentsService {
  /* Establishments Array */
  public establishments: any[];

  /* Establishments loaded */
  public loaded = new Subject<any>();

  /* Has establishments? */
  public hasEstablishments = false;

  constructor(private httpClient: HttpClient) {
    /* Load establishments */
    const establishments = localStorage.getItem('establishments');
    console.log('this.establishments', this.establishments);

    if (establishments) {
      this.hasEstablishments = true;
      this.establishments = JSON.parse(establishments) || [];
      setTimeout(() => {
        this.loaded.next(this.establishments);
      }, 100);
    } else {
      this.load().then(data => this.set(data));
    }
  }

  /**
   * Load establishments data
   */
  private async load(): Promise<any> {
    const url = `https://my-json-server.typicode.com/james-delivery/frontend-challenge/establishments`;
    return this.httpClient.get<any>(url).toPromise();
  }

  /**
   * Return establishments
   * @returns Promise
   */
  public async get(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.establishments);
    });
  }

  /**
   * Parse establishments
   * @param establishments any[]
   * @returns any[]
   */
  private parse(establishments: any[]): any[] {
    return establishments.map(establishment => {
      const [street, neighbourhood, state, zipcode] = establishment.address.split(',');
      establishment.address = { street, neighbourhood, state, zipcode };
      return establishment;
    });
  }

  /**
   * Save establishments on local storage
   * @param establishments any[]
   * @returns Promise
   */
  public async set(establishments: any[]): Promise<any> {
    return new Promise((resolve) => {
      this.hasEstablishments = true;
      this.establishments = this.parse(establishments);
      localStorage.setItem('establishments', JSON.stringify(this.establishments));
      this.loaded.next(this.establishments);
      resolve();
    });
  }

  /**
   * Remove establishments from storage
   * @returns Promise
   */
  public async remove(): Promise<any> {
    return new Promise((resolve) => {
      this.hasEstablishments = false;
      this.establishments = null;
      localStorage.removeItem('establishments');
      resolve();
    });
  }
}
