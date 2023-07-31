import React from "react";
import { Line } from 'react-chartjs-2';




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
      data: [100, 80,  150, 200, 190, 210, 170, 190, 220, 200]
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

function Chart() {
  return (
    <div className="mt-4">
      <h2>Citations chart </h2>
      <div className="mb-4">
      <Line data={data} 
      // width={100} 
      height={80} 
      />

      </div>
    </div>
  );
}

export default Chart;
