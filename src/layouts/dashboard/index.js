// @mui material components
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import url from "url/url";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import axios from "axios";
// Dashboard components
import Projects from "layouts/dashboard/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Dashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
     setItems(items);
    console.log("items")
    console.log(items)

    }
  }, []);
  const [stock, setStock] = useState('');
  const [option, setOption] = useState('');
  const [crypto, setCrypto] = useState('');
  const [closed, setClosed] = useState('');

  const getAllData = () => {
    axios.get(`${url}api/signal/getSignalsByCategoryId_and_typeCatId/?category_id=63367ab5d7b2790c4c024e1e`)
      .then((response) => {
        const users = response.data.result.length;
        console.log(users)
        setStock(users);
      })
      .catch(error => console.error(`Error:${error}`));
  }
  
  const getAllDataOption = () => {
    axios.get(`${url}api/signal/getSignalsByCategoryId_and_typeCatId/?category_id=63367ac7d7b2790c4c024e20`)
      .then((response) => {
        const users = response.data.result.length;
        console.log(users)
        setOption(users);
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const getAllDataCrypto = () => {
    axios.get(`${url}api/signal/getSignalsByCategoryId_and_typeCatId/?category_id=63367aefd7b2790c4c024e22`)
      .then((response) => {
        const users = response.data.result.length;
        console.log(users)
        setCrypto(users);
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const getAllDataClosed = () => {
    axios.get(`${url}api/signal/getSignalsByCategoryId_and_typeCatId/?category_id=633683742d3a2d3bb098f632`)
      .then((response) => {
        const users = response.data.result.length;
        console.log(users)
        setClosed(users);
        // console.log(state.AdminId)
      })
      .catch(error => console.error(`Error:${error}`));
  }
  useEffect(() => {
    getAllData();
    getAllDataOption();
    getAllDataCrypto();
    getAllDataClosed();
 
  }, []);

  return (
    <DashboardLayout >
      <DashboardNavbar data={items}/>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="leaderboard"
                title="Crypto Signals"
                count={crypto}
               
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="pie_chart"
                title="Stock Signals"
                count={stock}
               
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="show_chart"
                title="Option Signals"
                count={option}
              
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="timeline"
                title="Closed Signals"
                count={closed}
               
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
