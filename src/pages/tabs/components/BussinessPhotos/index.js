import React from 'react'
import { HiMiniPhoto } from 'react-icons/hi2';
import DeatailsCard from '../DeatailsCard';
import axios from 'axios';


export const BussinessPhotos = ({ userAvaiable }) => {

  const [base64Image, setBase64Image] = React.useState('');
  const accesstoken = JSON.parse(localStorage.getItem('access_token'));
  const user = JSON.parse(localStorage.getItem('user'));
  console.log("userr", user._id)
// const accesstoken = 'toknee';

  console.log('====================================');
  console.log("accesstoken", accesstoken);
  console.log('====================================');

 const handleChange = async(e) =>{
   const file = e.target.files[0];
   const formData = new FormData()
   formData.append('image', file)
   let config = {
     headers: {
       'auth-access-token': accesstoken,
     }
   }
   
   await axios.post(`${process.env.REACT_APP_BASE_URL}/api/upload_logo/${user._id}`, formData, config).then((res) => {
   console.log('====================================');
     console.log("ressss",res);
   console.log('====================================');
   }).catch((err) => {
     console.log("error", err);   
   });
    }
   

  // const handleImage = async (e)=>{
  //   const file = e.target.files[0];
  //  console.log("file",file);
  // }




  return (
    <div>
      <DeatailsCard userAvaiable={userAvaiable} />



      <div className='mt-4 '>
        <h3 className='mb-4'> <HiMiniPhoto />Business Logo</h3>

        <div className="card text-white bg-secondary mb-3" style={{ maxWidth: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">
              <input type='file' onChange={handleChange} />Upload photo</h5> </div>
        </div>
      </div>

      <img src="https://static.wixstatic.com/media/wix-co_2c9110db6dba4ea89f29ab7650a2d35d~mv2.jpeg" />

      <div>
        <h3> <HiMiniPhoto style={{display:"inline-block"}}/> Other Photos</h3>
        <hr/>

        <div className="card text-white bg-secondary mb-3" style={{ maxWidth: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">Upload photo</h5>

          </div>
        </div>
      </div>

    </div>
  )
}


