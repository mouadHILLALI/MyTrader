import { UUID } from "crypto";

export interface CryptoCoin {
    name: string;
    symbol: string;
    price: number;
    change: number;
  }

export interface NavLinks {
    title : string ,
    Link : string
  }

export interface User {
  userId: string;
  username: string;
  role: string;
  token : string;
  isTwoFactorEnabled : boolean;
  authorities:[]
  }

export interface UserState{
    user : User;
    loading: boolean;
    error: string | null;
    token : string;
    
}

export interface AuthResponse {
  userId : string,
  username: string;
  token: string;
  role: string;
  isTwoFactorEnabled: boolean;
}

export interface AppState {
  user: UserState;  
}


 export interface Asset {
  name: string;
  symbol: string;
  amount: number;
  value: number;
  change: number;
  color: string;
}

export interface Transaction {
  type: string;
  asset: string;
  amount: number;
  value: number;
  date: string;
  status: string;
}
