import React from "react";
import DashBoardSection2 from "../DashBoardSection2";
import DashBoard1Top from "../DashBoard1Top";
import DashBoard3Chart from "../DashBoard3Chart";
import useDashboard from "../../Hooks/Dashboard/useDashboard";

const DashBoard = () => {
  const { dashboardData, dashboardChartsData } = useDashboard();
  return (
    <>
      {/* <div className="bg-white rounded-lg border border-gray-300 p-4 w-50 drop-shadow-lg mb-4"> */}
        <DashBoardSection2 />
      {/* </div> */}

      <DashBoard1Top data={dashboardData} />

      <DashBoard3Chart dashboardChartsData={dashboardChartsData}/>
    </>
  );
};

export default DashBoard;
