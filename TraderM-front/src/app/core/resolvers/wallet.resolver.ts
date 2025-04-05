import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CoinService } from '../services/coin/coin.service';
import { Coin } from '../../types';

@Injectable({ providedIn: 'root' })
export class WalletResolver implements Resolve<any> {
  constructor(private coinService: CoinService) {}

  resolve(): Observable<Coin[]> {
    return this.coinService.getCoinsByOwner();
  }
}