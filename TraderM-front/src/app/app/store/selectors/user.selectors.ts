import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';
import { User } from '../../../types';

export const selectUserState = createFeatureSelector<UserState>('user');

// Explicitly type the return as User | null
export const selectUser = createSelector(
  selectUserState,
  (state): User | null => state.user || null
);

export const selectIsAuthenticated = createSelector(
  selectUser,
  (user): boolean => !!user?.token
);