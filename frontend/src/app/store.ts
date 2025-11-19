import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
//import type { UserState } from "../Features/login/userSlicer";
import { userAPI } from '../Features/users/usersApi';
import storage from 'redux-persist/lib/storage';
import { loginAPI } from '../Features/login/loginAPI';
import userSlice from '../Features/login/userSlicer';
import { bookingsAPI } from '../Features/booking/bookingAPI';
import { customerSupportAPI } from '../Features/customerSupport/customerSupportAPI';
import { paymentsAPI } from '../Features/payments/paymentsAPI';
import { eventsAPI } from '../Features/events/eventsAPI';
import { venuesAPI } from '../Features/venues/venuesAPI';
import { mpesaAPI } from '../Features/mpesa/mpesaAPI';

// Persist config
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user'], // only persist user slice
};

// Root reducer
const rootReducer = combineReducers({
  [userAPI.reducerPath]: userAPI.reducer,
  [loginAPI.reducerPath]: loginAPI.reducer,
  [bookingsAPI.reducerPath]: bookingsAPI.reducer,
  [customerSupportAPI.reducerPath]: customerSupportAPI.reducer,
  [paymentsAPI.reducerPath]: paymentsAPI.reducer,
  [eventsAPI.reducerPath]: eventsAPI.reducer,
  [venuesAPI.reducerPath]: venuesAPI.reducer,
  [mpesaAPI.reducerPath]: mpesaAPI.reducer,
  user: userSlice,
});

// Wrap with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for RTK Query + persist
    })
      .concat(userAPI.middleware)
      .concat(loginAPI.middleware)
      .concat(bookingsAPI.middleware)
      .concat(customerSupportAPI.middleware)
      .concat(paymentsAPI.middleware)
      .concat(eventsAPI.middleware)
      .concat(venuesAPI.middleware)
      .concat(mpesaAPI.middleware),
});

export const persistedStore = persistStore(store);

// RootState type
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch type
export type AppDispatch = typeof store.dispatch;
