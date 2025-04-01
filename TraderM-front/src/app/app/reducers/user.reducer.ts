import { createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersSuccess, loadUsersFailure } from '../actions/user.actions';
import { initialUserState } from '../state/user.state';

export const userReducer = createReducer(
  initialUserState,
  on(loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
