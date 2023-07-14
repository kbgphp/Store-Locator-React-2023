import React from 'react'
import { MdEmail } from "react-icons/md";
import "./Contactus.scss"
import Form from '../../../../components/Form';

export const ContactUs =() => {
  return (
    <div className='ContactusSection'>
      <h3><MdEmail /> Contact & Support.</h3>

      <hr />
      <div className='row'>
        <p className='col-6'> We’re here to answer any questions you may have about our services. Just fill in the contact form here and we’ll get back to you as soon as possible.</p>
        <div className='col-6'>
          <Form placeholder="Please enter your business name" type='text' margin='mb-4' />
          <textarea name="message" placeholder="Ask Away ?"  class="form-control ask_away ng-pristine ng-invalid ng-invalid-required ng-touched" required=""></textarea>
          <Form placeholder="Please enter your business name" type="email" margin='mt-4 mb-4' />

          <button>Send Email</button>
        </div>

      </div>
    </div>
  )
}

