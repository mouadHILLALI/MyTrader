import { Injectable } from "@angular/core";
import { environment } from "../../../../enviroments/enviroment";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, take, switchMap } from "rxjs";
import { Coin } from "../../../types";
import { select, Store } from "@ngrx/store";
import { selectUser } from "../../../app/store/selectors/user.selectors";

@Injectable({
  providedIn: 'root'
})
export class CoinService {
  private apiUrl = environment.apiUrl;
  private userId$ = new BehaviorSubject<string>(''); 

  constructor(private http: HttpClient, private store: Store) {
    this.store.pipe(select(selectUser)).subscribe(user => {
      if (user?.userId) {
        this.userId$.next(user.userId); 
      }
    });
  }

  getCoins(): Observable<Coin[]> {
    return this.http.get<Coin[]>(`${this.apiUrl}/coins/allCoins`);
  }

  getCoinsByOwner(): Observable<Coin[]> {
    return this.http.get<Coin[]>(`${this.apiUrl}/coins/getCoins/${this.userId$.value}`);
  }

  getCoinById(coinId: string): Observable<Coin> {
    return this.http.get<Coin>(`${this.apiUrl}/coins/getCoin/${coinId}`);
  }

  addCoin(coin: Coin): Observable<Coin> {
    return this.userId$.pipe(
      take(1),
      switchMap((userId) => {
        if (userId) {
          return this.http.post<Coin>(`${this.apiUrl}/coins/addCoin/${userId}`, coin);
        } else {
          throw new Error('User ID not found');
        }
      })
    );
  }
  
 
  updateCoin(coinId: string, coin: Coin): Observable<Coin> {
    return this.http.put<Coin>(`${this.apiUrl}/coins/updateCoin/${coinId}`, coin);
  }

  deleteCoin(coinId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/coins/deleteCoin/${coinId}`);
  }
}
