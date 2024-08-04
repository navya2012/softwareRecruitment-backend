
import React, { createContext, useContext, useState } from 'react'
import { clearError } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';


const ExperienceContext = createContext();

export const useExperienceContextData = () => useContext(ExperienceContext);

export const ExperienceProvider = ({ children }) => {
    const dispatch = useDispatch()

    const [experienceData, setExperienceData] = useState({
        technologies:[],
        experience:'',
        graduation:'',
        location:'',
        languages:[],
        noticePeriod:''
    })

    const handleChange = (e)=> {
        const {name, value} = e.target
        setExperienceData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
      
          dispatch(clearError());
    }

    // update data
    const [updateExperienceData, setUpdateExperienceData] = useState({
      technologies:[],
      experience:'',
      graduation:'',
      location:'',
      languages:[],
      noticePeriod:''
  })

  const handleChangeUpdateExperienceData = (e)=> {
      const {name, value} = e.target
      setUpdateExperienceData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    
        dispatch(clearError());
  }
  return (
    <>
      <ExperienceContext.Provider value={{ experienceData, setExperienceData, handleChange,
        updateExperienceData,setUpdateExperienceData,handleChangeUpdateExperienceData
       }}
      >
        {children}
      </ExperienceContext.Provider>
    </>
  )
}

export default ExperienceProvider