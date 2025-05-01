import { Injectable } from "@angular/core";
import { environment } from "../../../enviroments/enviroment";
import { BehaviorSubject, catchError, Observable, switchMap, take } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { select, Store } from "@ngrx/store";
import { selectUser } from "../../app/store/selectors/user.selectors";
import { UUID } from "node:crypto";

@Injectable({
  providedIn: 'root'
})
export class TransactionService{
      private apiUrl = environment.apiUrl;
      private userId$ = new BehaviorSubject<string | null>(null); 
  
    constructor(private http: HttpClient, private store: Store) {
      this.store.pipe(select(selectUser)).subscribe(user => {
          if (user?.userId) {
            this.userId$.next(user.userId);
          }
      });
    }

    public fetchAllTransactionsBySeller() : Observable<any[]> {
      return this.userId$.pipe(
        take(1),
        switchMap((userId) => {
            return this.http.get<any>(`${this.apiUrl}/transactions/getAllTransactions/${userId}`);
        })
      ); 
    }
    public approveTransaction(transactionId: UUID): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/transactions/approveTransaction/${transactionId}` , {})
        .pipe(
          catchError(this.handleError) 
        );
    }
  
    public cancelTransaction(transactionId: UUID): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/transactions/cancelTransaction/${transactionId}` , {})
        .pipe(
          catchError(this.handleError) 
        );
    }
  
    private handleError(error: any): Observable<never> {
      console.error('Transaction error', error);
      throw error;
    }

    
}