import React, { useEffect, useState } from "react";
import { getApi } from "../../api/api";
import { toast } from "react-toastify";

const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [dashboardChartsData, setDashboardChartsData] = useState({});
  const [loading, setLoading] = useState(false);

  console.log(dashboardData, dashboardChartsData, "dashboard data")

  const getDashboardData = async () => {
    setLoading(true);
    try {
      const response = await getApi(`dashboard/admin`, true);
      setDashboardData(response.data)
    } catch (error) {
      if (error.response?.status !== 401) {
        toast.error("Failed to fetch dashboard data.", { position: "top-right" });
      }
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDashboardChartsData = async () => {
    setLoading(true);
    try {
      const response = await getApi(`dashboard/admin/chart`, true);
      setDashboardChartsData(response.data)
    } catch (error) {
      toast.error("Fetch dashboard charts data failed");
      console.error("Error fetching dashboard charts data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
    getDashboardChartsData()
  },[]);

  return { dashboardData, dashboardChartsData };
};

export default useDashboard;
