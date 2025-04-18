import { Component } from '@angular/core';
import { Asset, Transaction, User } from '../../../types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoinService } from '../../../core/services/coin/coin.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../app/store/selectors/user.selectors';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
  standalone:false
})
export class UserDashboardComponent {
  user$ : Observable<User| null>;
  totalBalance: number = 24586.40;
  totalProfit: number = 1245.23;
  profitPercentage: number = 5.3;
  showLaunchModal = false;
  launchForm: FormGroup;
  assets: Asset[] = [
    { name: 'Bitcoin', symbol: 'BTC', amount: 0.8942, value: 15234.23, change: 2.4, color: 'bg-orange-500' },
    { name: 'Ethereum', symbol: 'ETH', amount: 3.7842, value: 6453.12, change: 1.2, color: 'bg-blue-500' },
    { name: 'Solana', symbol: 'SOL', amount: 12.3, value: 1765.34, change: 5.7, color: 'bg-purple-500' },
    { name: 'Cardano', symbol: 'ADA', amount: 2045, value: 1133.71, change: -1.3, color: 'bg-teal-500' }
  ];
  
  recentTransactions: Transaction[] = [
    { type: 'Buy', asset: 'Bitcoin', amount: 0.023, value: 432.12, date: '2025-03-28', status: 'Completed' },
    { type: 'Sell', asset: 'Ethereum', amount: 1.2, value: 2100.54, date: '2025-03-27', status: 'Completed' },
    { type: 'Transfer', asset: 'Solana', amount: 3.5, value: 420.65, date: '2025-03-25', status: 'Pending' },
    { type: 'Buy', asset: 'Cardano', amount: 145, value: 87.23, date: '2025-03-22', status: 'Completed' }
  ];
  
  watchlist = [
    { name: 'Bitcoin', price: 68432.21, change: 2.4 },
    { name: 'Ethereum', price: 3521.87, change: 1.2 },
    { name: 'Solana', price: 142.65, change: 5.7 },
    { name: 'Cardano', price: 0.58, change: -1.3 },
    { name: 'Ripple', price: 0.62, change: 0.8 }
  ];

  constructor(private fb: FormBuilder, private coinService : CoinService , private store:Store) {
    this.launchForm = this.fb.group({
      name: ['', [Validators.required]],
      symbol: ['', [Validators.required, Validators.maxLength(5)]],
      price: ['', [Validators.required, Validators.min(1)]],
      supply: ['']
    });
    this.user$ = this.store.select(selectUser);
  }
  toggleLaunchModal(): void {
    this.showLaunchModal = !this.showLaunchModal;
    if (!this.showLaunchModal) {
      this.launchForm.reset({
        tokenType: 'ERC20',
        decimals: 18
      });
    }
  }
  
  submitLaunchForm(): void {
    if (this.launchForm.valid) {
      console.log('Form submitted:', this.launchForm.value);
      this.coinService.addCoin(this.launchForm.value).subscribe(
        (response) => {
          console.log('Coin added successfully:', response);
          this.toggleLaunchModal();
        },
        (error) => {
          console.error('Error adding coin:', error);
        }
      );
    } else {
      Object.keys(this.launchForm.controls).forEach((key) => {
        this.launchForm.get(key)?.markAsTouched();
      });
    }
  }
  

  ngOnInit(): void {
    
  }
}
