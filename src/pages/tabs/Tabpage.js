import React, { useState } from 'react';
import { BusinessDetails, BusinessHours, BusinessPhotos, Citations, ContactUs, VisibiltyReports } from './components';
import axios from 'axios';

const Tabpage = () => {


  const [activetab, setActiveTab] = useState('VisibiltyReports');

  const [VisibilityData, setVisibilityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [logoLoader, setlogoLoader] = useState(false);
  const [imageLoader, setImageLoading] = useState(false);
  const [logo, setLogo] = useState('');
  const [businessImage, setBusinessImage] = useState([]);

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





  const Rendertabs = () => {
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


  return (
    <div class="container">
      <div className='row'>

        <div className='col-md-3 TabsContainer'>
          <ul className='asidbarTabs'>

            <li><a href={() => false} onClick={() => setActiveTab('VisibiltyReports')} className={activetab === 'VisibiltyReports' && 'active'} >Visibilty Reports</a></li>
            <li><a href={() => false} onClick={() => setActiveTab('Citations')} className={activetab === 'Citations' && 'active'} >Citations</a></li>
            <li><a href={() => false} onClick={() => setActiveTab('BusinessDetails')} className={activetab === 'BusinessDetails' && 'active'}>Business Details</a></li>
            <li><a href={() => false} onClick={() => setActiveTab('BusinessPhotos')} className={activetab === 'BusinessPhotos' && 'active'} >Business Photos</a></li>
            <li><a href={() => false} onClick={() => setActiveTab('BusinessHours')} className={activetab === 'BusinessHours' && 'active'}  >Business Hours</a></li>
            <li><a href={() => false} onClick={() => setActiveTab('ContactUs')} className={activetab === 'ContactUs' && 'active'} >Contact Us</a></li>
          </ul>
        </div>

        <div className='col-md-9'>


          <div>{<Rendertabs />}</div>

        </div>



      </div>
    </div>
  )
}

export default Tabpage
