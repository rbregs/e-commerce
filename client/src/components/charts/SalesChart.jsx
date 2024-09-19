import React from 'react';
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



export default function SalesChart({salesData}) {
  // Data for the chart
const data = {
  // labels: ['January', 'February', 'March', 'April', 'May'],
  labels: salesData?.map((data) => data?.date),
  datasets: [
    {
      label: 'Sales',
      data: salesData?.map((data) => data?.sales),
      borderColor: 'green',
      backgroundColor: 'green',
      yAxisID: 'y',
    },
    {
      label: 'Orders',
      data: salesData?.map((data) => data?.numOrders),
      borderColor: 'red',
      backgroundColor: 'red',
      yAxisID: 'y1',
    }
  ],
};

// Options for the chart
const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Sales & Order Data',
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};
  return <Line data={data} options={options} />;
}
