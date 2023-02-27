// import React, { useState, useEffect } from "react";
import url from "url/url";
// @mui material components
// import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import Tooltip from '@mui/material/Tooltip';
import XLSX from 'xlsx'
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import MDSnackbar from "components/MDSnackbar";
// Data
import axios from "axios";
import Icon from "@mui/material/Icon";
// import MaterialTable from 'material-table';
import Button from '@mui/material/Button';
import DotLoader from "react-spinners/DotLoader";
import Avatar from '@mui/material/Avatar';
// import Typography from '@mui/material/Typography';
import '../../assets/stylesheet.css'
import Modal from '@mui/material/Modal';
import MDBadge from "components/MDBadge";
import Box from '@mui/material/Box';
import React, { useEffect, useState, forwardRef } from "react";
import {
  Typography,
  makeStyles,
  Tooltip,
  Grid,
  IconButton
} from "@material-ui/core";
import MaterialTable from "material-table";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import ListIcon from "@material-ui/icons/List";
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
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
function UsersData() {
  const [productId, setProductId] = useState('');
  // Delete 
  const [visibleDelete, setVisibleDelete] = useState(false)
  const deleteData = (idData) => {
    setVisibleDelete(true)
    setProductId(idData)
  }
  const BlockUser = (idData) => {
    axios.put(`${url}api/user/change_account_status`, {
      user_id: idData,
      status: false,
    }, { headers }).then(response => {
      console.log(response);
      setSuccessSB(true)
      getAllData();


    })
      .catch(err => {
        console.log(err)
      })
  }
  const CheckUser = (idData) => {
    axios.put(`${url}api/user/change_account_status`, {
      user_id: idData,
      status: true,
    }, { headers }).then(response => {
      console.log(response);
      setSuccessSBV(true)
      getAllData();

    })
      .catch(err => {
        console.log(err)
      })
  }
  const headers = {
    'Content-Type': 'application/json'
  }
  // Update 
  const closeSuccessSB = () => setSuccessSB(false);
  const closeSuccessSBV = () => setSuccessSBV(false);

  const closeSuccessDelete = () => setSuccessDelete(false);
  const [successSB, setSuccessSB] = useState(false);
  const [successSBV, setSuccessSBV] = useState(false);

  const [successDelete, setSuccessDelete] = useState(false);

  // Delete 
  const deleteDataProduct = () => {
    // setLoadingLoader(true)
    // setTimeout(() => {
    axios.delete(`${url}api/user/deleteUser/${productId}`
      , { headers })
      .then(res => {

        console.log(res.data);
        if (res.data.message === "Deleted successfully") {
          setVisibleDelete(false)
          setSuccessDelete(true)
          getAllData();
          setLoadingLoader(false)
        } else {

        }

      }).catch(err => {
        console.log(err)
      })
    // }, 3000)

  }

  const renderSuccessDelete = (
    <MDSnackbar
      icon="notifications"
      title="User Deleted Successfully"
      content="This is a notification message"
      open={successDelete}
      onClose={closeSuccessDelete}
      close={closeSuccessDelete}
      color="success"
    />
  );
  const renderSuccessSb = (
    <MDSnackbar
      icon="notifications"
      title="User Blocked Successfully"
      content="This is a notification message"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      color="success"
    />
  );
  const renderSuccessSbVerify = (
    <MDSnackbar
      icon="notifications"
      title="User Verified Successfully"
      content="This is a notification message"
      open={successSBV}
      onClose={closeSuccessSBV}
      close={closeSuccessSBV}
      color="success"
    />
  );

  const [user, setUser] = useState([]);

  let columns = [
    {
      title: 'User', field: 'name', width: '30%', render: (row) =>
        <>
          <Grid container >
            <Grid item xs={12} md={3}>
              <Avatar src={row.image} />
            </Grid>
            <Grid item xs={12} md={9} style={{ marginTop: '6px' }}>
              <Grid container >
                <Grid item xs={12} md={12}>
                  <span>{row.username}</span>
                </Grid>
                <Grid item xs={12} md={12}>
                  <span>{row.email}</span>

                </Grid>
              </Grid>

            </Grid>
          </Grid>
        </>
    },
    {
      title: 'Account Status', field: 'account_status', width: '20%', render: (row) => <div>
        {row.account_status ?
          <MDBadge badgeContent="Verified" color="success" variant="gradient" size="sm" />
          :
          <MDBadge badgeContent="Blocked" color="warning" variant="gradient" size="sm" />
        }

      </div>
    },
    {
      title: 'Actions', width: '10%',
      render: (row) =>
        <>

          {row.account_status ?
            <Tooltip title="Block User">

              <Icon fontSize="small" style={{ cursor: 'pointer', color: '#fea21e' }} onClick={() => {
                BlockUser(row._id)
              }}>remove_circle_outline_icon</Icon>
            </Tooltip>
            :
            <Tooltip title="Verify User">

              <Icon fontSize="small" style={{ cursor: 'pointer', color: '#5db461' }} onClick={() => {
                CheckUser(row._id)
              }}>check_circle_outline_icon</Icon>
            </Tooltip>

          }
          <Tooltip title="Delete">
            <Icon fontSize="small" style={{ cursor: 'pointer', color: 'red' }} onClick={() => {
              deleteData(row._id)
            }}>delete</Icon>
          </Tooltip>

        </>
    },
  ]
  // loader 
  const [loadingLoader, setLoadingLoader] = useState(true)

  const getAllData = () => {
    axios.get(`${url}api/user/allUsers`)
      .then((response) => {
        console.log(response)
        const users = response.data.result;
        setUser(users);
      })
      .catch(error => console.error(`Error:${error}`));
  }
  useEffect(() => {
    getAllData();
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

  // Here 
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
  const downloadExcel = () => {
    // const newData=studentData.map(row=>{
    //   delete row.tableData
    //   return row
    // })
    // const workSheet=XLSX.utils.json_to_sheet(newData)
    // const workBook=XLSX.utils.book_new()
    // XLSX.utils.book_append_sheet(workBook,workSheet,"students")
    // //Buffer
    // let buf=XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
    // //Binary string
    // XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
    // //Download
    // XLSX.writeFile(workBook,"Excel.xlsx")


  }
  // const CustomTooltip = withStyles((theme) => ({
  //   tooltip: {
  //     backgroundColor: "#E1E1E1",
  //     color: "white",
  //     maxWidth: 220,
  //     fontSize: theme.typography.pxToRem(12),
  //     fontFamily: "Helvetica, Open Sans, Arial",
  //     border: "1px solid #dadde9",
  //     borderRadius: "2px"
  //   }
  // }))(Tooltip);

  // const CustomToolbarComponent = (props) => {
  //   // * https://codesandbox.io/embed/material-table-toolbar-overriding-2v6js
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "flex-end",
  //         alignItems: "center"
  //       }}
  //     >
  //       <FormControlLabel
  //         control={<Checkbox checked={checked} onChange={handleCheckbox} />}
  //         label={
  //           <Typography className={classes.checkboxCaption}>
  //             Hide inactive intakes
  //           </Typography>
  //         }
  //       />
  //       <CustomTooltip
  //         title={
  //           <React.Fragment>
  //             <Typography color="inherit">
  //               What is an inactive Intake?
  //             </Typography>
  //             An inactive intake is an intake that has been marked as
  //             “Cancelled” or “On Hold”.
  //           </React.Fragment>
  //         }
  //       >
  //         <InfoRoundedIcon style={{ color: "#0672CB" }} />
  //       </CustomTooltip>
  //       <div>
  //         <MTableToolbar {...props} />
  //       </div>
  //     </div>
  //   );
  // };




  // end 
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
                    Users Table
                  </MDTypography>
                </MDBox>

                <MDBox style={{ maxWidth: '100%', backgroundColor: '#202940', color: 'white' }}>
                  {/* <MaterialTable style={{ backgroundColor: '#202940', borderRadius: '15px' }}
                                            title=""
                                            columns={columns}
                                            data={user}
                                            options={{
                                                headerStyle: { opacity: 0.7, fontWeight: 700, fontSize: '10px', backgroundColor: "#202940", color: "white" },
                                                rowStyle: {
                                                    // backgroundColor: (selectedRow === rowData._id) ? '#EEE' : '#FFF',
                                                    // backgroundColor:''
                                                    color: 'white',
                                                    fontSize: '12px',
                                                },
                                                filter: true,
                                                exportButton: true,
                                                tableLayout: "auto",
                                                sorting: true,
                                                actionsColumnIndex: -1
                                            }}
                                        /> */}
                  <MaterialTable style={{ backgroundColor: '#202940', borderRadius: '15px' }}
                    title=""
                    columns={columns}
                    data={user}
                    icons={tableIcons}
                    // icons={{
                    //   Edit: React.forwardRef((props, ref) => (
                    //     <Edit style={{ color: "green" }} {...props} ref={ref} />
                    //   ))
                    // }}
                    options={{
                      // columnsButton: true,
                      headerStyle: { opacity: 0.7, fontWeight: 700, fontSize: '10px', backgroundColor: "#202940", color: "white" },
                      rowStyle: {
                        // backgroundColor: (selectedRow === rowData._id) ? '#EEE' : '#FFF',
                        // backgroundColor:''
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
                      // Toolbar: (props) => <CustomToolbarComponent {...props} />,
                      Pagination: (props) => {
                        return <CustomPaginationComponent {...props} />;
                      }
                    }}

                  />
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
                              Are you sure you want to delete this user?
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
                    {renderSuccessDelete}
                  </div>
                  <div>
                    {renderSuccessSb}
                  </div>
                  <div>
                    {renderSuccessSbVerify}
                  </div>


                </MDBox>

              </Card>
            </Grid>
          </Grid>
        </MDBox>
      }
    </DashboardLayout>
  );
}

export default UsersData;
