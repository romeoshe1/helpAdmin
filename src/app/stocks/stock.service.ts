import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Stock } from './stock';
import { Symbol } from './symbol'

@Injectable({
  providedIn: 'root'
})
export class StockService {

  baseUrl = 'http://localhost:8080/api/stocks?query=GO';
  stocks: Stock[];
  symbol:Symbol;
  SymbolDitals:Symbol[];

  constructor(private http: HttpClient) {
  }

  getStocks(Symbol: string): Observable<Stock[]> {
    return this.http.get<Stock[]>(`http://localhost:8080/api/stocks?query=${Symbol}`).pipe(
      map((res)=>{
        return res;
      }),
      catchError(this.handleError));

  }

  getDetailsStock(Symbol: string): Observable<Symbol> {
    return this.http.get<Symbol>(`http://localhost:8080/api/stocks?symbols=${Symbol}`).pipe(
      map((res)=>{
        this.symbol = res;
        console.log(this.symbol );
        //this.SymbolDitals.push(res[0]);
        return this.symbol;
      }),
      catchError(this.handleError));

  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
