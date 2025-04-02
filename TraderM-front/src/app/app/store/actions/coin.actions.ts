import { createAction, props } from '@ngrx/store';
import { Coin } from '../../../types';

export const loadCoins = createAction('[Coin] Load Coins');
export const loadCoinsSuccess = createAction(
  '[Coin] Load Coins Success',
  props<{ coins: Coin[] }>()
);
export const loadCoinsFailure = createAction(
  '[Coin] Load Coins Failure',
  props<{ error: string }>()
);

export const addCoinSuccess = createAction(
  '[Coin] Add Coin Success',
  props<{ coin: Coin }>()
);

export const updateCoinSuccess = createAction(
  '[Coin] Update Coin Success',
  props<{ coin: Coin }>()
);

export const deleteCoinSuccess = createAction(
  '[Coin] Delete Coin Success',
  props<{ coinId: string }>()
);
