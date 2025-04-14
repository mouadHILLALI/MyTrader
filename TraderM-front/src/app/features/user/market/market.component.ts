import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coin } from '../../../types';
import { MarketService } from '../../../core/services/market.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
  standalone:false
})
export class MarketComponent implements OnInit {
  coins: Coin[] = [];
  filteredCoins: Coin[] = [];
  searchTerm: string = '';
  sortBy: string = 'marketCap';
  sortDirection: 'asc' | 'desc' = 'desc';
  showBuyModal: boolean = false;
  selectedCoin: Coin | null = null;
  buyAmount: number = 0;
  buyForm!: FormGroup;
  
  
  currentPage: number = 1;
  itemsPerPage: number = 10;
  
  marketData: any;
  coin : any;
  constructor(private route: ActivatedRoute , private marketService : MarketService , private fb: FormBuilder) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.marketData = data['marketData'];
    });    
  
    this.applyFilters();
  }
  
  applyFilters(): void {
    let result = this.coins;
    
    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      result = result.filter(coin => 
        coin.name.toLowerCase().includes(searchTermLower) || 
        coin.symbol.toLowerCase().includes(searchTermLower)
      );
    }
    
    // Apply sorting
    result = result.sort((a, b) => {
      let aValue: any = a[this.sortBy as keyof Coin];
      let bValue: any = b[this.sortBy as keyof Coin];
      
      if (this.sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    this.filteredCoins = result;
  }
  
  changeSorting(column: string): void {
    if (this.sortBy === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortDirection = 'desc';
    }
    
    this.applyFilters();
  }
  
  getSortIcon(column: string): string {
    if (this.sortBy !== column) {
      return 'fa-sort';
    }
    
    return this.sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  }

  toggleBuyModal(coin:any){
    this.showBuyModal = !this.showBuyModal;
    this.coin = coin;
    this.buyForm = this.fb.group({
          supply: [Validators.required]
        });
  }

  closeBuyModal(){
    this.showBuyModal = !this.showBuyModal;
  }

  executeTransaction(){ 
    const transaction = {
      amount :this.buyForm.value.supply ,
      coinId : this.coin.id
    }
    this.marketService.executeTransaction(transaction);
    this.closeBuyModal();
  }
  
  

  
  get totalPages(): number {
    return Math.ceil(this.filteredCoins.length / this.itemsPerPage);
  }
  
  get paginatedCoins(): Coin[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCoins.slice(startIndex, startIndex + this.itemsPerPage);
  }
  
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  
  formatLargeNumber(num: number): string {
    if (num >= 1000000000000) {
      return (num / 1000000000000).toFixed(2) + 'T';
    }
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
    }
    return num.toString();
  }
}