import {configureStore} from '@reduxjs/toolkit';
import AuthReducer from './Authslice';
export const store = configureStore({
      reducer: {
    auth: AuthReducer,
  },
})