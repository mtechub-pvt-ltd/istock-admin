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
import Tooltip from '@mui/material/Tooltip';
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
function UserGuide() {
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
    
    const [count, setCount] = React.useState(0);
    const [topicName, settopicName] = useState('');
    const [topicNameEdit, settopicNameEdit] = useState('');
    const closeSuccessSB = () => setSuccessSB(false);
    const closeSuccessUpdateSB = () => setSuccessUpdateSB(false);

    const closeSuccessDelete = () => setSuccessDelete(false);
    const closeSuccessAdd = () => setSuccessAdd(false);
    const closeErrorSB = () => setErrorSB(false);
    const closeErrordescSB = () => setErrordescSB(false);


    const [successSB, setSuccessSB] = useState(false);
    const [successUpdateSB, setSuccessUpdateSB] = useState(false);

    const [errorSB, setErrorSB] = useState(false);
    const [errordescSB, setErrordescSB] = useState(false);


    const [successDelete, setSuccessDelete] = useState(false);
    const [successAdd, setSuccessAdd] = useState(false);
    const [topicDescription, settopicDescription] = useState('');

    const submitHandler = () => {
        if (topicName === '' || topicDescription === '') {
            console.log('fill all fields');
            setErrorSB(true)
        } else if (topicDescription.length > 120) {
            setErrordescSB(true)

        } else {
            setLoadingLoader(true)
            setTimeout(() => {

                axios.post(`${url}api/guide/createGuide`, {
                    topicName: topicName,
                    detail: topicDescription,
                }, { headers }).then(response => {
                    console.log(response)
                    getAllData();
                    setLoadingLoader(false)
                    setAddData(false)
                    setTableData(true)
                    setEditData(false)
                    settopicDescription('');
                    settopicName('');
                    setSuccessSB(true)
                    setCount(0)
                })
                    .catch(err => {
                        console.log(err)
                    })
            }, 3000)
        }




    }
    const [productId, setProductId] = useState('');
    const [productIdEdit, setProductIdEdit] = useState('');
    const [topicDescriptionEdit, settopicDescriptionEdit] = useState('');


    // get 
    const EditData = (idData) => {
        console.log(idData)
        setProductIdEdit(idData)
        setLoadingLoader(true)
        setTimeout(() => {
            axios.get(`${url}api/guide/guideById/${idData}`)
                .then((response) => {
                    console.log('History')
                    const allData = response.data;
                    console.log(allData);
                    setLoadingLoader(false)
                    settopicNameEdit(response.data.data[0].topicName);
                    settopicDescriptionEdit(response.data.data[0].detail);
                    setAddData(false)
                    setTableData(false)
                    setEditData(true)


                })
                .catch(error => console.error(`Error:${error}`));
        }, 3000)


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


    const UpdateProductData = () => {
        setCount(0)
        setLoadingLoader(true)
        setTimeout(() => {
            axios.put(`${url}api/guide/updateGuide/`, {
                guideId: productIdEdit,
                topicName: topicNameEdit,
                detail: topicDescriptionEdit,
            }, { headers }).then(response => {
                console.log(response);
                setLoadingLoader(false)
                getAllData()
                setAddData(false)
                setTableData(true)
                setEditData(false)
                settopicNameEdit('')
                settopicDescriptionEdit('')

                // setSuccessSB(true)
                setSuccessUpdateSB(true)
            })
                .catch(err => {
                    console.log(err)
                })
        }, 3000)
    }
    // Delete 
    // Delete 
    const deleteDataProduct = () => {
        // setLoadingLoader(true)
        // setTimeout(() => {
        axios.delete(`${url}api/guide/deleteGuide/${productId}`
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
    const renderErrordescSB = (
        <MDSnackbar
            color="error"
            icon="warning"
            title="Error Message"
            content="Description should be less than 120 characters long"
            // dateTime="11 mins ago"
            open={errordescSB}
            onClose={closeErrordescSB}
            close={closeErrordescSB}
            bgWhite
        />
    );
    const renderSuccessSB = (
        <MDSnackbar
            icon="notifications"
            title="Topic Added Successfully"
            content="This is a notification message"
            open={successSB}
            onClose={closeSuccessSB}
            close={closeSuccessSB}
            color="success"
        />
    );
    const renderSuccessUpdateSB = (
        <MDSnackbar
            icon="notifications"
            title="Topic Updated Successfully"
            content="This is a notification message"
            open={successUpdateSB}
            onClose={closeSuccessUpdateSB}
            close={closeSuccessUpdateSB}
            color="success"
        />
    );
    const renderSuccessDelete = (
        <MDSnackbar
            icon="notifications"
            title="Topic Deleted Successfully"
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
            title="Topic Added Successfully"
            content="This is a notification message"
            open={successAdd}
            onClose={closeSuccessAdd}
            close={closeSuccessAdd}
            color="success"
        />
    );
    const [user, setUser] = useState([]);
    const [addData, setAddData] = React.useState(false);
    const [editData, setEditData] = React.useState(false);
    const [tableData, setTableData] = React.useState(true);

    let columns = [

        { title: 'Title', field: 'topicName', width: '70%' },
        { title: 'Topic Detail', field: 'detail', width: '70%' ,
        render: (row) =>
        <>
        {row.detail.slice(0, 17)}....
        </>},

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
    // loader 
    const [loadingLoader, setLoadingLoader] = useState(true)
    const getAllData = () => {
        axios.get(`${url}api/guide/getAllGuides`)
            .then((response) => {
                console.log(response)
                const users = response.data.data;
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
                                        All Details
                                    </MDTypography>
                                </MDBox>
                                {addData ?
                                    <MDBox style={{ maxWidth: '100%', padding: '30px', backgroundColor: '#202940', color: 'white' }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={4}>
                                                <Icon fontSize="small" style={{ cursor: 'pointer' }} onClick={() => window.location.reload()}>arrow_back_icon</Icon>

                                            </Grid>
                                            <Grid item xs={12} md={8} align="left">
                                                <MDTypography variant="h6" color="white">
                                                    Fill All Fields to add Topic
                                                </MDTypography>

                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container mt spacing={6}>
                                                    <Grid item xs={12} md={3}>
                                                        <MDTypography color="white" variant="h6" fontWeight="light">
                                                            Title *
                                                        </MDTypography>
                                                    </Grid>
                                                    <Grid item xs={12} md={9}>
                                                        <TextField value={topicName}
                                                            onChange={(e) => settopicName(e.target.value)
                                                            } id="textFieldStyle" label="Enter Topic Title" variant="outlined" />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MDTypography color="white" variant="h6" fontWeight="light">
                                                            Description *
                                                        </MDTypography>
                                                    </Grid>
                                                    <Grid item xs={12} md={9}>

                                                        <TextareaAutosize value={topicDescription}
                                                            onChange={(e) => {
                                                                settopicDescription(e.target.value)
                                                                setCount(e.target.value.length)
                                                            }
                                                            }
                                                            style={{ backgroundColor: "#202940", borderRadius: '5px', color: 'white' }}
                                                            aria-label="minimum height"
                                                            minRows={5}
                                                            id="textFieldStyle"
                                                            placeholder="Enter Some Description"
                                                        // style={{ width:' 100%' }}
                                                        />

                                                    </Grid>

                                                    <Grid item xs={12} md={12} align="right">
                                                        <Button
                                                            style={{ height: "fit-content", backgroundColor: "#1a2035", color: "white", margin: "10px", borderRadius: '10px' }}
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
                                                <div>
                                                    {renderErrorSB}
                                                </div>
                                                <div>
                                                    {renderErrordescSB}
                                                </div>
                                            </Grid>

                                        </Grid>

                                    </MDBox>
                                    : null}
                                {tableData ?
                                    <MDBox style={{ maxWidth: '100%', backgroundColor: '#202940', color: 'white' }}>
                                        <MaterialTable style={{ backgroundColor: '#202940', borderRadius: '15px' }}
                    title=""
                    columns={columns}
                    data={user}
                    icons={tableIcons}
                    actions={[
                        {
                            icon: 'add',
                            iconProps: { style: { color: "white" } },
                            tooltip: 'Add Topic',
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
                                                                Are you sure you want to delete this topic?
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
                                            {renderSuccessUpdateSB}
                                        </div>


                                    </MDBox>
                                    : null
                                }
                                {editData ?
                                    <MDBox style={{ maxWidth: '100%', padding: '30px', backgroundColor: '#202940', color: 'white' }}>
                                        <Grid container spacing={2} >
                                            <Grid item xs={12} md={4}>
                                                <Icon fontSize="small" style={{ cursor: 'pointer' }} onClick={() => window.location.reload()}>arrow_back_icon</Icon>

                                            </Grid>
                                            <Grid item xs={12} md={8} align="left">
                                                <MDTypography variant="h6" color="white">
                                                    Edit Topic Details
                                                </MDTypography>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container mt spacing={6} >

                                                    <Grid item xs={12} md={3}>
                                                        <MDTypography color="white" variant="h6" fontWeight="light">
                                                            Title *
                                                        </MDTypography>
                                                    </Grid>
                                                    <Grid item xs={12} md={9}>
                                                        <TextField value={topicNameEdit}
                                                            onChange={(e) => settopicNameEdit(e.target.value)
                                                            } id="textFieldStyle" label="Enter Topic Title" variant="outlined" />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MDTypography color="white" variant="h6" fontWeight="light">
                                                            Description *
                                                        </MDTypography>
                                                    </Grid>
                                                    <Grid item xs={12} md={9}>
                                                        <TextareaAutosize
                                                            value={topicDescriptionEdit}
                                                            onChange={(e) => {
                                                                settopicDescriptionEdit(e.target.value)
                                                                setCount(e.target.value.length)
                                                            }
                                                            }
                                                            style={{ backgroundColor: "#202940", borderRadius: '5px', color: 'white', width: '100%' }}
                                                            aria-label="minimum height"
                                                            minRows={5}
                                                            id="textFieldStyle2"
                                                            placeholder="Enter Some Detail"
                                                        // style={{ width:' 100%' }}
                                                        />



                                                    </Grid>
                                                    {/* <Grid item xs={12} md={7}>
                          </Grid> */}
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



                            </Card>
                        </Grid>
                    </Grid>
                </MDBox>
            }
        </DashboardLayout>
    );
}

export default UserGuide;
