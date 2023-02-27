import React,{ useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from "axios";
import url from "url/url";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function TabsSignals() {
    const [value, setValue] = useState(0);
    const [valueSub, setValueSub] = useState(0);

    const [user, setUser] = useState([])

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const handleChangeSub = (event, newValue) => {
        setValueSub(newValue);
      };
    const getAllData = () => {
        axios.get(`${url}api/category_signal/getAllCategory_Signals`)
          .then((response) => {
            const users = response.data.result;
            console.log(response.data.result)
            setUser(users);
          })
          .catch(error => console.error(`Error:${error}`));
      }
      const getAllDataSubStock = () => {
        axios.get(`${url}api/type_category_signal/getTypeCatSignalByCategory_signal_id/"63367ab5d7b2790c4c024e1e`)
          .then((response) => {
            const users = response.data.result;
            console.log(response.data.result)
            setUser(users);
          })
          .catch(error => console.error(`Error:${error}`));
      }
      useEffect(() => {
        getAllData();
      }, []);
  return (
    <div>
         <Box
      sx={{ flexGrow: 1, display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
  {user.map((row) => (
        <Tab label={row.name} {...a11yProps(row._id)} />
  ))}
      </Tabs>
      <TabPanel value={value} index={0}>

      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={valueSub} onChange={handleChangeSub} aria-label="basic tabs example">

          <Tab label="Item One" {...a11yProps(0)} />

        </Tabs>
      </Box>
      <TabPanel value={valueSub} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={valueSub} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={valueSub} index={2}>
        Item Three
      </TabPanel>
    </Box>

      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </Box>
    </div>
  )
}

export default TabsSignals