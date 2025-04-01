import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure, logout } from '../actions/auth.actions';
import { AuthState, initialAuthState } from '../state/auth.state';

export const authReducer = createReducer(
  initialAuthState,
  
  // 🔹 Handle Login
  on(login, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  // 🔹 Handle Login Success
  on(loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    loading: false,
    error: null
  })),

  // 🔹 Handle Login Failure
  on(loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // 🔹 Handle Logout
  on(logout, (state) => ({
    ...state,
    user: null,
    token: null
  }))
);
