import React, { useState } from 'react';
import { BusinessDetails, BusinessHours, BusinessPhotos, Citations, ContactUs, VisibiltyReports } from './components';
import "../../pages/tabs/Tabs.scss"
import logo from "../../assets/images/index_logoleft.svg"
import axios from 'axios';

const Tabs = () => {

  const [activetab, setActiveTab] = useState('VisibiltyReports');
  const [VisibilityData, setVisibilityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userAvailable = JSON.parse(localStorage.getItem('user'));

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    setError(null);

    const config = {
      headers: {
        'x-auth-token': "@W#I$X7jlk8!%*dd%4",
      }
    };

    axios
      .get('https://wix-store23-edef064ca37f.herokuapp.com/api/users/get_order/64a69ed35994208740aa6345/free', config)
      .then((res) => {
        setVisibilityData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setLoading(false);
        setError("Something went wrong.");
      });
  };




  const rendertabs = () => {
    switch (activetab) {
      case 'BusinessDetails':
        return <BusinessDetails userAvailable={userAvailable} />
      case 'BusinessPhotos':
        return <BusinessPhotos userAvailable={userAvailable} />
      case 'BusinessHours':
        return <BusinessHours userAvailable={userAvailable} />
      case 'Citations':
        return <Citations userAvailable={userAvailable} />
      case 'ContactUs':
        return <ContactUs userAvailable={userAvailable} />
      case 'VisibiltyReports':
        return <VisibiltyReports userAvailable={userAvailable} VisibilityData={VisibilityData}
          loading={loading}
          error={error} />
      default:

    }
  }


  return (
    <div className='TopContainer'>

      <header className='TabsHeader'>
        <div class="container">
          <div className='row justify-content-end'>
            <div className='col-md-9'>  <img src={logo} alt="" style={{ height: "60px" }} /> </div>
          </div>
        </div>
      </header>
      <div class="container">
        <div className='row'>

          <div className='col-md-3 TabsContainer'>
            <ul className='asidbarTabs'>
              <li><a onClick={() => setActiveTab('VisibiltyReports')} className={activetab === 'VisibiltyReports' && 'active'} >Visibilty Reports</a></li>
              <li><a onClick={() => setActiveTab('Citations')} className={activetab === 'Citations' && 'active'} >Citations</a></li>
              <li><a onClick={() => setActiveTab('BusinessDetails')} className={activetab === 'BusinessDetails' && 'active'}>Business Details</a></li>
              <li><a onClick={() => setActiveTab('BusinessPhotos')} className={activetab === 'BusinessPhotos' && 'active'} >Business Photos</a></li>
              <li><a onClick={() => setActiveTab('BusinessHours')} className={activetab === 'BusinessHours' && 'active'}  >Business Hours</a></li>
              <li><a onClick={() => setActiveTab('ContactUs')} className={activetab === 'ContactUs' && 'active'} >Contact Us</a></li>
            </ul>
          </div>

          <div className='col-md-9'>


            <div>{rendertabs()}</div>

          </div>



        </div>
      </div>
    </div>
  )
}

export default Tabs
