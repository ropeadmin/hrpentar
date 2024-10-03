'use client'

import dynamic from 'next/dynamic'; 
import React, { useState, useEffect } from "react";


// Dynamically import the Chart component to avoid server-side issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { ApexOptions } from "apexcharts";
import { RxDividerVertical } from "react-icons/rx";

const EtypeRatioChart = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set the state to true when it's rendered on the client side
    setIsClient(true);
  }, []);

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      stacked: true, // Stack the bars to show relative percentages
      toolbar: {
        show: false, // This will hide the toolbar (including the hamburger menu)
      },
    },
    plotOptions: {
      bar: {
        horizontal: true, // Make the bars horizontal
        barHeight: '16px',
      },
    },
    colors: ['#FFD94F', '#787DF7', '#71BFFA'], // Blue for male, red for female, green for others
    dataLabels: {
      enabled: false,
      formatter: (val: number) => `${val}%`, // Display percentage on bars
    },
    xaxis: {
      categories: ['Gender'], // Only one category (Gender)
      max: 100, // Set the max value to 100%
      axisBorder: {
        show: false, // Remove x-axis border
      },
      axisTicks: {
        show: false, // Remove x-axis ticks
      },
      labels: {
        show: false, // Remove x-axis labels
      },
    },
    yaxis: {
      show: false, // Remove y-axis
    },
    grid: {
      show: false, // Remove grid lines
    },
    tooltip: {
      enabled: false,
      y: {
        formatter: (val: number) => `${val}%`, // Tooltip shows percentage
      },
    },
    legend: {
      show: false,
      position: 'bottom',
    },
  };

  const chartSeries = [
    {
      name: 'Male',
      data: [60], // Example: 60% male
    },
    {
      name: 'Female',
      data: [30], // Example: 30% female
    },
    {
      name: 'Others',
      data: [10], // Example: 10% others
    },
  ];


  return (
    <div className="relative">
      <div id="chart">
        {isClient && (
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={70} // Adjust the height as needed
          />
        )}
      </div>
      {/* Custom Legend */}
      <div className="mx-auto flex items-center h-10 relative" style={{width: '92%', marginLeft: '6%'}}>
        {/* Male Legend */}
        <div className="relative" style={{ width: '60%', display: 'flex', flexDirection: 'column', justifyContent: "flex-start" }}>
          <div className="" style={{marginLeft: '-20px', marginBottom: '18px'}}>
            <RxDividerVertical color="#FFD94F" size={50} />
          </div>
          <div className="flex flex-col">
            <span className="text-[#0F1625] text-lg font-bold">2087</span>
            <h3 className="text-base text-[#1F2937] font-normal" >Full Time</h3>
          </div>
        </div>

        {/* Female Legend */}
        <div className="relative" style={{ width: '30%', display: 'flex', flexDirection: 'column' }}>
          <div className="" style={{marginLeft: '-20px', marginBottom: '18px'}}>
            <RxDividerVertical color="#787DF7" size={50} />
          </div>
          <div className="flex flex-col">
            <span className="text-[#0F1625] text-lg font-bold">2087</span>
            <h3 className="text-base text-[#1F2937] font-normal">Contract</h3>
          </div>
        </div>

        {/* Others Legend */}
        <div className="relative" style={{ width: '10%', display: 'flex', flexDirection: 'column' }}>
          <div className="" style={{marginLeft: '-20px', marginBottom: '18px'}}>
            <RxDividerVertical color="#71BFFA" size={50} />
          </div>
          <div className="flex flex-col">
            <span className="text-[#0F1625] text-lg font-bold">2087</span>
            <h3 className="text-base text-[#1F2937] font-normal">Interns...</h3>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default EtypeRatioChart;
