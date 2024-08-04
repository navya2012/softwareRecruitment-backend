import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  experienceData: {},
  jobPosts:[],
  error: null
}

const userSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      }
    },
    setExperienceSuccess: (state, action) => {
      return {
        ...state,
        experienceData: action.payload,
        error: null
      }
    },
    //employer
    setJobPosts: (state, action) => {
      return {
        ...state,
        jobPosts: action.payload,
        error: null
      }
    },
    addJobPost: (state, action) => {
      return {
        ...state,
        jobPosts: [...state.jobPosts, action.payload], 
        error: null
      }
    },
    setUpdateJobPost: (state, action) => {
      const index = state.jobPosts.findIndex((job) => job._id === action.payload._id);
      if (index !== -1) {
        state.jobPosts[index] = action.payload;
      }
      state.error = null;
    },
    setDeleteJobPosts:(state, action) => {
      return{
        ...state,
        jobPosts: state.jobPosts.filter(job => job._id !== action.payload)
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  }
})


export const { setLoading, setExperienceFailure, setExperienceSuccess,setJobPosts,
  setDeleteJobPosts, addJobPost, setUpdateJobPost, clearError 

}
  
= userSlice.actions

export default userSlice.reducer