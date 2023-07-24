import React from 'react'

const DeatailsCard = ({ userAvaiable }) => {

  return (
    <div className='card mb-3' >
      <div style={{ margin: "10px 60px 10px" }}>
        <h5 className='fw-bold' >{userAvaiable.business_name} - {userAvaiable.business_city}</h5>
        <p style={{ margin: "5px" }}>Address:- {userAvaiable.business_address}, {userAvaiable.business_city || userAvaiable.business_city} {userAvaiable.business_state || userAvaiable.state}, {userAvaiable.business_country || userAvaiable.country} {userAvaiable.business_zipcode || userAvaiable.zip}</p>
        <p style={{ margin: "5px" }}>Phone:- {userAvaiable.business_phonenumber || userAvaiable.phone}</p>
        <p style={{ margin: "5px" }} >Website:- {userAvaiable.website_url || userAvaiable.business_url}</p>
        <p style={{ margin: "5px" }}>Email Address:- {userAvaiable.business_emailaddress || userAvaiable.business_email_address}</p>
      </div>

    </div>
  )
}

export default DeatailsCard
