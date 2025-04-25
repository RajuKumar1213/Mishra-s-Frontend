import { createSlice } from "@reduxjs/toolkit";

// Define the expected structure of userData
const validateUserData = (data) => {
  console.log(data);
  if (
    typeof data !== "object" ||
    data === null ||
    !data.hasOwnProperty("_id") ||
    !data.hasOwnProperty("email")
  ) {
    throw new Error(
      "ERROR :: Invalid userData format. Expected an object with _id, username, email, and role."
    );
  }
};

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      try {
        // validateUserData(action.payload.userData);

        state.status = true;
        state.userData = action.payload; // Store the role in the state
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
    syncAuthState: (state, action) => {
      console.log(action.payload);
      // If we have a token, set authenticated
      if (action.payload?.token) {
        state.status = true;
        state.userData = {
          role: action.payload.role,
          // Add other user data here if available
        };
      } else {
        state.status = false;
        state.userData = null;
      }
    },
  },
});

export const { login, logout, syncAuthState } = authSlice.actions;
export default authSlice.reducer;
