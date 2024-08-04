import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Button, Typography, Paper, IconButton } from '@mui/material';
import { experienceOptions, graduationOptions, languageOptions, locationOptions, noticePeriodOptions, technologiesOptions } from './MenuOptions';
import { useExperienceContextData } from '../../../context/ExperienceProvider';
import { useDispatch } from 'react-redux';
import { workingExperience } from '../../../api\'s/employeeApi\'s';
import CloseIcon from '@mui/icons-material/Close';


const ExperienceForm = ({handleClose, setOpen}) => {
    const { experienceData, setExperienceData, handleChange } = useExperienceContextData()

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()       
        const response = await dispatch(workingExperience(experienceData));
        console.log(response)
        if (response.success) {
          setOpen(false)
          setExperienceData({
            technologies:[],
        experience:'',
        graduation:'',
        location:'',
        languages:[],
        noticePeriod:''
          });
        }

    }

    return (
        <>
            {/* {
                updateEmployeeexperienceData && ( */}
                    <Paper elevation={5} sx={{ padding: '60px', width: '65%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', }}>
                            <Typography variant="h4" sx={{ paddingBottom: '30px' }} >Update Form for an Employee</Typography>
                            <IconButton
                                onClick={handleClose}
                            >
                                <CloseIcon fontSize='large' sx={{ color: 'black' }} />
                            </IconButton>
                        </Box>
                        <Box component='form' onSubmit={handleSubmit}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="technology-select-label">Technology</InputLabel>
                                <Select
                                    labelId="technology-select-label"
                                    id="technology-select"
                                    name="technologies"
                                    value={experienceData.technologies}
                                    onChange={handleChange}
                                    label="Technology"
                                    multiple
                                >
                                    {technologiesOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="experience-select-label">Experience</InputLabel>
                                <Select
                                    labelId="experience-select-label"
                                    id="experience-select"
                                    name="experience"
                                    value={experienceData.experience}
                                    onChange={handleChange}
                                    label="Experience"
                                >
                                    {experienceOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="graduation-select-label">Graduation</InputLabel>
                                <Select
                                    labelId="graduation-select-label"
                                    id="graduation-select"
                                    name="graduation"
                                    value={experienceData.graduation}
                                    onChange={handleChange}
                                    label="Graduation"
                                >
                                    {graduationOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="location-select-label">Location</InputLabel>
                                <Select
                                    labelId="location-select-label"
                                    id="location-select"
                                    name="location"
                                    value={experienceData.location}
                                    onChange={handleChange}
                                    label="Location"
                                >
                                    {locationOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="language-select-label">Language</InputLabel>
                                <Select
                                    labelId="language-select-label"
                                    id="language-select"
                                    name="languages"
                                    value={experienceData.languages}
                                    onChange={handleChange}
                                    label="Languages"
                                    multiple
                                >
                                    {languageOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="notice-period-select-label">Notice Period</InputLabel>
                                <Select
                                    labelId="notice-period-select-label"
                                    id="notice-period-select"
                                    name="noticePeriod"
                                    value={experienceData.noticePeriod}
                                    onChange={handleChange}
                                    label="Notice Period"
                                >
                                    {noticePeriodOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Button type="submit" variant="contained">Submit</Button>
                        </Box>
                    </Paper>
                {/* )
            } */}
        </>
    );
};

export default ExperienceForm;
