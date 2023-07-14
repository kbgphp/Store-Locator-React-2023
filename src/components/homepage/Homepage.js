import React from 'react'
import "./homepage.scss"
import logo from "../../assets/images/logoleft-white.svg";
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




const Homepage = () => {

  

  const navigate =  useNavigate();

  const [formData, setformData] = React.useState({
    businessText: '',
    zipcode: ''
  });

  const [loading  , setLoading] = React.useState(false)
  
  const [errors, setErrors] = React.useState({
    businessText: '',
    zipcode: ''
  })

  const handleBlur = (field) => {
    if (!formData[field]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: `Please enter your ${field === 'businessText' ? 'business name' : 'zipcode'}.`
      }));
    } 
  }

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    if (name === 'zipcode' && value.length < 5) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `To short!!.`
      }));
    } else if (name === 'businessText' && value.length == 1){
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `please enter valid business`
      }));
    }
    else{
      setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
    }


    setformData((prev) => ({
      ...prev, [name]: value
    }));

  

    

  
  }

  const handlesubmit=async(e)=>{
    e.preventDefault()
    if (!formData.businessText){
      setErrors((prevErrors) => ({
        ...prevErrors,
        'businessText': `Please enter your business name`
      }));
    } 
    
    if (!formData.zipcode){
      setErrors((prevErrors) => ({
        ...prevErrors,
        'zipcode': `Enter zipcode`
      }));
    }

    if (formData.businessText && formData.zipcode && errors.businessText === '' &&
      errors.zipcode === ''){
      setLoading(true)
    await  axios.post('https://wix-store23-edef064ca37f.herokuapp.com/api/search_business', {
      "search": formData.businessText,
        "zipcode": formData.zipcode
      }).then((response)=>{
        setLoading(false)
        if (response.data.data.data.data.length > 0 ){
          navigate('/deshboard', { state: { apiData: response.data.data.data.data } });
        }else{
          navigate('/deshboard', { state: { apiData: ""} });
        }
      }).catch((error)=>{
        setLoading(false)
        console.log("error",error)
      })
       
    
    }

  }


  return (
    <section className='homepageSection'>
      <Container>

        <Row>

          <Col xs={12} >
            <div className='brandLogo'>
              <img src={logo} />
            </div>
          </Col>

          <Col xs={12} className='mt-3  mb-3' >
            <h1 style={{ fontStyle: 'italic', fontWeight: 600,
              lineHeight: '59px', fontSize: '48px'}}>Submit your business to the <br />
              top local directories and track citations.</h1>

            <p className='mt-4 mb-4' style={{ fontSize: '18px',
    lineHeight: 'normal'}}>Get found for local searches in your area. Local Listing Pro submits <br /> your business to all the top local directories for you!</p>
          </Col>

        </Row>

        <Row>
          <Col xs={8}>
            <Row>
              <Col xs={8}>
              <Form onSubmit={handlesubmit}>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Enter your business name"
                    aria-describedby="basic-addon1"
                    className='rounded-pill'
                    onBlur={() => handleBlur('businessText')}
                    name='businessText'
                    onChange={onChangeHandler}
                    value={formData.businessText}
                  />
                  </InputGroup> </Form>
                {errors.businessText && <p style={{  maxWidth:'200px', background: '#d9534f', fontSize: '12px', textAlign: "center", color: "white" }}>{errors.businessText}</p>}
              </Col>

              <Col xs={4}>
                <Form onSubmit={handlesubmit}>

                <InputGroup className="mb-3">

                  <Form.Control
                    maxLength="5"
                    placeholder="zipcode"
                    aria-describedby="basic-addon1"
                    className='rounded-pill'
                    type="number"
                    name='zipcode'
                    onChange={onChangeHandler}
                    value={formData.zipcode}
                    onBlur={() => handleBlur('zipcode')}

                  />
                </InputGroup>
                </Form>

                <p style={{fontSize:'11.5px' , textAlign:"center"  , color:"white"}}>At this time we accept US zipcodes only</p>
                {errors.zipcode && <p style={{ maxWidth: '150px',  background: '#d9534f', fontSize: '12px', textAlign: "center" , color:"white" }}>{errors.zipcode}</p>}
              </Col>
             
            </Row>


          </Col>

          <Col xs={4}>
            <Button variant="primary rounded-pill" onClick={handlesubmit}>
              {
                loading ? <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div> : (
                  ' Get Your Business Listed'
                )
              }
              
              </Button>{' '}
          </Col>
        </Row>

      </Container>
    </section>
  )
}

export default Homepage
