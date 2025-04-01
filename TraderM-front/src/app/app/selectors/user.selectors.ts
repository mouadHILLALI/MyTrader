import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  selectUserState,
  (state) => state.user || null  
);

export const selectIsAuthenticated = createSelector(
  selectUser,  
  (user) => !!user?.token  
);
