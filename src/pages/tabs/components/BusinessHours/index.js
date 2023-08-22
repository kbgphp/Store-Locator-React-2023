import React, { useEffect, useState } from 'react'
import { FiClock } from 'react-icons/fi';
import './BusinessHours.scss';
import SelectBox from './SelectBox';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import DeatailsCard from '../DeatailsCard';

export const BusinessHours = ({ userAvailable }) => {

  const [businessHoursState, setBusinessHoursState] = useState({
    monday: { open: 'closed', close: 'closed' },
    tuesday: { open: 'closed', close: 'closed' },
    wednesday: { open: 'closed', close: 'closed' },
    thursday: { open: 'closed', close: 'closed' },
    friday: { open: 'closed', close: 'closed' },
    saturday: { open: 'closed', close: 'closed' },
    sunday: { open: 'closed', close: 'closed' },
  });

  console.log(",businessHoursState",businessHoursState)


  const [isChecked, setIsChecked] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
  });
  const [checkvalidation, setCheckvalidation] = useState({
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: ''
  });


  const [prevvalue, setPrevvalue] = useState({
    monday: { open: 'closed', close: 'closed' },
    tuesday: { open: 'closed', close: 'closed' },
    wednesday: { open: 'closed', close: 'closed' },
    thursday: { open: 'closed', close: 'closed' },
    friday: { open: 'closed', close: 'closed' },
    saturday: { open: 'closed', close: 'closed' },
    sunday: { open: 'closed', close: 'closed' },
  });


  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleBusinessHoursChange = (e) => {

    const { name, value } = e.target;

    setPrevvalue((prev) => ({
      ...prev,
      [day]: { ...prev[day], [type]: value },
    }))


    const day = name.split('-')[0];
    const type = name.split('-')[1];

    setBusinessHoursState((prev) => ({
      ...prev,
      [day]: { ...prev[day], [type]: value },
    }));




  };

  const handleSubmitHours = async (e) => {
    e.preventDefault();

    if (!businessHoursState.monday.open || !businessHoursState.thursday.open || !businessHoursState.monday.close ||
      !businessHoursState.thursday.close || !businessHoursState.tuesday.open || !businessHoursState.tuesday.close ||
      !businessHoursState.wednesday.open || !businessHoursState.wednesday.close || !businessHoursState.friday.open ||
      !businessHoursState.saturday.open || !businessHoursState.saturday.close || !businessHoursState.sunday.open || !businessHoursState.sunday.close
    ) {
      toast({
        title: 'All Field Menditory',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      return
    }

    setLoading(true);
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/update_business_hours`,
      {
        "lss_client_id": userAvailable.lss_client_id,
        "id": userAvailable._id,
        "hours": {
          "sunday": {
            "open": businessHoursState.sunday.open,
            "close": businessHoursState.sunday.close
          },
          "monday": {
            "open": businessHoursState.monday.open,
            "close": businessHoursState.monday.close
          },
          "tuesday": {
            "open": businessHoursState.tuesday.open,
            "close": businessHoursState.tuesday.close
          },
          "wednesday": {
            "open": businessHoursState.wednesday.open,
            "close": businessHoursState.wednesday.close
          },
          "thursday": {
            "open": businessHoursState.thursday.open,
            "close": businessHoursState.thursday.close
          },
          "friday": {
            "open": businessHoursState.friday.open,
            "close": businessHoursState.friday.close
          },
          "saturday": {
            "open": businessHoursState.saturday.open,
            "close": businessHoursState.saturday.close
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

  const handletoggle = (event) => {

    const { name, checked } = event.target;

    setIsChecked((prev) => ({
      ...prev, [name]: checked
    }))


    setCheckvalidation((prev) => ({
      ...prev, [name]: checked
    }));

    if (!checked) {
      setBusinessHoursState((prev) => ({
        ...prev, [name]: {
          open: 'closed', close: 'closed'
        }
      }))
    } else {
      setBusinessHoursState((prev) => ({
        ...prev,
        [name]: prevvalue[name]
      }));

    }
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/getBusinessHours/${userAvailable._id}`).then((res) => {
      updateBusinesHours(res.data.data[0]);
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  const updateBusinesHours = (data) => {

if(data){
  setBusinessHoursState(data);

  const updatedIsChecked = {};
  const updatedCheckValidation = { ...checkvalidation };

  for (const day in data) {
    updatedIsChecked[day] = data[day]?.open !== 'closed';
    updatedCheckValidation[day] = data[day]?.open == 'closed' ? '' : 'open';
  }

  setIsChecked((prev) => ({
    ...prev,
    ...updatedIsChecked,
  }));

  setCheckvalidation(updatedCheckValidation);
}else{
  console.log("not found")
}
  

  };


  return (
    <div>
      <DeatailsCard userAvailable={userAvailable} />


      <div className='BusinessHoursText'>
        <h3 className='section_heading'><FiClock style={{ display: "inline-block" }} />  Business Hours.</h3>
        <p>Adding business hours helps customers know when you are open when they search and find your business on various local directories. You have to add business hours for each day to submit it. Select closed if there is no business hours. </p>
      </div>


      <div className='bussinesHoursInputs mt-4 mb-3'>

        <div className='row align-items-center mb-3'>
          <div className='col-2'>
            <div className="dayname"> Monday</div>
          </div>
          <div className='col-2'>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" checked={isChecked.monday} onChange={handletoggle} name='monday' />
              <label class="form-check-label" htmlFor="flexSwitchCheckChecked"> {isChecked?.monday ? 'Open' : 'Close'} </label>
            </div>
          </div>
          <div className='col'>
            <SelectBox infdata={businessHoursState?.monday?.open} handleBusinessHoursChange={handleBusinessHoursChange} value={isChecked.monday} name='monday-open' disabled={checkvalidation.monday == false} />
          </div>
          <div className='col-auto'>To</div>
          <div className='col'>
            <SelectBox infdata={businessHoursState?.monday?.close}  handleBusinessHoursChange={handleBusinessHoursChange} value={isChecked.monday} name='monday-close' disabled={checkvalidation.monday == false} />
          </div>
        </div>

        <div className='row align-items-center  mb-3'>
          <div className='col-2'>
            <div className="dayname"> Tuesday</div>
          </div>
          <div className='col-2'>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" checked={isChecked?.tuesday} onChange={handletoggle} name='tuesday' />
              <label class="form-check-label" htmlFor="flexSwitchCheckChecked">{isChecked?.tuesday ? 'Open' : 'Close'}</label>
            </div>
          </div>
          <div className='col'>
            <SelectBox  infdata={businessHoursState?.tuesday?.open} handleBusinessHoursChange={handleBusinessHoursChange} value={isChecked.tuesday} name='tuesday-open' disabled={checkvalidation.tuesday == false} />
          </div>
          <div className='col-auto'>To</div>
          <div className='col'>
            <SelectBox infdata={businessHoursState?.tuesday?.close}  handleBusinessHoursChange={handleBusinessHoursChange} value={isChecked.tuesday} name='tuesday-close' disabled={checkvalidation.tuesday == false} />
          </div>
        </div>

        <div className='row align-items-center  mb-3'>
          <div className='col-2'>
            <div className="dayname">Wednesday</div>
          </div>
          <div className='col-2'>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" checked={isChecked?.wednesday} onChange={handletoggle} name='wednesday' />
              <label class="form-check-label" htmlFor="flexSwitchCheckChecked">{isChecked?.wednesday ? 'Open' : 'Close'}</label>
            </div>
          </div>
          <div className='col'>
            <SelectBox  infdata={businessHoursState?.wednesday?.open} handleBusinessHoursChange={handleBusinessHoursChange} value={isChecked.wednesday} name='wednesday-open' disabled={checkvalidation.wednesday == false} />
          </div>
          <div className='col-auto'>To</div>
          <div className='col'>
            <SelectBox  infdata={businessHoursState?.wednesday?.close} handleBusinessHoursChange={handleBusinessHoursChange} value={isChecked.wednesday} name='wednesday-close' disabled={checkvalidation.wednesday == false} />
          </div>
        </div>

        <div className='row align-items-center  mb-3'>
          <div className='col-2'>
            <div className="dayname">  Thursday</div>
          </div>
          <div className='col-2'>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" checked={isChecked.thursday} onChange={handletoggle} name='thursday' />
              <label class="form-check-label" htmlFor="flexSwitchCheckChecked">{isChecked.thursday ? 'Open' : 'Close'}</label>
            </div>
          </div>
          <div className='col'>
            <SelectBox infdata={businessHoursState?.thursday?.open} handleBusinessHoursChange={handleBusinessHoursChange} name='thursday-open' value={isChecked.thursday} disabled={checkvalidation.thursday == false} />
          </div>
          <div className='col-auto'>To</div>
          <div className='col'>
            <SelectBox infdata={businessHoursState?.thursday?.close} handleBusinessHoursChange={handleBusinessHoursChange} name='thursday-close' value={isChecked.thursday} disabled={checkvalidation.thursday == false} />
          </div>
        </div>

        <div className='row align-items-center  mb-3'>
          <div className='col-2'>
            <div className="dayname"> Friday</div>
          </div>
          <div className='col-2'>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" checked={isChecked.friday} onChange={handletoggle} name='friday' />
              <label class="form-check-label" htmlFor="flexSwitchCheckChecked">{isChecked.friday ? 'Open' : 'Close'}</label>
            </div>
          </div>
          <div className='col'>
            <SelectBox infdata={businessHoursState?.friday?.open}  handleBusinessHoursChange={handleBusinessHoursChange} value={isChecked.friday} name='friday-open' disabled={checkvalidation.friday == false} />
          </div>
          <div className='col-auto'>To</div>
          <div className='col'>
            <SelectBox infdata={businessHoursState?.friday?.close}  handleBusinessHoursChange={handleBusinessHoursChange} value={isChecked.friday} name='friday-close' disabled={checkvalidation.friday == false} />
          </div>
        </div>

        <div className='row align-items-center  mb-3'>
          <div className='col-2'>
            <div className="dayname">  Saturday</div>
          </div>
          <div className='col-2'>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" checked={isChecked.saturday} onChange={handletoggle} name='saturday' />
              <label class="form-check-label" >{isChecked?.saturday ? 'Open' : 'Close'}</label>
            </div>
          </div>
          <div className='col'>
            <SelectBox infdata={businessHoursState?.saturday?.open} handleBusinessHoursChange={handleBusinessHoursChange} name='saturday-open' value={isChecked.saturday} disabled={checkvalidation.saturday == false} />
          </div>
          <div className='col-auto'>To</div>
          <div className='col'>
            <SelectBox infdata={businessHoursState?.saturday?.close} handleBusinessHoursChange={handleBusinessHoursChange} name='saturday-close' value={isChecked.saturday} disabled={checkvalidation.saturday == false} />
          </div>
        </div>

        <div className='row align-items-center  mb-3'>
          <div className='col-2'>
            <div className="dayname">  Sunday</div>
          </div>
          <div className='col-2'>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" checked={isChecked.sunday} onChange={handletoggle} name='sunday' />
              <label class="form-check-label" htmlFor="flexSwitchCheckChecked">{isChecked.sunday ? 'Open' : 'Close'}</label>
            </div>
          </div>
          <div className='col'>
            <SelectBox infdata={businessHoursState?.sunday?.open} handleBusinessHoursChange={handleBusinessHoursChange} name='sunday-open' value={isChecked.sunday} disabled={checkvalidation.sunday == false} />
          </div>
          <div className='col-auto'>To</div>
          <div className='col'>
            <SelectBox infdata={businessHoursState?.sunday?.close}  handleBusinessHoursChange={handleBusinessHoursChange} name='sunday-close' value={isChecked.sunday} disabled={checkvalidation.sunday == false} />
          </div>
        </div>


        <div className="col-12 text-end mt-4 mb-4">
          <button className="btn btn-primary " disabled={loading ? true : false} onClick={handleSubmitHours}>{loading ? <>
            Save Changes
            <div class="spinner-border spinner-border-sm" role="status"> </div>
          </> : ('Save Changes')} </button>
        </div>

      </div>


    </div>
  )
}


