import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "react-apexcharts";
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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashBoard3Chart = ({ dashboardChartsData }) => {
  const [currMonthData, setCurrMonthData] = useState([]);
  const [prevMonthData, setPrevMonthData] = useState([]);

  useEffect(() => {
    if (Object.keys(dashboardChartsData).length) {
      setPrevMonthData(
        dashboardChartsData?.previousMonth?.map((data) => data?.count) || []
      );

      setCurrMonthData(
        dashboardChartsData?.currentMonth?.map((data) => data?.count) || []
      );
    }
  }, [dashboardChartsData]);

  const chartData = {
    series:
      dashboardChartsData?.paymentCounts?.map((payment) => payment?.count) ||
      [],
  };

  const chartOptions = {
    // colors: ['#008000', '#FF0000', '#FFA500', '#FFFF00'],
    labels:
      dashboardChartsData?.paymentCounts?.map((payment) => payment?.plan) || [],
    title: {
      text: "Plans Report",
    },
  };

  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [
      {
        label: "Last Month",
        data: Array.isArray(prevMonthData) ? prevMonthData : [],
        // data:[1,2,34,4],
        borderColor: "#3498db",
        backgroundColor: "rgba(52, 152, 219, 0.2)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#3498db",
      },
      {
        label: "This Month",
        data: Array.isArray(currMonthData) ? currMonthData : [],
        // data:[2,1,23,2],
        borderColor: "#2ecc71",
        backgroundColor: "rgba(46, 204, 113, 0.2)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#2ecc71",
      },
    ],
  };

  // Chart options
  const options = {
    plugins: {
      legend: {
        display: false, // Disable default legend
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return "$" + context.raw;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* Your content for the first column */}
        <div className="bg-white shadow-lg border border-gray-200 p-4 rounded-lg">
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
            <h2 className="text-lg font-bold text-indigo-900 mb-4">
              Business Report
            </h2>
            <div className="w-full">
              <Line data={data} options={options} />
            </div>
            <div className="flex justify-between w-full mt-4 text-gray-600">
              <div className="flex items-center">
                <span className="inline-block w-4 h-1 bg-blue-500 mr-2"></span>
                Last Month
              </div>
              <div className="flex items-center">
                <span className="inline-block w-4 h-1 bg-green-500 mr-2"></span>
                This Month
              </div>
            </div>
          </div>
        </div>

        {/* Your content for the second column */}
        <div className="bg-white shadow-lg border border-gray-200 p-4 rounded-lg">
          {/* Now using chartOptions and chartData correctly */}
          <Chart
            options={chartOptions}
            series={Array.isArray(chartData.series) ? chartData.series : []}
            type="donut"
          />
        </div>
      </div>
    </>
  );
};

export default DashBoard3Chart;
