import { createAction, props } from '@ngrx/store';
import { User } from '../../../types';

export const loadUsers = createAction(
  '[User] Load User',
  props<{ token: string }>()
);

export const loadUsersSuccess = createAction(
  '[User] Load User Success',
  props<{ user: User }>()
);

export const loadUsersFailure = createAction(
  '[User] Load User Failure',
  props<{ error: string }>()
);

export const setUser = createAction(
  '[User] Set User',  
  props<{ user: User }>()  
);

export const logoutUser = createAction('[User] Logout User');