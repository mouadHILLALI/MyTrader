import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { CoinService } from '../services/coin.service';
import { Coin } from '../../types';
import { TransactionService } from '../services/transaction.service';

@Injectable({ providedIn: 'root' })
export class WalletResolver implements Resolve<any> {
  constructor(private coinService: CoinService , private transactionService : TransactionService) {}

  resolve(): Observable<any> {
    return forkJoin({
      coinData: this.coinService.getCoinsByOwner(),
      transactionsData: this.transactionService.fetchAllTransactionsBySeller(),
    });
  }
}