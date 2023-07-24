import React, { useEffect } from 'react'
import { FaEye } from 'react-icons/fa';
import inprogress from "../../../../assets/images/pending.jpg";
import submitted from "../../../../assets/images/check.jpg"
import DeatailsCard from '../DeatailsCard';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

export const VisibiltyReports = ({ userAvaiable }) => {

  const [VisibilityData, setVisibilityData] = React.useState([]);

  const toast = useToast();

  useEffect(() => {
    getdata();
  }, []);

  const getdata = () => {
    axios.get('https://wix-store23-edef064ca37f.herokuapp.com/api/users/get_order/64a69ed35994208740aa6345/free').then((res) => {
      console.log("dataa", res)
      setVisibilityData(res.data);
    }).catch((err) => {
      console.log("error", err);
      toast({
        description: "Something Went Wrong",
        title: 'Something went wrong.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    });
  }


  const specificImages = ["Bing", "BrownBook", "BubbleLife", "Here Live Maps", "Verizon411", "Google", "Judy's Book"]
  const filteredData = VisibilityData?.data?.data?.progress?.filter((item) => {
    return specificImages.includes(Object.keys(item)[0])
  });



  return (
    <div>
      <DeatailsCard userAvaiable={userAvaiable} />

      <p>You're smart for signing up for our paid listing service. Your business data is now being pushed out to the most popular online local directories search engines and GPS devices! Now let us get to work.</p>
      <h2><FaEye className='d-inline-block' />Visibility report.</h2>

      <p>The Visibility report shows is if you are listed or not on top Local Directories. Check back regularly as we will keep you posted on any directory updates.</p>

      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col">LISTING</th>
            <th scope="col">STATUS</th>
            <th scope="col">
              VIEW LINK</th>
          </tr>
          <div></div>
        </thead>



        {
          filteredData?.length > 0 && filteredData.map((item) => {

            const imageKey = Object.keys(item)[0];
            let imageSource = null;

            try {
              imageSource = require(`../../../../assets/images/${imageKey}.jpg`);
            } catch (error) {
              imageSource = require(`../../../../assets/images/${imageKey}.png`);
            }

            return <tbody key={imageKey}>
              <tr>
                <th>
                  <img src={imageSource} alt="" />
                </th>
                <td>
                  <img src={Object.values(item)[0].submission.comment == 'Pending' ? inprogress : submitted} alt="" /> {Object.values(item)[0].submission.comment == 'Pending' ? 'inprogress' : 'submitted'}
                </td>
                <img src={Object.values(item)[0].submission.urlproof ? submitted : inprogress} alt="" /> {Object.values(item)[0].submission.urlproof ? 'submitted' : 'inprogress'}

              </tr>
            </tbody>
          })
        }

      </table>

    </div>
  )
}


