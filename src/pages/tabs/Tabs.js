import React, { useState } from 'react';
import { BussinessDetails, BussinessHours, BussinessPhotos, Citations, ContactUs, VisibiltyReports } from './components';
import "../../pages/tabs/Tabs.scss"
import logo from "../../assets/images/index_logoleft.svg"


const Tabs = () => {

  const [activetab, setActiveTab] = useState('VisibiltyReports');

  const userAvaiable = JSON.parse(localStorage.getItem('user'));






  const rendertabs = () => {
    switch (activetab) {
      case 'BussinessDetails':
        return <BussinessDetails userAvaiable={userAvaiable} />
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
        <img src={logo} alt="" style={{ height: "60px" }} />
      </header>

      <div className='row'>

        <div className='col-2 TabsContainer'>
          <ul className='asidbarTabs'>
            <li><a href="" onClick={() => setActiveTab('VisibiltyReports')} className={activetab === 'VisibiltyReports' && 'active'} >Visibilty Reports</a></li>
            <li><a onClick={() => setActiveTab('Citations')} className={activetab === 'Citations' && 'active'} >Citations</a></li>
            <li><a onClick={() => setActiveTab('BussinessDetails')} className={activetab === 'BussinessDetails' && 'active'}>Bussiness Details</a></li>
            <li><a onClick={() => setActiveTab('BussinessPhotos')} className={activetab === 'BussinessPhotos' && 'active'} >Bussiness Photos</a></li>
            <li><a onClick={() => setActiveTab('BussinessHours')} className={activetab === 'BussinessHours' && 'active'}  >Bussiness Hours</a></li>
            <li><a onClick={() => setActiveTab('ContactUs')} className={activetab === 'ContactUs' && 'active'} >Contact Us</a></li>
          </ul>
        </div>

        <div className='col-9'>


          <div>{rendertabs()}</div>

        </div>



      </div>
    </div>
  )
}

export default Tabs
