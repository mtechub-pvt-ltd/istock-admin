
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import ListIcon from "@material-ui/icons/List";
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import React, { useEffect, useState, forwardRef,useRef } from "react";

import {
  IconButton
} from "@material-ui/core";

import url from "url/url";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDSnackbar from "components/MDSnackbar";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import axios from "axios";
import Icon from "@mui/material/Icon";
import MaterialTable from 'material-table';
import Button from '@mui/material/Button';
import DotLoader from "react-spinners/DotLoader";
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import '../../assets/stylesheet.css'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
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
function Company() {
  
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
  const [companyName, setcompanyName] = useState('');
  const [companyLogo, setcompanyLogo] = useState('');
  const [companyDescription, setcompanyDescription] = useState('');
  const [companyNameEdit, setcompanyNameEdit] = useState('');
  const [companyLogoEdit, setcompanyLogoEdit] = useState('');
  const [companyDescriptionEdit, setcompanyDescriptionEdit] = useState('');
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

  const submitHandler = () => {
    if (companyName === '' || companyLogo === '' || companyDescription === '') {
      console.log('fill all fields');
      setErrorSB(true)
    } else if(companyDescription.length>120){
      setErrordescSB(true)

    }else {
      setLoadingLoader(true)
      setTimeout(() => {

        axios.post(`${url}api/company/createCompany`, {
          name: companyName,
          logo: companyLogo,
          description: companyDescription,
        }, { headers }).then(response => {
          console.log(response)
          getAllData();
          setLoadingLoader(false)
          setAddData(false)
          setTableData(true)
          setEditData(false)
          setcompanyLogo('');
          setcompanyLogoEdit('');

          setcompanyName('');
          setcompanyDescription('');
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

  // get 
  const EditData = (idData) => {
    console.log(idData)
    setProductIdEdit(idData)
    setLoadingLoader(true)
    setTimeout(() => {
      axios.get(`${url}api/company/getCompanyById/${idData}`, {
        params: {
          _id: idData
        }
      })
        .then((response) => {
          console.log('History')
          const allData = response.data.result;
          console.log(allData);
          setLoadingLoader(false)
          setcompanyNameEdit(response.data.result.name);
          setCount(response.data.result.description.length)
          setcompanyDescriptionEdit(response.data.result.description);
          setcompanyLogoEdit(response.data.result.logo);
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
    if (companyNameEdit === '' || companyLogoEdit === '' || companyDescriptionEdit === '') {
      console.log('fill all fields');
      setErrorSB(true)
    } else if(companyDescriptionEdit.length>120){
      setErrordescSB(true)

    }else {
    setCount(0)
    setLoadingLoader(true)
    setTimeout(() => {
      axios.put(`${url}api/company/updateCompany`, {
        company_id: productIdEdit,
        name: companyNameEdit,
        logo: companyLogoEdit,
        description: companyDescriptionEdit,
      }, { headers }).then(response => {
        console.log(response);
        setLoadingLoader(false)
        getAllData()
        setAddData(false)
        setTableData(true)
        setEditData(false)
        // setSuccessSB(true)
        setSuccessUpdateSB(true)
      })
        .catch(err => {
          console.log(err)
        })
    }, 3000)
  }
}
  // Delete 
  // Delete 
  const deleteDataProduct = () => {
    // setLoadingLoader(true)
    // setTimeout(() => {
    axios.delete(`${url}api/company/deleteCompany/${productId}`
      , { headers })
      .then(res => {

        console.log(res.data);
        if (res.data.message === "successfully deleted company") {
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
      title="Company Added Successfully"
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
      title="Company Updated Successfully"
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
      title="Company Deleted Successfully"
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
      title="Company Added Successfully"
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
    {
      title: 'Name', field: 'name', width: '20%', render: (row) =>
        <>
          <Grid container >
            <Grid item xs={12} md={3}>
              <Avatar src={row.logo} />
            </Grid>
            <Grid item xs={12} md={9} style={{ marginTop: '10px' }}>
              <span>{row.name}</span>
            </Grid>
          </Grid>
        </>
    },
    { title: 'description', field: 'description', width: '70%' , width: '10%',
    render: (row) =>
   <>
     {row.description.slice(0, 17)}....
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
  // choose image
  const inputRef = useRef(null);

  const handleClick = () => {
    // 👇️ open file input box on click of other element
    inputRef.current.click();
  };
  const onFileChange1 = (e) => {
    const data = new FormData()
    data.append("file", e)
    data.append("upload_preset", "istock")
    data.append("cloud_name", "dlm56y4v4")
    fetch("  https://api.cloudinary.com/v1_1/dlm56y4v4/image/upload", {
      method: "post",
      body: data
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data.url)
        setcompanyLogo(data.url)
        setcompanyLogoEdit(data.url)

      })
      .catch(err => console.log(err))

  }
  // loader 
  const [loadingLoader, setLoadingLoader] = useState(true)
  const getAllData = () => {
    axios.get(`${url}api/company/getAllCompanies`)
      .then((response) => {
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
                                     <Icon fontSize="small"  style={{cursor:'pointer'}} onClick={()=>window.location.reload()}>arrow_back_icon</Icon>

                      </Grid>
                      <Grid item xs={12} md={8}>
                        <MDTypography variant="h6" color="white" align="left">
                          Fill All Fields to add Company
                        </MDTypography>
                      
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Grid container mt spacing={6}>
                          <Grid item xs={12} md={2}>
                            <MDTypography color="white"variant="h6" fontWeight="light">
                              Select Logo
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Badge color="secondary" sx={{ cursor: "pointer" }} onClick={handleClick} overlap="circular" badgeContent={
                              <>
                                <Icon fontSize="small" >
                                  add
                                </Icon>
                                <input type="file" ref={inputRef} style={{ display: 'none' }}
                                  onChange={(e) => onFileChange1(e.target.files[0])} />
                              </>} >
                              <Avatar src={companyLogo} sx={{ width: "200px", height: "200px", border: '1px solid white' }} />

                            </Badge>
                            {/* <Avatar src={MyPhoto}  sx={{ width: "200px", height: "200px" }} /> */}
                            {/* <TextField id="textFieldStyle" label="select company Logo" variant="outlined" /> */}
                          </Grid>
                          <Grid item xs={12} md={4}>
                          </Grid>
                          <Grid item xs={12} md={2}>
                            <MDTypography color="white" variant="h6" fontWeight="light">
                              Name *
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} md={10}>
                            <TextField value={companyName}
                              onChange={(e) => setcompanyName(e.target.value)
                              } id="textFieldStyle" label="Enter Company Name" variant="outlined" />
                          </Grid>
                          <Grid item xs={12} md={2}>
                            <MDTypography color="white" variant="h6" fontWeight="light">
                              Description *
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} md={9}>

                            <TextareaAutosize value={companyDescription}
                              onChange={(e) => {
                                setcompanyDescription(e.target.value)
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
                            <p style={{fontSize:'10px',marginTop:'-10px'}}>{count}/120 characters</p>

                          </Grid>
                          <Grid item xs={12} md={7}>
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
                        tooltip: 'Add Company',
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
                                Are you sure you want to delete this company?
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
                    <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                                     <Icon fontSize="small"  style={{cursor:'pointer'}} onClick={()=>window.location.reload()}>arrow_back_icon</Icon>

                      </Grid>
                      <Grid item xs={12} md={8}>
                        <MDTypography variant="h6" color="white" align="left">
                          Edit Company Details
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Grid container mt spacing={6}>
                          <Grid item xs={12} md={2}>
                            <MDTypography color="white" variant="h6" fontWeight="light">
                              Select Logo
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Badge color="secondary" sx={{ cursor: "pointer" }} onClick={handleClick} overlap="circular" badgeContent={
                              <>
                                <Icon fontSize="small" >
                                  add
                                </Icon>
                                <input type="file" ref={inputRef} style={{ display: 'none' }}
                                  onChange={(e) => onFileChange1(e.target.files[0])} />
                              </>} >
                              <Avatar src={companyLogoEdit} sx={{ width: "200px", height: "200px", border: '1px solid white' }} />

                            </Badge>
                          </Grid>
                          <Grid item xs={12} md={4}>
                          </Grid>
                          <Grid item xs={12} md={2}>
                            <MDTypography color="white"variant="h6" fontWeight="light">
                              Name *
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} md={10}>
                            <TextField value={companyNameEdit}
                              onChange={(e) => setcompanyNameEdit(e.target.value)
                              } id="textFieldStyle" label="Enter Company Name" variant="outlined" />
                          </Grid>
                          <Grid item xs={12} md={2}>
                            <MDTypography color="white" variant="h6" fontWeight="light">
                              Description *
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} md={9}>
                            <TextareaAutosize
                              value={companyDescriptionEdit}
                              onChange={(e) => {setcompanyDescriptionEdit(e.target.value)
                                setCount(e.target.value.length)}
                              }
                              style={{ backgroundColor: "#202940", borderRadius: '5px', color: 'white' ,width:'100%'}}
                              aria-label="minimum height"
                              minRows={5}
                              id="textFieldStyle2"
                              placeholder="Enter Some Description"
                            // style={{ width:' 100%' }}
                            />
                            <p style={{fontSize:'10px',marginTop:'-10px'}}>{count}/120 characters</p>

                       

                          </Grid>
                          <Grid item xs={12} md={7}>
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



              </Card>
            </Grid>
          </Grid>
          <div>
                          {renderErrorSB}
                        </div>
                        <div>
                        {renderErrordescSB}
                        </div>
        </MDBox>
      }
    </DashboardLayout>
  );
}

export default Company;
