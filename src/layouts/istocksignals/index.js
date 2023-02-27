import url from "url/url";
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
import TextareaAutosize from '@mui/material/TextareaAutosize';
import axios from "axios";
import Icon from "@mui/material/Icon";
import MaterialTable from 'material-table';
import Button from '@mui/material/Button';
import DotLoader from "react-spinners/DotLoader";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import '../../assets/stylesheet.css'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Select from '@mui/material/Select';
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

function IStockSignal() {
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
  const submitHandler = () => {
    if (companyAdd === '' || categoryTypeAdd === "" || buyTargetAdd === "" || stopLossAdd === "") {
      setErrorSB(true)

    } else {
      axios.post(`${url}api/signal/createSignal`, {
        company_id: companyAdd,
        category_id: categoryAdd,
        type_cat_id: categoryTypeAdd,
        buy_target: buyTargetAdd,
        stop_loss: stopLossAdd,
        sell_target: sellTargetAdd,
        actual_gain: actualGainAdd,
        signal_notes: signalNotesAdd,
        closing_notes: closingNotesAdd,

      }, { headers }).then(response => {
        console.log(response)
        getAllData();
        // getAllDataSwing();
        // getAllDataLongTerm();
        // getAllDataClose();
        getAllCompanies();
        // getAllCategories();
        setAddData(false)
        setcloseNotesAdd(false)
        setTableData(true)
        setEditData(false)
        setSuccessAdd(true)
        setCompanyAdd('');
        setCategoryTypeAdd('');
        setBuyTargetAdd('');
        setStopLossAdd('');
        setSellTargetAdd('');
        setActualGainAdd('');
        setSignalNotesAdd('');
        setClosingNotesAdd('')

      })
        .catch(err => {
          console.log(err)
        })
    }


  }
  const [productId, setProductId] = useState('');

  // get 
  const EditData = (idData) => {
    console.log(idData)
    axios.get(`${url}api/signal/getSignalById/${idData}`)
      .then((response) => {
        console.log('History')
        const allData = response.data;
        console.log(allData);
        setCompanyEdit(response.data.result.company_id._id)
        setCategoryEdit(response.data.result.category_id._id)
        setCategoryTypeEdit(response.data.result.type_cat_id._id)
        setBuyTargetEdit(response.data.result.buy_target)
        setStopLossEdit(response.data.result.stop_loss)
        setSellTargetEdit(response.data.result.sell_target)
        setActualGainEdit(response.data.result.actual_gain)
        setSignalNotesEdit(response.data.result.signal_notes)
        setClosingNotesEdit(response.data.result.closing_notes)
        setSignalId(response.data.result._id)
        setAddData(false)
        setTableData(false)
        setcloseNotesAdd(false)
        setEditData(true)

      })
      .catch(error => console.error(`Error:${error}`));
  }
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

  const UpdateProductData = () => {
    axios.put(`${url}api/signal/updateSignal`, {
      signal_id: SignalId,
      company_id: companyEdit,
      category_id: categoryEdit,
      type_cat_id: categoryTypeEdit,
      buy_target: buyTargetEdit,
      stop_loss: stopLossEdit,
      sell_target: sellTargetEdit,
      actual_gain: actualGainEdit,
      signal_notes: signalNotesEdit,
      closing_notes: closingNotesEdit,

    }, { headers }).then(response => {
      console.log(response);
      getAllData();
      // getAllDataSwing();
      // getAllDataLongTerm();
      // getAllDataClose();
      getAllCompanies();
      // getAllCategories();
      setAddData(false)
      setTableData(true)
      setEditData(false)
      setSuccessSB(true)
      setcloseNotesAdd(false)

    })
      .catch(err => {
        console.log(err)
      })
  }
  // Delete 
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
          // getAllDataSwing();
          // getAllDataLongTerm();
          // getAllDataClose();
          getAllCompanies();
          // getAllCategories();
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
      title="Signal Updated Successfully"
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

  const [idCloseNoteAdd, setidCloseNoteAdd] = useState('');
  const [company_idCloseNoteAdd, setcompany_idCloseNoteAdd] = useState('');
  const [cat_idCloseNoteAdd, setcat_idCloseNoteAdd] = useState('');

  const [type_cat_idCloseNoteAdd, settype_cat_idCloseNoteAdd] = useState('');
  const [buy_targetCloseNoteAdd, setbuy_targettype_cat_idCloseNoteAdd] = useState('');
  const [stop_lossCloseNoteAdd, setstop_losstype_cat_idCloseNoteAdd] = useState('');
  const [sell_targetCloseNoteAdd, setsell_targetCloseNoteAdd] = useState('');
  const [actual_gainCloseNoteAdd, setactual_gainCloseNoteAdd] = useState('');
  const [signal_notesCloseNoteAdd, setsignal_notesCloseNoteAdd] = useState('');
  const [closing_notesCloseNoteAdd, setclosing_notesCloseNoteAdd] = useState('');
 const closeNotesData=()=>{
  axios.put(`${url}api/signal/updateSignal`, {
    signal_id: idCloseNoteAdd,
    company_id: company_idCloseNoteAdd,
    category_id: cat_idCloseNoteAdd,
    type_cat_id: closedStockId,
    buy_target: buy_targetCloseNoteAdd,
    stop_loss: stop_lossCloseNoteAdd,
    sell_target: sell_targetCloseNoteAdd,
    actual_gain: actual_gainCloseNoteAdd,
    signal_notes: signal_notesCloseNoteAdd,
    closing_notes: closing_notesCloseNoteAdd,

  }, { headers }).then(response => {
    console.log("response");
    console.log(response);

    getAllData();
    setclosing_notesCloseNoteAdd('')
    // getAllDataSwing();
    // getAllDataLongTerm();
    // getAllDataClose();
    getAllCompanies();
    // getAllCategories();
    setAddData(false)
    setTableData(true)
    setEditData(false)
    setSuccessSB(true)
    setcloseNotesAdd(false)

  })
    .catch(err => {
      console.log(err)
    })
 }

  const [user, setUser] = useState([]);
  const [longTerm, setLongTerm] = useState([]);
  const [swing, setSwing] = useState([]);
  const [close, setClose] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);

  const [companyAdd, setCompanyAdd] = useState('');
  const [categoryAdd, setCategoryAdd] = useState('');
  const [categoryTypeAdd, setCategoryTypeAdd] = useState('');
  const [buyTargetAdd, setBuyTargetAdd] = useState('');
  const [stopLossAdd, setStopLossAdd] = useState('');
  const [sellTargetAdd, setSellTargetAdd] = useState('');
  const [actualGainAdd, setActualGainAdd] = useState('');
  const [signalNotesAdd, setSignalNotesAdd] = useState('');
  const [closingNotesAdd, setClosingNotesAdd] = useState('');

  const [companyEdit, setCompanyEdit] = useState('');
  const [categoryEdit, setCategoryEdit] = useState('');
  const [categoryTypeEdit, setCategoryTypeEdit] = useState('');
  const [buyTargetEdit, setBuyTargetEdit] = useState('');
  const [stopLossEdit, setStopLossEdit] = useState('');
  const [sellTargetEdit, setSellTargetEdit] = useState('');
  const [actualGainEdit, setActualGainEdit] = useState('');
  const [signalNotesEdit, setSignalNotesEdit] = useState('');
  const [closingNotesEdit, setClosingNotesEdit] = useState('');
  const [SignalId, setSignalId] = useState('');

  const [addData, setAddData] = React.useState(false);
  const [editData, setEditData] = React.useState(false);
  const [tableData, setTableData] = React.useState(true);

  const closeSuccessBlockSB = () => setSuccessBlockSB(false);
  const [successBlockSB, setSuccessBlockSB] = useState(false);

  const CloseSignal = (idData, company_id, cat_id, type_cat_id,buy_target,stop_loss,sell_target,actual_gain,signal_notes) => {
  //  Close 
  // axios.get(`${url}api/signal/getSignalById/${idData}`)
  // .then((response) => {
  //   console.log('History')
  //   const allData = response.data;
  //   console.log(allData);
  // })
  // .catch(error => console.error(`Error:${error}`));

  console.log(idData)
  setidCloseNoteAdd(idData)
  setcompany_idCloseNoteAdd(company_id)
  setcat_idCloseNoteAdd(cat_id)
  settype_cat_idCloseNoteAdd(type_cat_id)
  setbuy_targettype_cat_idCloseNoteAdd(buy_target)
  setstop_losstype_cat_idCloseNoteAdd(stop_loss)
  setsell_targetCloseNoteAdd(sell_target)
  setactual_gainCloseNoteAdd(actual_gain)
  setsignal_notesCloseNoteAdd(signal_notes)
  setAddData(false)
  setTableData(false)
  setEditData(false)
  setcloseNotesAdd(true)
    // console.log(idData, company_id, type_cat_id, buy_target, stop_loss, sell_target, actual_gain, signal_notes, closing_notes)
    // axios.put(`${url}api/signal/updateSignal`, {
    //   signal_id: idData,
    //   company_id: company_id,
    //   category_id: categoryAdd,
    //   type_cat_id: closedStockId,
    //   buy_target: buy_target,
    //   stop_loss: stop_loss,
    //   sell_target: sell_target,
    //   actual_gain: actual_gain,
    //   signal_notes: signal_notes,
    //   closing_notes: closing_notes,
    // }, { headers }).then(response => {
    //   console.log("response");
    //   console.log(response);

    //   getAllData();
    //   // getAllDataSwing();
    //   // getAllDataLongTerm();
    //   // getAllDataClose();
    //   getAllCompanies();
    //   // getAllCategories();
    //   setSuccessBlockSB(true)

    // })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }
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
          {row.signal_notes.slice(0, 10)}....
        </>
    },
    {
      title: 'closing_notes', field: 'closing_notes', width: '10%',
      render: (row) =>
        <>
          {row.closing_notes.slice(0, 10)}....
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
          <Tooltip title="Close Signal">
            <Icon fontSize="small" style={{ cursor: 'pointer', color: 'orange' }} onClick={() => {
              // CLoseSignal 
              CloseSignal(row._id, row.company_id,row.category_id, row.type_cat_id,row.buy_target,row.stop_loss,row.sell_target,row.actual_gain,row.signal_notes)
              // CloseSignal(row)

            }}>do_disturb_icon</Icon>
          </Tooltip>
          <Tooltip title="Edit">

            <Icon fontSize="small" style={{ cursor: 'pointer', color: 'grey' }} onClick={() => {
              EditData(row._id)
            }}>edit_icon</Icon>
          </Tooltip>
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
  let detailColClose = [
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
          {row.signal_notes.slice(0, 10)}....
        </>
    },
    {
      title: 'closing_notes', field: 'closing_notes', width: '10%',
      render: (row) =>
        <>
          {row.closing_notes.slice(0, 10)}....
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
          <Tooltip title="Edit">
            <Icon fontSize="small" style={{ cursor: 'pointer', color: 'grey' }} onClick={() => {
              EditData(row._id)
            }}>edit_icon</Icon>
          </Tooltip>
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
  const renderSuccessBlock = (
    <MDSnackbar
      icon="notifications"
      title="Signal Closed Successfully"
      content="This is a notification message"
      open={successBlockSB}
      onClose={closeSuccessBlockSB}
      close={closeSuccessBlockSB}
      color="success"
    />
  );
  // loader 
  const [loadingLoader, setLoadingLoader] = useState(true)
  const [closedStockId, setClosedStockId] = useState('')
  const [closeNotesAdd,setcloseNotesAdd]= useState(false)

  const getAllData = () => {
    axios.get(`${url}api/category_signal/getAllCategory_Signals`)
      .then((response) => {
        console.log("categories Stock")
        console.log(response)
        setCategoryAdd(response.data.result[0]._id)
        // setstockId(categoryAdd)
        const stoxk = response.data.result[0]._id
        // getAllDataSwing();
        // getAllDataLongTerm();
        // getAllDataClose();
        const users = response.data.result;
        setCategories(users);
        // getAllData(response.data.result[0]._id);

        axios.get(`${url}api/type_category_signal/getTypeCatSignalByCategory_signal_id/${response.data.result[0]._id}`)
          .then((response) => {
            const users = response.data.result;
            console.log('sfshdjhdjh')
            console.log(response.data.result)
            console.log(response.data.result[0]._id)
            const longterm = response.data.result[0]._id
            const swingStock = response.data.result[1]._id
            const closeStock = response.data.result[2]._id
            setClosedStockId(response.data.result[2]._id)


            console.log('dgshdg')
            console.log(longterm)

            axios.get(`${url}api/signal/getSignalsByCategoryId_and_typeCatId/?category_id=${stoxk}&type_cat_id=${longterm}`)
              .then((response) => {
                console.log(response)
                setLongTerm(response.data.result);
              })
              .catch(error => console.error(`Error:${error}`));

            axios.get(`${url}api/signal/getSignalsByCategoryId_and_typeCatId/?category_id=${stoxk}&type_cat_id=${swingStock}`)
              .then((response) => {
                console.log(response)
                setSwing(response.data.result);
              })
              .catch(error => console.error(`Error:${error}`));

            axios.get(`${url}api/signal/getSignalsByCategoryId_and_typeCatId/?category_id=${stoxk}&type_cat_id=${closeStock}`)
              .then((response) => {
                console.log("sdfddfffffffffffffffffffffffffffffffffffff")

                console.log(response)
                setClose(response.data.result);
              })
              .catch(error => console.error(`Error:${error}`));
            setUser(users);
          })
          .catch(error => console.error(`Error:${error}`));
      })
      .catch(error => console.error(`Error:${error}`));


  }
  const getAllCompanies = () => {
    axios.get(`${url}api/company/getAllCompanies`)
      .then((response) => {
        const users = response.data.result;
        setCompanies(users);
      })
      .catch(error => console.error(`Error:${error}`));
  }

  useEffect(() => {
    getAllData();
    getAllCompanies();
    setLoadingLoader(true)
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
                    I Stock Signals
                  </MDTypography>
                </MDBox>
                {addData ?
                  <MDBox style={{ maxWidth: '100%', padding: '30px', backgroundColor: '#202940', color: 'white' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Icon fontSize="small" style={{ cursor: 'pointer' }} onClick={() => window.location.reload()}>arrow_back_icon</Icon>

                      </Grid>
                      <Grid item xs={12} md={8}>
                        <MDTypography variant="h6" color="white" align="left">
                          Fill All Fields to Add Signal
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Grid container mt spacing={6}>
                          <Grid item xs={12} md={3}>
                            <MDTypography color="white" variant="h6" fontWeight="light">
                              Select Company *
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Select id="textFieldStyle"
                              style={{ padding: '5px', width: '100%' }}
                              // value={age}
                              label="Name"
                              value={companyAdd}
                              onChange={(e) => setCompanyAdd(e.target.value)
                              }
                            // onChange={handleChange}
                            >
                              {companies.map((row) => (
                                <MenuItem style={{ display: 'flex', color: 'white' }} value={row._id}>{row.name}</MenuItem>
                              ))}

                            </Select>
                            {/* <TextField id="textFieldStyle" label="Enter Company Name" variant="outlined" /> */}
                          </Grid>
                          {/* <Grid item xs={12} md={3}>
                            <MDTypography color="white" variant="h6" fontWeight="light">
                              Select Category *
                            </MDTypography>
                          </Grid> */}
                          {/* <Grid item xs={12} md={3}>
                            <Select id="textFieldStyle"
                              style={{ padding: '5px', width: '100%' }}
                              // value={age}
                              value={categoryAdd}
                              onChange={(e) => setCategoryAdd(e.target.value)
                              }
                              label="Category"
                              disabled
                            // onChange={handleChange}
                            >
                              {categories.map((row) => (
                                <MenuItem style={{ display: 'flex', color: 'white' }} value={row._id}>{row.name}</MenuItem>
                              ))}

                            </Select>
                          </Grid> */}
                          <Grid item xs={12} md={3}>
                            <MDTypography color="white" variant="h6" fontWeight="light">
                              Select Category Type *
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Select id="textFieldStyle"
                              style={{ padding: '5px', width: '100%' }}
                              value={categoryTypeAdd}
                              onChange={(e) => setCategoryTypeAdd(e.target.value)
                              }
                              // value={age}
                              label="Category Type"
                            // onChange={handleChange}
                            >
                              {user.map((row) => (
                                <MenuItem style={{ display: 'flex', color: 'white' }} value={row._id}>{row.name==="closed"?<></>:<>{row.name}</>}</MenuItem>
                              ))}

                            </Select>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <MDTypography color="white" variant="h6" fontWeight="light">
                              Buy Target *
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <TextField value={buyTargetAdd} style={{ width: "100%" }}
                              onChange={(e) => setBuyTargetAdd(e.target.value)
                              } id="textFieldStyle" label="Enter Buy Target" type='number' variant="outlined" />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <MDTypography color="white" variant="h6" fontWeight="light">
                              Stop Loss *
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <TextField value={stopLossAdd} style={{ width: "100%" }}
                              onChange={(e) => setStopLossAdd(e.target.value)
                              } id="textFieldStyle" label="Enter Stop Loss" type='number' variant="outlined" />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <MDTypography color="white" variant="h6" fontWeight="light">
                              Sell Target *
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <TextField value={sellTargetAdd} style={{ width: "100%" }}
                              onChange={(e) => setSellTargetAdd(e.target.value)
                              } id="textFieldStyle" label="Enter Sell Target" type='number' variant="outlined" />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <MDTypography color="white" variant="h6" fontWeight="light">
                              Actual Gain *
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <TextField value={actualGainAdd} style={{ width: "100%" }}
                              onChange={(e) => setActualGainAdd(e.target.value)
                              } id="textFieldStyle" label="Enter Actual Gain" type='number' variant="outlined" />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <MDTypography color="white" variant="h6" fontWeight="light">
                              Signal Notes *
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <TextareaAutosize
                              value={signalNotesAdd}
                              onChange={(e) => setSignalNotesAdd(e.target.value)
                              }
                              style={{ backgroundColor: "#202940", borderRadius: '5px', color: 'white' }}
                              aria-label="minimum height"
                              minRows={5}
                              id="textFieldStyle"
                              placeholder="Enter Signal Notes"
                            />
                          </Grid>

                          {/* <Grid item xs={12} md={3} >
                            <MDTypography color="white" variant="h6" fontWeight="light">
                              Closing Notes *
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} md={3} >
                            <TextareaAutosize value={closingNotesAdd}
                              onChange={(e) => setClosingNotesAdd(e.target.value)
                              }
                              style={{ backgroundColor: "#202940", borderRadius: '5px', color: 'white' }}
                              aria-label="minimum height"
                              minRows={5}
                              id="textFieldStyle"
                              placeholder="Enter Closing Notes"
                            />
                          </Grid> */}
                          <Grid item xs={12} md={12} align="right">
                            <Button
                              style={{ height: "fit-content", backgroundColor: "#1a2035", color: "white", borderRadius: '10px' }}
                              color="secondary"
                              variant="contained"
                              onClick={submitHandler}
                            >
                              Save
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} md={12}>
                      </Grid>

                    </Grid>

                  </MDBox>
                  : null}
                {tableData ? <>
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
                        {user.map((row) => (
                          <Tab style={{ textTransform: "uppercase" }} label={row.name} {...a11yProps(row._id)} />
                        ))}
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      <MaterialTable style={{ backgroundColor: '#202940', borderRadius: '15px' }}
                        title=""
                        columns={detailCol}
                        data={longTerm}
                        icons={tableIcons}
                        actions={[
                          {
                            icon: 'add',
                            iconProps: { style: { color: "white" } },
                            tooltip: 'Add Signal',
                            isFreeAction: true,
                            onClick: (event) => {
                              setAddData(true)
                              setTableData(false)
                              setEditData(false)
                            }
                          }
                        ]}
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
                        data={swing}
                        icons={tableIcons}
                        actions={[
                          {
                            icon: 'add',
                            iconProps: { style: { color: "white" } },
                            tooltip: 'Add Signal',
                            isFreeAction: true,
                            onClick: (event) => {
                              setAddData(true)
                              setTableData(false)
                              setEditData(false)
                            }
                          }
                        ]}
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
                        columns={detailColClose}
                        data={close}
                        icons={tableIcons}
                        actions={[
                          {
                            icon: 'add',
                            iconProps: { style: { color: "white" } },
                            tooltip: 'Add Signal',
                            isFreeAction: true,
                            onClick: (event) => {
                              setAddData(true)
                              setTableData(false)
                              setEditData(false)
                            }
                          }
                        ]}
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
                </>

                  : null
                }
                {editData ?
                  <MDBox style={{ maxWidth: '100%', padding: '30px', backgroundColor: '#202940', color: 'white' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Icon fontSize="small" style={{ cursor: 'pointer' }} onClick={() => window.location.reload()}>arrow_back_icon</Icon>

                      </Grid>
                      <Grid item xs={12} md={8}>
                        <MDTypography variant="h6" color="white" align="left">
                          Edit Signal Details
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Grid container mt spacing={6}>
                          <Grid item xs={12} md={3}>
                            <MDTypography color="white" variant="h6" fontWeight="light">
                              Select Company *
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Select id="textFieldStyle"
                              style={{ padding: '5px', width: '100%' }}
                              label="Name"
                              value={companyEdit}
                              onChange={(e) => setCompanyEdit(e.target.value)
                              }
                            >
                              {companies.map((row) => (
                                <MenuItem style={{ display: 'flex', color: 'white' }} value={row._id}>{row.name}</MenuItem>
                              ))}

                            </Select>
                          </Grid>
                          {/* <Grid item xs={12} md={3}>
                            <MDTypography color="white" variant="h6" fontWeight="light">
                              Select Category *
                            </MDTypography>
                          </Grid> */}
                          {/* <Grid item xs={12} md={3}>
                            <Select id="textFieldStyle"
                              style={{ padding: '5px', width: '100%' }}
                              value={categoryEdit}
                              onChange={(e) => setCategoryEdit(e.target.value)
                              }
                              label="Category"
                              disabled
                            >
                              {categories.map((row) => (
                                <MenuItem style={{ display: 'flex', color: 'white' }} value={row._id}>{row.name}</MenuItem>
                              ))}

                            </Select>
                          </Grid> */}
                          <Grid item xs={12} md={3}>
                            <MDTypography color="white" variant="h6" fontWeight="light">
                              Select Category Type *
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Select id="textFieldStyle"
                              style={{ padding: '5px', width: '100%' }}
                              value={categoryTypeEdit}
                              onChange={(e) => setCategoryTypeEdit(e.target.value)
                              }
                              label="Category Type"
                            >
                              {user.map((row) => (
                                <MenuItem style={{ display: 'flex', color: 'white' }} value={row._id}>{row.name}</MenuItem>
                              ))}

                            </Select>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <MDTypography color="white" variant="h6" fontWeight="light">
                              Buy Target *
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <TextField value={buyTargetEdit} style={{ width: "100%" }}
                              onChange={(e) => setBuyTargetEdit(e.target.value)
                              } id="textFieldStyle" type='number' label="Enter Buy Target" variant="outlined" />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <MDTypography color="white" variant="h6" fontWeight="light">
                              Stop Loss *
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <TextField value={stopLossEdit} style={{ width: "100%" }}
                              onChange={(e) => setStopLossEdit(e.target.value)
                              } id="textFieldStyle" type='number' label="Enter Stop Loss" variant="outlined" />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <MDTypography color="white" variant="h6" fontWeight="light">
                              Sell Target *
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <TextField value={sellTargetEdit} style={{ width: "100%" }}
                              onChange={(e) => setSellTargetEdit(e.target.value)
                              } id="textFieldStyle" type='number' label="Enter Sell Target" variant="outlined" />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <MDTypography color="white" variant="h6" fontWeight="light">
                              Actual Gain *
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <TextField value={actualGainEdit} style={{ width: "100%" }}
                              onChange={(e) => setActualGainEdit(e.target.value)
                              } id="textFieldStyle" type='number' label="Enter Actual Gain" variant="outlined" />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <MDTypography color="white" variant="h6" fontWeight="light">
                              Signal Notes *
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <TextareaAutosize
                              value={signalNotesEdit}
                              onChange={(e) => setSignalNotesEdit(e.target.value)
                              }
                              style={{ backgroundColor: "#202940", borderRadius: '5px', color: 'white' }}
                              aria-label="minimum height"
                              minRows={5}
                              id="textFieldStyle"
                              placeholder="Enter Signal Notes"
                            />
                          </Grid>
                          <Grid item xs={12} md={3} >
                            <MDTypography color="white" variant="h6" fontWeight="light">
                              Closing Notes *
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} md={3} >
                            <TextareaAutosize value={closingNotesEdit}
                              onChange={(e) => setClosingNotesEdit(e.target.value)
                              }
                              style={{ backgroundColor: "#202940", borderRadius: '5px', color: 'white' }}
                              aria-label="minimum height"
                              minRows={5}
                              id="textFieldStyle"
                              placeholder="Enter Closing Notes"
                            />
                          </Grid>
                          <Grid item xs={12} md={12} align="right">
                            <Button
                              style={{ height: "fit-content", backgroundColor: "#1a2035", color: "white", margin: "10px", borderRadius: '10px' }}
                              color="secondary"
                              variant="contained"
                              onClick={UpdateProductData}
                            >
                              Update
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} md={12}>
                      </Grid>
                    </Grid>
                  </MDBox>
                  : null}
                  {/* Close Notes  */}
                  {closeNotesAdd ?
                  <MDBox style={{ maxWidth: '100%', padding: '30px', backgroundColor: '#202940', color: 'white' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Icon fontSize="small" style={{ cursor: 'pointer' }} onClick={() => window.location.reload()}>arrow_back_icon</Icon>

                      </Grid>
                      <Grid item xs={12} md={8}>
                        <MDTypography variant="h6" color="white" align="left">
                          Close Signal Data
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Grid container mt spacing={6}>
                         
                          <Grid item xs={12} md={3} >
                            <MDTypography color="white" variant="h6" fontWeight="light">
                              Closing Notes *
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} md={3} >
                            <TextareaAutosize value={closing_notesCloseNoteAdd}
                              onChange={(e) => setclosing_notesCloseNoteAdd(e.target.value)
                              }
                              style={{ backgroundColor: "#202940", borderRadius: '5px', color: 'white' }}
                              aria-label="minimum height"
                              minRows={5}
                              id="textFieldStyle"
                              placeholder="Enter Closing Notes"
                            />
                          </Grid>
                          <Grid item xs={12} md={12} align="right">
                            <Button
                              style={{ height: "fit-content", backgroundColor: "#1a2035", color: "white", margin: "10px", borderRadius: '10px' }}
                              color="secondary"
                              variant="contained"
                              onClick={()=>closeNotesData()}
                            >
                              Close Signal
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} md={12}>
                      </Grid>
                    </Grid>
                  </MDBox>
                  : null}
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
              <div>
                {renderSuccessBlock}
              </div>
            </Grid>
          </Grid>
        </MDBox>
      }
    </DashboardLayout>
  );
}

export default IStockSignal;
