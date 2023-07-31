import React, { useState } from 'react'
import { MdEmail } from "react-icons/md";
import "./Contactus.scss"
import Form from '../../../../components/Form';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';


export const ContactUs = ({ userAvaiable }) => {

  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [validate, setValidated] = useState(false)
  const [contactusFields, setContactusFields] = useState({
    business_name: '',
    business_email: '',
    business_comment: ''
  });




  const handleChange = (e) => {

    const { name, value } = e.target;
    setContactusFields((prev) => ({
      ...prev, [name]: value
    }))


  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contactusFields.business_name || !contactusFields.business_email || !contactusFields.business_comment) {
      setValidated(true)
      return
    } else {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/supportQuery`,
        {
          client_id: userAvaiable.lss_client_id,
          subject: "New Query",
          message: contactusFields.business_comment,
          type: "query",
          email: contactusFields.business_email
        }
      ).then((response) => {
        setLoading(false);
        console.log(response)
        if (response.data.data) {
          setContactusFields({ business_name: '', business_email: '', business_comment:'' })
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
      <h3 className='formHeadings'><MdEmail className='d-inline-block titleWicon' /> Contact & Support.</h3>

      <div className='row'>
        <p className='col-6'> We’re here to answer any questions you may have about our services. Just fill in the contact form here and we’ll get back to you as soon as possible.</p>
        <div className='col-6'>
          <form onSubmit={handleSubmit}>
            <Form placeholder="Please enter your business name" isValid={validate && !contactusFields.business_name} value={contactusFields.business_name} type='text' name='business_name' margin='mb-4' handleChange={handleChange} />
            <textarea name="business_comment" placeholder="Ask Away?" value={contactusFields.business_comment} className={`form-control ask_away ${validate && !contactusFields.business_email ? 'is-invalid' : ''} `} onChange={handleChange} ></textarea>
            <Form placeholder="Please enter your email" type="text" value={contactusFields.business_email} isValid={validate && !contactusFields.business_email} margin='mt-4 mb-4' name='business_email' handleChange={handleChange} />
            <button type='submit'>{loading ? ('Loading') : ('Send Email')}</button>
          </form>
        </div>

      </div>
    </div>
  )
}

