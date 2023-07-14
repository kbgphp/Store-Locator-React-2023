import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';


function Input({ placeholder, actas, onChangeHandler, name, value, handleZipCode, isInvalid = false }) {
  
  const [validated, setValidated] = useState(false);


  return (

 
      <Form.Group as={actas} md="4" controlId="validationCustom01">
          <Form.Control
         
          type="text"
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChangeHandler || handleZipCode}
          className='rounded-pill'
          isInvalid={isInvalid}
          />

        </Form.Group>
        

  );
}

export default Input;
