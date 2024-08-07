// src/features/auth/authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../utils/Axios";
import { toast } from "react-toastify";

// Async Thunks
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formInputs, { rejectWithValue }) => {
    // console.log("form inputs", formInputs);
    try {
      const response = await Axios.post("/user/signup", formInputs);
      //   console.log("singup reducer", response);
      return response.data;
    } catch (error) {
      // error.message
      //error.response.data.message
      //   console.log("F - Error while Signup User", error);
      return error.response.data.message
        ? rejectWithValue(error.response.data)
        : rejectWithValue(error);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formInputs, { rejectWithValue }) => {
    // console.log("form inputs", formInputs);
    try {
      const response = await Axios.post("/user/login", formInputs);
      //   console.log("login reducer", response);
      return response.data;
    } catch (error) {
      // error.message
      //error.response.data.message
      //   console.log("F - Error While Login User", error);
      return error.response.data.message
        ? rejectWithValue(error.response.data)
        : rejectWithValue(error);
    }
  }
);
export const getSession = createAsyncThunk(
  "auth/getSession",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get("/user/myprofile");
        console.log("getSession reducer", response);
      return response.data;
    } catch (error) {
      //   console.log("F - Error While Intialize Session", error);
      return error.response.data.message
        ? rejectWithValue(error.response.data)
        : rejectWithValue(error);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get("/user/logout");
      //   console.log("logoutUser reducer", response);
      return response.data;
    } catch (error) {
      //   console.log("F - Error While logoutUser", error);
      return error.response.data.message
        ? rejectWithValue(error.response.data)
        : rejectWithValue(error);
    }
  }
);
export const editProfile = createAsyncThunk(
  "auth/editProfile",
  async (formInputs, { rejectWithValue }) => {
    try {
      const response = await Axios.put("/user/edit-profile", formInputs);
      // console.log("editProfile reducer", response);
      return response.data;
    } catch (error) {
      // console.log("F - Error While edit profile", error);
      return error.response.data.message
        ? rejectWithValue(error.response.data)
        : rejectWithValue(error);
    }
  }
);

const statusVal = {
  idle: "idle",
  loading: "loading",
  success: "success",
  failed: "failed",
};

const initialState = {
  user: null,
  loggedIn: false,
  status: statusVal.idle,
  statusVal,
  error: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    editUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup User
      .addCase(signupUser.pending, (state) => {
        state.status = state.statusVal.loading;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        console.log('signup',action.payload)
        state.status = state.statusVal.success;
        state.loggedIn = action.payload?.success;
        state.token = action.payload?.result?.token;
        state.user = action.payload?.result?.user;
        toast.success(action.payload?.message || "Signup Successfully");
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = state.statusVal.failed;
        state.error = action.payload.message;
        state.loggedIn = false;
        toast.error(
          action.payload.message ||
            "Internal Server Error Occured! Try again later"
        );
      })
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.status = state.statusVal.loading;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = state.statusVal.success;
        state.loggedIn = action.payload?.success;
        state.token = action.payload?.result?.token;
        state.user = action.payload?.result?.user;
        toast.success(action.payload?.message || "Login Successfully");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = state.statusVal.failed;
        state.error = action.payload.message;
        state.loggedIn = false;
        toast.error(
          action.payload.message ||
            "Internal Server Error Occured! Try again later"
        );
      })
      // Get Session
      .addCase(getSession.pending, (state) => {
        state.status = state.statusVal.loading;
      })
      .addCase(getSession.fulfilled, (state, action) => {
        state.status = state.statusVal.success;
        state.loggedIn = action.payload?.success;
        state.user = action.payload?.result?.user;
        // toast.success(action.payload?.message || "session intialized successfully");
      })
      .addCase(getSession.rejected, (state, action) => {
        state.status = state.statusVal.failed;
        state.error = action.payload?.message;
        state.loggedIn = false;
        // toast.error(action.payload?.message || "Internal Server Error Occured! Try again later");
      })
      // Logout User
      .addCase(logoutUser.pending, (state) => {
        state.status = state.statusVal.loading;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = state.statusVal.success;
        state.loggedIn = false;
        state.user = null;
        state.token = null;
        state.error = null;
        toast.success(action.payload?.message || "Logout Successfully");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = state.statusVal.failed;
        state.error = action.payload.message;
        state.loggedIn = false;
        toast.error(
          action.payload.message ||
            "Internal Server Error Occured! Try again later"
        );
      })
      // edit User Name
      .addCase(editProfile.pending, (state) => {
        state.status = state.statusVal.loading;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.status = state.statusVal.success;
        state.user = action.payload?.result?.user || state.user;
        state.error = null;
        toast.success(
          action.payload?.message || "User Name Updated Successfully"
        );
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.status = state.statusVal.failed;
        state.error = action.payload.message;
        toast.error(
          action.payload.message ||
            "Internal Server Error Occured! Try again later"
        );
      });
  },
});
export const { editUser } = authSlice.actions;
export default authSlice.reducer;
