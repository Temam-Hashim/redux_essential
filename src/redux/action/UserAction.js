import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const host = "http://localhost:5010/api/v1";

// get all users
export const getUser = createAsyncThunk("users/get", async () => {
  const response = await axios.get(`${host}/customers`);
  return response.data.data;
});

// add new users
export const addUser = createAsyncThunk("users/add", async (data) => {
  try {
    const response = await axios.post(`${host}/customers`, data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// get currentUser
export const getCurrentUser = createAsyncThunk(
  "user/currentUser",
  async (id) => {
    try {
      const response = await axios.get(`${host}/customers/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// update currentUser
export const updateUser = createAsyncThunk("user/updateUser", async (data) => {
  try {
    const response = await axios.patch(`${host}/customers/`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// delete user
export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  try {
    await axios.delete(`${host}/customers/${id}`);
    return id;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Login action
export const login = createAsyncThunk(
  "user/login",
  async ({ mobile, password }) => {
    try {
      const response = await axios.post(`${host}/customers/login`, {
        mobile,
        password,
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const setTokenExpiration = createAsyncThunk("user/setTokenExpiration");
