import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() { }

  /**
   * Allow only numbers
   * Remove Special characters e separators
   * @param value Value to be parsed
   * @returns onlyNumbers Only numbers from value
   */
  AllowOnlyNumbers(value: string): string {
    const onlyNumbers: string = value.toString().replace(/\D/g, '');
    return onlyNumbers;
  }
}
