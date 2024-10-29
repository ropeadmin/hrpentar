'use client'

import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic'; 

// Dynamically import the Chart component to avoid server-side issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { ApexOptions } from "apexcharts";
import { FaCircle } from "react-icons/fa";

const GenderRatioChart = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set the state to true when it's rendered on the client side
    setIsClient(true);
  }, []);

  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut',
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        donut: {
          size: '70%',
          // labels: {
          //   show: true,
          
          //   total: {
          //     show: true,
          //     label: 'Total Employees',
          //     fontSize: '12px',
          //     fontWeight: 'normal',
          //     color: '#1F2937',
          //     formatter: function (w) {
          //       return '';
          //     },
          //   },
          // },
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#F65B5C', '#F1F2F5'], // Blue for male, red for female
    labels: ['Male', 'Female'],
    legend: {
      show: true,
      position: 'bottom'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const chartSeries = [60, 40]; // Example: 60% Male, 40% Female

  return (
    <div>
      <div 
        id="chart"
        style={{
          height: "150px",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          clipPath: "inset(0% 0 0 0)", // Clip the bottom half of the chart
        }}
      >
        {isClient && (
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="donut"
            height={400}
          />
        )}
        <div
          style={{
            position: 'absolute',
            bottom: '5%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '12px',
            fontWeight: 'normal',
            color: '#1F2937',
          }}
        >
          Total Employees
        </div>
      </div>
     {/* Custom Labels for Male and Female */}
     <div className="flex flex-col space-y-2.5 mt-4 w-[80%] mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <FaCircle color="#F65B5C" size={8} />
          <span className="text-[#1F2937] text-base font-normal">
            Male
          </span>
        </div>
        <div className="w-full flex items-center justify-end">
          <p className="text-[#0F1625] text-sm font-bold">1540</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <FaCircle color="#F1F2F5" size={8} />
          <span className="text-[#1F2937] text-base font-normal">
            Female
          </span>
        </div>
        <div className="w-full flex items-center justify-end">
          <p className="text-[#0F1625] text-sm font-bold">1540</p>
        </div>
      </div>
    </div>
  </div>
    
  );
}

export default GenderRatioChart;
