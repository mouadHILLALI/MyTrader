// wallet.component.ts
import { Component, OnInit } from '@angular/core';
import { Coin } from '../../../types';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoinService } from '../../../core/services/coin.service';
import { BehaviorSubject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectUser } from '../../../app/store/selectors/user.selectors';
import { TransactionService } from '../../../core/services/transaction.service';




@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
  standalone:false
})
export class WalletComponent implements OnInit {
  totalBalance: number = 24586.40;
  totalProfit: number = 1245.23;
  profitPercentage: number = 5.3;
  coinData : any;
  transactionsData : any;
  showEditModal: boolean = false;
  selectedCoin !: Coin | null;
  editForm!: FormGroup;
  transactionDetail!:any;
  userId$ = new BehaviorSubject<string | null>(null); 
  

  
  showSendModal: boolean = false;
  showReceiveModal: boolean = false;
  showSwapModal: boolean = false;
  showTransactionModal : boolean = false;
  
  sendAmount: number = 0;
  recipientAddress: string = '';
  
  
  activeTab: 'assets' | 'transactions' | 'security' = 'assets';
  
  constructor(private route: ActivatedRoute , private fb: FormBuilder,private coinService :CoinService , private store : Store , 
    private transactionService : TransactionService) { 
     this.store.pipe(select(selectUser)).subscribe(user => {
              if (user?.userId) {
                this.userId$.next(user.userId);
              }
          });
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.coinData = data['coinData'].coinData; 
      this.transactionsData = data['coinData'].transactionsData; 
    });
    console.log(this.coinData);
    console.log(this.transactionsData); 
  }
  

  openEditModal(coin: Coin) {
    this.selectedCoin = coin;
    this.editForm = this.fb.group({
      name: [coin.name, Validators.required],
      supply: [coin.supply, Validators.required]
    });
    this.showEditModal = true;
  }

  toggleTransactionModal(transaction : any){
    this.transactionDetail = transaction;
    this.showTransactionModal = !this.showTransactionModal;    
  }

  

  editCoin() {
    if (this.editForm.valid) {
      const updatedCoin = {
        ...this.selectedCoin,
        name: this.editForm.value.name,
        supply: Number(this.editForm.value.supply)
      };
  
      this.coinService.updateCoin(updatedCoin).subscribe({
        next: () => {
          this.coinService.getCoinsByOwner().subscribe(coins => {
            this.coinData = coins;
            this.closeModals();
          });
        },
        error: (err) => {
          console.error('Error updating coin:', err);
        }
      });
    }
  }
  
  deleteCoin(coinID : string){
    this.coinService.deleteCoin(coinID).subscribe({
      next:()=>{
        this.coinService.getCoinsByOwner().subscribe(coins => {
          this.coinData = coins;
        })
      }
    });
  }
  
  
  
  openSendModal(): void {
    this.sendAmount = 0;
    this.recipientAddress = '';
    this.showSendModal = true;
  }
  
  openReceiveModal(): void {
    this.showReceiveModal = true;
  }
  
  openSwapModal(): void {
    this.showSwapModal = true;
  }
  
  closeModals(): void {
    this.showSendModal = false;
    this.showReceiveModal = false;
    this.showSwapModal = false;
    this.showEditModal=false;
  }
  
  executeSend(): void {
   
  }
  
  executeSwap(): void {
  }
  
  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      // Show success message
      console.log('Copied to clipboard');
    });
  }
  
  getStatusClass(status: string): string {
    switch(status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'failed': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  }
  
  getTypeClass(tx: any): string { 
    switch(this.getTransactionType(tx)) {
      case 'buy': return 'bg-green-500/20 text-green-400';
      case 'sell': return 'bg-red-500/20 text-red-400';
      case 'send': return 'bg-blue-500/20 text-blue-400';
      case 'receive': return 'bg-purple-500/20 text-purple-400';
      case 'swap': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  }

  approveTransaction(transactionId : any){
    this.transactionService.approveTransaction(transactionId).subscribe({
      next : (value) => console.log("value here tra" , value),
      complete : ()=> console.log("transaction complete"),
      error : (err) => console.error(err)
    })
  }

  cancelTransaction(transactionId : any){
    this.transactionService.cancelTransaction(transactionId).subscribe({
      next : (value) => console.log("value here tra" , value),
      complete : ()=> console.log("transaction complete"),
      error : (err) => console.error(err)
    })
  }

  getTransactionType(tx:any) : string {
    if(tx.buyer.id === this.userId$.value) return "buy";
    return "sell";
  }
  
  getTypeIcon(type: string): string {
    switch(type) {
      case 'buy': return 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z';
      case 'sell': return 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z';
      case 'send': return 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4';
      case 'receive': return 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01';
      case 'swap': return 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4';
      default: return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  }
  
  calculateSendTotal() {

  }
  
  calculateSwapEstimate(): void {
    
  }


}