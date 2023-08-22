import Form from 'react-bootstrap/Form';
import { Tooltip } from '@chakra-ui/react'



function Input({ placeholder, tolltiptxt, actas,type='text', onChangeHandler, onBlurHandler, name, value, handleZipCode, isInvalid = false }) {
 
  
  return (

    <Tooltip placement='right-end' hasArrow arrowSize={10} label={isInvalid ? tolltiptxt :''} aria-label='A tooltip'>
            
       
      <Form.Group as={actas} md="4" className='required' controlId="validationCustom01" >
          <Form.Control
         
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChangeHandler || handleZipCode}
          className='rounded-pill'
          isInvalid={isInvalid}
          onBlur={onBlurHandler}
          />

        </Form.Group>
        
    </Tooltip>
  );
}

export default Input;
