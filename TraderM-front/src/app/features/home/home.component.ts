import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CryptoCoin } from '../../types';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@Component({
  selector: 'app-home',
  imports: [RouterModule , CommonModule , ReactiveFormsModule , SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  cryptoCoins: CryptoCoin[] = [
    { name: 'Bitcoin', symbol: 'BTC', price: 68432.21, change: 2.4 },
    { name: 'Ethereum', symbol: 'ETH', price: 3521.87, change: 1.2 },
    { name: 'Solana', symbol: 'SOL', price: 142.65, change: 5.7 },
    { name: 'Cardano', symbol: 'ADA', price: 0.58, change: -1.3 }
  ];

  constructor() { }

  ngOnInit(): void {
    // You could fetch real crypto data here from an API
  }
}
