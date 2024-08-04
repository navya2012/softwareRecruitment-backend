
import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import '../../../CSSModules/formStyles/formPageStyles.css'
import { useDispatch } from 'react-redux';
import '../../../CSSModules/pageStyles/jobPostsStyles.css'
import { createJobPosts } from '../../../api\'s/employerApi\'s';
import CloseIcon from '@mui/icons-material/Close';



const JobPostsForm = ({handleClose, setOpen}) => {
    const [jobPosts, setJobPosts] = useState({
        companyName:'',
        role:'',
        technologies:'',
        experience:'',
        graduate:'',
        location:'',
        language:'',
        noticePeriod:'',
        jobAppliedStatus:"Denied"
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobPosts((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await dispatch(createJobPosts(jobPosts));
    if (response.success) {
      setOpen(false)
      setJobPosts({
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
      {/* <Box > */}
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
            value={jobPosts.companyName}
            onChange={handleChange}
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Role" name="role" type="text" required
            value={jobPosts.role}
            onChange={handleChange}
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Technologies" name="technologies" type="text" required
            value={jobPosts.technologies}
            onChange={handleChange}
          />
          <TextField variant="outlined" fullWidth margin="normal"
            label="Experience" name="experience" type="text" required
            value={jobPosts.experience}
            onChange={handleChange}
          />
           <TextField variant="outlined" fullWidth margin="normal"
            label="Graduation" name="graduate" type="text" required
            value={jobPosts.graduate}
            onChange={handleChange}
          />
           <TextField variant="outlined" fullWidth margin="normal"
            label="Location" name="location" type="text" required
            value={jobPosts.location}
            onChange={handleChange}
          />
           <TextField variant="outlined" fullWidth margin="normal"
            label="Languages" name="language" type="text" required
            value={jobPosts.language}
            onChange={handleChange}
          />
           <TextField variant="outlined" fullWidth margin="normal"
            label="Notice Period" name="noticePeriod" type="text" required
            value={jobPosts.noticePeriod}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" >Post</Button>
        </Box>
      {/* </Box> */}
    </>
  )
}

export default JobPostsForm