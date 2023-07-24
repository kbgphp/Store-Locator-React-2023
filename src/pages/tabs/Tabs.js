import React, { useEffect, useState } from 'react';
import { BussinessDetails, BussinessHours, BussinessPhotos, Citations, ContactUs, VisibiltyReports } from './components';
import "../../pages/tabs/Tabs.scss"
import logo from "../../assets/images/index_logoleft.svg"


const Tabs = () => {

  const [activetab, setActiveTab] = useState('VisibiltyReports');
  
  const userAvaiable = JSON.parse(localStorage.getItem('user'))




const rendertabs = ()=>{
  switch (activetab) {
    case 'BussinessDetails':
      return <BussinessDetails userAvaiable={userAvaiable}  />
    case 'BussinessPhotos':
      return <BussinessPhotos userAvaiable={userAvaiable} />
    case 'BussinessHours':
      return <BussinessHours userAvaiable={userAvaiable} />
    case 'Citations':
      return <Citations userAvaiable={userAvaiable} />
    case 'ContactUs':
      return <ContactUs userAvaiable={userAvaiable} />
    case 'VisibiltyReports':
      return <VisibiltyReports userAvaiable={userAvaiable} />
    default:
      
  }
}


  return (
    <div className='TabsContainer'>

      <header className='TabsHeader'>
        <img src={logo} alt="" style={{height:"60px"}}/>
      </header>

    <div className='row'>

      <div className='col-2 TabsContainer'>

        <p onClick={() => setActiveTab('VisibiltyReports')} className={activetab === 'VisibiltyReports' && 'active' } >Visibilty Reports</p>
        <p onClick={() => setActiveTab('Citations')} className={activetab === 'Citations' && 'active'} >Citations</p>
        <p onClick={() => setActiveTab('BussinessDetails')} className={activetab === 'BussinessDetails' && 'active'}>Bussiness Details</p>
        <p onClick={() => setActiveTab('BussinessPhotos')} className={activetab === 'BussinessPhotos' && 'active'} >Bussiness Photos</p>
        <p onClick={() => setActiveTab('BussinessHours')} className={activetab === 'BussinessHours' && 'active'}  >Bussiness Hours</p>
        <p onClick={() => setActiveTab('ContactUs')} className={activetab === 'ContactUs' && 'active'} >Contact Us</p>
      </div>
    
      <div className='col-9'>


        <div>{rendertabs()}</div>

</div>

  
    
    </div>
    </div>
  )
}

export default Tabs
