
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
  id: string;
  username: string;
  role?: string;
  token : string;
  }

export interface UserState{
    user : User;
    loading: boolean;
    error: string | null;
}
  