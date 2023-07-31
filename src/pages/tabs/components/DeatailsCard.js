import React from 'react'

const DeatailsCard = ({ userAvaiable }) => {

  return (
    <div className='card mb-3' >
      <div style={{ margin: "20px 25px" }}>
        <h6 className='fw-bold' >{userAvaiable.business_name} - {userAvaiable.business_city}</h6>
        <p>Address:- {userAvaiable.business_address}, {userAvaiable.business_city || userAvaiable.business_city} {userAvaiable.business_state || userAvaiable.state}, {userAvaiable.business_country || userAvaiable.country} {userAvaiable.business_zipcode || userAvaiable.zip}</p>
        <p>Phone:- {userAvaiable.business_phonenumber || userAvaiable.phone}</p>
        <p >Website:- {userAvaiable.website_url || userAvaiable.business_url}</p>
        <p>Email Address:- {userAvaiable.business_emailaddress || userAvaiable.business_email_address}</p>
      </div>

    </div>
  )
}

export default DeatailsCard
