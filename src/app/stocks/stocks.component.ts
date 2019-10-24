import { Component, OnInit } from '@angular/core';

import { Stock } from './stock';
import { Symbol } from './symbol'
import { StockService } from './stock.service'

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  stocks:Stock[];
  SymbolDitals = [];
  error = '';
  success = '';
  stock = new Stock('', '');
  deleltedFromSymbol = false;

  constructor(private stockService : StockService) { }

  ngOnInit() {
  }

  getStock(symbol: string){
    this.stockService.getStocks(symbol).subscribe(
      (res:Stock[])=>{
        this.stocks = res;
        this.success = 'successfully';
      },
      (err) => this.error = err
    );
  }

  updateTable(symbol) {

    var found = false;
    for (var i = 0; i < this.SymbolDitals.length; i++) {
      if (this.SymbolDitals[i][0].Symbol == symbol) {
        found = true;
        window.alert("already subscribed")
        break;
      }
    }
    if (!found || !this.deleltedFromSymbol) {
      this.stockService.getDetailsStock(symbol).subscribe(
        (res: Symbol)=> {
          this.SymbolDitals.push(res);
          this.success = 'successfully';
          // Reset the form
          //f.reset();
        },
        (err) => this.error = err
      );

    }
  }

  deleteSymbol(symbol) {
      for (var i = 0; i < this.SymbolDitals.length; i++) {
        if (this.SymbolDitals[i][0].Symbol == symbol) {
          this.SymbolDitals.splice(i, 1);
          this.deleltedFromSymbol = true;
          break;
        }
      }

  }
}
