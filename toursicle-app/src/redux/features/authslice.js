import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from './../api';

// check login + show result toaster
export const login = createAsyncThunk("auth/login", async({formValue, navigate, toast}, {rejectWithValue}) => {
    try{
        const response = await api.signIn(formValue);
        toast.success("Login Success");
        navigate("/");
        return response.data;
    }
    catch (e) {
         return rejectWithValue(e.response.data);
    }
})

// create account and initiate verification 
export const signup = createAsyncThunk("auth/signup", async({formValue, navigate, toast}, {rejectWithValue}) => {
    try{
        const response = await api.signUp(formValue);
        toast.success("SignUp Success, Verify Email Sent!");
        // redirect back to login and let user login with new credentials
        navigate("/login");
        return response.data;
    }
    catch (e) {
         return rejectWithValue(e.response.data);
    }
})

// handles actions of app relating to login/sign
const authslice = createSlice({
    name: "auth",
    initialState: {
        user:null,
        error: "",
        loading: false
    },
    reducers:  {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLogout: (state, action) => {
            localStorage.clear();
            state.user = null;
        }
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            // pending state for login
            state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
            // sucess, set new data to app state
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({...action.payload}));
            state.user = action.payload
        },
        [login.rejected]: (state, action) => {
            // action fail from api
            state.loading = false;
            state.error = action.payload.message;
        },
        [signup.pending]: (state, action) => {
            // pending state for signup action
            state.loading = true;
        },
        [signup.fulfilled]: (state, action) => {
            // sign up success, save to state
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({...action.payload}));
            state.user = action.payload
        },
        [signup.rejected]: (state, action) => {
            // action failed from api
            state.loading = false;
            state.error = action.payload.message;
        }
    }
});

export const { setUser, setLogout } = authslice.actions;
export default authslice.reducer;