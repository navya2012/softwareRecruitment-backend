import { Box, Button, Card, CardContent, Grid, Modal, Paper, styled, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import JobPostsForm from './JobPostsForm';
import { deleteJobPostsData, getJobPostsData } from '../../../api\'s/employerApi\'s';
import { useDispatch, useSelector } from 'react-redux';
import JobPostsUpdateForm from './JobPostsUpdateForm';


const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: '12px',
    padding: '20px 30px',
    margin: '0',
    textTransform: 'none',
    width: '20%'
}));

const JobPosts = () => {
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [updateJobPosts, setUpdateJobPosts] = useState({
        companyName:'',
        role:'',
        technologies:'',
        experience:'',
        graduate:'',
        location:'',
        language:'',
        noticePeriod:''
    })

    const { jobPosts } = useSelector((state) => state.employerReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getJobPostsData())
    }, [dispatch])

    const handleAddData = () => {
        setIsEditing(false);
        setOpen(true);
    }

    const handleDelete = (jobId) => {
        console.log(jobId)
        dispatch(deleteJobPostsData(jobId))
    }

    const handleEdit = (jobData) => {
        setIsEditing(true);
        setUpdateJobPosts({
            _id: jobData._id,
            companyName:jobData.companyName,
            role:jobData.role,
            technologies: jobData.technologies,
            experience: jobData.experience,
            graduate: jobData.graduate,
            location: jobData.location,
            language: jobData.language,
            noticePeriod: jobData.noticePeriod
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Paper elevation={3} sx={{ width: '100%', padding: '60px 0' }}>
                    <Box sx={{ padding: '0 80px', margin: '0 auto' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '30px' }}>
                            <Typography variant="h4">Job Posts</Typography>
                            <StyledButton onClick={handleAddData} type="submit" variant="contained">
                                Add Job Posts
                            </StyledButton>
                        </Box>
                        <Grid container spacing={3}>
                            {jobPosts.length > 0 && jobPosts.map((job) => (
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
                                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
                                                        <StyledButton type="submit" onClick={() => handleEdit(job)} variant="contained">Edit</StyledButton>
                                                        <StyledButton type="submit" onClick={() => handleDelete(job._id)} variant="contained">Delete</StyledButton>
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

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="edit-profile-modal-title"
                    aria-describedby="edit-profile-modal-description"
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Box sx={{
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        backgroundColor: 'white',
                        padding: '40px',
                        borderRadius: '8px',
                        boxShadow: 24,
                        width: '90%',
                        maxWidth: '750px'
                    }}
                    >

                        {isEditing ? (
                            <JobPostsUpdateForm handleClose={handleClose} setOpen={setOpen} updateJobPosts={updateJobPosts} setUpdateJobPosts={setUpdateJobPosts} />
                        ) : (
                            <JobPostsForm handleClose={handleClose} setOpen={setOpen} />
                        )}
                    </Box>
                </Modal>
            </Box>
        </>
    )
}


export default JobPosts