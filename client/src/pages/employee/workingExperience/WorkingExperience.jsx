import { Box, Paper, Typography, Grid, Modal } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ExperienceUpdateForm from './ExperienceUpdateForm';
import ExperienceForm from './ExperienceForm';
import { useExperienceContextData } from '../../../context/ExperienceProvider';

const WorkingExperience = () => {
  const { setUpdateExperienceData } = useExperienceContextData();
  const { experienceData } = useSelector((state) => state.employeeReducer);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddData = () => {
    setIsEditing(false);
    setOpen(true);
  }

  const handleEdit = () => {
    setIsEditing(true);
    setUpdateExperienceData({
      _id: experienceData._id,
      technologies: experienceData.technologies,
      experience: experienceData.experience,
      graduation: experienceData.graduation,
      location: experienceData.location,
      languages: experienceData.languages,
      noticePeriod: experienceData.noticePeriod
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ width: '100%', padding: '60px 0' }}>
        <Box sx={{ maxWidth: '600px', margin: '0 auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '30px' }}>
            <Typography variant="h4">Working Experience</Typography>
            <EditIcon onClick={handleEdit} fontSize="large" sx={{ color: '#0557A2', cursor: 'pointer' }} />
            <AddIcon onClick={handleAddData} fontSize="large" sx={{ color: '#0557A2', cursor: 'pointer' }} />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Technologies
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                {Array.isArray(experienceData.technologies) && experienceData.technologies.length > 0
                  ? experienceData.technologies.join(', ')
                  : ''}
              </Typography>

            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                EXperience
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">{experienceData.experience}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Graduation
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">{experienceData.graduation}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Location
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">{experienceData.location}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Languages
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">
                {Array.isArray(experienceData.languages) && experienceData.languages.length > 0
                  ? experienceData.languages.join(', ')
                  : ''}
              </Typography>

            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Notice Period
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">{experienceData.noticePeriod}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-profile-modal-title"
        aria-describedby="edit-profile-modal-description"
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '50px', position: 'relative' }}>
        {isEditing ? (
            <ExperienceUpdateForm handleClose={handleClose} setOpen={setOpen} />
          ) : (
            <ExperienceForm handleClose={handleClose} setOpen={setOpen} />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default WorkingExperience;
