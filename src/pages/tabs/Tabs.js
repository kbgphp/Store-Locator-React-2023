import React, { useState } from 'react';



import { BussinessDetails, BussinessHours, BussinessPhotos, Citations, ContactUs, VisibiltyReports } from './components';
import "../../pages/tabs/Tabs.scss"
import logo from "../../assets/images/index_logoleft.svg"


const Tabs = () => {

  const [activetab, setActiveTab] = useState('VisibiltyReports');
  

const rendertabs = ()=>{
  switch (activetab) {
    case 'BussinessDetails':
      return <BussinessDetails />
    case 'BussinessPhotos':
      return <BussinessPhotos />
    case 'BussinessHours':
      return <BussinessHours />
    case 'Citations':
      return <Citations />
    case 'ContactUs':
      return <ContactUs />
    case 'VisibiltyReports':
      return <VisibiltyReports />
    default:
      
  }
}


  return (
    <div className='TabsContainer'>

      <header className='TabsHeader'>
        <img src={logo} alt="" height='60px' />
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
