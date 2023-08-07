import React, { useState } from 'react'
import { MdEmail } from "react-icons/md";
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Form from '../../../../components/Form';
import "./Contactus.scss"

export const ContactUs = ({ userAvailable }) => {

  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [validate, setValidated] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  const [contactusFields, setContactusFields] = useState({
    business_name: '',
    business_email: '',
    business_comment: ''
  });




  const handleChange = (e) => {

    const { name, value } = e.target;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === 'business_email') {
      setEmailValid(emailRegex.test(value));
    }


    setContactusFields((prev) => ({
      ...prev, [name]: value
    }))


  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contactusFields.business_name || !contactusFields.business_email || !contactusFields.business_comment) {
      setValidated(true)
      return
    } else if (!emailValid) {
      return
    } else {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/supportQuery`,
        {
          client_id: userAvailable.lss_client_id,
          subject: "New Query",
          message: contactusFields.business_comment,
          type: "query",
          email: contactusFields.business_email
        }
      ).then((response) => {
        setLoading(false);
        console.log(response)
        if (response.data.data) {
          setValidated(false)
          setContactusFields({ business_name: '', business_email: '', business_comment: '' })
          toast({
            title: 'Query created successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        }


      }).catch((error) => {
        console.log("error", error);
        setLoading(false)
        toast({
          title: 'Something went wrong.',
          description: "Failed to created Query.",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      })
    }
  }



  return (
    <div className='ContactusSection'>


      <div className='row'>
        <div className='col-6'>
          <div className="contactustextBlock">
            <div className="contactustextintro">
              <h3 className='formHeadings'><MdEmail className='d-inline-block titleWicon' /> Contact & Support.</h3>
              <p> We’re here to answer any questions you may have about our services. Just fill in the contact form here and we’ll get back to you as soon as possible.</p>
            </div>
          </div>
        </div>

        <div className='col-6'>
          <form onSubmit={handleSubmit}>
            <Form placeholder="Please enter your business name" isValid={validate && !contactusFields.business_name} value={contactusFields.business_name} type='text' name='business_name' margin='mb-3' handleChange={handleChange} />
            <textarea name="business_comment" placeholder="Ask Away?" value={contactusFields.business_comment} className={`form-control ask_away ${validate && !contactusFields.business_comment ? 'is-invalid' : ''} `} onChange={handleChange} ></textarea>
            <Form placeholder="Please enter your email" type="text" value={contactusFields.business_email} isValid={validate && !contactusFields.business_email} margin='mt-3 mb-3' name='business_email' handleChange={handleChange} />

            {!emailValid && (
              <div style={{ color: "red" }}>
                Invalid email address.
              </div>
            )}

            <button className='btn btn-primary' type='submit'>{loading ? ('Loading') : ('Send Email')}</button>
          </form>
        </div>

      </div>
    </div>
  )
}

