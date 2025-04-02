import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CoinService } from '../services/coin/coin.service';

@Injectable({ providedIn: 'root' })
export class MarketResolver implements Resolve<any> {
  constructor(private coinService: CoinService) {}

  resolve(): Observable<any> {
    return this.coinService.getCoins();
  }
}