import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  /* Establishments */
  public establishments: any[];
  private establishmentsKey: string;

  /* Names */
  public names: any[];
  private namesKey: string;

  /* Cities */
  public cities: any[];
  private citiesKey: string;

  /* banks */
  public banks: any[];
  private banksKey: string;

  /* Establishments loaded */
  public loaded = new Subject<any>();

  /* Has establishments? */
  public hasEstablishments = false;

  constructor(private httpClient: HttpClient) {
    /* Create keys */
    Promise.all([
      this.encodeStr('establishments').then(key => this.establishmentsKey = key),
      this.encodeStr('names').then(key => this.namesKey = key),
      this.encodeStr('cities').then(key => this.citiesKey = key),
      this.encodeStr('banks').then(key => this.banksKey = key)
    ]).then(() => {
      Promise.all([
        this.getLocal(this.establishmentsKey).then(value => this.establishments = value),
        this.getLocal(this.namesKey).then(value => this.names = value),
        this.getLocal(this.citiesKey).then(value => this.cities = value),
        this.getLocal(this.banksKey).then(value => this.banks = value)
      ]).then(() => {
        /* Has establishments? */
        if (this.establishments) {
          this.hasEstablishments = true;
          this.loaded.next(this.establishments);
        } else {
          this.load().then(data => {
            this.loadBanksList().then(banks => {
              this.banks = banks.map(bank => bank.Name);
              this.saveLocal(this.banksKey, this.banks);
              this.save(data);
            });
          });
        }
      });
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
   * Load banks data
   */
  private async loadBanksList(): Promise<any> {
    const url = `https://raw.githubusercontent.com/guibranco/BancosBrasileiros/master/bancos.json`;
    return this.httpClient.get<any>(url).toPromise();
  }

  /**
   * Encode json string to B64
   * @returns Promise
   */
  private async encodeStr(str: string): Promise<any> {
    return new Promise((resolve) => {
      const encoded = btoa(str);
      resolve(encoded);
    });
  }

  /**
   * Decode B64 to json string
   * @returns Promise
   */
  private async decodeStr(b64: string): Promise<any> {
    return new Promise((resolve) => {
      const decoded = atob(b64);
      resolve(decoded);
    });
  }

  /**
   * Save value to localStorage using key
   * @param key key
   * @param value object
   */
  private saveLocal(key: string, value: any): void {
    const str = JSON.stringify(value);
    this.encodeStr(str).then(encoded => localStorage.setItem(key, encoded));
  }

  /**
   * Get localStorage value by key
   * @param key name
   * @returns Promise
   */
  private getLocal(key: string): Promise<any> {
    return new Promise((resolve) => {
      const value = localStorage.getItem(key);
      if (value) {
        this.decodeStr(value).then(decoded => resolve(JSON.parse(decoded)));
      } else {
        resolve(false);
      }
    });
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
  private parse(data: any[]): { establishments, names, cities } {
    const establishments = data.map(item => {
      const [street, neighbourhood, city, zipcode] = item.address.split(',');
      const formatted = `${street}, ${neighbourhood} - ${zipcode}`;

      item.address = {
        street: street.trim(),
        neighbourhood: neighbourhood.trim(),
        city: city.trim(),
        zipcode: zipcode.trim(),
        formatted
      };

      return item;
    });
    const names = data.map(item => item.name);
    const cities = data.map(item => item.address.city);

    return { establishments, names, cities };
  }

  /**
   * Save establishments on local storage
   * @param data any[]
   * @returns Promise
   */
  public async save(data: any[]): Promise<any> {
    return new Promise((resolve) => {
      const { establishments, names, cities } = this.parse(data);

      this.establishments = establishments;
      this.saveLocal(this.establishmentsKey, this.establishments);
      this.names = names;
      this.saveLocal(this.namesKey, this.names);
      this.cities = cities;
      this.saveLocal(this.citiesKey, this.cities);
      this.hasEstablishments = true;
      this.loaded.next(this.establishments);
      resolve();
    });
  }

  /**
   * Save establishments on local storage
   * @param establishment Updated data
   * @param index key in establishments
   * @returns Promise
   */
  public async update(establishment, index): Promise<any> {
    return new Promise((resolve) => {
      console.log('index', index);
      console.log('establishment', establishment);
      this.establishments[index] = establishment;
      this.saveLocal(this.establishmentsKey, this.establishments);
      resolve();
    });
  }

  /**
   * Remove data from storage
   * @returns Promise
   */
  public async remove(): Promise<any> {
    return new Promise((resolve) => {
      this.hasEstablishments = false;
      this.establishments = null;
      localStorage.removeItem(this.establishmentsKey);
      localStorage.removeItem(this.namesKey);
      localStorage.removeItem(this.citiesKey);
      localStorage.removeItem(this.banksKey);
      resolve();
    });
  }
}
