import React from 'react';
import Form from 'react-bootstrap/Form';


const SelectBox = ({ handleBussinessHoursChange, name, disabled=false }) => {

 const data = [
  
   { time: '07:00 AM'},
   { time: '08:00 AM' },
   { time: '09:00 AM' }, 
   { time: '10:00 AM' },  
   { time: '11:00 AM' },  
   { time: '12:00 AM' },  
   { time: '01:00 PM' }, 
   { time: '02:00 PM' },  
   { time: '03:00 PM' },  
   { time: '04:00 PM' },  
   { time: '05:00 PM' },  
   { time: '06:00 PM' },  
   { time: '07:00 PM' },  
   { time: '08:00 PM' },  
   { time: '09:00 PM' },  
   { time: '10:00 PM' },  
   { time: '11:00 PM' },  
   { time: '12:00 PM' },  
   { time: '01:00 AM' },  
   { time: '02:00 AM' },  
   { time: '03:00 AM' },  
   { time: '04:00 AM' },  
   { time: '05:00 AM' },  
   { time: '06:00 AM' },  
   {time :'closed'}
 ]

  return (
    <Form.Select aria-label="Default select example" onChange={handleBussinessHoursChange} name={name} disabled={disabled}>
      <option value="">Select hours</option>
      {data.map((item , index)=>{
        return <option  key={index} value={item.time}>{item.time}</option>
      })}
    </Form.Select>
  )
}

export default SelectBox
