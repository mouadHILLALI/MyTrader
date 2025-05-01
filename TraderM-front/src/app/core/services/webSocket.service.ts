import { Injectable } from "@angular/core";
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from "../../../enviroments/enviroment";

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
  private stompClient!: Client;
  private readonly WS_URL = `${environment.ws}`;
  private dashDataSubject = new BehaviorSubject<any>(null);
  public dashData$ = this.dashDataSubject.asObservable();
  
  connect(token: string | null): void {
    const socket = new SockJS(`${this.WS_URL}?token=${token}`);
    
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      connectHeaders: {
        'Authorization': `Bearer ${token}`
      },
      onConnect: (frame) => {
        console.log('Connected: ' + frame);
        
        this.stompClient.subscribe('/user/queue/stats', (message: IMessage) => {
          try {
            const data = JSON.parse(message.body);
            this.dashDataSubject.next(data);
          } catch (e) {
            console.error('Error parsing message:', e);
          }
        });
        
        this.stompClient.publish({
          destination: '/app/stats', 
          body: JSON.stringify({})
        });
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame.headers['message']);
      },
      onWebSocketError: (event) => {
        console.error('WebSocket error:', event);
      }
    });

    this.stompClient.activate();
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }
}