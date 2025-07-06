import { createSlice } from '@reduxjs/toolkit';

// Load auth state from localStorage (if available)
const savedAuth = JSON.parse(localStorage.getItem("auth")) || {
  isLoggedIn: false,
  token: null,
  id: null,
  name: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: savedAuth,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.name = action.payload.name;
      localStorage.setItem("auth", JSON.stringify(state)); // Save to localStorage
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.id = null;
      state.name = null;
      state.role = null;
      localStorage.removeItem("auth"); // Remove from localStorage
    },
    changeRole: (state, action) => {
      state.role = action.payload;
      localStorage.setItem("auth", JSON.stringify(state)); // Update localStorage
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
// This code defines a Redux slice for authentication state management in a React application.
// It includes actions for logging in, logging out, and changing the user's role.               
// The initial state is loaded from localStorage if available, ensuring persistence across sessions.
// The `login` action updates the state with user details and saves it to localStorage.