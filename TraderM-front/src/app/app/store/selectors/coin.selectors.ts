import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CoinState } from '../reducers/coin.reducer';

export const selectCoinState = createFeatureSelector<CoinState>('coins');

export const selectAllCoins = createSelector(
  selectCoinState,
  (state) => state.coins
);
