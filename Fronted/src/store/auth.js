import {createSlice} from '@reduxjs/toolkit';// This code initializes a Redux slice for authentication management in a React application.
const authslice = createSlice({// It defines the initial state and reducers for login, logout, and role change.
    name: 'auth',// The name of the slice, used to identify it in the Redux store
    initialState: {     // The initial state of the slice
      role:"user",// Default role is set to "user"
    isLoggedIn: false,// Indicates whether the user is logged in or not
    },
    reducers: {// Reducers are functions that handle state changes
        login(state) {// This reducer sets the isLoggedIn state to true when the user logs in
            
            state.isLoggedIn= true;// Update the isLoggedIn state to true
        },
        logout(state) {// This reducer sets the isLoggedIn state to false when the user logs out
          
            state.isLoggedIn = false;// Update the isLoggedIn state to false
        },
        changeRole(state, action) {// This reducer changes the user's role based on the action payload
            state.role = action.payload; // Update the role based on the payload
        }
    },
});
export const authActions = authslice.actions; // Export the actions for use in components
export default authslice.reducer; // Export the reducer to be used in the store