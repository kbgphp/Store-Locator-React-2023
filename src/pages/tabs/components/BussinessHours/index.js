import React, { useEffect, useState } from 'react'
import { FiClock } from 'react-icons/fi';
import './BussinessHours.scss';
import SelectBox from './SelectBox';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import DeatailsCard from '../DeatailsCard';

export const BussinessHours = ({userAvaiable}) => {

  

  const [bussinessHoursState, setBussinessHoursState] = React.useState({
    monday: { open: '', close: '' },
    tuesday: { open: '', close: '' },
    wednesday: { open: '', close: '' },
    thursday: { open: '', close: '' },
    friday: { open: '', close: '' },
    saturday: { open: '', close: '' },
    sunday: { open: '', close: '' },
  });


  const [loading, setLoading] = React.useState(false);
  const [validate, setValidate] = React.useState(false)


  const toast = useToast();
  
  const handleBussinessHoursChange = (e) => {

  
  
    

    const { name, value } = e.target;

    const day = name.split('-')[0]; 
    const type = name.split('-')[1]; 
   
    setBussinessHoursState((prev) => ({
      ...prev,
      [day]: { ...prev[day], [type]: value },
    }));
   
    if (type === "close" && value === "closed") {
      setValidate((prev) => ({ ...prev, [day]: true }));
    } else {
      setValidate((prev) => ({ ...prev, [day]: false }));
    }
   

  };





  const handleSubmitHours = async (e) =>{
    e.preventDefault();

   

    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/update_business_hours`,   
      {
        "lss_client_id": userAvaiable.lss_client_id,
        "id": userAvaiable._id,
        "hours": {
          "sunday": {
            "open": bussinessHoursState.sunday.open,
            "close": bussinessHoursState.sunday.close
          },
          "monday": {
            "open": bussinessHoursState.monday.open,
           "close": bussinessHoursState.monday.close
          },
          "tuesday": {
            "open": bussinessHoursState.tuesday.open,
            "close": bussinessHoursState.tuesday.close
          },
          "wednesday": {
            "open": bussinessHoursState.wednesday.open,
            "close": bussinessHoursState.wednesday.close
          },
          "thursday": {
            "open": bussinessHoursState.thursday.open,
            "close": bussinessHoursState.thursday.close
          },
          "friday": {
            "open": bussinessHoursState.friday.open,
            "close": bussinessHoursState.friday.close
          },
          "saturday": {
            "open": bussinessHoursState.saturday.open,
            "close": bussinessHoursState.saturday.close
          }
        }
      }
    ).then((response) => {
      setLoading(false);
      if (response.data.data) {
        toast({
          title: 'Update Business Hours Successfull.',
          description: "Successfully update Business Hours.",
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
      }
    }).catch((error) => {
      console.log("error", error);
      setLoading(false)
      toast({
        title: 'Something went wrong.',
        description: "Failed to Create.",
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    })
   
  }

  


  return (
    <div>
      <DeatailsCard userAvaiable={userAvaiable} />


      <div className='BussinessHoursText'>
        <h2><FiClock />  Business Hours.</h2>
        <p>Adding business hours helps customers know when you are open when they search and find your business on various local directories. You have to add business hours for each day to submit it. Select closed if there is no business hours. </p>
      </div>


      <div className='bussinesHoursInputs'>
        <div className='row mt-4 mb-3'>
          <div className='col-2'></div>
          <div className='col-5'>Open</div>
          <div className='col-5'>Close</div>

        </div>
  


        <div className='row'>
          <div className='col-2'>
            Monday
          </div>

          <div className='col-5'>
            <SelectBox handleBussinessHoursChange={handleBussinessHoursChange} name='monday-open' disabled={validate.monday} />
          </div>

          <div className='col-5'>
            <SelectBox handleBussinessHoursChange={handleBussinessHoursChange} name='monday-close' 
            />
          </div>

        </div>

        <div className='row mt-3'>
          <div className='col-2'>
            Tuesday
          </div>

          <div className='col-5'>
            <SelectBox handleBussinessHoursChange={handleBussinessHoursChange} name='tuesday-open' disabled={validate.tuesday} />

          </div>

          <div className='col-5'>
            <SelectBox handleBussinessHoursChange={handleBussinessHoursChange} name='tuesday-close' />

          </div>

        </div>

        <div className='row mt-3'>
          <div className='col-2'>
            Wednesday
          </div>

          <div className='col-5'>
            <SelectBox handleBussinessHoursChange={handleBussinessHoursChange} name='wednesday-open' disabled={validate.wednesday} />

          </div>

          <div className='col-5'>
            <SelectBox handleBussinessHoursChange={handleBussinessHoursChange} name='wednesday-close' />

          </div>

        </div>

        <div className='row mt-3'>
          <div className='col-2'>
            Thursday
          </div>

          <div className='col-5'>
            <SelectBox handleBussinessHoursChange={handleBussinessHoursChange} name='thursday-open' disabled={validate.thursday} />

          </div>

          <div className='col-5'>
                       <SelectBox handleBussinessHoursChange={handleBussinessHoursChange} name='thursday-close'/>

          </div>

        </div>

        <div className='row mt-3'>
          <div className='col-2'>
            Friday
          </div>

          <div className='col-5'>
            <SelectBox handleBussinessHoursChange={handleBussinessHoursChange} name='friday-open' disabled={validate.friday} />

          </div>

          <div className='col-5'>
                       <SelectBox handleBussinessHoursChange={handleBussinessHoursChange} name='friday-close'/>

          </div>

        </div>

        <div className='row mt-3'>
          <div className='col-2'>
            Saturday
          </div>

          <div className='col-5'>
            <SelectBox handleBussinessHoursChange={handleBussinessHoursChange} name='saturday-open' disabled={validate.saturday}  />

          </div>

          <div className='col-5'>
            <SelectBox handleBussinessHoursChange={handleBussinessHoursChange} name='saturday-close'/>

          </div>

        </div>

        <div className='row mt-3'>
          <div className='col-2'>
            Sunday
          </div>

          <div className='col-5'>
            <SelectBox handleBussinessHoursChange={handleBussinessHoursChange} name='sunday-open' disabled={validate.sunday} />

          </div>

          <div className='col-5'>
            <SelectBox handleBussinessHoursChange={handleBussinessHoursChange} name='sunday-close'/>

          </div>

        </div>


          <div className="col-12 text-end mt-4 mb-4">
          <button className="btn btn-default orange_btn" disabled={ false} onClick={handleSubmitHours}>{loading ? ('Loading...') :('Save Changes')} </button>
          </div>
   
      </div>

    </div>
  )
}


