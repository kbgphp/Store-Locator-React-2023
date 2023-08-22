import React from 'react'
import errorImg from '../../assets/images/404-error.jpg';
const PageNotFound = () => {
  return (
    <div >
      <img style={{ height: "100vh", width: "100%", objectFit: "none" }} src={errorImg }/>
    </div>
  )
}

export default PageNotFound;
