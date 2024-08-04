
import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import React from 'react'
import '../../../CSSModules/formStyles/formPageStyles.css'
import { useDispatch } from 'react-redux';
import '../../../CSSModules/pageStyles/jobPostsStyles.css'
import { createJobPosts, updateJobPostsData } from '../../../api\'s/employerApi\'s';
import CloseIcon from '@mui/icons-material/Close';



const JobPostsUpdateForm = ({handleClose, setOpen, updateJobPosts, setUpdateJobPosts}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateJobPosts((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await dispatch(updateJobPostsData(updateJobPosts));
    if (response.success) {
      setOpen(false)
      setUpdateJobPosts({
        companyName:'', 
        role:'',
        technologies:'',
        experience:'',
        graduation:'',
        location:'',
        languages:'',
        noticePeriod:''
      });
    }
  }
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', }}>
              <Typography variant="h5" sx={{ paddingBottom: '30px' }} >Create a Job Post</Typography>
              <IconButton
                onClick={handleClose}
              >
                <CloseIcon fontSize='large' sx={{color:'black'}}/>
              </IconButton>
            </Box>
        <Box component='form' onSubmit={handleSubmit}>
          <TextField variant="outlined" fullWidth margin="normal"
            label="Company Name" name="companyName" type="text" required
            value={updateJobPosts.companyName}
            onChange={handleChange}
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Role" name="role" type="text" required
            value={updateJobPosts.role}
            onChange={handleChange}
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Technologies" name="technologies" type="text" required
            value={updateJobPosts.technologies}
            onChange={handleChange}
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Experience" name="experience" type="text" required
            value={updateJobPosts.experience}
            onChange={handleChange}
          />
           <TextField variant="outlined" fullWidth margin="normal"
            label="Graduation" name="graduate" type="text" required
            value={updateJobPosts.graduate}
            onChange={handleChange}
          />
           <TextField variant="outlined" fullWidth margin="normal"
            label="Location" name="location" type="text" required
            value={updateJobPosts.location}
            onChange={handleChange}
          />
           <TextField variant="outlined" fullWidth margin="normal"
            label="Languages" name="language" type="text" required
            value={updateJobPosts.language}
            onChange={handleChange}
          />
           <TextField variant="outlined" fullWidth margin="normal"
            label="Notice Period" name="noticePeriod" type="text" required
            value={updateJobPosts.noticePeriod}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" >Post</Button>
        </Box>
    </>
  )
}

export default JobPostsUpdateForm