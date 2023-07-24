import React, { useEffect } from 'react'
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import logo from "../../assets/images/logoleft-white.svg";
import "./homepage.scss"


const Homepage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    // let userAvaiable = JSON.parse(localStorage.getItem('user'));
    // console.log("userAvaiable", userAvaiable)
    // if (userAvaiable){
    //   navigate('/tabs')
    // }
  }, [])

  const [formData, setformData] = React.useState({
    businessText: '',
    zipcode: ''
  });

  const [loading, setLoading] = React.useState(false)

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
    } else if (name === 'businessText' && value.length == 1) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `please enter valid business`
      }));
    }
    else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ''
      }));
    }


    setformData((prev) => ({
      ...prev, [name]: value
    }));






  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    if (!formData.businessText) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        'businessText': `Please enter your business name`
      }));
    }

    if (!formData.zipcode) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        'zipcode': `Enter zipcode`
      }));
    }

    if (formData.businessText && formData.zipcode && errors.businessText === '' &&
      errors.zipcode === '') {
      setLoading(true)
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/search_business`
        , {
          "search": formData.businessText,
          "zipcode": formData.zipcode
        }).then((response) => {
          setLoading(false)
          if (response.data.data.data.data.length > 0) {
            navigate('/deshboard', { state: { apiData: response.data.data.data.data } });
          } else {
            navigate('/deshboard', { state: { apiData: "" } });
          }
        }).catch((error) => {
          setLoading(false)
          console.log("error", error)
        })
    }

  }


  return (<section className='homepageSection'>
    <Container>
      
      <Row>
        <Col xs={12} >
          <div className='brandLogo'>
            <img src={logo} />
          </div>
        </Col>

        <Col xs={12} className='mt-3 mb-3' >
          <h1 >Submit your business to the <br />top local directories and track citations.</h1>
          <p className='mt-4 mb-4 heading-peragraph'>Get found for local searches in your area. Local Listing Pro submits <br /> your business to all the top local directories for you!</p>
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
                    className='rounded-pill'
                    onBlur={() => handleBlur('businessText')}
                    name='businessText'
                    onChange={onChangeHandler}
                    value={formData.businessText}
                  />
                </InputGroup> </Form>
              {errors.businessText && <p className='business-error-message'>{errors.businessText}</p>}
            </Col>

            <Col xs={4}>
              <Form onSubmit={handlesubmit}>

                <InputGroup className="mb-3">

                  <Form.Control
                    maxLength="5"
                    placeholder="zipcode"
                    className='rounded-pill'
                    type="number"
                    name='zipcode'
                    onChange={onChangeHandler}
                    value={formData.zipcode}
                    onBlur={() => handleBlur('zipcode')}

                  />
                </InputGroup>
              </Form>

              <p className='zip-messsage'>At this time we accept US zipcodes only</p>
              {errors.zipcode && <p className='zip-error-message'>{errors.zipcode}</p>}
            </Col>

          </Row>
         </Col>

         <Col xs={4}>
           <Button variant="primary rounded-pill " onClick={handlesubmit}>
            {loading ? ('Loading...') : (' Get Your Business Listed')}
           </Button>
         </Col>
        </Row>

    </Container>
  </section>
  )

}

export default Homepage
