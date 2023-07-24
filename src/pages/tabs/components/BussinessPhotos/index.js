import React from 'react'
import { HiMiniPhoto } from 'react-icons/hi2';
import DeatailsCard from '../DeatailsCard';

export const BussinessPhotos = ({ userAvaiable }) => {
  return (
    <div>
      <DeatailsCard userAvaiable={userAvaiable} />



      <div className='mt-4 '>
        <h3 className='mb-4'> <HiMiniPhoto />Business Logo</h3>

        <div className="card text-white bg-secondary mb-3" style={{ maxWidth: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">Upload photo</h5>

          </div>
        </div>
      </div>


      <div>
        <h3> <HiMiniPhoto /> Other Photos</h3>
        <hr/>

        <div className="card text-white bg-secondary mb-3" style={{ maxWidth: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">Upload photo</h5>

          </div>
        </div>
      </div>

    </div>
  )
}


