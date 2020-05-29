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
    this.encodeJSON('establishments').then(key => {
      const establishments = localStorage.getItem(key) || false;

      if (establishments) {
        this.decodeB64(establishments).then(decoded => {
          const json = JSON.parse(decoded);

          this.establishments = json || [];
          this.hasEstablishments = true;
          this.loaded.next(this.establishments);
        });
      } else {
        this.load().then(data => this.set(data));
      }
    });
  }

  /**
   * Encode json string to B64
   * @returns Promise
   */
  private async encodeJSON(str: string): Promise<any> {
    return new Promise((resolve) => {
      const encoded = btoa(str);
      resolve(encoded);
    });
  }

  /**
   * Decode B64 to json string
   * @returns Promise
   */
  private async decodeB64(b64: string): Promise<any> {
    return new Promise((resolve) => {
      const decoded = atob(b64);
      resolve(decoded);
    });
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
      const jsonString = JSON.stringify(establishments);

      this.encodeJSON(jsonString).then(encoded => {
        this.encodeJSON('establishments').then(key => {
          this.hasEstablishments = true;
          this.establishments = this.parse(establishments);
          localStorage.setItem(key, encoded);
          this.loaded.next(this.establishments);
          resolve();
        });
      });
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
