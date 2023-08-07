import React, { useEffect, useState } from 'react'
import { HiMiniPhoto } from 'react-icons/hi2';
import { ImCross } from "react-icons/im"

import axios from 'axios';
import { filter, useToast } from '@chakra-ui/react';


import DeatailsCard from '../DeatailsCard';
import damloadimg from "../../../../assets/images/download.svg"
import closeimg from "../../../../assets/images/closeIcon.svg"
import photoicon from "../../../../assets/images/imageIcon.svg"
import "./BusinessPhotos.scss"

export const BusinessPhotos = ({ userAvailable }) => {

  const [logoLoader, setlogoLoader] = useState(false);
  const [imageLoader, setImageLoading] = useState(false);

  const [isDeleting, setIsDeleting] = React.useState(false);
  const [deletingIndex, setDeletingIndex] = React.useState(null);

  const [logo, setLogo] = useState('');
  const [businessImage, setBusinessImage] = useState([]);

  const toast = useToast();


  // const accesstoken = JSON.parse(localStorage.getItem('access_token'));
  const user = JSON.parse(localStorage.getItem('user'));
  const accesstoken = 'OAUTH2.eyJraWQiOiJkZ0x3cjNRMCIsImFsZyI6IkhTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcImY2OGY1ODQzLWZjMzktNDkwYy1hYmE2LTU2YmE4ZmY5MTRlMlwifSIsImlhdCI6MTY5MTM5MDIxMSwiZXhwIjoxNzU0NDYyMjExfQ.KBRbKJVryMn0AtpysSjQXpGGHiVwR6WxqxvQuTSO0GU'

  useEffect(() => {
    getUserDetails();
    getPhotoDetails();
  }, []);

  const getUserDetails = async () => {
    setlogoLoader(true)
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/userDetail/${user._id}`).then((res) => {
      setLogo(res.data.data[0].logo_url);
      setlogoLoader(false)
    }).catch((err) => {
      setlogoLoader(false)
      console.log("err", err)
    })
  }

  const getPhotoDetails = async () => {
    setImageLoading(true)
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/userPhotos/${user._id}`).then((res) => {
      console.log("res.data.data", res.data.data)
      setBusinessImage(res.data.data);
      setImageLoading(false)
      console.log("res", res.data)
    }).catch((err) => {
      console.log("err".err);
      setImageLoading(false)
    })
  }

  const handleURlChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData()
    formData.append('image', file)
    let config = {
      headers: {
        'auth-access-token': accesstoken,
      }
    }
    setlogoLoader(true)
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/upload_logo/${user._id}`, formData, config).then((res) => {
      setlogoLoader(false);
      setLogo(res.data.data.file.url);
      if (res.data.data.message) {
        toast({
          title: 'Upload Logo sucessfully',
          status: 'sucess',
          duration: 3000,
          isClosable: true,
        })
      }
    }).catch((err) => {
      setlogoLoader(false);
      toast({
        title: 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      console.log("error", err);
    });
  }

  const handleBusinessChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData()
    formData.append('image', file)
    let config = {
      headers: {
        'auth-access-token': accesstoken,
      }
    }
    setImageLoading(true)
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/upload_photos/${user._id}`, formData, config).then((res) => {
      setImageLoading(false);
      getPhotoDetails();
      console.log("ressss", res.data)
      if (res.data.data.message) {
        toast({
          title: 'Upload Logo sucessfully',
          status: 'sucess',
          duration: 3000,
          isClosable: true,
        })
      }
    }).catch((err) => {
      setImageLoading(false);
      toast({
        title: 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      console.log("error", err);
    });
  }

  const handleDeleteImage = async (id, i) => {
    setIsDeleting(true);
    setDeletingIndex(i)

    const delteditem = businessImage.filter((item) => { return item?._id !== id });

    await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/delete_photos/${id}`).then((res) => {
      setIsDeleting(false);
      if (res.data.data.acknowledged == true) {
        setBusinessImage(delteditem)
      }
    }).catch((err) => {
      console.log("err", err)

    })

  }

  return (
    <div>

      <DeatailsCard userAvailable={userAvailable} />

      <div className='mt-4 '>  <h3 className='mb-4 formHeadings'>
        <img className='headingIcon' width={24} src={photoicon} />

        Business logo</h3>

        <div class="image-uploadBlock singalimgUpload">
          <label for="file-input">
            <img src={damloadimg} />
            <h5>Upload photo</h5>
          </label>
          <input style={{ display: "none" }} id="file-input" type="file" onChange={handleURlChange} />
        </div>


      </div>
      <div className='uploadedImgBlock'>
        {
          logoLoader ?
            <div className="loadingBubble">
              <div></div>
              <div></div>
              <div></div>
            </div>

            : <img src={logo} />
        }
      </div>


      <div className='mt-5 '>
        <h3 className='mb-4 formHeadings'>
          <img className='headingIcon' width={24} src={photoicon} />

          Business Photos</h3>


        <div class="image-uploadBlock image-upload-photos mb-4">
          <label for="file-input-photos">
            <img src={damloadimg} />
            <h5>Upload photos</h5>
          </label>
          <input style={{ display: "none" }} id="file-input-photos" type="file" onChange={handleBusinessChange} />

        </div>

      </div>

      {/* {imageLoader ? <div className="spinner-border text-dark" role="status">
      </div> :
        <div style={{ maxWidth: '1000px', display: "flex" }}>
          {
            businessImage.length > 0 && businessImage.map((img, index) => {
              return <div className='uploadedImgBlock'>
                <img key={index} src={img.full_url} />
                <div className='imgCloseButton'>
                  <img src={closeimg} onClick={() => handleDeleteImage(img._id)} />
                 
                </div>
              </div>

            })
          }

        </div>
      } */}

      <div className='mb-4 row'>
        {
          businessImage.length > 0 && businessImage.map((img, index) => {
            return <div className="col-sm-3"> <div className='uploadedImgBlock businessimgCard'>
              <img key={index} src={img.full_url} />
              <div className='imgCloseButton'>
                <img src={closeimg} onClick={() => handleDeleteImage(img._id, index)} />

              </div>
              {isDeleting && deletingIndex === index ?

                <div className="loadingBubble ">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                : ''

              }

            </div>
            </div>

          })
        }

        {
          imageLoader &&
          <div className="col-sm-3"> <div className='uploadedImgBlock'>
            <div className="loadingBubble">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          </div>

        }



      </div>



    </div>
  )
}


