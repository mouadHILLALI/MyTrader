import { createReducer, on } from '@ngrx/store';
import { setUser, loadUsersSuccess, loadUsersFailure } from '../actions/user.actions';
import { User } from '../../../types';

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  user: null,  
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({
    ...state,
    user: { ...user },  
    loading: false,
    error: null,
  })),
  on(loadUsersSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

