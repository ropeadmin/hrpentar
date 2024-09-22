import { alpha } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    TooltipItem,
  } from 'chart.js';
  
  // Register the required components from Chart.js
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


  const getData = (x: string[] = [], y: number[] = []) => ({
    labels: x,
    datasets: [
      {
        label: '',
        data: y,
        borderColor: '#EF0000',     // Line color
        borderWidth: 2,             // Thinner line
        pointStyle: 'circle',       // Circular points
        pointRadius: 4,             // Radius of the points
        pointHoverRadius: 6,        // Radius of points on hover
        pointBackgroundColor: '#EF0000', // Color of the points
        pointBorderColor: '#FEF0DD',     // Border color of the points
        pointBorderWidth: 2,        // Thickness of point border
        tension: 0.5,               // Curve tension of the line
        fill: {
          target: 'origin',
          above: alpha('#7CD39E1F', 0.12),
        },
      },
    ],
  });
  
  const getOptions = (step = 20): ChartOptions<'line'> => ({
    scales: {
      x: {
        ticks: {
          stepSize: 1,
          font: {
            size: 12,
            family: 'Satoshi',
          },
        },
        grid: {
          drawOnChartArea: false,
          color: 'rgba(121, 121, 121, 0.11)', // X grid color
        },
      },
      y: {
        min: 0,
        ticks: {
          stepSize: step,
          callback: (value) => `${value}%`, // Add % to y-axis ticks
          font: {
            size: 14,
            family: 'Satoshi',
          },
        },
        grid: {
          color: 'rgba(121, 121, 121, 0.11)', // Y grid color
        },
      },
    },
    plugins: {
      legend: {
        display: false, // No legend
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<'line'>) {
            const label = tooltipItem.dataset.label || '';
            const value = tooltipItem.raw;
  
            return value !== null ? `${label} ${value}%` : label; // Append % to the data point value
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false, // Adjust based on container
  });
  
  
  


const LineChart = ({data}: any) => {
  const y = data.map((data: { count: any; }) => data.count);
  const x = data.map((data: { _id: any; }) => data._id);

  return (
    <div className='relative sm:h-[370px] h-[30vh]'>
      {data.length === 0 && (
        <div className='absolute h-full w-full flex items-center justify-center'>
          <p className='text-gray-400'>No Data Available</p>
        </div>
      )}
      <Line
        data={getData(x, y)}
        options={getOptions()}
      />
    </div>
  );
};

export default LineChart;
