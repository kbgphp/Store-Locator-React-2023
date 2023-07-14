import React, { useEffect, useState } from 'react';
import index_logo from "../../assets/images/index_logoleft.svg"
import "./deshboard.scss"
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import Checkbox from "./components/Checkbox"
import Cards from './components/Cards';
import Input from './components/Input';
import { IoIosBusiness } from 'react-icons/io';
import { FaEye, FaInfoCircle } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '@chakra-ui/react'


const Deshboard = (props) => {

  const location = useLocation();
  const toast = useToast()
 
  const [selectedOption, setSelectedOption] = useState('');
  const [cardData, setCardData] = useState([]);
  

  const [active, setActive] = useState(null);
  const [validated , setValidated] = useState(false)
  const [bussinessDetails, setBussinessDetails] = useState({
    business_name: '',
    business_address: '',
    business_city: '',
    business_zipcode: '',
    business_country: { country: '', code: '' },
    business_state: { state: '', code: '' },
    business_phone: '',
    website_url: '',
    business_email: '',
    contact_firstname: '',
    contact_lastname: '',
    contact_email: '',
    contact_number: '',
    business_catrgory: '',
    business_comments: '',
    lss_id: '',
    keywords: ''
  });

  
  
  useEffect(() => {
    setCardData(location.state.apiData)
  }, [location.state])


  const handleCheckboxChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bussinessDetails.business_name || !bussinessDetails.business_address || 
      !bussinessDetails.business_city || !bussinessDetails.business_zipcode || 
      !bussinessDetails.business_country.country || 
      !bussinessDetails.business_state.state || !bussinessDetails.business_phone 
      || !bussinessDetails.website_url || !bussinessDetails.business_email
      || !bussinessDetails.business_catrgory) {
      setValidated(true)
      // toast({
      //   title: 'All Fields Are Manditory',
      //   description: "Please Fill All Fields.",
      //   status: 'error',
      //   duration: 3000,
      //   isClosable: true,
      // })
      return;
    }


    if (bussinessDetails.lss_id){
      console.log("update api")
    }else{
      console.log("this save api")
    await  axios.post('https://wix-store23-edef064ca37f.herokuapp.com/api/users/save',{
        name: bussinessDetails.business_name,
        city: bussinessDetails.business_city,
        street: bussinessDetails.business_address,
        state: bussinessDetails.business_state.code,
        zipcode: bussinessDetails.business_zipcode,
        phone: bussinessDetails.business_phone,
        email: bussinessDetails.business_email,
        website: bussinessDetails.website_url,
        country: bussinessDetails.business_country.code,
        owner: bussinessDetails.contact_firstname + bussinessDetails.contact_lastname,
        keyword1: bussinessDetails.keywords,
        contact_first_name: bussinessDetails.contact_firstname,
        contact_last_name: bussinessDetails.contact_lastname,
        contact_email: bussinessDetails.contact_email ,
        contact_phone_number: bussinessDetails.contact_number,
        business_description: bussinessDetails.business_comments
      }).then((response)=>{
        console.log("response", response)
      }).catch((error)=>{
        console.log("error", error)

      })

    }

  }

  const handleFormFill = (data) => {
    setActive(data)

    setBussinessDetails((prev) => ({
      ...prev, business_name: data.business_name, business_city: data.city, business_country: { country: data.country, code: data.country }, business_state: { state: data.state, code: data.state }, business_address: data.street
      , business_zipcode: data.zipcode, business_phone: data.phone, lss_id
        : data.place_id, keywords: data.keywords
    }));


  }

  const onChangeHandler = (event) => {

    const { name, value } = event.target;


    if (name === 'business_country') {
      setBussinessDetails((prev) => ({
        ...prev,
        business_country: { country: value, code: prev.business_country.code },
      }));
    } else if (name === 'business_state') {
      setBussinessDetails((prev) => ({
        ...prev,
        business_state: { country: value, code: prev.business_state.code },
      }));
    }
    else {
      setBussinessDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

  }

  const handleZipCode = async (event) => {
    const { name, value } = event.target;

    setBussinessDetails((prev) => ({
      ...prev, [name]: value
    }));

    try {
      const response = await fetch(`https://api.zippopotam.us/us/${value}`);
      const jsonData = await response.json();
      const data = jsonData;
      setBussinessDetails((prev) => ({
        ...prev, business_country: { country: data.country, code: data["country abbreviation"] }, business_state: { state: data?.places && data?.places[0]?.state, code: data?.places && data?.places[0]["state abbreviation"] }, business_city: data?.places && data?.places[0]["place name"]
      }));
    } catch (error) {
      console.error(error);
    }

  }



  return (
    <section className='mt-4 d-flex '>
      <Container>
        <Row>
          <Col xs={12}>
            <div className='brandLogo'>
              <img src={index_logo} width='27%' />
            </div>
          </Col>
          <Col xs={12} className='mt-4 mb-4'>
            <div className="btn-group" role="group">
              <Checkbox
                label="Option 1"
                isChecked={selectedOption === 'option1'}
                onChange={() => handleCheckboxChange('option1')}
              />
              <Checkbox
                label="Option 2"
                isChecked={selectedOption === 'option2'}
                onChange={() => handleCheckboxChange('option2')}
              />
              <Checkbox
                label="Option 3"
                isChecked={selectedOption === 'option3'}
                onChange={() => handleCheckboxChange('option3')}
              />
            </div>
          </Col>

          <Col xs={12} className='mb-4'>
            <h1>Just steps away!</h1>
            <p className='mt-4'>You’re just steps away from your free local directory submission. If your business already exists, click from the choices below to pre-populate our form. If not, just continue completing the form to get the most accurate listing possible.</p>
          </Col>


          {
            (cardData && cardData?.length > 0 )?
             cardData?.map((item, i) => {
              return <Col xs={12} key={i} className='mb-4' onClick={() => handleFormFill(item)}>
                <div className='d-flex flex-column gap-3'>
                  <Cards data={item} className={active == item && 'activeCard'} />
                </div>
              </Col>
            }) 
            :
            <p style={{color:"blue" , marginBottom:"40px"}}>We weren't able to locate your business.Please enter your details below</p>
          }





          <Form onSubmit={handleSubmit}>
            <Col xs={12} className='mb-4 d-flex flex-column gap-3'>
              <h3> <IoIosBusiness />Business Details.</h3>
              <Input placeholder={"Business name"} actas={Row} name='business_name'
                value={bussinessDetails.business_name}
                onChangeHandler={onChangeHandler}
                isInvalid={ validated && !bussinessDetails.business_name && true}
              />
              <Input placeholder={"Enter your business address"} name='business_address'

                value={bussinessDetails.business_address}
                actas={Row}
                onChangeHandler={onChangeHandler}
                isInvalid={validated && !bussinessDetails.business_address && true}

              />

              <Row>

                <Col xs={6}>
                  <Input placeholder={"Enter your business city"} name='business_city'
                    value={bussinessDetails.business_city}
                    actas={Row} onChangeHandler={onChangeHandler}
                    isInvalid={validated && !bussinessDetails.business_city && true}

                    />
                </Col>

                <Col xs={6}>
                  <Input placeholder={"Enter your ZipCode"} name='business_zipcode'
                    value={bussinessDetails.business_zipcode}
                    actas={Row} onChangeHandler={handleZipCode} 
                    isInvalid={validated && !bussinessDetails.business_zipcode && true}

                    />
                </Col>

              </Row>

              <Row>

                <Col xs={6}>
                  <Input placeholder={"Country"} actas={Row} name='business_country' 
                    isInvalid={validated && !bussinessDetails.business_country.country && true}
                  value={bussinessDetails.business_country.country} onChangeHandler={onChangeHandler} />
                </Col>

                <Col xs={6}>
                  <Input placeholder={"State"} actas={Row}
                    isInvalid={validated && !bussinessDetails.business_state.state && true}
                  name='business_state'  value={bussinessDetails.business_state.state} onChangeHandler={onChangeHandler} />
                </Col>

              </Row>

              <Input placeholder={"Business phone number"} name='business_phone' 
                isInvalid={validated && !bussinessDetails.business_phone && true}
              value={bussinessDetails.business_phone} actas={Row} onChangeHandler={onChangeHandler} />
              <Input placeholder={"Website URL"} name='website_url'
                isInvalid={validated && !bussinessDetails.website_url && true}

              actas={Row} value={bussinessDetails.website_url} onChangeHandler={onChangeHandler} />
              <Input placeholder={"Enter you business email"} 
                isInvalid={validated && !bussinessDetails.business_email && true}
              name='business_email' actas={Row} value={bussinessDetails.business_email} onChangeHandler={onChangeHandler} />
            </Col>


            <Col xs={12} className='mb-4 d-flex flex-column gap-3'>
              <h3><FaInfoCircle />  Additional Information.</h3>
              <Input placeholder={"Contact first name"} name='contact_firstname' value={bussinessDetails.contact_firstname} actas={Row} onChangeHandler={onChangeHandler} />
              <Input placeholder={"Contact last name"} name='contact_lastname' value={bussinessDetails.contact_lastname} actas={Row} onChangeHandler={onChangeHandler} />



              <Input placeholder={"Contact email"} name='contact_email' value={bussinessDetails.contact_email} actas={Row} onChangeHandler={onChangeHandler} />
              <Input placeholder={"Contact Number"} name='contact_number' value={bussinessDetails.contact_number} actas={Row} onChangeHandler={onChangeHandler} />
              <Input placeholder={"Business Category:What do you do?(e.g 'shoes' or 'plumber'"} 
                isInvalid={validated && !bussinessDetails.business_catrgory && true}

              value={bussinessDetails.business_catrgory} actas={Row} name='business_catrgory' onChangeHandler={onChangeHandler} />

              <Form.Control
                md="4"
                as="textarea"
                placeholder="Leave a comment here"
                className='rounded'
                style={{ height: '100px' }}
                name='business_comments'
                value={bussinessDetails.business_comments}
                onChange={onChangeHandler}
              >

              </Form.Control>

              <div className='d-flex flex-row-reverse gap-3' >
                <button className='btn btn-primary rounded-pill'>Reset</button>
                <button className='btn btn-danger rounded-pill' onClick={handleSubmit}>Get Listed!</button>
              </div>

            </Col>

          </Form>





        </Row>

      </Container>
    </section>
  )
}

export default Deshboard
