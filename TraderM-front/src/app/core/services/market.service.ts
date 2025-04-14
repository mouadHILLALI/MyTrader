import { Injectable } from "@angular/core";
import { environment } from "../../../enviroments/enviroment";
import { BehaviorSubject, Observable, switchMap, take } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { select, Store } from "@ngrx/store";
import { selectUser } from "../../app/store/selectors/user.selectors";

@Injectable({
  providedIn: 'root'
})
export class MarketService{
      private apiUrl = environment.apiUrl;
      private userId$ = new BehaviorSubject<string>(''); 

    constructor(private http: HttpClient, private store: Store) {
          this.store.pipe(select(selectUser)).subscribe(user => {
            if (user?.userId) {
              this.userId$.next(user.userId); 
            }
          });
    }

    executeTransaction(transaction: any): Observable<any> {
        return this.userId$.pipe(
          take(1),
          switchMap((userId) => {
            if (userId) {
              const newTransaction = {
                amount: transaction.amount,
                coinId: transaction.coinId,
                buyerId: this.userId$.value
              };
              
              return this.http.post<any>(`${this.apiUrl}/transactions/execute`, newTransaction);
            } else {
              throw new Error('User ID not found');
            }
          })
        );
      }      
}