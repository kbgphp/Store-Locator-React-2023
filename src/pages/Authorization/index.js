import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'


const Auth = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [token , setToken] = useState('');

 


  useEffect(()=>{
    setToken(searchParams.get("token"))
  }, [searchParams])

  useEffect(()=>{
    if (token){
      window.location.href = `https://www.wix.com/installer/install?token=${token}&appId=${process.env.REACT_APP_WIX_APP_ID}&redirectUrl=https://react-store-app-ab7535ec59b2.herokuapp.com/`
    }
  },[token])

}

export default Auth
