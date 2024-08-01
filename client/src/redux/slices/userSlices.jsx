import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  employeeData: {},
  employerData: {},
  loginData: {},
  error: null
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    signUpEmployeeSuccess: (state, action) => {
      state.employeeData = action.payload.userDetails;
      state.error = null;
    },
    signUpEmployerSuccess: (state, action) => {
      state.employerData = action.payload.userDetails;
      state.error = null;
    },
    signUpFailure: (state, action) => {
      state.error = action.payload;
    },
    //login
    loginSuccess: (state, action) => {
      state.loginData = action.payload.loginUsers;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.loginData = {};
      state.error = null;
      localStorage.removeItem('loginToken');
      localStorage.removeItem('loginUsers');
    },
    clearError: (state) => {
      state.error = null;
    },

  },
})

export const { 
  setLoading, signUpEmployeeSuccess, signUpEmployerSuccess, signUpFailure, loginFailure, 
  loginSuccess, logout, clearError 
} 
= userSlice.actions

export default userSlice.reducer