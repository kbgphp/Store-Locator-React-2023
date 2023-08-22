import React, { useState } from 'react';
import { BusinessDetails, BusinessHours, BusinessPhotos, Citations, ContactUs, VisibiltyReports } from './components';
import "../../pages/tabs/Tabs.scss"
import logoheader from "../../assets/images/index_logoleft.svg"
import axios from 'axios';

const Tabs = () => {

  const [activetab, setActiveTab] = useState('VisibiltyReports');
  console.log(">>", typeof activetab)
  const [VisibilityData, setVisibilityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [logoLoader, setlogoLoader] = useState(false);
  const [imageLoader, setImageLoading] = useState(false);
  const [logo, setLogo] = useState('');
  const [businessImage, setBusinessImage] = useState([]);

  const userAvailable = JSON.parse(localStorage.getItem('user'));
  // const user = JSON.parse(localStorage.getItem('user'));


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
      .get(`${process.env.REACT_APP_BASE_URL}/api/users/get_order/64a69ed35994208740aa6345/free`, config)
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

  React.useEffect(() => {
    getUserDetails();
    getPhotoDetails();
  }, []);

  const getUserDetails = async () => {
    setlogoLoader(true)
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/userDetail/${userAvailable._id}`).then((res) => {
      setLogo(res.data.data[0].logo_url);
      setlogoLoader(false)
    }).catch((err) => {
      setlogoLoader(false)
      console.log("err", err)
    })
  }
  const getPhotoDetails = async () => {
    setImageLoading(true)
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/userPhotos/${userAvailable._id}`).then((res) => {
      console.log("res.data.data", res.data.data);

      setBusinessImage(res.data.data);


      setImageLoading(false)
      console.log("res", res.data)
    }).catch((err) => {
      console.log("err".err);
      setImageLoading(false)
    })
  }





  const rendertabs = () => {
    switch (activetab) {
      case 'BusinessDetails':
        return <BusinessDetails userAvailable={userAvailable} />
      case 'BusinessPhotos':
        return <BusinessPhotos setlogoLoader={setlogoLoader} setLogo={setLogo} setBusinessImage={setBusinessImage} setImageLoading={setImageLoading} userAvailable={userAvailable} logoLoader={logoLoader} logo={logo} imageLoader={imageLoader} businessImage={businessImage} />
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

  const openBillingPage = () => {

    const instence_id = window?.Wix?.Utils?.getInstanceId();

    console.log("instence_id", instence_id);

    console.log("redirect link ", `https://www.wix.com/apps/upgrade/${process.env.REACT_APP_WIX_APP_ID}?appInstanceId=${instence_id}`);

    window.location.href = `https://www.wix.com/apps/upgrade/${process.env.REACT_APP_WIX_APP_ID}?appInstanceId=${instence_id}`
  }



  return (
    <div className='TopContainer'>

      <header className='TabsHeader'>
        <div class="container">
          <div className='row justify-content-end'>
            <div className='col-md-9'>
              <div className="row ">
                <div className='col'>
                  <img src={logoheader} alt="" style={{ height: "60px" }} />
                </div>
                <div className='col-auto'>
                  <button className='btn btn-primary'
                    onClick={openBillingPage}
                   style={{ width: '180px'}}
                   >Upgrade</button>
                </div>
              </div>
            </div>




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
