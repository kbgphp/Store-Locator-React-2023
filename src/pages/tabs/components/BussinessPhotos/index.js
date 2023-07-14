import React from 'react'
import { HiMiniPhoto } from 'react-icons/hi2';

export const BussinessPhotos = () => {
  return (
    <div>
      <div className='card'>

        <h4>Patient First Primary and Urgent Care - Abington</h4>
        <p>Address:- 938 Old York Road, Abington PA, US 19001</p>
        <p>Phone:- (267) 620-0237</p>
        <p>Website:- https://www.patientfirst.com/locations/1_NTI1NTU1NzktNzE1LWxvY2F0aW9uLndlYnNpdGU%3D</p>
        <p>Email Address:- kit12kum@gmail.com</p>
      </div>


      <div className='mt-4 '>
        <h3 className='mb-4'> <HiMiniPhoto />Business Logo</h3>

        <div class="card text-white bg-secondary mb-3" style={{ maxWidth: '18rem' }}>
          <div class="card-body">
            <h5 class="card-title">Upload photo</h5>

          </div>
        </div>
      </div>


      <div>
        <h3> <HiMiniPhoto /> Other Photos</h3>
        <hr/>

        <div class="card text-white bg-secondary mb-3" style={{ maxWidth: '18rem' }}>
          <div class="card-body">
            <h5 class="card-title">Upload photo</h5>

          </div>
        </div>
      </div>

    </div>
  )
}


