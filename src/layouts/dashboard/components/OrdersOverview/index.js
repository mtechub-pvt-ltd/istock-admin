/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import axios from "axios";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import url from "url/url";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

function OrdersOverview() {
  const [Closing, setClosing] = useState('');
  const [ClosingStock, setClosingStock] = useState('');
  const [ClosingOption, setClosingOption] = useState('');
  const [ClosingCrpto, setClosingCrypto] = useState('');


  const getAllData = () => {
    axios.get(`${url}api/signal/get_maxGain=actualGain/`)
      .then((response) => {
        const users = response.data.result.length;
        setClosing(users);
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const getAllDataStock = () => {
    axios.get(`${url}api/signal/getSignalsByCategoryId_and_typeCatId/?category_id=63367ab5d7b2790c4c024e1e&type_cat_id=633695fb8a86071d477b6a9a`)
      .then((response) => {
        const users = response.data.result.length;
        setClosingStock(users);
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const getAllDataOption = () => {
    axios.get(`${url}api/signal/getSignalsByCategoryId_and_typeCatId/?category_id=63367ac7d7b2790c4c024e20&type_cat_id=633e76881c661997ceca9ce9`)
      .then((response) => {
        const users = response.data.result.length;
        setClosingOption(users);
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const getAllDataCrypto = () => {
    axios.get(`${url}api/signal/getSignalsByCategoryId_and_typeCatId/?category_id=63367aefd7b2790c4c024e22&type_cat_id=633e76e71c661997ceca9cf1`)
      .then((response) => {
        const users = response.data.result.length;
        setClosingCrypto(users);
      })
      .catch(error => console.error(`Error:${error}`));
  }

  useEffect(() => {
    getAllData();
    getAllDataStock();
    getAllDataOption();
    getAllDataCrypto();

  }, []);
  return (
    <Card sx={{ height: "fit-content" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Signal Needs Closing
        </MDTypography>
 
      </MDBox>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" style={{fontSize:'12px'}}>
          Signal Closing need based on category 
        </MDTypography>
 
      </MDBox>
      <MDBox p={2}>
        <TimelineItem
          color="success"
          icon="pie_chart_icon"
          title="Stock"
          dateTime={ClosingStock}
        />
        <TimelineItem
          color="error"
          icon="show_chart_icon"
          title="Option"
          dateTime={ClosingOption}
        />
         <TimelineItem
          color="warning"
          icon="bar_chart_icon"
          title="Crypto"
          dateTime={ClosingCrpto}
        />
        <TimelineItem
          color="info"
          icon="bar_chart_icon"
          title="Closed"
          dateTime={Closing}
          lastItem
        />
       
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
