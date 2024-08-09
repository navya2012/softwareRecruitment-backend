import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    jobPosts: [],
    error: null,
    jobAppliedUsers:[]
}

const employerSlice = createSlice({
    name: 'employer',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            return {
                ...state,
                loading: action.payload,
            }
        },
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
        setDeleteJobPosts: (state, action) => {
            return {
                ...state,
                jobPosts: state.jobPosts.filter(job => job._id !== action.payload),
                error:null
            }
        },
        setJobAppliedUsers :(state, action) => {
            console.log('Updating jobAppliedUsers:', action.payload);
            return{
                ...state,
                jobAppliedUsers: action.payload,
                error:null
            }
        },
        clearError: (state) => {
            state.error = null;
        },
    }
})


export const {
    setLoading,
    setJobPosts,
    setDeleteJobPosts,
    addJobPost,
    setUpdateJobPost,
    setJobAppliedUsers,
    clearError
}

    = employerSlice.actions

export default employerSlice.reducer