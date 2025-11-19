import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define the user structure
export type User = {
  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  contactPhone: string;
  address: string;
  role: string;
  image_url: string;
};

// User state
export type UserState = {
  token: string | null;
  user: User | null;
};

// Initial state
const initialState: UserState = {
  token: null,
  user: null,
};

// Create slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserState>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

// Export actions and reducer
export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
