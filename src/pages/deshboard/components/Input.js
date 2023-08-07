import Form from 'react-bootstrap/Form';



function Input({ placeholder, actas,type='text', onChangeHandler, onBlurHandler, name, value, handleZipCode, isInvalid = false }) {
 
  
  return (

 
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
        

  );
}

export default Input;
