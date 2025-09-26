import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://localhost:7269/api/currency';

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/currencies`);
  }

  getRates(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/rates`);
  }

  exchangeCurrency(data: {
    fromCurrency: string;
    toCurrency: string;
    amount: number;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/exchange`, data);
  }

  bookCurrency(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/book`, data);
  }
  bookExchange(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/book`, payload);
  }
}
