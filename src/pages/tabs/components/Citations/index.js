import React from 'react'
import DeatailsCard from '../DeatailsCard';
import { Line } from 'react-chartjs-2';
import Chart from './Chart';
import "./Citation.scss"

const data = {
  labels: [
    "Google",
    "Bing",
    "Brownbokk",
    "Google++",
    "Verizon",
    "BubbleLife",
    "Judy's book",
    "YelloYello",
    "iBegin",
    "Here Live Maps",

  ],
  datasets: [
    {
      label: "Visit",
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(100,448, 33,0.4)",
      borderColor: "rgba(131,138,133,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(131,138,133,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 2,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(131,138,133,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [100, 80, 150, 200, 190, 210, 170, 190, 220, 200]
    },
    {
      label: "Visit Trend (No Season)",
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(47,153,76,0.4)",
      borderColor: "rgba(47,153,76,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(47,153,76,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 2,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(47,153,76,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [10, 80, 140, 20, 50, 80, 100, 130, 200, 110]
    }
  ]
};


export const Citations = ({ userAvailable }) => {
  return (
    <div>
      <DeatailsCard userAvailable={userAvailable} />


      <div className='mt-4 mb-4'>
        <h2 className='section_heading'>Citations</h2>
        <p>The Citations reports shows you where your Name , Address are #are listed across the web. it's important to have  many Citations as Google uses these as  trust signals.</p>
      </div>

      <div className='chartTableBlock 
       
       '
      >
        <Chart />
        <div className='CitationTable mt-4'>
          <table class="table align-middle table-hover">
            <thead class="thead-dark">
              <tr class="table-dark">
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>



        </div>
      </div>
    </div>
  )
}


