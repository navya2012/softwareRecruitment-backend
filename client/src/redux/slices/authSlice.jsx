import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  userRole: '',
  userData: {},
  error: null
}

const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      }
    },
    setUserRole: (state, action) => {
      return {
        ...state,
        userRole: action.payload,
      }
    },
    loginSuccess: (state, action) => {
      return {
        ...state,
        userData: action.payload.loginDetails,
        error: null
      }
    },
    logout: (state) => {
      state.userRole=''
      state.userData = {};
      state.error = null;
      localStorage.removeItem('loginToken');
      localStorage.removeItem('employeeId')
      localStorage.removeItem('employerId')
    },
    clearError: (state) => {
      state.error = null;
    },

  },
})

export const {
  setUserRole,
  setLoading,
  loginFailure,
  loginSuccess,
  logout,
  clearError
}
  = authSlice.actions

export default authSlice.reducer