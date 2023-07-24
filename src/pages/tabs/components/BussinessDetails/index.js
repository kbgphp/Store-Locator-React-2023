import React, { useEffect } from 'react'
import { IoIosBusiness } from 'react-icons/io';
import { FaEye, FaInfoCircle } from 'react-icons/fa';
import axios from "axios";
import { useToast } from '@chakra-ui/react';
import DeatailsCard from '../DeatailsCard';




export const BussinessDetails = ({ userAvaiable }) => {
  

  const [bussinessUpdateData, setBussinessUpdatedata] = React.useState({
    _id:'',
    lss_client_id:'',
    business_name: '',
    business_address: '',
    business_city: '',
    business_country: '',
    business_state: '',
    business_zipcode: '',
    business_phonenumber: '',
    website_url: '',
    business_emailaddress: '',
    contact_first_name: '',
    contact_last_name: '',
    contact_email: '',
    contact_number: '',
    position:'',
    business_category:'',
    business_discription: ''
  });
  const [validate, setValidate] = React.useState(false);
  const [loading , setLoading] = React.useState(false);
  const toast = useToast();

  useEffect(()=>{
    setBussinessUpdatedata({
      _id:userAvaiable._id,
      lss_client_id: userAvaiable.lss_client_id,
      business_name: userAvaiable.business_name,
      business_address: userAvaiable.business_address,
      business_city: userAvaiable.business_city,
      business_country: userAvaiable.country,
      business_state:userAvaiable.state,
      business_zipcode:userAvaiable.zip,
      business_phonenumber: userAvaiable.phone,
      website_url: userAvaiable.business_url,
      business_emailaddress: userAvaiable.business_email_address,
      contact_first_name: userAvaiable.contact_first_name,
      contact_last_name:userAvaiable.contact_last_name,
      contact_email: userAvaiable.contact_email,
      contact_number: userAvaiable.contact_phone_number,
      business_discription: userAvaiable.business_description,
      position:'',
      business_category: ''
    })
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bussinessUpdateData.business_name || !bussinessUpdateData.business_address || !bussinessUpdateData.business_city
      || !bussinessUpdateData.business_country || !bussinessUpdateData.business_state || !bussinessUpdateData.business_zipcode
      || !bussinessUpdateData.business_phonenumber || !bussinessUpdateData.website_url || !bussinessUpdateData.business_emailaddress 
      || !bussinessUpdateData.contact_first_name || !bussinessUpdateData.contact_last_name || !bussinessUpdateData.contact_email
      || !bussinessUpdateData.contact_number || !bussinessUpdateData.position || !bussinessUpdateData.business_category || !bussinessUpdateData.business_discription
      ){
      setValidate(true)
      return;
    }else{
      setLoading(true)
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/update`, {
        _id: bussinessUpdateData._id ,
        lss_client_id: bussinessUpdateData.lss_client_id,
         name: bussinessUpdateData.business_name,
         city: bussinessUpdateData.business_city,
         street: bussinessUpdateData.business_address,
         state: bussinessUpdateData.business_state,
         zipcode: bussinessUpdateData.business_zipcode,
         phone: bussinessUpdateData.business_phonenumber,
         email: bussinessUpdateData.business_emailaddress,
         website: bussinessUpdateData.website_url,
          notes: "test notes kk",
         country: bussinessUpdateData.business_country,
         owner: bussinessUpdateData.contact_first_name,
          keyword1: "test key28",
         contact_first_name: bussinessUpdateData.contact_first_name,
         contact_last_name: bussinessUpdateData.contact_last_name,
         contact_email: bussinessUpdateData.contact_email,
         contact_phone_number: bussinessUpdateData.contact_number,
         business_description: bussinessUpdateData.business_discription
        
      }).then((response) => {
        console.log("response", response.data.data.data )
        setLoading(false);

        const updateDeatails = {
          ...userAvaiable,
          business_name: response.data.data.data.name,
          business_city: response.data.data.data.city,
          country:response.data.data.data.country,
          business_email_address:response.data.data.data.email,
          phone:response.data.data.data.phone,
          business_address:response.data.data.data.street,
          zip:response.data.data.data.zipcode,
          state:response.data.data.data.state,
          country:response.data.data.data.country
        }

        localStorage.setItem('user', JSON.stringify(updateDeatails));

        if (response.data.data.success){
          toast({
            title: 'Update Info Successfull.',
            description: "Successfully update all information.",
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
        }
      

      }).catch((error) => {
        console.log("error", error);
        setLoading(false)
        toast({
          title: 'Something went wrong.',
          description: "Failed to Create.",
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
      })
    }
  }

  const handleChange = (e) => {
   const {name , value} = e.target;

    setBussinessUpdatedata((prev)=>({
      ...prev ,[name]:value
    }))
  }


  return (
    <div>
    
      <DeatailsCard userAvaiable={bussinessUpdateData }/>
      <form onSubmit={handleSubmit}>
        <div className='formSection'>
          <div>
            <h3 ><IoIosBusiness className='d-inline-block' /> Business Details</h3>
            <p>  By filling out the Business Details in full will enhance your business listings across the internet. The benefit of having more data will help users understand more about your business like hours and a business description. Also this helps with rankings within the search engines.</p>




            <div>
              <div className="col-sm-12 ">
                <input type="text" onChange={handleChange} value={bussinessUpdateData.business_name} style={{ height: "40px" }} name='business_name' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !bussinessUpdateData.business_name ? 'is-invalid':''}`} id="colFormLabelSm" placeholder="Business name" />
              </div>

              <div className="col-sm-12 ">
                <input type="text" onChange={handleChange} value={bussinessUpdateData.business_address} style={{ height: "40px" }} name='business_address' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !bussinessUpdateData.business_address ? 'is-invalid':''}`} id="colFormLabelSm" placeholder="Business Address" />
              </div>

              <div className="col-sm-12 ">
                <input type="text" onChange={handleChange} value={bussinessUpdateData.business_city} style={{ height: "40px" }} name='business_city' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !bussinessUpdateData.business_city ? 'is-invalid':''}`} id="colFormLabelSm" placeholder="Business City" />
              </div>

              <div className="col-sm-12 ">
                <input type="text" onChange={handleChange} value={bussinessUpdateData.business_country} style={{ height: "40px" }} name='business_country' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !bussinessUpdateData.business_country ? 'is-invalid':''}`} id="colFormLabelSm" placeholder="Business Country" />
              </div>

              <div className='row'>
                <div className="col-sm-6 ">
                  <input type="text" onChange={handleChange} value={bussinessUpdateData.business_state} style={{ height: "40px" }} name='business_state' className={`form-control form-control-sm forminput rounded-pill mt-3  ${validate && !bussinessUpdateData.business_state ? 'is-invalid' : ''}`} id="colFormLabelSm" placeholder="Business State" />
                </div>

                <div className="col-sm-6 ">
                  <input type="text" onChange={handleChange} value={bussinessUpdateData.business_zipcode} style={{ height: "40px" }} name='business_zipcode' className={`form-control form-control-sm forminput rounded-pill mt-3 mb-3 ${validate && !bussinessUpdateData.business_zipcode ? 'is-invalid' : ''}`} id="colFormLabelSm" placeholder="Business zipcode" />
                </div>
              </div>

              <div className="col-sm-12 ">
                <input type="text" onChange={handleChange} value={bussinessUpdateData.business_phonenumber} style={{ height: "40px" }} name='business_phonenumber' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !bussinessUpdateData.business_phonenumber ? 'is-invalid':''}`} id="colFormLabelSm" placeholder="Business Phone number" />
              </div>

              <div className="col-sm-12 ">
                <input type="text" onChange={handleChange} value={bussinessUpdateData.website_url} style={{ height: "40px" }} name='website_url' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !bussinessUpdateData.website_url ? 'is-invalid':''}`} id="colFormLabelSm" placeholder="Website URL" />
              </div>

              <div className="col-sm-12 ">
                <input type="text" onChange={handleChange} value={bussinessUpdateData.business_emailaddress} style={{ height: "40px" }} name='business_emailaddress' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !bussinessUpdateData.business_emailaddress ? 'is-invalid':''}`} id="colFormLabelSm" placeholder="Email Address" />
              </div>




            </div>
          </div>
          <hr />

          <div>
            <h3><FaInfoCircle className='d-inline-block' style={{ marginRight: "5px" }} />Contact Info.</h3>


            <div>
              <div className="col-sm-12 ">
                <input type="text" onChange={handleChange} value={bussinessUpdateData.contact_first_name} style={{ height: "40px" }} name='contact_first_name' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !bussinessUpdateData.contact_first_name ? 'is-invalid':''}`} id="colFormLabelSm" placeholder="Contact first name" />
              </div>

              <div className="col-sm-12 ">
                <input type="text" onChange={handleChange} value={bussinessUpdateData.contact_last_name} style={{ height: "40px" }} name='contact_last_name' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !bussinessUpdateData.contact_last_name ? 'is-invalid':''}`} id="colFormLabelSm" placeholder="Contact last name" />
              </div>

              <div className="col-sm-12 ">
                <input type="text" onChange={handleChange} value={bussinessUpdateData.contact_email} style={{ height: "40px" }} name='contact_email' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !bussinessUpdateData.contact_email ? 'is-invalid':''}`} id="colFormLabelSm" placeholder="Contact email" />
              </div>

              <div className="col-sm-12 ">
                <input type="text" onChange={handleChange} value={bussinessUpdateData.contact_number} style={{ height: "40px" }} name='contact_number' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !bussinessUpdateData.contact_number ? 'is-invalid':''}`} id="colFormLabelSm" placeholder="Contact Number" />
              </div>

              <div className="col-sm-12 ">
                <input type="text" onChange={handleChange} value={bussinessUpdateData.position} style={{ height: "40px" }} name='position' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !bussinessUpdateData.position ? 'is-invalid' : ''}`} id="colFormLabelSm" placeholder="Position" />
              </div>

            </div>

          </div>
          <hr />

          <div>
            <h3><FaInfoCircle className='d-inline-block'  style={{ marginRight: "5px" }} />Additional Info.</h3>
            <div>
              <div className="col-sm-12 mb-4">
                <input type="text" onChange={handleChange} value={bussinessUpdateData.business_category} style={{ height: "40px" }} name='business_category' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !bussinessUpdateData.business_category ? 'is-invalid':''}`} id="colFormLabelSm" placeholder="Business Category" />
              </div>

              <textarea onChange={handleChange} className={`form-control mt-2 mb-4 ${validate && !bussinessUpdateData.business_discription ? 'is-invalid' : ''}`} value={bussinessUpdateData.business_discription}  style={{
                minHeight: '150px',
                resize: 'none',
                overflow: 'hidden',
                padding: '8px'
              }} row="4" name="business_discription" placeholder="Business Description (max words 250)"></textarea>

            </div>

            <div className='row mt-4 '>
              <div className="col-sm-12 col-xs-12 text-end">
                <button className="orange_btn" type="submit">
                  {
                    loading ? ('Loading...') : ('Save Changes')
                  }
                 </button>
              </div>
            </div>




          </div>
        </div>
      </form>

    </div>
  )
}

