import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// RTK Query APIs
import { userAPI } from "../Features/users/usersApi";
import { loginAPI } from "../Features/login/loginAPI";
import { bookingsAPI } from "../Features/booking/bookingAPI";
import { customerSupportAPI } from "../Features/customerSupport/customerSupportAPI";
import { paymentsAPI } from "../Features/payments/paymentsAPI";
import { eventsAPI } from "../Features/events/eventsAPI";
import { venuesAPI } from "../Features/venues/venuesAPI";
import { mpesaAPI } from "../Features/mpesa/mpesaAPI";

// user slice (authentication)
import userSlice from "../Features/login/userSlicer";

// Persist config
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user"], // Persist only authenticated user data
};

// Root reducer: combine RTK Query + slices
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

// Wrap reducers with persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for Redux Persist + RTK Query
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

// RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
