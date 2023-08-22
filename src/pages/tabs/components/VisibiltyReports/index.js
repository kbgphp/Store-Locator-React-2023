import React, { useEffect } from 'react'
import { FaEye } from 'react-icons/fa';
import Loader from '../../../../components/Loader';
import inprogress from "../../../../assets/images/pending.jpg";
import submitted from "../../../../assets/images/check.jpg"
import DeatailsCard from '../DeatailsCard';
import axios from 'axios';
import "./VisibiltyReports.scss"
import { useToast } from '@chakra-ui/react';

export const VisibiltyReports = ({ userAvailable, VisibilityData, loading, error }) => {

  // const [VisibilityData, setVisibilityData] = React.useState([]);
  // const [loading, setLoading] = React.useState(false)

  const toast = useToast();

  // useEffect(() => {
  //   getdata();
  // }, []);

  // const getdata = () => {
  //   setLoading(true)
  //   let config = {
  //     headers: {
  //       'x-auth-token': "@W#I$X7jlk8!%*dd%4",
  //     }
  //   }


  //   axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/get_order/64a69ed35994208740aa6345/free', config).then((res) => {
  //     setVisibilityData(res.data);
  //     setLoading(false)

  //   }).catch((err) => {
  //     console.log("error", err);
  //     setLoading(false)
  //     toast({
  //       description: "Something Went Wrong",
  //       title: 'Something went wrong.',
  //       status: 'error',
  //       duration: 3000,
  //       isClosable: true,
  //     })
  //   });
  // }


  const specificImages = ["Bing", "BrownBook", "BubbleLife", "Here Live Maps", "Verizon411", "Google", "Judy's Book"]
  const filteredData = VisibilityData?.data?.data?.progress?.filter((item) => {
    return specificImages.includes(Object.keys(item)[0])
  });


  return (

    <div>
      <DeatailsCard userAvailable={userAvailable} />

      <p className='mb-3'>You're smart for signing up for our paid listing service. Your business data is now being pushed out to the most popular online local directories search engines and GPS devices! Now let us get to work.</p>
      <h3 className='mb-4 fw-bolder font-italic section_heading'><FaEye className='d-inline-block me-2' />Visibility report.</h3>

      <p className='validationInfo mb-4'>The Visibility report shows is if you are listed or not on top Local Directories. Check back regularly as we will keep you posted on any directory updates.</p>

      <div className='visibilty-report-table'>
        {
          loading ?
            <Loader />
            :
            <table className="table align-middle tableStatusList table-hover">
              <thead class="thead-dark">
                <tr class="table-active">
                  <th scope="col">LISTING</th>
                  <th scope="col">STATUS</th>
                  <th scope="col">VIEW LINK</th>
                </tr>
                <div></div>
              </thead>


              <>
                <tbody>
                  {
                    filteredData?.length > 0 && filteredData.map((item) => {

                      const imageKey = Object.keys(item)[0];
                      let imageSource = null;

                      try {
                        imageSource = require(`../../../../assets/images/${imageKey}.jpg`);
                      } catch (error) {
                        imageSource = require(`../../../../assets/images/${imageKey}.png`);
                      }
                      return <tr>
                        <td>
                          <img src={imageSource} alt="" className='tableStatusLogo' />
                        </td>
                        <td>
                          <img className='tableStatusIcon' src={Object.values(item)[0].submission.comment == 'Pending' ? inprogress : submitted} alt="" /> {Object.values(item)[0].submission.comment == 'Pending' ? 'inprogress' : 'submitted'}
                        </td>
                        <td> <img className='tableStatusIcon' src={Object.values(item)[0].submission.urlproof ? submitted : inprogress} alt="" /> {Object.values(item)[0].submission.urlproof ? 'submitted' : 'inprogress'} </td>
                      </tr>



                    })
                  }

                </tbody>

              </>


            </table>

        }


      </div>






    </div>
  )
}

