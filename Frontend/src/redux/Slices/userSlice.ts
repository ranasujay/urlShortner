import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  userName: string;
  email: string;
  password: string;
  image: string;
  links: string[]; // Assuming links are stored as an array of string IDs
}

interface UserState {
  userData: User | null;
  token: string | null;
}

const initialState: UserState = {
  userData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')!) : null,
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
};

const userSlice = createSlice({
  name: 'User',
  initialState: initialState,
  reducers: {
    saveUser: (state: UserState, action: PayloadAction<User | null>) => {
      state.userData = action.payload;
      if (action.payload) {
        localStorage.setItem('userData', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('userData');
      }
    },
    saveToken: (state: UserState, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem('token', action.payload);
      } else {
        localStorage.removeItem('token');
      }
    },
  },
});

export const { saveUser, saveToken } = userSlice.actions;
export default userSlice.reducer;