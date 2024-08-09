import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    experienceData: {},
    allJobPosts: [],
    error: null
}

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            return {
                ...state,
                loading: action.payload,
            }
        },
        setAllExperienceData: (state, action) => {
            return {
                ...state,
                experienceData: action.payload,
                error: null
            }
        },
        setExperienceSuccess: (state, action) => {
            return {
                ...state,
                experienceData: action.payload,
                error: null
            }
        },
        setAllJobPosts: (state, action) => {
            return {
                ...state,
                allJobPosts: action.payload,
                error: null
            }
        },
        updateJobPostStatus: (state, action) => {
            const { jobId, status } = action.payload;
            state.allJobPosts = state.allJobPosts.map(job =>
                job._id === jobId ? 
                {
                    ...job,
                    jobAppliedStatus: {
                        ...job.jobAppliedStatus,
                        status: status, 
                    }
                } 
                : job
            );
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    }
})


export const {
    setLoading,
    setAllJobPosts,
    updateJobPostStatus,
    setAllExperienceData,
    setExperienceSuccess,
    clearError
}

    = employeeSlice.actions

export default employeeSlice.reducer