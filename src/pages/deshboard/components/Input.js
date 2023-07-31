import Form from 'react-bootstrap/Form';



function Input({ placeholder, actas, onChangeHandler, name, value, handleZipCode, isInvalid = false }) {
  
  return (

 
      <Form.Group as={actas} md="4" className='required' controlId="validationCustom01">
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
