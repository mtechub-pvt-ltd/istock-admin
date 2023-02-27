import url from "url/url";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import ListIcon from "@material-ui/icons/List";
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import React, { useEffect, useState, forwardRef } from "react";
import {
  IconButton
} from "@material-ui/core";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import MDSnackbar from "components/MDSnackbar";
// Data
import axios from "axios";
import Icon from "@mui/material/Icon";
import MaterialTable, { MTableToolbar } from 'material-table';
import Button from '@mui/material/Button';
import DotLoader from "react-spinners/DotLoader";
import Typography from '@mui/material/Typography';
import '../../assets/stylesheet.css'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MDBadge from "components/MDBadge";
// regex for email validation
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'rgb(32 41 64)',
  border: 'none',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};
const override = {
  display: ' block',
  margin: '0 auto',
  alignContent: "center"
  //   borderColor: 'red',
}
const color = "#5bb35f"
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function ClosedSignals() {
  const CustomPaginationComponent = (props) => {
    const {
      page,
      rowsPerPage,
      count,
      onChangePage,
      rowsPerPageOptions,
      onChangeRowsPerPage
    } = props;

    console.log(props);

    let from = rowsPerPage * page + 1;
    let to = rowsPerPage * (page + 1);
    if (to > count) {
      to = count;
    }
    return (
      <td>
        <Grid container alignItems="left" style={{ paddingTop: 8 }}>

          <Grid item xs={6} md={3} >
            <IconButton
              disabled={page === 0}
              onClick={(e) => onChangePage(e, 0)}
            >
              <SkipPreviousRoundedIcon
                fontSize="small"
                color={page === 0 ? "disabled" : "primary"}
              />
              <Typography style={{ color: "white", fontSize: '12px' }}>First Page</Typography>
            </IconButton>
          </Grid>
          <Grid item xs={6} md={2} >
            <IconButton
              disabled={page === 0}
              onClick={(e) => onChangePage(e, page - 1)}
            >
              <SkipPreviousRoundedIcon
                fontSize="small"
                color={page === 0 ? "disabled" : "primary"}
              />
              <Typography style={{ color: "white", fontSize: '12px' }}>Prev</Typography>
            </IconButton>
          </Grid>

          <Grid item xs={6} md={2} >
            <IconButton
              disabled={to >= count}
              onClick={(e) => onChangePage(e, page + 1)}
            >
              <Typography style={{ color: "white", fontSize: '12px' }}>Next</Typography>
              <SkipNextRoundedIcon
                fontSize="small"
                color={to < count ? "primary" : "disabled"}
              />
            </IconButton>
          </Grid>
          <Grid item xs={6} md={3} >
            <IconButton
              disabled={to >= count}
              onClick={(e) => onChangePage(e, count)}
            >
              <SkipNextRoundedIcon
                fontSize="small"
                color={to >= count ? "disabled" : "primary"}
              />
              <Typography style={{ color: "white", fontSize: '12px' }}>Last Page</Typography>
            </IconButton>
          </Grid>

          <Grid item xs={6} md={2} align="left" >
            <Typography variant="caption" style={{ color: "white" }}>
              {from}-{to} of {count}
            </Typography>
          </Grid>
          {/* <Grid item xs={6} md={3} >
              <FormControl>
                <InputLabel style={{color:"white",fontSixe:'12px'}}>Rows</InputLabel>
                <Select style={{color:"white"}}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={rowsPerPage}
                  onChange={onChangeRowsPerPage}
                >
                  {rowsPerPageOptions.map((x, i) => (
                    <MenuItem style={{fontSixe:'12px'}} value={x} key={i}>
                      {x}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> */}
        </Grid>
      </td>
    );
  };

  const tableIcons = {
    // * https://www.freakyjolly.com/react-material-table-how-to-show-icons-in-action-and-other-components/
    FirstPage: forwardRef((props, ref) => (
      <SkipPreviousRoundedIcon  {...props} ref={ref} />
    )),
    LastPage: forwardRef((props, ref) => (
      <SkipNextRoundedIcon {...props} ref={ref} />
    )),
    NextPage: forwardRef((props, ref) => (
      <NavigateNextRoundedIcon {...props} ref={ref} />
    )),
    PreviousPage: forwardRef((props, ref) => (
      <NavigateBeforeRoundedIcon {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ListIcon {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <FileDownloadIcon {...props} style={{ color: 'white' }} ref={ref} />),
    Search: forwardRef((props, ref) => <SearchIcon {...props} style={{ color: 'white' }} ref={ref} />)

  };


  const [value, setValue] = React.useState(0);
  const [errorSB, setErrorSB] = useState(false);
  const [errorDel, setErrorDel] = useState(false);
  const closeErrorSB = () => setErrorSB(false);
  const closeErrorDel = () => setErrorDel(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [productId, setProductId] = useState('');
  // Delete 
  const [visibleDelete, setVisibleDelete] = useState(false)
  const deleteData = (idData) => {
    setVisibleDelete(true)
    setProductId(idData)
  }
  const headers = {
    'Content-Type': 'application/json'
  }
  // Update 
  const closeSuccessSB = () => setSuccessSB(false);
  const closeSuccessDelete = () => setSuccessDelete(false);
  const closeSuccessAdd = () => setSuccessAdd(false);
  const [successSB, setSuccessSB] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [successAdd, setSuccessAdd] = useState(false);

  // Close Signal 
  const CloseSignal = (idData, company_id, cat_id, type_cat_id, buy_target, stop_loss, sell_target, actual_gain, signal_notes, closing_notes) => {
    console.log(idData)
    axios.put(`${url}api/signal/updateSignal`, {
      signal_id: idData,
      company_id: company_id,
      category_id: cat_id,
      type_cat_id: type_cat_id,
      buy_target: buy_target,
      stop_loss: stop_loss,
      sell_target: sell_target,
      actual_gain: actual_gain,
      signal_notes: signal_notes,
      closing_notes: closing_notes,
    }, { headers }).then(response => {
      console.log(response);
      getAllData();
      setSuccessSB(true)

    })
      .catch(err => {
        console.log(err)
      })
  }
  // Delete 

  const deleteDataProduct = () => {
    axios.delete(`${url}api/signal/deleteSignal/${productId}`
      , { headers })
      .then(res => {
        console.log(res.data);
        if (res.data.message === "successfully deleted signal") {
          setVisibleDelete(false)
          setSuccessDelete(true)
          setErrorDel(true)
          getAllData();
          setLoadingLoader(false)
        } else {

        }

      }).catch(err => {
        console.log(err)
      })

  }

  const renderSuccessSB = (
    <MDSnackbar
      icon="notifications"
      title="Signal Closed Successfully"
      content="This is a notification message"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      color="success"
    />
  );
  const renderSuccessDelete = (
    <MDSnackbar
      icon="notifications"
      title="Signal Deleted Successfully"
      content="This is a notification message"
      open={successDelete}
      onClose={closeSuccessDelete}
      close={closeSuccessDelete}
      color="success"
    />
  );
  const renderSuccessAdd = (
    <MDSnackbar
      icon="notifications"
      title="Signal Added Successfully"
      content="This is a notification message"
      open={successAdd}
      onClose={closeSuccessAdd}
      close={closeSuccessAdd}
      color="success"
    />
  );
  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error Message"
      content="Please Fill All Fields to continue"
      // dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );
  const renderErrorDel = (
    <MDSnackbar
      icon="notifications"
      title="Signal Deleted Successfully"
      content="This is a notification message"
      open={errorDel}
      onClose={closeErrorDel}
      close={closeErrorDel}
      color="success"
    />
  );
  const [user, setUser] = useState([]);
  const [longTerm, setLongTerm] = useState([]);

  const [swing, setSwing] = useState([]);
  const [close, setClose] = useState([]);
  const [closeCrypto, setCloseCrypto] = useState([]);

  const [categories, setCategories] = useState([]);
  const [categoryAdd, setCategoryAdd] = useState([]);
  const [stockCloseIdClosing, setStockCloseIdClosing] = useState([]);
  const [optionCloseIdClosing, setOptionCloseIdClosing] = useState([]);
  const [cryptoCloseIdClosing, setCryptoCloseIdClosing] = useState([]);



  const [tableData, setTableData] = React.useState(true);
  let detailColClose = [
    {
      title: 'Buy Target', field: 'buy_target', width: '20%'
    },
    { title: 'Stop Loss', field: 'stop_loss', width: '10%' },
    { title: 'actual_gain', field: 'actual_gain', width: '10%' },
    { title: 'sell_target', field: 'sell_target', width: '10%' },
    { title: 'max_gain', field: 'max_gain', width: '10%' },
    { title: 'max_gain', field: 'max_gain', width: '10%' },

    {
      title: 'Signal Category', field: 'closing_notes', width: '10%', render: (row) =>
        <>
          {row.category_id === stockIdData ?
            <MDBadge badgeContent="stock" color="success" variant="gradient" size="sm" />
            : null}
          {row.category_id === optionIdData ?
            <MDBadge badgeContent="option" color="success" variant="gradient" size="sm" />
            : null}
          {row.category_id === cryptoIdData ?
            <MDBadge badgeContent="crypto" color="success" variant="gradient" size="sm" />
            : null}
          {/* {row.category_id === openIdData ?
            <MDBadge badgeContent="open" color="success" variant="gradient" size="sm" />
            : null}
          {row.category_id === closeIdData ?
            <MDBadge badgeContent="closed" color="dark" variant="gradient" size="sm" />
            : null} */}
        </>
    },
    {
      title: 'date_created', field: 'date_created', width: '10%'
      , render: (row) =>
        <>
          {row.date_created.slice(0, 10)}
        </>
    },



    {
      title: 'Actions', width: '10%',
      render: (row) =>
        <>
          {/* <Icon fontSize="small" style={{ cursor: 'pointer', color: 'orange' }} onClick={() => {
            CloseSignal(row._id)
          }}>do_disturb_icon</Icon> */}
          {row.category_id === stockIdData ?
            <>
              {row.type_cat_id === stockCloseIdClosing ?
                null :
                <Tooltip title="Close Signal">

                  <Icon fontSize="small" style={{ cursor: 'pointer', color: 'orange' }} onClick={() => {
                    CloseSignal(row._id, row.company_id, row.category_id, stockCloseIdClosing, row.buy_target, row.stop_loss, row.sell_target, row.actual_gain, row.signal_notes, row.closing_notes)
                  }}>do_disturb_icon</Icon>
                </Tooltip>}

            </>

            : null}

          {row.category_id === optionIdData ?
            <> 
              {row.type_cat_id === optionCloseIdClosing ?
                null :
                <Tooltip title="Close Signal">
                  <Icon fontSize="small" style={{ cursor: 'pointer', color: 'orange' }} onClick={() => {
                    CloseSignal(row._id, row.company_id, row.category_id, optionCloseIdClosing, row.buy_target, row.stop_loss, row.sell_target, row.actual_gain, row.signal_notes, row.closing_notes)
                  }}>do_disturb_icon</Icon>
                </Tooltip>
              }
              </>
            
            : null}
          {row.category_id === cryptoIdData ?
          <>
            {row.type_cat_id === cryptoCloseIdClosing ?
                null :
                <Tooltip title="Close Signal">

                <Icon fontSize="small" style={{ cursor: 'pointer', color: 'orange' }} onClick={() => {
                  CloseSignal(row._id, row.company_id, row.category_id, cryptoCloseIdClosing, row.buy_target, row.stop_loss, row.sell_target, row.actual_gain, row.signal_notes, row.closing_notes)
                }}>do_disturb_icon</Icon>
              </Tooltip>
                }</>
           
            : null}
          {/* {row.category_id === openIdData ?
            <Tooltip title="Close Signal">
              <Icon fontSize="small" style={{ cursor: 'pointer', color: 'orange' }} onClick={() => {
                CloseSignal(row._id, row.company_id, row.type_cat_id, row.buy_target, row.stop_loss, row.sell_target, row.actual_gain, row.signal_notes, row.closing_notes)
              }}>do_disturb_icon</Icon>
            </Tooltip>
            : null}
          {row.category_id === closeIdData ?
            null
            : null} */}
          <Tooltip title="Delete">

            <Icon fontSize="small" style={{ cursor: 'pointer', color: 'red' }} onClick={() => {
              deleteData(row._id)
            }}>delete</Icon>
          </Tooltip>
          {/* </Grid>
        </Grid> */}
        </>
    },
  ]
  let detailCol = [
    {
      title: 'Buy Target', field: 'buy_target', width: '20%'
    },
    { title: 'Stop Loss', field: 'stop_loss', width: '10%' },
    { title: 'actual_gain', field: 'actual_gain', width: '10%' },
    { title: 'sell_target', field: 'sell_target', width: '10%' },
    { title: 'max_gain', field: 'max_gain', width: '10%' },
    {
      title: 'signal_notes', field: 'signal_notes', width: '10%',
      render: (row) =>
        <>
          {row.signal_notes.slice(0, 17)}....
        </>
    },
    {
      title: 'closing_notes', field: 'closing_notes', width: '10%',
      render: (row) =>
        <>
          {row.closing_notes.slice(0, 17)}....
        </>
    },
    {
      title: 'date_created', field: 'date_created', width: '10%'
      , render: (row) =>
        <>
          {row.date_created.slice(0, 10)}
        </>
    },

    {
      title: 'Actions', width: '10%',
      render: (row) =>
        <>
          <Tooltip title="Delete">

            <Icon fontSize="small" style={{ cursor: 'pointer', color: 'red' }} onClick={() => {
              deleteData(row._id)
            }}>delete</Icon>
          </Tooltip>
          {/* </Grid>
        </Grid> */}
        </>
    },
  ]
  // loader 
  const [loadingLoader, setLoadingLoader] = useState(true)
  const [stockIdData, setStockIdData] = useState('')
  const [optionIdData, setOptionIdData] = useState('')
  const [cryptoIdData, setCryptoIdData] = useState('')
  const [openIdData, setOpenIdData] = useState('')
  const [closeIdData, setCloseIdData] = useState('')



  const getAllData = () => {
    axios.get(`${url}api/category_signal/getAllCategory_Signals`)
      .then((response) => {
        console.log("categories Stock")
        console.log(response)

        // ASD
        // setCategoryAdd(response.data.result[4]._id)
        // ASD

        const stock = response.data.result[0]._id
        setStockIdData(response.data.result[0]._id)
        const option = response.data.result[1]._id
        setOptionIdData(response.data.result[1]._id)
        const crypto = response.data.result[2]._id
        setCryptoIdData(response.data.result[2]._id)
        // setOpenIdData(response.data.result[3]._id)
        // ASD
        // const close = response.data.result[4]._id
        // console.log('closedsfgjhs')
        // console.log(close)

        // setCloseIdData(response.data.result[4]._id)
        // ASD

        const users = response.data.result;
        setCategories(users);
        // Get All Close ASD
        // axios.get(`${url}api/signal/getSignalsByCategoryId_and_typeCatId/?category_id=${close}`)
        //   .then((response) => {
        //     console.log('closed data')
        //     console.log(response)
        //     const users = response.data.result;
        //     setUser(users);
        //     setCategoryAdd(close)
        //   })
        //   .catch(error => console.error(`Error:${error}`));
        // Stock 
        axios.get(`${url}api/type_category_signal/getTypeCatSignalByCategory_signal_id/${stock}`)
          .then((response) => {
            console.log('dataagagga')
            console.log(response)

            const closeStock = response.data.result[2]._id;
            setStockCloseIdClosing(response.data.result[2]._id)
            axios.get(`${url}api/signal/getSignalsByCategoryId_and_typeCatId/?category_id=${stock}&type_cat_id=${closeStock}`)
              .then((response) => {
                console.log(response.data.result)
                const users = response.data.result;
                setSwing(users);
              })
              .catch(error => console.error(`Error:${error}`));
          })
          .catch(error => console.error(`Error:${error}`));
        // Option '
        axios.get(`${url}api/type_category_signal/getTypeCatSignalByCategory_signal_id/${option}`)
          .then((response) => {
            console.log('option')
            console.log(response)

            const closeOption = response.data.result[1]._id;
            setOptionCloseIdClosing(response.data.result[1]._id)
            axios.get(`${url}api/signal/getSignalsByCategoryId_and_typeCatId/?category_id=${option}&type_cat_id=${closeOption}`)
              .then((response) => {
                console.log(response.data.result)
                const users = response.data.result;
                setClose(users);
              })
              .catch(error => console.error(`Error:${error}`));
          })
          .catch(error => console.error(`Error:${error}`));

        // Crypto '
        axios.get(`${url}api/type_category_signal/getTypeCatSignalByCategory_signal_id/${crypto}`)
          .then((response) => {
            console.log('crypto')
            console.log(response)

            const closeCrypto = response.data.result[2]._id;
            setCryptoCloseIdClosing(response.data.result[2]._id)
            axios.get(`${url}api/signal/getSignalsByCategoryId_and_typeCatId/?category_id=${crypto}&type_cat_id=${closeCrypto}`)
              .then((response) => {
                console.log(response.data.result)
                const users = response.data.result;
                setCloseCrypto(users);
              })
              .catch(error => console.error(`Error:${error}`));
          })
          .catch(error => console.error(`Error:${error}`));

        axios.get(`${url}api/signal/get_maxGain=actualGain/`)
          .then((response) => {
            const users = response.data.result;
            console.log(response.data.result)
            setLongTerm(users);
          })
          .catch(error => console.error(`Error:${error}`));
      })
      .catch(error => console.error(`Error:${error}`));

  }

  useEffect(() => {
    getAllData();
    // getAllCompanies();
    setTimeout(() => {
      setLoadingLoader(false)

    }, 3000)
  }, []);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
      setItems(items);
      console.log("items")
      console.log(items)

    }
  }, []);
  const [userIsDesktop, setUserIsDesktop] = useState(true);
  useEffect(() => {

    const interval = setInterval(() => {
      window.innerWidth > 1280 ? setUserIsDesktop(true) : setUserIsDesktop(false);
    }, 3000);

    return () => clearInterval(interval);
  }, [userIsDesktop]);

  return (
    <DashboardLayout>
      <DashboardNavbar data={items} />
      {loadingLoader ?
        <Grid container spacing={6} style={{ padding: '20px' }}>
          <Grid item xs={12} md={6} >
          </Grid>
          <Grid item xs={12} md={6} >
            <DotLoader color={color} loading={loadingLoader} css={override} size={30} />

          </Grid>
        </Grid>
        :
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card style={{ borderRadius: '10px', backgroundColor: '#202940' }}>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="success"
                  borderRadius="lg"
                  coloredShadow="success"
                >
                  <MDTypography variant="h6" color="white">
                    Closed Signals
                  </MDTypography>
                </MDBox>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider', padding: '30px' }}>
                    {userIsDesktop ?
                      <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
                        <Tab style={{ textTransform: "uppercase" }} label="Closed Stock" {...a11yProps(0)} />
                        <Tab style={{ textTransform: "uppercase" }} label="Closed Option" {...a11yProps(1)} />
                        <Tab style={{ textTransform: "uppercase" }} label="Closed Crypto" {...a11yProps(2)} />
                        <Tab style={{ textTransform: "uppercase" }} label="Signal Needs Closing" {...a11yProps(3)} />
                        {/* <Tab style={{ textTransform: "uppercase" }} label="Signal Needs Closing" {...a11yProps(4)} /> */}
                      </Tabs> :
                      <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
                        <Tab style={{ textTransform: "uppercase" }} label={<Icon fontSize="small">do_disturb_icon</Icon>} {...a11yProps(0)} />

                        <Tab style={{ textTransform: "uppercase" }} label={<Icon fontSize="small">pie_chart_icon</Icon>} {...a11yProps(1)} />

                        <Tab style={{ textTransform: "uppercase" }} label={<Icon fontSize="small">show_chart_icon</Icon>} {...a11yProps(2)} />

                        <Tab style={{ textTransform: "uppercase" }} label={<Icon fontSize="small">bar_chart_icon</Icon>} {...a11yProps(3)} />

                        {/* <Tab style={{ textTransform: "uppercase" }} label={<Icon fontSize="small">do_disturb_on_icon</Icon>} {...a11yProps(4)} /> */}

                      </Tabs>}

                  </Box>


                  {/* <TabPanel value={value} index={0} >
                  <MaterialTable style={{ backgroundColor: '#202940', borderRadius: '15px' }}
                    title=""
                    columns={detailCol}
                    data={user}
                    icons={tableIcons}
                  
                    options={{
                      // columnsButton: true,
                      headerStyle: { opacity: 0.7, fontWeight: 700, fontSize: '10px', backgroundColor: "#202940", color: "white" },
                      rowStyle: {
                        
                        color: 'white',
                        fontSize: '12px',
                      },
                      filter: true,
                      exportButton: {
                        csv: true,
                        pdf: true,
                        iconColor: 'white'
                      },

                      tableLayout: "auto",
                      sorting: true,
                      actionsColumnIndex: -1,
                    }}

                    components={{
                      
                      Pagination: (props) => {
                        return <CustomPaginationComponent {...props} />;
                      }
                    }}

                  />
                  
                  </TabPanel> */}


                  <TabPanel value={value} index={3}>
                    <MaterialTable style={{ backgroundColor: '#202940', borderRadius: '15px' }}
                      title=""
                      columns={detailColClose}
                      data={longTerm}
                      icons={tableIcons}

                      options={{
                        // columnsButton: true,
                        headerStyle: { opacity: 0.7, fontWeight: 700, fontSize: '10px', backgroundColor: "#202940", color: "white" },
                        rowStyle: {

                          color: 'white',
                          fontSize: '12px',
                        },
                        filter: true,
                        exportButton: {
                          csv: true,
                          pdf: true,
                          iconColor: 'white'
                        },

                        tableLayout: "auto",
                        sorting: true,
                        actionsColumnIndex: -1,
                      }}

                      components={{

                        Pagination: (props) => {
                          return <CustomPaginationComponent {...props} />;
                        }
                      }}

                    />

                  </TabPanel>
                  <TabPanel value={value} index={0}>
                    <MaterialTable style={{ backgroundColor: '#202940', borderRadius: '15px' }}
                      title=""
                      columns={detailCol}
                      data={swing}
                      icons={tableIcons}

                      options={{
                        // columnsButton: true,
                        headerStyle: { opacity: 0.7, fontWeight: 700, fontSize: '10px', backgroundColor: "#202940", color: "white" },
                        rowStyle: {

                          color: 'white',
                          fontSize: '12px',
                        },
                        filter: true,
                        exportButton: {
                          csv: true,
                          pdf: true,
                          iconColor: 'white'
                        },

                        tableLayout: "auto",
                        sorting: true,
                        actionsColumnIndex: -1,
                      }}

                      components={{

                        Pagination: (props) => {
                          return <CustomPaginationComponent {...props} />;
                        }
                      }}

                    />

                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <MaterialTable style={{ backgroundColor: '#202940', borderRadius: '15px' }}
                      title=""
                      columns={detailCol}
                      data={close}
                      icons={tableIcons}

                      options={{
                        // columnsButton: true,
                        headerStyle: { opacity: 0.7, fontWeight: 700, fontSize: '10px', backgroundColor: "#202940", color: "white" },
                        rowStyle: {

                          color: 'white',
                          fontSize: '12px',
                        },
                        filter: true,
                        exportButton: {
                          csv: true,
                          pdf: true,
                          iconColor: 'white'
                        },

                        tableLayout: "auto",
                        sorting: true,
                        actionsColumnIndex: -1,
                      }}

                      components={{

                        Pagination: (props) => {
                          return <CustomPaginationComponent {...props} />;
                        }
                      }}

                    />

                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <MaterialTable style={{ backgroundColor: '#202940', borderRadius: '15px' }}
                      title=""
                      columns={detailCol}
                      data={closeCrypto}
                      icons={tableIcons}

                      options={{
                        // columnsButton: true,
                        headerStyle: { opacity: 0.7, fontWeight: 700, fontSize: '10px', backgroundColor: "#202940", color: "white" },
                        rowStyle: {

                          color: 'white',
                          fontSize: '12px',
                        },
                        filter: true,
                        exportButton: {
                          csv: true,
                          pdf: true,
                          iconColor: 'white'
                        },

                        tableLayout: "auto",
                        sorting: true,
                        actionsColumnIndex: -1,
                      }}

                      components={{

                        Pagination: (props) => {
                          return <CustomPaginationComponent {...props} />;
                        }
                      }}

                    />

                  </TabPanel>
                </Box>
              </Card>
              <div>
                <Modal
                  open={visibleDelete}
                  onClose={() => setVisibleDelete(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Grid container spacing={2} align="center">
                      <Grid item xs={12} md={12}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                          Are you sure you want to delete this Signal?
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <Button autoFocus onClick={deleteDataProduct} style={{ background: 'linear-gradient(195deg, #5fb663, #3ccf42)', color: 'white', borderRadius: '10px' }}>
                          Yes
                        </Button>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <Button autoFocus style={{ border: '1px solid white', color: 'white', borderRadius: '10px' }} onClick={() => setVisibleDelete(false)}>
                          No
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Modal>
              </div>
              <div>
                {renderSuccessSB}
              </div>
              <div>
                {renderSuccessDelete}
              </div>
              <div>
                {renderSuccessAdd}
              </div>
              <div>
                {renderErrorSB}
              </div>
              <div>
                {renderErrorDel}
              </div>
            </Grid>
          </Grid>
        </MDBox>
      }
    </DashboardLayout>
  );
}

export default ClosedSignals;
