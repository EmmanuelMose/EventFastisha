import { persistReducer, persistStore } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import { userAPI } from "../Features/users/usersAPI";
import { loginAPI } from "../Features/login/loginAPI";
import userSlice from "../Features/login/userSlice";
import { bookingsAPI } from "../Features/booking/bookingAPI";
import { customerSupportAPI } from "../Features/customerSupport/customerSupportAPI";
import { paymentsAPI } from "../Features/payments/paymentsAPI";
import { eventsAPI } from "../Features/events/eventsAPI";
import { venuesAPI } from "../Features/venues/venuesAPI";
import { mpesaAPI } from "../Features/mpesa/mpesaAPI";

// -----------------------------
// PERSIST CONFIG
// -----------------------------
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user"], // only persist user slice
};

// -----------------------------
// ROOT REDUCER
// -----------------------------
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

// Persist the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// -----------------------------
// STORE CONFIG
// -----------------------------
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
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

// Persistor
export const persistedStore = persistStore(store);

// -----------------------------
// CORRECT RootState TYPE
// -----------------------------
export type RootState = ReturnType<typeof rootReducer>;
