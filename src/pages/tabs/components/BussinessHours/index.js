import React from 'react'
import { FiClock } from 'react-icons/fi'
import './BussinessHours.scss'

export const BussinessHours = () => {
  return (
    <div>
      <div className='card'>

        <h4>Patient First Primary and Urgent Care - Abington</h4>
        <p>Address:- 938 Old York Road, Abington PA, US 19001</p>
        <p>Phone:- (267) 620-0237</p>
        <p>Website:- https://www.patientfirst.com/locations/1_NTI1NTU1NzktNzE1LWxvY2F0aW9uLndlYnNpdGU%3D</p>
        <p>Email Address:- kit12kum@gmail.com</p>
        <hr className=' mx-5'/>
        <p>view more</p>
      </div>

      <div className='BussinessHoursText'>
        <h2><FiClock />  Business Hours.</h2>
        <p>Adding business hours helps customers know when you are open when they search and find your business on various local directories. You have to add business hours for each day to submit it. Select closed if there is no business hours. </p>
      </div>


      <div className='bussinesHoursInputs'>
        <div className='row mt-4 mb-3'>
        <div className='col-2'></div>
          <div className='col-5'>Open</div>
          <div className='col-5'>Close</div>

        </div>

        <div className='row'>
          <div className='col-2'>
            Monday
          </div>

          <div className='col-5'>
            <input type='text' placeholder='Select Hour' className='rounded-pill' />
          </div>

          <div className='col-5'>
            <input type='text' placeholder='Select Hour' className='rounded-pill'  />
          </div>

        </div>

        <div className='row mt-3'>
          <div className='col-2'>
            Tuesday
          </div>

          <div className='col-5'>
            <input type='text' placeholder='Select Hour' className='rounded-pill' />
          </div>

          <div className='col-5'>
            <input type='text' placeholder='Select Hour' className='rounded-pill' />
          </div>

        </div>

        <div className='row mt-3'>
          <div className='col-2'>
            Wednesday
          </div>

          <div className='col-5'>
            <input type='text' placeholder='Select Hour' className='rounded-pill' />
          </div>

          <div className='col-5'>
            <input type='text' placeholder='Select Hour' className='rounded-pill' />
          </div>

        </div>

        <div className='row mt-3'>
          <div className='col-2'>
            Thursday
          </div>

          <div className='col-5'>
            <input type='text' placeholder='Select Hour' className='rounded-pill' />
          </div>

          <div className='col-5'>
            <input type='text' placeholder='Select Hour' className='rounded-pill' />
          </div>

        </div>

        <div className='row mt-3'>
          <div className='col-2'>
            Friday
          </div>

          <div className='col-5'>
            <input type='text' placeholder='Select Hour' className='rounded-pill' />
          </div>

          <div className='col-5'>
            <input type='text' placeholder='Select Hour' className='rounded-pill' />
          </div>

        </div>

        <div className='row mt-3'>
          <div className='col-2'>
            Satrday
          </div>

          <div className='col-5'>
            <input type='text' placeholder='Select Hour' className='rounded-pill' />
          </div>

          <div className='col-5'>
            <input type='text' placeholder='Select Hour' className='rounded-pill' />
          </div>

        </div>

        <div className='row mt-3'>
          <div className='col-2'>
            Sunday
          </div>

          <div className='col-5'>
            <input type='text' placeholder='Select Hour' className='rounded-pill' />
          </div>

          <div className='col-5'>
            <input type='text' placeholder='Select Hour' className='rounded-pill' />
          </div>

        </div>

       <div className='row mt-4'>
        
          <div class="col-4">
         
          </div>

          <div class="col-3">
         
          </div>

          <div class="col-4">
            <button class="btn btn-default orange_btn" type="submit">Save Changes</button>
          </div>

       </div>


      </div>

    </div>
  )
}


