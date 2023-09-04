import React from 'react'

const DeatailsCard = ({ userAvailable }) => {

  console.log("render on everytime")

  return (
    <div className='card deatailsCard mb-4' >
      <div style={{ margin: "20px 25px" }}>
        <h6 className='fw-bold' >{userAvailable.business_name} - {userAvailable.business_city}</h6>
        <p>Address:- {userAvailable.business_address}, {userAvailable.business_city || userAvailable.business_city} {userAvailable.business_state || userAvailable.state}, {userAvailable.business_country || userAvailable.country} {userAvailable.business_zipcode || userAvailable.zip}</p>
        <p>Phone:- {userAvailable.business_phonenumber || userAvailable.phone}</p>
        <p >Website:- {userAvailable.website_url || userAvailable.business_url}</p>
        <p>Email Address:- {userAvailable.business_emailaddress || userAvailable.business_email_address}</p>
      </div>

    </div>
  )
}

export default DeatailsCard
