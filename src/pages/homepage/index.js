import React, { useEffect } from 'react'
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDataFetcher } from '../../components/FetchData';
import { useToast } from '@chakra-ui/react';


import logo from "../../assets/images/logoleft-white.svg";
import "./homepage.scss"



const Homepage = () => {

  const navigate = useNavigate();
  const toast = useToast();
  const [searchParams] = useSearchParams();
  
  const [accesstoken, setAccessToken] = React.useState('');
  const [instance_id, setInstance_id] = React.useState('');

  const { data, loading, error, fetchPostData } = useDataFetcher();


  useEffect(() => {
    setAccessToken(searchParams.get("code"));
    setInstance_id(searchParams.get("instanceId"))
  }, [searchParams]);



  // when

  // useEffect(() => {

  //   setTimeout(() => {
  //     const instence_id = window?.Wix?.Utils?.getInstanceId();
  //     console.log("instence_id", instence_id)
  //     setInstance_id(instence_id);
  //     localStorage.setItem('instance_id', JSON.stringify(instance_id));

  //   }, 2000);


  // }, [instance_id]);



  const formik = useFormik({
    initialValues: { businessText: '', zipcode: '' },
    validationSchema: Yup.object({
      businessText: Yup.string().min(1, 'Must be 2 characters').required('Required'),
      zipcode: Yup.string().matches(/^\d+$/, 'Must be a numeric value').min(5, 'Must be 5 characters or grater').max(5, 'Must be 5 characters or less').required('Required'),
    }),
    onSubmit: (values) => { handleSubmit(values) }

  });



  const handleSubmit = (values) => {
    let body = {
      "search": values.businessText,
      "zipcode": values.zipcode
    };

    fetchPostData(`${process.env.REACT_APP_BASE_URL}/api/search_business`, body);

  }

  useEffect(() => {

    if (data?.data?.data?.data?.length > 0) {
      navigate('/dashboard', { state: { apiData: data?.data?.data?.data } });
    } else if (data?.data?.data?.data?.length < 0) {
      navigate('/dashboard', { state: { apiData: "" } });
    } else if (data?.data?.data) {
      navigate('/dashboard', { state: { apiData: "" } });
    }
    else if (error) {
      toast({
        title: 'Something Went Wrong.',
        description: "Something Went Wrong From Server.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }

  }, [data, error])


  useEffect(() => {

    axios.post(`${process.env.REACT_APP_BASE_URL}/api/get_access_token`, { authToken: accesstoken, instance_id }).then((res) => {

      localStorage.setItem('access_token', JSON.stringify(res.data.refresh_token));
    }).catch((err) => {
      console.log("err  access error", err)
    });

  }, [accesstoken])



  useEffect(() => {
    // check_user_exist();
  }, []);

  const check_user_exist = async () => {
    const instence_id = window?.Wix?.Utils?.getInstanceId();
    await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/users/check_users_exists/${instence_id}`
      // `${process.env.REACT_APP_BASE_URL}/api/users/check_users_exists/5e6938f2-5475-493f-900d-e54b29dce51c`
    ).then((res) => {
      if (res.data.data.instance_id) {
        navigate('/tabs')
      }
    }).catch((err) => {
      console.log("err", err)
    })
  }







  useEffect(() => {
    if (accesstoken) {
      setTimeout(() => {
        window.location.href = `https://www.wix.com/installer/close-window?access_token=${accesstoken}`
      }, 2000);
    }
  }, [accesstoken])



  return (<section className='homepageSection'>
    <Container>

      <Row>
        <Col xs={12} >
          <div className='brandLogo'>
            <img src={logo} alt='brandlogo' />
          </div>
        </Col>

        <Col xs={12} className='mt-3 mb-3' >
          <h1 >Submit your business to the <br />top local directories and track citations.</h1>
          <p className='mt-4 mb-4 heading-peragraph'>Get found for local searches in your area. Local Listing Pro submits <br /> your business to all the top local directories for you!</p>
        </Col>
      </Row>


      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col xs={12} md={7}>
            <Row>
              <Col xs={6} md={7}>

                <InputGroup className="mb-1">
                  <Form.Control
                    id="businessText"
                    placeholder="Enter your business name"
                    name="businessText"
                    type="text"
                    className='rounded-pill'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.businessText} />
                </InputGroup>

                {formik.touched.businessText && formik.errors.businessText ? (
                  <div className='error-message'>{formik.errors.businessText}</div>
                ) : null}
              </Col>
              <Col xs={6} md={5}>

                <InputGroup className="mb-1">

                  <Form.Control
                    id="zipcode"
                    placeholder="zipcode"
                    name="zipcode"
                    type="number"
                    className='rounded-pill'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.zipcode}
                  />


                </InputGroup>
                <p className='zip-messsage mb-1'>At this time we accept US zipcodes only</p>
                {formik.touched.zipcode && formik.errors.zipcode ? (
                  <div className='error-message'>{formik.errors.zipcode}</div>
                ) : null}

              </Col>
            </Row>
          </Col>
          <Col xs={12} md={5}>
            <Button variant="primary rounded-pill" type='submit' disabled={loading ? true : false} >
              {loading ?
                <>
                  Get Your Business Listed
                  <div className="spinner-border spinner-border-sm" role="status"> </div>
                </> : (' Get Your Business Listed')}
            </Button>


          </Col>

        </Row>
      </Form>


    </Container>
  </section>
  )

}

export default Homepage
