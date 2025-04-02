import { createReducer, on } from '@ngrx/store';
import {
  loadCoinsSuccess,
  addCoinSuccess,
  updateCoinSuccess,
  deleteCoinSuccess
} from '../actions/coin.actions';
import { Coin } from '../../../types';

export interface CoinState {
  coins: Coin[];
  loading: boolean;
  error: string | null;
}

export const initialState: CoinState = {
  coins: [],
  loading: false,
  error: null
};

export const coinReducer = createReducer(
  initialState,
  on(loadCoinsSuccess, (state, { coins }) => ({
    ...state,
    coins,
    loading: false,
    error: null
  })),
  on(addCoinSuccess, (state, { coin }) => ({
    ...state,
    coins: [...state.coins, coin]
  })),
  on(updateCoinSuccess, (state, { coin }) => ({
    ...state,
    coins: state.coins.map(c => (c.coinId === coin.coinId ? coin : c))
  })),
  on(deleteCoinSuccess, (state, { coinId }) => ({
    ...state,
    coins: state.coins.filter(c => c.coinId !== coinId)
  }))
);
