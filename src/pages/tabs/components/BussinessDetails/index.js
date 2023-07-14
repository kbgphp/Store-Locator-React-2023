import React from 'react'
import { IoIosBusiness } from 'react-icons/io';
import { FaEye, FaInfoCircle } from 'react-icons/fa';




export const BussinessDetails = () => {
  return (
    <div>
      <div className='card'>
        <div >
          <h4>Patient First Primary and Urgent Care - Abington</h4>
          <p>Address:- 938 Old York Road, Abington PA, US 19001</p>
          <p>Phone:- (267) 620-0237</p>
          <p>Website:- https://www.patientfirst.com/locations/1_NTI1NTU1NzktNzE1LWxvY2F0aW9uLndlYnNpdGU%3D</p>
          <p>Email Address:- kit12kum@gmail.com</p>
        </div>


      </div>

      <div className='formSection'>
        <div>
          <h3><IoIosBusiness /> Business Details</h3>
          <p>  By filling out the Business Details in full will enhance your business listings across the internet. The benefit of having more data will help users understand more about your business like hours and a business description. Also this helps with rankings within the search engines.</p>


          <div>
            <div class="col-sm-12 ">
              <input type="email" class="form-control form-control-sm forminput rounded-pill mt-3" id="colFormLabelSm" placeholder="enter your bussiness name" />
            </div>

            <div class="col-sm-12 ">
              <input type="email" class="form-control form-control-sm forminput rounded-pill mt-3" id="colFormLabelSm" placeholder="enter your bussiness name" />
            </div>

            <div class="col-sm-12 ">
              <input type="email" class="form-control form-control-sm forminput rounded-pill mt-3" id="colFormLabelSm" placeholder="enter your bussiness name" />
            </div>

            <div class="col-sm-12 ">
              <input type="email" class="form-control form-control-sm forminput rounded-pill mt-3" id="colFormLabelSm" placeholder="enter your bussiness name" />
            </div>

            <div class="col-sm-12 ">
              <input type="email" class="form-control form-control-sm forminput rounded-pill mt-3 mb-3" id="colFormLabelSm" placeholder="enter your bussiness name" />
            </div>

          </div>

        </div>
        <hr/>

        <div>
          <h3><FaInfoCircle />Contact Info.</h3>


          <div>
            <div class="col-sm-12 ">
              <input type="email" class="form-control form-control-sm forminput rounded-pill mt-3" id="colFormLabelSm" placeholder="enter your bussiness name" />
            </div>

            <div class="col-sm-12 ">
              <input type="email" class="form-control form-control-sm forminput rounded-pill mt-3" id="colFormLabelSm" placeholder="enter your bussiness name" />
            </div>

            <div class="col-sm-12 ">
              <input type="email" class="form-control form-control-sm forminput rounded-pill mt-3" id="colFormLabelSm" placeholder="enter your bussiness name" />
            </div>

            <div class="col-sm-12 ">
              <input type="email" class="form-control form-control-sm forminput rounded-pill mt-3" id="colFormLabelSm" placeholder="enter your bussiness name" />
            </div>

            <div class="col-sm-12 ">
              <input type="email" class="form-control form-control-sm forminput rounded-pill mt-3 mb-3" id="colFormLabelSm" placeholder="enter your bussiness name" />
            </div>

          </div>

        </div>
        <hr />

        <div>
          <h3><FaInfoCircle />Additional Info.</h3>
          <div>
            <div class="col-sm-12 mb-4">
              <input type="email" class="form-control form-control-sm forminput rounded-pill mt-3" id="colFormLabelSm" placeholder="enter your bussiness name" />
            </div>

            <textarea  class="form-control mt-2 mb-4  "  row="4" name="business_description"  placeholder="Business Description (max words 250)"></textarea>

          </div>

<div className='row mt-4'>
            <div class="col-sm-12 col-xs-12">
              <button class="orange_btn" type="submit">Save Changes</button>
            </div>
</div>
      


        </div>

      </div>


    </div>
  )
}

