import React, { useEffect } from 'react'
import { IoIosBusiness } from 'react-icons/io';
import { FaInfoCircle } from 'react-icons/fa';
import axios from "axios";
import { useToast } from '@chakra-ui/react';
import DeatailsCard from '../DeatailsCard';




export const BusinessDetails = ({ userAvailable }) => {


  const [businessUpdateData, setBusinessUpdatedata] = React.useState({
    _id: '',
    lss_client_id: '',
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
    position: '',
    business_category: '',
    business_discription: ''
  });
  const [validate, setValidate] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [emailValid, setEmailValid] = React.useState(true);
  const [contactemailvalid, setContactEmailValid] = React.useState(true);
  const [contactNumberError, setContactNumberError] = React.useState('');
  const [businessNumberError, setBusinessNumberError] = React.useState('')

  const toast = useToast();

  useEffect(() => {
    setContactNumberError('');
    setBusinessNumberError('');
    setBusinessUpdatedata({
      _id: userAvailable._id,
      lss_client_id: userAvailable.lss_client_id,
      business_name: userAvailable.business_name,
      business_address: userAvailable.business_address,
      business_city: userAvailable.business_city,
      business_country: userAvailable.country,
      business_state: userAvailable.state,
      business_zipcode: userAvailable.zip,
      business_phonenumber: userAvailable.phone,
      website_url: userAvailable.business_url,
      business_emailaddress: userAvailable.business_email_address,
      contact_first_name: userAvailable.contact_first_name,
      contact_last_name: userAvailable.contact_last_name,
      contact_email: userAvailable.contact_email,
      contact_number: userAvailable.contact_phone_number,
      business_discription: userAvailable.business_description,
      position: '',
      business_category: ''
    })
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!businessUpdateData.business_name || !businessUpdateData.business_address || !businessUpdateData.business_city
      || !businessUpdateData.business_country || !businessUpdateData.business_state || !businessUpdateData.business_zipcode
      || !businessUpdateData.business_phonenumber || !businessUpdateData.website_url || !businessUpdateData.business_emailaddress
      || !businessUpdateData.contact_first_name || !businessUpdateData.contact_last_name || !businessUpdateData.contact_email
      || !businessUpdateData.contact_number || !businessUpdateData.position || !businessUpdateData.business_category || !businessUpdateData.business_discription
    ) {
      setValidate(true)
      return;
    }
    else if (businessNumberError || contactNumberError){
      return
    }

    else {
      setLoading(true)
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/update`, {
        _id: businessUpdateData._id,
        lss_client_id: businessUpdateData.lss_client_id,
        name: businessUpdateData.business_name,
        city: businessUpdateData.business_city,
        street: businessUpdateData.business_address,
        state: businessUpdateData.business_state,
        zipcode: businessUpdateData.business_zipcode,
        phone: businessUpdateData.business_phonenumber,
        email: businessUpdateData.business_emailaddress,
        website: businessUpdateData.website_url,
        notes: "test notes kk",
        country: businessUpdateData.business_country,
        owner: businessUpdateData.contact_first_name,
        keyword1: "test key28",
        contact_first_name: businessUpdateData.contact_first_name,
        contact_last_name: businessUpdateData.contact_last_name,
        contact_email: businessUpdateData.contact_email,
        contact_phone_number: businessUpdateData.contact_number,
        business_description: businessUpdateData.business_discription

      }).then((response) => {

        setLoading(false);
     
        const updateDeatails = {
          ...userAvailable,
          business_name: response.data.data.data.name,
          business_city: response.data.data.data.city,
          country: response.data.data.data.country,
          business_email_address: response.data.data.data.email,
          phone: response.data.data.data.phone,
          business_address: response.data.data.data.street,
          zip: response.data.data.data.zipcode,
          state: response.data.data.data.state,
          country: response.data.data.data.country,
          contact_first_name: response.data.data.data.owner,
          contact_last_name: businessUpdateData.contact_last_name,
          contact_email: businessUpdateData.contact_email,
          contact_phone_number: businessUpdateData.contact_number,
          business_description: businessUpdateData.business_discription
        }

        localStorage.setItem('user', JSON.stringify(updateDeatails));

        if (response.data.data.success) {
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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'business_emailaddress') {
      setEmailValid(emailRegex.test(value));
      setBusinessUpdatedata((prev) => ({
        ...prev, [name]: value
      }))
    }
    else if (name === 'contact_email') {
      setContactEmailValid(emailRegex.test(value));
      setBusinessUpdatedata((prev) => ({
        ...prev, [name]: value
      }))
    }

    else if (name === 'contact_number' ) {
      if ( value.length > 14  ){
        setContactNumberError('Contact number should not exceed 10 characters.');

        setBusinessUpdatedata((prev) => ({
          ...prev,
          [name]: value,
        }));
      }else{
        setContactNumberError('');
        const cleanedValue = value.replace(/\D/g, '');
        let formattedValue = '';
        if (cleanedValue.length <= 3) {
          formattedValue = cleanedValue;
        } else if (cleanedValue.length <= 6) {
          formattedValue = `(${cleanedValue.slice(0, 3)})-${cleanedValue.slice(3)}`;
        } else if (cleanedValue.length <= 10) {
          formattedValue = `(${cleanedValue.slice(0, 3)})-${cleanedValue.slice(3, 6)}-${cleanedValue.slice(6)}`;
        } else {
          formattedValue = `(${cleanedValue.slice(0, 3)})-${cleanedValue.slice(3, 6)}-${cleanedValue.slice(6, 10)}`;
        }

        setBusinessUpdatedata((prev) => ({
          ...prev,
          [name]: formattedValue,
        }));


      }


      //   const re = /(\d{3})(\d{3})(\d{4})/;
      //   const output = value.replace(re, (_, a, b, c) => `(${a}) ${b}-${c}`);
      //   setBusinessUpdatedata((prev) => ({
      //     ...prev,
      //     [name]: output,
      //   }));
      // }
      
     
    }
    else if (name === 'business_phonenumber') {
      if (value.length > 14){
        setBusinessNumberError('Number should not exceed 10 characters.');
        setBusinessUpdatedata((prev) => ({
          ...prev,
          [name]: value,
        }));
      }else{
        setBusinessNumberError('');

        const cleanedValue = value.replace(/\D/g, '');

        let formattedValue = '';
        if (cleanedValue.length <= 3) {
          formattedValue = cleanedValue;
        } else if (cleanedValue.length <= 6) {
          formattedValue = `(${cleanedValue.slice(0, 3)})-${cleanedValue.slice(3)}`;
        } else if (cleanedValue.length <= 10) {
          formattedValue = `(${cleanedValue.slice(0, 3)})-${cleanedValue.slice(3, 6)}-${cleanedValue.slice(6)}`;
        } else {
          formattedValue = `(${cleanedValue.slice(0, 3)})-${cleanedValue.slice(3, 6)}-${cleanedValue.slice(6, 10)}`;
        }

        setBusinessUpdatedata((prev) => ({
          ...prev,
          [name]: formattedValue,
        }));
      

        // const re = /(\d{3})(\d{3})(\d{4})/;
        // const output = value.replace(re, (_, a, b, c) => `(${a}) ${b}-${c}`);
        // setBusinessUpdatedata((prev) => ({
        //   ...prev,
        //   [name]: output,
        // }));
      }
    
    } else {
        setBusinessUpdatedata((prev) => ({
          ...prev,
          [name]: value,
        })); 
    }
  }


  return (
    <div>

      <DeatailsCard userAvailable={businessUpdateData} />
      <form onSubmit={handleSubmit}>
        <div className='formSection'>
          <div className=' mt-4'>
            <h3 className='formHeadings section_heading' ><IoIosBusiness className='d-inline-block titleWicon' /> Business Details</h3>
            <p>  By filling out the Business Details in full will enhance your business listings across the internet. The benefit of having more data will help users understand more about your business like hours and a business description. Also this helps with rankings within the search engines.</p>




            <div>
              <div className="col-sm-12 ">
                <input type="text" onChange={handleChange} value={businessUpdateData.business_name} name='business_name' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !businessUpdateData.business_name ? 'is-invalid' : ''}`} id="colFormLabelSm" placeholder="Business name" />
              </div>

              <div className="col-sm-12 ">
                <input type="text" onChange={handleChange} value={businessUpdateData.business_address} name='business_address' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !businessUpdateData.business_address ? 'is-invalid' : ''}`} id="colFormLabelSm" placeholder="Business Address" />
              </div>

              <div className="col-sm-12 ">
                <input type="text" onChange={handleChange} value={businessUpdateData.business_city} name='business_city' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !businessUpdateData.business_city ? 'is-invalid' : ''}`} id="colFormLabelSm" placeholder="Business City" />
              </div>

              <div className="col-sm-12 ">
                <input type="text" onChange={handleChange} value={businessUpdateData.business_country} name='business_country' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !businessUpdateData.business_country ? 'is-invalid' : ''}`} id="colFormLabelSm" placeholder="Business Country" />
              </div>

              <div className='row'>
                <div className="col-sm-6 ">
                  <input type="text" onChange={handleChange} value={businessUpdateData.business_state} name='business_state' className={`form-control form-control-sm forminput rounded-pill mt-3  ${validate && !businessUpdateData.business_state ? 'is-invalid' : ''}`} id="colFormLabelSm" placeholder="Business State" />
                </div>

                <div className="col-sm-6 ">
                  <input type="number" onChange={handleChange} value={businessUpdateData.business_zipcode} name='business_zipcode' className={`form-control form-control-sm forminput rounded-pill mt-3  ${validate && !businessUpdateData.business_zipcode ? 'is-invalid' : ''}`} id="colFormLabelSm" placeholder="Business zipcode" />
                </div>
              </div>

              <div className="col-sm-12 ">
                <input type="text" onChange={handleChange} value={businessUpdateData.business_phonenumber} name='business_phonenumber' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !businessUpdateData.business_phonenumber ? 'is-invalid' : ''}`} id="colFormLabelSm" placeholder="Business Phone number" />
                {businessNumberError && <div className='text-danger'>{businessNumberError}</div>}

              </div>

              <div className="col-sm-12 ">
                <input type="text" onChange={handleChange} value={businessUpdateData.website_url} name='website_url' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !businessUpdateData.website_url ? 'is-invalid' : ''}`} id="colFormLabelSm" placeholder="Website URL" />
              </div>

              <div className="col-sm-12 ">
                <input type="text" onChange={handleChange} value={businessUpdateData.business_emailaddress} name='business_emailaddress' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !businessUpdateData.business_emailaddress ? 'is-invalid' : ''}`} id="colFormLabelSm" placeholder="Email Address" />
                {!emailValid && (
                  <div className="text-danger">
                    Invalid email address.
                  </div>
                )}


              </div>




            </div>
          </div>


          <div>
            <h3 className='formHeadings mt-5'><FaInfoCircle className='d-inline-block titleWicon' style={{ marginRight: "5px" }} />Contact Info.</h3>


            <div>
              <div className="col-sm-12 ">
                <input type="text" onChange={handleChange} value={businessUpdateData.contact_first_name} name='contact_first_name' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !businessUpdateData.contact_first_name ? 'is-invalid' : ''}`} id="colFormLabelSm" placeholder="Contact first name" />
              </div>

              <div className="col-sm-12 ">
                <input type="text" onChange={handleChange} value={businessUpdateData.contact_last_name} name='contact_last_name' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !businessUpdateData.contact_last_name ? 'is-invalid' : ''}`} id="colFormLabelSm" placeholder="Contact last name" />
              </div>

              <div className="col-sm-12 ">
                <input type="text" onChange={handleChange} value={businessUpdateData.contact_email} name='contact_email' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !businessUpdateData.contact_email ? 'is-invalid' : ''}`} id="colFormLabelSm" placeholder="Contact email" />
                {!contactemailvalid && (
                  <div className="text-danger">
                    Invalid email address.
                  </div>
                )}
              </div>

              <div className="col-sm-12 ">
                <input type="text" onChange={handleChange} value={businessUpdateData.contact_number} name='contact_number' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !businessUpdateData.contact_number ? 'is-invalid' : ''}`} id="colFormLabelSm" placeholder="Contact Number" />
                {contactNumberError && <div className='text-danger'>{contactNumberError}</div>}

              </div>

              <div className="col-sm-12 ">
                <input type="text" onChange={handleChange} value={businessUpdateData.position} name='position' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !businessUpdateData.position ? 'is-invalid' : ''}`} id="colFormLabelSm" placeholder="Position" />
              </div>

            </div>

          </div>
          <hr />

          <div>
            <h3 className='formHeadings mt-5'><FaInfoCircle className='d-inline-block titleWicon' style={{ marginRight: "5px" }} />Additional Info.</h3>
            <div>
              <div className="col-sm-12 mb-4">
                <input type="text" onChange={handleChange} value={businessUpdateData.business_category} name='business_category' className={`form-control form-control-sm forminput rounded-pill mt-3 ${validate && !businessUpdateData.business_category ? 'is-invalid' : ''}`} id="colFormLabelSm" placeholder="Business Category" />
              </div>

              <textarea onChange={handleChange} className={`form-control mt-2 mb-4 ${validate && !businessUpdateData.business_discription ? 'is-invalid' : ''}`} value={businessUpdateData.business_discription} style={{
                minHeight: '150px',
                resize: 'none',
                overflow: 'hidden',
                padding: '8px'
              }} row="4" name="business_discription" placeholder="Business Description (max words 250)"></textarea>

            </div>

            <div className='row mt-4 mb-5'>
              <div className="col-sm-12 col-xs-12 text-end">
                <button className="btn btn-primary" type="submit">
                  {
                    loading ? <>
                      Save Changes
                      <div class="spinner-border spinner-border-sm" role="status"> </div>
                    </> : ('Save Changes')
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

