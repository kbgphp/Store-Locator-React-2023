import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { IoIosBusiness } from 'react-icons/io';
import { FaInfoCircle } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { country, states, citys } from "../../components/AddressData"
import { useRef } from 'react';

import index_logo from "../../assets/images/index_logoleft.svg"
import "./deshboard.scss"
import Cards from './components/Cards';
import Input from './components/Input';


const Deshboard = () => {


  const location = useLocation();
  const toast = useToast()
  const navigate = useNavigate();
  const ref = useRef();

  console.log("deshboard component", location.state.apiData)

  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(null);
  const [validated, setValidated] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [zipcodeError, setZipcodeError] = useState('');
  const [contactemailValid, setcontactEmailValid] = useState(true);
  const [contactNumberError, setContactNumberError] = useState('');
  const [businessNumberError, setBusinessNumberError] = useState('')


  const [businessDetails, setBusinessDetails] = useState({
    business_name: '',
    business_address: '',
    business_city: '',
    business_zipcode: '',
    business_country: { country: '', code: '' },
    business_country_sec: { country: '', code: '' },
    business_state_sec: { country: '', code: '' },
    business_city_sec: '',
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


  const InstanceId = JSON.parse(localStorage.getItem('instance_id'))


  useEffect(() => {
    setCardData(location.state.apiData);
  }, [location.state])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!businessDetails.business_name || !businessDetails.business_address ||
      !businessDetails.business_city || !businessDetails.business_zipcode ||
      !businessDetails.business_country.country ||
      !businessDetails.business_state.state || !businessDetails.business_phone
      || !businessDetails.website_url || !businessDetails.business_email
      || !businessDetails.business_catrgory) {
      setValidated(true)
      return;
    } else {
      setLoading(true)
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/save`, {
        name: businessDetails.business_name,
        city: businessDetails.business_city,
        street: businessDetails.business_address,
        state: businessDetails.business_state.code,
        zipcode: businessDetails.business_zipcode,
        phone: businessDetails.business_phone,
        email: businessDetails.business_email,
        website: businessDetails.website_url,
        country: businessDetails.business_country.code,
        owner: businessDetails.contact_firstname + businessDetails.contact_lastname,
        keyword1: businessDetails.business_catrgory,
        contact_first_name: businessDetails.contact_firstname,
        contact_last_name: businessDetails.contact_lastname,
        contact_email: businessDetails.contact_email,
        contact_phone_number: businessDetails.contact_number,
        notes: businessDetails.business_comments,
        instance_id: InstanceId
      }).then((response) => {
        console.log("res", response.data)
        setLoading(false);
        if (response?.data?.data[0] && response?.data?.data[0].message !== '') {
          toast({
            title: 'business already saved.',
            description: response?.data?.data && response?.data?.data[0].message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        } else {
          localStorage.setItem('user', JSON.stringify(response.data.data))
          navigate('/tabs', { state: { apiData: response.data.data } });
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
  }

  const handleFormFill = (data) => {
    setActive(data);
    setValidated(false);
    setEmailValid(true);
    setcontactEmailValid(true)
    setBusinessDetails({
      business_name: data.business_name ? data.business_name : '', business_city: data.city ? data.city : '', business_country: { country: data.country ? data.country : '', code: data.country ? data.country : '' }, business_state: { state: data.state ? data.state : '', code: data.state ? data.state : '' }, business_address: data.street
        ? data.street : '', business_zipcode: data.zipcode ? data.zipcode : '', business_phone: data.phone ? data.phone : '', lss_id
        : data.place_id ? data.place_id : '', keywords: data.keywords ? data.keywords : '',
      website_url: data.website ? data.website : '', business_email: '', contact_firstname: '',
      contact_lastname: '',
      contact_email: '',
      contact_number: '',
      business_catrgory: '',
      business_comments: '',
    });



    ref.current?.scrollIntoView({ behavior: 'smooth' });


  }




  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    if (name === 'business_email') {
      setEmailValid(emailRegex.test(value));
      setBusinessDetails((prev) => ({
        ...prev,
        [name]: value,
      }));

    } else if (name === 'contact_email') {
      setcontactEmailValid(emailRegex.test(value));
      setBusinessDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (name === 'contact_number') {
      if (value.length > 17) {
        setContactNumberError('Contact number should not exceed 10 characters.');
        setBusinessDetails((prev) => ({
          ...prev,
          [name]: value,
        }));
      } else {
        setContactNumberError('');
        const cleanedValue = value.replace(/\D/g, '');
        let formattedValue = '';
        if (cleanedValue.length <= 3) {
          formattedValue = cleanedValue;
        } else if (cleanedValue.length <= 6) {
          formattedValue = `(${cleanedValue.slice(0, 3)})-${cleanedValue.slice(3)}`;
        } else if (cleanedValue.length <= 10) {
          formattedValue = `(${cleanedValue.slice(0, 3)})-${cleanedValue.slice(3, 6)}-${cleanedValue.slice(6)}`;
        } else {
          formattedValue = `(${cleanedValue.slice(0, 3)})-${cleanedValue.slice(3, 6)}-${cleanedValue.slice(6, 10)}`;
        }

        setBusinessDetails((prev) => ({
          ...prev,
          [name]: formattedValue,
        }));
      }


    } else if (name === 'business_phone') {

      if (value.length > 14) {
        setBusinessNumberError('Number should not exceed 10 characters.');
        setBusinessDetails((prev) => ({
          ...prev,
          [name]: value,
        }));
      } else {
        setBusinessNumberError('');

        const cleanedValue = value.replace(/\D/g, '');

        let formattedValue = '';
        if (cleanedValue.length <= 3) {
          formattedValue = cleanedValue;
        } else if (cleanedValue.length <= 6) {
          formattedValue = `(${cleanedValue.slice(0, 3)})-${cleanedValue.slice(3)}`;
        } else if (cleanedValue.length <= 10) {
          formattedValue = `(${cleanedValue.slice(0, 3)})-${cleanedValue.slice(3, 6)}-${cleanedValue.slice(6)}`;
        } else {
          formattedValue = `(${cleanedValue.slice(0, 3)})-${cleanedValue.slice(3, 6)}-${cleanedValue.slice(6, 10)}`;
        }

        setBusinessDetails((prev) => ({
          ...prev,
          [name]: formattedValue,
        }));

      }
      // setBusinessNumberError('Number should not exceed 10 characters.');
      // setBusinessDetails((prev) => ({
      //   ...prev,
      //   [name]: value,
      // }));
    } else {
      // setBusinessNumberError('');
      // setContactNumberError('');

      if (name === 'business_country') {
        setBusinessDetails((prev) => ({
          ...prev,
          business_country: { country: value, code: prev.business_country.code },
        }));
      } else if (name === 'business_state') {
        setBusinessDetails((prev) => ({
          ...prev,
          business_state: { state: value, code: prev.business_state.code },
        }));
      }
      // else if (name === 'business_phone') {
      //   const re = /(\d{3})(\d{3})(\d{4})/;
      //   const output = value.replace(re, (_, a, b, c) => `+1 (${a}) ${b}-${c}`);
      //   setBusinessDetails((prev) => ({
      //     ...prev,
      //     [name]: output,
      //   }));
      // }
      else {
        setBusinessDetails((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };



  const handleZipCode = async (event) => {
    const { name, value } = event.target;

    if (value.length > 5) {
      setZipcodeError('Zipcode should not exceed 5 characters.');
    } else {
      setZipcodeError('');
    }


    setBusinessDetails((prev) => ({
      ...prev, [name]: value
    }));

    try {
      const response = await fetch(`https://api.zippopotam.us/us/${value}`);
      const jsonData = await response.json();
      const data = jsonData;
      setBusinessDetails((prev) => ({
        ...prev, business_country: { country: data.country, code: data["country abbreviation"] }, business_state: { state: data?.places && data?.places[0]?.state, code: data?.places && data?.places[0]["state abbreviation"] }, business_city: data?.places && data?.places[0]["place name"]
      }));
    } catch (error) {
      console.error(error);
    }


  }

  const handlereset = (e) => {
    e.preventDefault();
    setActive('');
    setEmailValid(true);
    setcontactEmailValid(true)
    setValidated(false);
    setBusinessNumberError('');
    setContactNumberError('');
    setBusinessDetails({
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

  }


  //use if you want to select box instant of autofill zip-code 
  const selectHandler = (e) => {
    const { value, name } = e.target;

    if (name === 'business_country') {
      setBusinessDetails((prev) => ({
        ...prev, business_country_sec: { country: '', code: value },
      }))
    } else if (name === 'business_state') {
      setBusinessDetails((prev) => ({
        ...prev, business_state_sec: { country: '', code: value },
      }))
    } else if (name === 'business_city') {
      setBusinessDetails((prev) => ({
        ...prev, business_city_sec: value
      }))
    }


  }



  return (
    <section className='mt-4 d-flex '>

      <Container>
        <Row>

          <Col xs={12}>
            <div className='brandLogo'>
              <img src={index_logo} width='27%' alt='brandlogo' />
            </div>
          </Col>

          <Col xs={12} className='mt-4 mb-4'>
            <div className='stepProcessbar d-flex rounded-pill w-100' style={{ backgroundColor: '#F7D8A0', overflow: "hidden" }}>
              <div className="deviders Stepactive p-3" >1.Verify Business Information</div>
              <div className="deviders p-2">2.Free Directory Submission</div>
              <div className="deviders p-2">3.Upgrade</div>
            </div>

          </Col>

          <Col xs={12}>
            <h1>Just steps away!</h1>
            <p className='mt-4'>You’re just steps away from your free local directory submission. If your business already exists, click from the choices below to pre-populate our form. If not, just continue completing the form to get the most accurate listing possible.</p>
          </Col>


          {
            (cardData && cardData?.length > 0) ?
              cardData?.map((item, i) => {
                return <Col xs={12} key={i} className='mb-2' onClick={() => handleFormFill(item)}>
                  <div className='d-flex flex-column gap-3'>
                    <Cards data={item} className={active == item && 'activeCard'} />
                  </div>
                </Col>
              })
              :
              <p style={{ marginBottom: "40px" }}
                className='text-primary'
              >We weren't able to locate your business.Please enter your details below</p>
          }

          <Form onSubmit={handleSubmit} ref={ref}>
            <Col xs={12} className='mb-4 mt-4 d-flex flex-column gap-3 '>
              <h3> <IoIosBusiness style={{ display: "inline-block" }} />Business Details.</h3>




              <Input placeholder={"Business name"} actas={Row} name='business_name'
                tolltiptxt={'name required'}
                value={businessDetails.business_name}
                onChangeHandler={onChangeHandler}
                isInvalid={validated && !businessDetails.business_name && true}
              />

              <Input placeholder={"Enter your business address"} name='business_address'
                tolltiptxt={'address required'}
                value={businessDetails.business_address}
                actas={Row}
                onChangeHandler={onChangeHandler}
                isInvalid={validated && !businessDetails.business_address && true}
              />

              <Row className='gx-5'>
                <Col>
                  <Input placeholder={"Enter your business city"} name='business_city'
                    tolltiptxt={'city required'}
                    value={businessDetails.business_city}
                    actas={Row} onChangeHandler={onChangeHandler}
                    isInvalid={validated && !businessDetails.business_city && true}
                  />
                  {/* <Form.Select name='business_city'
                    onChange={selectHandler}
                  >
                    <option>City</option>
                    {
                      citys.map((ele) => {
                     
                        return <>
                          <option value={ele.name}>{ele.name}</option>
                        </>
                      })
                    }
                  </Form.Select> */}

                </Col>

                <Col>
                  <Input placeholder={"Enter your ZipCode"} name='business_zipcode'
                    tolltiptxt={'zipcode required'}

                    type='number'
                    value={businessDetails.business_zipcode}
                    actas={Row} onChangeHandler={handleZipCode}
                    isInvalid={validated && !businessDetails.business_zipcode && true}

                  />
                  {zipcodeError && <div className='text-danger'>{zipcodeError}</div>}
                </Col>

              </Row>

              <Row className='gx-5'>

                <Col >
                  {/* <Form.Select name='business_country' 
                    onChange={selectHandler}
                  >
                    <option>Country</option>
                    {
                      country.map((ele)=>{
                        return <>
                          <option value={ele.code}>{ele.name}</option>
                        </>
                      })
                    }
    </Form.Select> */}
                  <Input placeholder={"Country"} actas={Row} name='business_country'
                    tolltiptxt={'country required'}
                    isInvalid={validated && !businessDetails.business_country.country && true}
                    value={businessDetails.business_country.country} onChangeHandler={onChangeHandler} />
                </Col>

                <Col >
                  {/* <Form.Select name='business_state'
                    onChange={selectHandler}
                  >
                    <option>States</option>
                    {
                      states.map((ele) => {
                        return <>
                          <option value={ele.code}>{ele.name}</option>
                        </>
                      })
                    }
                  </Form.Select> */}
                  <Input placeholder={"State"} actas={Row}
                    tolltiptxt={'state required'}
                    isInvalid={validated && !businessDetails.business_state.state && true}
                    name='business_state' value={businessDetails.business_state.state} onChangeHandler={onChangeHandler} />
                </Col>

              </Row>

              <Input placeholder={"Business phone number"} name='business_phone'
                tolltiptxt={'phone required'}
                isInvalid={validated && !businessDetails.business_phone && true}
                value={businessDetails.business_phone} actas={Row} onChangeHandler={onChangeHandler}
              />

              {businessNumberError && <div className='text-danger'>{businessNumberError}</div>}

              <Input placeholder={"Website URL"} name='website_url'
                tolltiptxt={'website url required'}

                isInvalid={validated && !businessDetails.website_url && true}
                actas={Row} value={businessDetails.website_url} onChangeHandler={onChangeHandler} />

              <Input
                tolltiptxt={'email required'}
                placeholder={"Enter you business email"}
                isInvalid={validated && !businessDetails.business_email && true}
                name='business_email'
                actas={Row}
                value={businessDetails.business_email}
                onChangeHandler={onChangeHandler}
              />

              {!emailValid && (
                <Form.Text className="text-danger">
                  Invalid email address.
                </Form.Text>
              )}
            </Col>


            <Col xs={12} className='mb-4 d-flex flex-column gap-3'>
              <h3><FaInfoCircle style={{ display: "inline-block" }} />  Additional Information.</h3>
              <Input placeholder={"Contact first name"} name='contact_firstname'
                tolltiptxt={'first name required'}
                value={businessDetails.contact_firstname}
                isInvalid={validated && !businessDetails.contact_firstname && true}

                actas={Row} onChangeHandler={onChangeHandler} />

              <Input placeholder={"Contact last name"}
                tolltiptxt={'last name required'}

                name='contact_lastname' value={businessDetails.contact_lastname}
                isInvalid={validated && !businessDetails.contact_lastname && true}
                actas={Row} onChangeHandler={onChangeHandler} />

              <Input placeholder={"Contact email"}
                tolltiptxt={'email required'}
                isInvalid={validated && !businessDetails.contact_email && true}
                name='contact_email' value={businessDetails.contact_email} actas={Row} onChangeHandler={onChangeHandler}

              />


              {!contactemailValid && (
                <Form.Text className="text-danger">
                  Invalid email address.
                </Form.Text>
              )}


              <Input placeholder={"Contact Number"}
                tolltiptxt={'number required'}
                isInvalid={validated && !businessDetails.contact_number && true}
                type="text"
                name='contact_number' value={businessDetails.contact_number} actas={Row} onChangeHandler={onChangeHandler} />

              {contactNumberError && <div className='text-danger'>{contactNumberError}</div>}

              <Input placeholder={"Business Category:What do you do?(e.g 'shoes' or 'plumber'"}
                isInvalid={validated && !businessDetails.business_catrgory && true}
                tolltiptxt={'Business Category required'}
                value={businessDetails.business_catrgory} actas={Row} name='business_catrgory' onChangeHandler={onChangeHandler} />


              <div className="row row-cols-md-4">
                <Form.Control
                  md="4"
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: '100px' }}
                  name='business_comments'
                  value={businessDetails.business_comments}
                  onChange={onChangeHandler}
                  isInvalid={validated && !businessDetails.business_comments && true}
                >
                </Form.Control>
              </div>


              <div className='d-flex justify-content-end gap-3 deshboardBtnGroup' >
                <button className='btn btn-secondary rounded-pill' onClick={handlereset}>Reset</button>
                <button className='btn btn-primary rounded-pill' disabled={loading ? true : false} type="submit">
                  {loading ? (<>
                    Get Listed!
                    <div className="spinner-border spinner-border-sm" role="status"> </div>
                  </>) : ('Get Listed!')}
                </button>
              </div>
            </Col>

          </Form>

        </Row>

      </Container>
    </section>
  )
}

export default Deshboard
