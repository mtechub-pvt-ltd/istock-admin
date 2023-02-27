import React, { useEffect, useState, forwardRef } from "react";
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
import Select from '@mui/material/Select';
import MDSnackbar from "components/MDSnackbar";
import {
    IconButton
} from "@material-ui/core";
// Data
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import Icon from "@mui/material/Icon";
import MaterialTable from 'material-table';
import Button from '@mui/material/Button';
import DotLoader from "react-spinners/DotLoader";
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import '../../assets/stylesheet.css'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import ListIcon from "@material-ui/icons/List";
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

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
function SubscriptionData() {
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

    const [errorSB, setErrorSB] = useState(false);
    const closeErrorSB = () => setErrorSB(false);
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [subsTypeID, setSubsTypeID] = React.useState('');

    const submitHandlerType = () => {
        if (subscriptionTypeName === '') {
            // console.log('empty')
            setErrorSB(true)
        } else {
            setLoadingLoader(true)
            setTimeout(() => {

                axios.post(`${url}api/subscription/createSubscription`, {
                    name: subscriptionTypeName,

                }, { headers }).then(response => {
                    console.log(response)
                    getAllData();
                    getAllSubscriptions();
                    getAllDataFeatures();
                    setLoadingLoader(false)
                    setAddData(false)
                    setAddDataType(false)
                    setTableData(true)
                    getAllDataFeatures();
                    setSuccessAddType(true)
                    setSubscriptionName('');
                })
                    .catch(err => {
                        console.log(err)
                    })
            }, 3000)
        }

    }
    const submitHandler = () => {
        if (subscriptionName === '' || subsTypeID === '') {
            // console.log('empty')
            setErrorSB(true)
        } else {
            setLoadingLoader(true)
            setTimeout(() => {

                axios.post(`${url}api/subscription_feature/createSubscriptionFeature`, {
                    name: subscriptionName,
                    subscription_id: subsTypeID
                    // logo: "companyLogo",
                    // description: companyDescription,
                }, { headers }).then(response => {
                    console.log(response)
                    getAllData();
                    getAllSubscriptions();
                    getAllDataFeatures();
                    setLoadingLoader(false)
                    setAddData(false)
                    setAddDataType(false)
                    setTableData(true)
                    getAllDataFeatures();
                    setSuccessAdd(true)
                    setSubscriptionName('');
                })
                    .catch(err => {
                        console.log(err)
                    })
            }, 3000)
        }

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
    const [productId, setProductId] = useState('');

    // Delete 
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [visibleDeleteFeature, setVisibleDeleteFeature] = useState(false)
    const [visibleDeleteType, setVisibleDeleteType] = useState(false)

    const [featureId, setFeatureId] = useState(false)
    const [TypeId, setTypeId] = useState(false)

    const deleteData = (idData) => {
        setVisibleDelete(true)
        setProductId(idData)
    }
    const deleteDataFeature = (idData) => {
        setVisibleDeleteFeature(true)
        setFeatureId(idData)
    }
    const deleteDataType = (idData) => {
        setVisibleDeleteType(true)
        setTypeId(idData)
    }

    const headers = {
        'Content-Type': 'application/json'
    }
    // Update 
    const closeSuccessSB = () => setSuccessSB(false);
    const closeSuccessDelete = () => setSuccessDelete(false);
    const closeSuccessAdd = () => setSuccessAdd(false);
    const closeSuccessAddType = () => setSuccessAddType(false);

    const [successSB, setSuccessSB] = useState(false);
    const [successDelete, setSuccessDelete] = useState(false);
    const [successAdd, setSuccessAdd] = useState(false);
    const [successAddType, setSuccessAddType] = useState(false);
    // Delete 
    const deleteDataProduct = () => {
        // setLoadingLoader(true)
        // setTimeout(() => {
        axios.delete(`${url}api/userSubscription/deleteUserSubscription/${productId}`
            , { headers })
            .then(res => {

                console.log(res.data);
                if (res.data.message === "Deleted successfully") {
                    setVisibleDelete(false)
                    setSuccessDelete(true)
                    getAllData();
                    getAllSubscriptions();
                    getAllDataFeatures();
                    setLoadingLoader(false)
                } else {

                }

            }).catch(err => {
                console.log(err)
            })
        // }, 3000)

    }
    // Delete 
    const deleteDataFeatureAdd = () => {
        // setLoadingLoader(true)
        // setTimeout(() => {
        axios.delete(`${url}api/subscription_feature/deleteSubscriptionFeature/${featureId}`
            , { headers })
            .then(res => {

                console.log(res.data);
                if (res.data.message === "Deleted successfully") {
                    setVisibleDeleteFeature(false)
                    setSuccessDelete(true)
                    getAllData();
                    getAllSubscriptions();
                    getAllDataFeatures();
                    setLoadingLoader(false)
                } else {

                }

            }).catch(err => {
                console.log(err)
            })
        // }, 3000)

    }
    // Delete 
    const deleteDataTypeAdd = () => {
        // setLoadingLoader(true)
        // setTimeout(() => {
        axios.delete(`${url}api/subscription/deleteSubscription/${TypeId}`
            , { headers })
            .then(res => {

                console.log(res.data);
                if (res.data.message === "Deleted successfully") {
                    setVisibleDeleteType(false)
                    setSuccessDelete(true)
                    getAllData();
                    getAllSubscriptions();
                    getAllDataFeatures();
                    setLoadingLoader(false)
                } else {

                }

            }).catch(err => {
                console.log(err)
            })
        // }, 3000)

    }


    const renderSuccessSB = (
        <MDSnackbar
            icon="notifications"
            title="Feature Added Successfully"
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
            title=" Deleted Successfully"
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
            title="Feature Added Successfully"
            content="This is a notification message"
            open={successAdd}
            onClose={closeSuccessAdd}
            close={closeSuccessAdd}
            color="success"
        />
    );
    const renderSuccessAddType = (
        <MDSnackbar
            icon="notifications"
            title="Type Added Successfully"
            content="This is a notification message"
            open={successAddType}
            onClose={closeSuccessAddType}
            close={closeSuccessAddType}
            color="success"
        />
    );
    const [user, setUser] = useState([]);
    const [addData, setAddData] = React.useState(false);
    const [addDataType, setAddDataType] = React.useState(false);
    const [tableData, setTableData] = React.useState(true);

    let columns = [
        {
            title: 'User', field: 'name', width: '30%', render: (row) =>
                <>
                    {row.user_id === null ?
                        <span>NULL</span>
                        :
                        <Grid container >
                            <Grid item xs={12} md={3}>
                                <Avatar src={row.user_id.image} />
                            </Grid>
                            <Grid item xs={12} md={9} style={{ marginTop: '6px' }}>
                                <Grid container >
                                    <Grid item xs={12} md={12}>
                                        <span>{row.user_id.userName}</span>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <span>{row.user_id.email}</span>

                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>
                    }

                </>
        },
        {
            title: 'Date Subscribed', field: 'date_subscribed', width: '20%',
            render: (row) =>
                <>
                    {row.date_subscribed.slice(0, 16)}
                </>
        },
        {
            title: 'End Subscription', field: 'subscription_end_date', width: '20%',
            render: (row) =>
                <>
                    {row.subscription_end_date.slice(0, 16)}
                </>
        },
        {
            title: 'Subscription Type', field: 'subscription_end_date', width: '20%',
            render: (row) =>
                <>
                    {row.subscription_id === null ?
                        <span>NULL</span>
                        :
                        <span>{row.subscription_id.name}</span>
                    }
                    {/* {row.subscription_id.name} */}
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
                </>
        },
    ]
    let columnsFeatures = [

        {
            title: 'Name', field: 'name', width: '20%',
            render: (row) =>
                <>
                    {row.name}
                </>
        },
        {
            title: 'Type', field: 'name', width: '20%',
            render: (row) =>
                <>
                    {row.subscription_id === null ?
                        <span>NULL</span>
                        :
                        <span>{row.subscription_id.name}</span>
                    }

                </>
        },
        {
            title: 'Actions', width: '10%',
            render: (row) =>
                <>
                    <Tooltip title="Delete">
                        <Icon fontSize="small" style={{ cursor: 'pointer', color: 'red' }} onClick={() => {
                            deleteDataFeature(row._id)
                        }}>delete</Icon>
                    </Tooltip>
                </>
        },
    ]

    let columnsTypes = [

        {
            title: 'Name', field: 'name', width: '20%',
            render: (row) =>
                <>
                    {row.name}
                </>
        },
        {
            title: 'Actions', width: '10%',
            render: (row) =>
                <>
                    <Tooltip title="Delete">
                        <Icon fontSize="small" style={{ cursor: 'pointer', color: 'red' }} onClick={() => {
                            deleteDataType(row._id)
                        }}>delete</Icon>
                    </Tooltip>
                </>
        },
    ]
    // loader 
    const [loadingLoader, setLoadingLoader] = useState(true)
    const [totalSubs, setTotalSubs] = useState('')
    const [totalSubsType, setTotalSubsType] = useState('')

    const [totalSubsFeatures, setTotalSubsFeatures] = useState('')

    const [subscriptionsData, setSubscriptionsData] = useState([])
    const [Features, setFeatures] = useState([])



    const getAllData = () => {
        axios.get(`${url}api/userSubscription/getAllUserSubscription`)
            .then((response) => {
                console.log(response.data.data)
                const users = response.data.data;
                setUser(users);
                setTotalSubs(response.data.data.length)
            })
            .catch(error => console.error(`Error:${error}`));
    }
    const getAllDataFeatures = () => {
        axios.get(`${url}api/subscription_feature/getAllSubscriptionFeatures`)
            .then((response) => {
                console.log("response")
                console.log(response)
                const users = response.data.data;
                setFeatures(users);
                setTotalSubsFeatures(response.data.data.length)
            })
            .catch(error => console.error(`Error:${error}`));
    }
    const getAllSubscriptions = () => {
        axios.get(`${url}api/subscription/getALlSubscriptions`)
            .then((response) => {
                console.log(response.data.data)
                const users = response.data.data;
                setSubscriptionsData(users);
                setTotalSubsType(response.data.data.length)
            })
            .catch(error => console.error(`Error:${error}`));
    }
    useEffect(() => {
        getAllData();
        getAllSubscriptions();
        getAllDataFeatures();

        setLoadingLoader(true)
        setTimeout(() => {
            setLoadingLoader(false)

        }, 3000)
    }, []);
    const [items, setItems] = useState([]);
    const [subscriptionName, setSubscriptionName] = useState('');
    const [subscriptionTypeName, setSubscriptionTypeName] = useState('');


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
                        <Grid item xs={12} md={4}>
                            <MDBox mb={1.5}>
                                <DefaultInfoCard
                                    bgColor="red"
                                    // icon="subscription_icon"
                                    title="Total Subscriptions"
                                    value={totalSubs}
                                />
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <MDBox mb={1.5}>
                                <DefaultInfoCard
                                    bgColor="red"
                                    // icon="subscription_icon"
                                    title="Total Features"
                                    value={totalSubsFeatures}
                                />
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <MDBox mb={1.5}>
                                <DefaultInfoCard
                                    bgColor="red"
                                    // icon="subscription_icon"
                                    title="Total Types"
                                    value={totalSubsType}
                                />
                            </MDBox>
                        </Grid>

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
                                        All Data
                                    </MDTypography>
                                </MDBox>
                                {addData ?
                                    <MDBox style={{ maxWidth: '100%', padding: '30px', backgroundColor: '#202940', color: 'white' }}>
                                        <Grid container spacing={2} >
                                            <Grid item xs={12} md={4}>
                                                <Icon fontSize="small" style={{ cursor: 'pointer' }} onClick={() => window.location.reload()}>arrow_back_icon</Icon>

                                            </Grid>
                                            <Grid item xs={12} md={8} align="left">
                                                <MDTypography variant="h6" color="white" >
                                                    Fill All fields to Add Features
                                                </MDTypography>
                                            </Grid>
                                            <Grid item xs={12} mt md={2} align="center" style={{ display: 'flex' }}>

                                                <MDTypography style={{ marginRight: '20px' }} color="white" id="textData" variant="h6" fontWeight="light">
                                                    Name *
                                                </MDTypography>



                                            </Grid>
                                            <Grid item xs={12} md={4} align="center">
                                                <TextField
                                                    value={subscriptionName}
                                                    onChange={(e) => setSubscriptionName(e.target.value)
                                                    }
                                                    style={{ width: '100%' }}
                                                    id="textFieldStyle" label="Enter Subscription feature" variant="outlined" />
                                            </Grid>
                                            <Grid item xs={12} md={3} align="center" mt>
                                                <MDTypography style={{ marginRight: '20px' }} color="white" id="textData" variant="h6" fontWeight="light">
                                                    Select Type *
                                                </MDTypography>
                                            </Grid>
                                            <Grid item xs={12} mt md={3} align="center" style={{ display: 'flex' }}>

                                                <Select id="textFieldStyle"
                                                    style={{ padding: '5px', width: '100%', borderColor: 'white' }}
                                                    // value={subsTypeID}
                                                    value={subsTypeID}
                                                    onChange={(e) => setSubsTypeID(e.target.value)
                                                    }
                                                    label="Category"
                                                >
                                                    {subscriptionsData.map((row) => (
                                                        <MenuItem style={{ display: 'flex', color: 'white' }} value={row._id}>{row.name}</MenuItem>
                                                    ))}

                                                </Select>
                                            </Grid>

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

                                    </MDBox>
                                    : null}
                                {addDataType ?
                                    <MDBox style={{ maxWidth: '100%', padding: '30px', backgroundColor: '#202940', color: 'white' }}>
                                        <Grid container spacing={2} >
                                            <Grid item xs={12} md={4}>
                                                <Icon fontSize="small" style={{ cursor: 'pointer' }} onClick={() => window.location.reload()}>arrow_back_icon</Icon>

                                            </Grid>
                                            <Grid item xs={12} md={8} align="left">
                                                <MDTypography variant="h6" color="white">
                                                    Fill All fields to Add Type
                                                </MDTypography>
                                            </Grid>
                                            <Grid item xs={12} mt md={2} align="center" style={{ display: 'flex' }}>

                                                <MDTypography style={{ marginRight: '20px' }} color="white" id="textData" variant="h6" fontWeight="light">
                                                    Name *
                                                </MDTypography>
                                            </Grid>
                                            <Grid item xs={12} md={4} align="center">
                                                <TextField
                                                    value={subscriptionTypeName}
                                                    onChange={(e) => setSubscriptionTypeName(e.target.value)
                                                    }
                                                    style={{ width: '100%' }}
                                                    id="textFieldStyle" label="Enter Subscription Type" variant="outlined" />
                                            </Grid>
                                            <Grid item xs={12} md={12} align="right">
                                                <Button
                                                    style={{ height: "fit-content", backgroundColor: "#1a2035", color: "white", borderRadius: '10px' }}
                                                    color="secondary"
                                                    variant="contained"
                                                    onClick={submitHandlerType}
                                                >
                                                    Save
                                                </Button>
                                            </Grid>

                                        </Grid>
                                    </MDBox>
                                    : null}

                                {tableData ?
                                    // </MDBox>
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
                                                <Tab style={{ textTransform: "uppercase" }} label="All Subscriptions" {...a11yProps(0)} />
                                                <Tab style={{ textTransform: "uppercase" }} label="Subscription Features" {...a11yProps(1)} />
                                                <Tab style={{ textTransform: "uppercase" }} label="Subscriptions Type" {...a11yProps(2)} />
                                            </Tabs>
                                        </Box>
                                        <TabPanel value={value} index={0}>

                                            <MaterialTable style={{ backgroundColor: '#202940', borderRadius: '15px' }}
                                                title=""
                                                columns={columns}
                                                data={user}
                                                icons={tableIcons}
                                                options={{
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
                                                    // Toolbar: (props) => <CustomToolbarComponent {...props} />,
                                                    Pagination: (props) => {
                                                        return <CustomPaginationComponent {...props} />;
                                                    }
                                                }}

                                            />
                                        </TabPanel>
                                        <TabPanel value={value} index={1}>
                                        <MaterialTable style={{ backgroundColor: '#202940', borderRadius: '15px' }}
                                                title=""
                                                columns={columnsFeatures}
                                                data={Features}
                                                icons={tableIcons}
                                                actions={[
                                                    {
                                                        icon: 'add',
                                                        tooltip: 'Add features',
                                                        iconProps: { style: { color: "white" } },
                                                        isFreeAction: true,
                                                        onClick: (event) => {
                                                            setAddData(true)
                                                            setAddDataType(false)

                                                            setTableData(false)
                                                        }
                                                    }
                                                ]}
                                                options={{
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
                                                    // Toolbar: (props) => <CustomToolbarComponent {...props} />,
                                                    Pagination: (props) => {
                                                        return <CustomPaginationComponent {...props} />;
                                                    }
                                                }}

                                            />
                                          
                                        </TabPanel>
                                        <TabPanel value={value} index={2}>
                                        <MaterialTable style={{ backgroundColor: '#202940', borderRadius: '15px' }}
                                                title=""
                                                columns={columnsTypes}
                                                data={subscriptionsData}
                                                icons={tableIcons}
                                                actions={[
                                                    {
                                                        icon: 'add',
                                                        tooltip: 'Add Type',
                                                        iconProps: { style: { color: "white" } },
                                                        isFreeAction: true,
                                                        onClick: (event) => {
                                                            setAddData(false)
                                                            setAddDataType(true)
                                                            setTableData(false)
                                                        }
                                                    }
                                                ]}
                                                options={{
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
                                                    // Toolbar: (props) => <CustomToolbarComponent {...props} />,
                                                    Pagination: (props) => {
                                                        return <CustomPaginationComponent {...props} />;
                                                    }
                                                }}

                                            />
                                           
                                        </TabPanel>

                                    </Box>
                                    : null
                                }
                            </Card>
                        </Grid>
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
                                                Are you sure you want to delete this subscription?
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
                            <Modal
                                open={visibleDeleteFeature}
                                onClose={() => setVisibleDeleteFeature(false)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Grid container spacing={2} align="center">
                                        <Grid item xs={12} md={12}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                Are you sure you want to delete this Feature?
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <Button autoFocus onClick={deleteDataFeatureAdd} style={{ background: 'linear-gradient(195deg, #5fb663, #3ccf42)', color: 'white', borderRadius: '10px' }}>
                                                Yes
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <Button autoFocus style={{ border: '1px solid white', color: 'white', borderRadius: '10px' }} onClick={() => setVisibleDeleteFeature(false)}>
                                                No
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Modal>
                        </div>
                        <div>
                            <Modal
                                open={visibleDeleteType}
                                onClose={() => setVisibleDeleteType(false)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Grid container spacing={2} align="center">
                                        <Grid item xs={12} md={12}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                Are you sure you want to delete this Type?
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <Button autoFocus onClick={deleteDataTypeAdd} style={{ background: 'linear-gradient(195deg, #5fb663, #3ccf42)', color: 'white', borderRadius: '10px' }}>
                                                Yes
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <Button autoFocus style={{ border: '1px solid white', color: 'white', borderRadius: '10px' }} onClick={() => setVisibleDeleteType(false)}>
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
                            {renderErrorSB}
                        </div>
                        <div>
                            {renderSuccessSB}
                        </div>
                        <div>
                            {renderSuccessAdd}</div>
                        <div>
                            {renderSuccessAddType}
                        </div>
                    </Grid>
                </MDBox>
            }
        </DashboardLayout>
    );
}

export default SubscriptionData;
