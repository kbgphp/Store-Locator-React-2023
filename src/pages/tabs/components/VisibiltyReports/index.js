import React from 'react'
import { FaEye } from 'react-icons/fa';
import sitecard from "../../../../assets/images/site-cards.jpg";
import bradstreet from "../../../../assets/images/dnb.jpg"
import googlepublicadd from "../../../../assets/images/Google-Public-Add.png";
import inprogress from "../../../../assets/images/pending.jpg";
import submitted from "../../../../assets/images/check.jpg"

export const VisibiltyReports = () => {
  return (
    <div>
      <div className='card'>

        <h4>Patient First Primary and Urgent Care - Abington</h4>
        <p>Address:- 938 Old York Road, Abington PA, US 19001</p>
        <p>Phone:- (267) 620-0237</p>
        <p>Website:- https://www.patientfirst.com/locations/1_NTI1NTU1NzktNzE1LWxvY2F0aW9uLndlYnNpdGU%3D</p>
        <p>Email Address:- kit12kum@gmail.com</p>
      </div>

      <p>You're smart for signing up for our paid listing service. Your business data is now being pushed out to the most popular online local directories search engines and GPS devices! Now let us get to work.</p>
      <h2><FaEye />Visibility report.</h2>

      <p>The Visibility report shows is if you are listed or not on top Local Directories. Check back regularly as we will keep you posted on any directory updates.</p>

      <table class="table table-borderless">
        <thead>
          <tr>
            <th scope="col">LISTING</th>
            <th scope="col">STATUS</th>
            <th scope="col">
              VIEW LINK</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th >
              <img src={sitecard} alt="" />
            </th>
            <td>
              <img src={inprogress} alt="" /> inprogress
            </td>
            <img src={inprogress} alt="" /> inprogress
          </tr>
          <tr>
            <th >
              <img src={bradstreet} alt="" />
            </th>

            <td>
              <img src={submitted} alt="" /> submitted
            </td>

            <td>
              <img src={submitted} alt="" /> submitted

            </td>

          </tr>
          <tr>
            <th>
              <img src={googlepublicadd} alt="" />
            </th>
            <td >
              <img src={submitted} alt="" /> submitted

            </td>
            <td >
              <img src={submitted} alt="" /> submitted

            </td>

          </tr>

        </tbody>
      </table>
    </div>
  )
}


