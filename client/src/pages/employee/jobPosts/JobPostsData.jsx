import React, { useEffect } from 'react'
import { getAllJobPostsData,  UpdateJobAppliedStatus } from '../../../api\'s/employeeApi\'s'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Card, CardContent, Grid, Paper, styled, Typography } from '@mui/material'


const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: '20px 30px',
  margin: '0',
  textTransform: 'none',
  width: '20%'
}));

const JobPostsData = () => {
  const { allJobPosts } = useSelector((state) => state.employeeReducer)
  const { userData } = useSelector((state) => state.authReducer)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllJobPostsData())
  }, [dispatch])

  const handleJobApply = async (jobId) => {
    try {
      await dispatch(UpdateJobAppliedStatus(jobId, userData))
    }

    catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ width: '100%', padding: '60px 0' }}>
          <Box sx={{ padding: '0 80px', margin: '0 auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '30px' }}>
              <Typography variant="h4">Job Posts</Typography>
            </Box>
            <Grid container spacing={3}>
              {allJobPosts.length > 0 && allJobPosts.map((job) => (
                <Grid item xs={12} key={job._id}>
                  <Card sx={{ padding: ' 30px' }}>
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                          <Typography variant="body1">
                            <strong>Company Name:</strong> {job.companyName}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography variant="body1">
                            <strong>Role:</strong> {job.role}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography variant="body1">
                            <strong>Technologies:</strong> {job.technologies}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography variant="body1">
                            <strong>Experience:</strong> {job.experience}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography variant="body1">
                            <strong>Location:</strong> {job.location}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography variant="body1">
                            <strong>Graduate:</strong> {job.graduate}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography variant="body1">
                            <strong>Language:</strong> {job.language}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography variant="body1">
                            <strong>Notice Period:</strong> {job.noticePeriod}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <StyledButton type="submit" onClick={() => handleJobApply(job._id)} variant="contained"
                              disabled={job.jobAppliedStatus.status === 'Applied'}
                              >
                                  {job.jobAppliedStatus.status === 'Applied' ? 'Applied' : 'Apply'}
                            </StyledButton>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Box>
    </>
  )
}

export default JobPostsData

