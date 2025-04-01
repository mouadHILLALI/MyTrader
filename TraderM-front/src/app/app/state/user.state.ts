import { UserState } from "../../types";

export const initialUserState: UserState = {
    user: {
       id : "" , username:'' ,  role : "" , token:""
    },
    loading: false,
    error: null,
  };