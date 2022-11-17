import { configureStore } from '@reduxjs/toolkit';
import autorizationReducer from './authorizationSlice'

export const store = configureStore({
  reducer: {
    autorize: autorizationReducer,
  },
});
