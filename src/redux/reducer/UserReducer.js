import { createSlice } from "@reduxjs/toolkit";
import {
  getUser,
  addUser,
  deleteUser,
  updateUser,
  login,
} from "../action/UserAction.js";
import jwtDecode from "jwt-decode";

const initialState = {
  users: [],
  newUser: [],
  currentUser: localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : null,
  isAuthenticated: localStorage.getItem("token") ? true : false,
  tokenExpiration: localStorage.getItem("tokenExpiration")
    ? parseInt(localStorage.getItem("tokenExpiration"), 10)
    : null,
  addStatus: null,
  updateStatus: null,
  deleteStatus: null,
  getStatus: null,
  loginStatus: null,
  addError: null,
  updateError: null,
  deleteError: null,
  loginError: null,
  getError: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      // Clear the token and user data from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.addError = null;
      state.deleteError = null;
      state.updateError = null;
      state.deleteError = null;
      state.loginError = null;
      state.getError = null;
      state.addStatus = null;
      state.updateStatus = null;
      state.deleteStatus = null;
    },
  },
  extraReducers: (builder) => {
    // get user
    builder.addCase(getUser.pending, (state) => {
      state.getStatus = "loading";
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.getStatus = "success";
      state.users = action.payload;
      state.getError = null;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.getStatus = "error";
    });

    // add user
    builder.addCase(addUser.pending, (state) => {
      state.addStatus = "loading";
      state.addError = null;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.addStatus = "user added";
      state.newUser = action.payload;
      state.users.push(action.payload); // Add the new user to the users array
      state.addError = null;
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.addStatus = "error";
      state.addError = action.error.message;
    });

    // update current user
    builder.addCase(updateUser.pending, (state) => {
      state.updateStatus = "loading";
      state.updateError = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.updateStatus = "user updated";
      state.currentUser = action.payload.data;
      localStorage.setItem("currentUser", JSON.stringify(action.payload.data));
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.updateStatus = "error";
      state.updateError = action.error.message;
    });

    // delete user
    builder.addCase(deleteUser.pending, (state) => {
      state.deleteStatus = "loading";
      state.deleteError = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.deleteStatus = "user deleted";
      state.deleteError = null;
      const deletedUserId = action.meta.arg;
      state.users = state.users.filter((user) => user.id !== deletedUserId);
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.deleteStatus = "failed to delete";
      state.deleteError = action.error.message;
    });

    // login
    builder.addCase(login.pending, (state) => {
      state.loginStatus = "loading";
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      // const expirationTime = new Date().getTime() + 3600000; // Current time + 1 hour (in milliseconds)
      const decodedToken = jwtDecode(action.payload.token);
      console.log("decoded:", decodedToken);
      const expirationTime = decodedToken.exp * 1000; // Convert expiration time from seconds to milliseconds
      state.loginStatus = "login successful";
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("currentUser", JSON.stringify(decodedToken.result));
      localStorage.setItem("tokenExpiration", expirationTime.toString());
      state.currentUser = decodedToken.result;
      state.isAuthenticated = true;
      state.loginError = null;
      state.tokenExpiration = expirationTime;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginStatus = "error";
      state.isAuthenticated = false;
      state.loginError = action.error.message;
    });
  },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;
