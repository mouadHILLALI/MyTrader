import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coin } from '../../../types';


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
  
  currentPage: number = 1;
  itemsPerPage: number = 10;
  
  marketData: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.marketData = data['marketData'];
      console.log(this.marketData);
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
  
  openBuyModal(coin: Coin): void {
    this.selectedCoin = coin;
    this.buyAmount = 0;
    this.showBuyModal = true;
  }
  
  closeBuyModal(): void {
    this.showBuyModal = false;
    this.selectedCoin = null;
    this.buyAmount = 0;
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