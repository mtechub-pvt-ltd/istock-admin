import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// @material-ui core components
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import OutlinedInput from '@mui/material/OutlinedInput';
// Material Dashboard 2 React components
import axios from "axios";
import url from "url/url";
// Material Dashboard 2 React example components
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import MDSnackbar from "components/MDSnackbar";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";
import TextField from '@mui/material/TextField';
// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'rgb(32 41 64)',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};
function DashboardNavbar({ absolute, light, isMini }) {
  const [values, setValues] = React.useState({
    password: '',

  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setPassword(event.target.value)
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [items, setItems] = useState([]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
      setItems(items);
      console.log("items")
      console.log(items)

    }
  }, []);
  const closeSuccessSB = () => setSuccessSB(false);
  const [successSB, setSuccessSB] = useState(false);

  const navigate = useNavigate();
  // const { state } = useLocation();
  const [open, setOpen] = useState(false);
  const [openPass, setOpenPass] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClosePass = () => setOpenPass(false);
  const [email, setEmail] = useState('');
  const [AdminId, setAdminId] = useState('');

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [openAlert, setOpenAlert] = React.useState(false);
  const ProfileUpdate = () => {

    axios.get(`${url}api/admin/specificAdmin/${items}`)
      .then((response) => {
        console.log('History')
        const allData = response.data.result;
        console.log(response.data.foundResult[0]);
        setEmail(response.data.foundResult[0].email)
        setAdminId(response.data.foundResult[0]._id)
        setUserName(response.data.foundResult[0].username)
        setOpen(true)
        setOpenMenu(false)

      })
      .catch(error => console.error(`Error:${error}`));

  }
  const PasswordUpdate = () => {
    axios.get(`${url}api/admin/specificAdmin/${items}`)
      .then((response) => {
        console.log('History')
        const allData = response.data.result;
        console.log(response.data.foundResult[0]);
        setEmail(response.data.foundResult[0].email)
        setAdminId(response.data.foundResult[0]._id)
        setUserName(response.data.foundResult[0].username)
        // setPassword(response.data.foundResult[0].password)
        setOpenPass(true)
        setOpenMenu(false)


      })
      .catch(error => console.error(`Error:${error}`));

  }
  const headers = {
    'Content-Type': 'application/json'
  }
  const [alertText,setAlertText]=useState('');
  const submitHandler = () => {
    if(userName===""||email===""){
      setAlertText("Please Enter All Fields")
      setOpenAlert(true)

    }else{
      axios.put(`${url}api/admin/updateAdminProfile/`, {
        adminId: AdminId,
        username: userName,
        email: email,
      }, { headers }).then(response => {
        console.log(response);
        // setOpen(false);
        setAlertText("Updated Successfully")
        setOpenAlert(true)
        // setSuccessSB(true)
  
      })
        .catch(err => {
          console.log(err)
        })
    }
   
  }
  const UpdatePass = () => {
    if(password===""||email===""){
      setAlertText("Please Enter All Fields")
      setOpenAlert(true)

    }else if(password.length<6){
      setAlertText("Please should be atleast 6 characters")
      setOpenAlert(true)
    }else{
    axios.put(`${url}api/admin/updateAdminPassword/`, {
      adminId: AdminId,
      email: email,
      newPassword: password
    }, { headers }).then(response => {
      console.log(response);
      setAlertText("Updated Admin Successfully")

      setOpenAlert(true)
    })
      .catch(err => {
        console.log(err)
      })
  }
}

  const renderSuccessSB = (
    <MDSnackbar
      icon="notifications"
      title="Admin Updated Successfully"
      content="This is a notification message"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      color="success"
    />
  );
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  // const { miniSidenav, transparentNavbar, fixedNavbar, darkMode } = controller;

  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);
  const handleCloseMenu = () => setOpenMenu(false);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => {
    setOpenMenu(false);
    setOpenConfigurator(dispatch, !openConfigurator);
  };
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2, display: 'flex', width: '200px' }}
    >
      <NotificationItem onClick={() => ProfileUpdate()} icon={<Icon>person</Icon>} title="Profile" />
      <NotificationItem onClick={() => PasswordUpdate()} icon={<Icon>lock</Icon>} title="Password" />
      <NotificationItem onClick={() => { navigate('/authentication/sign-in') }} icon={<Icon>logout</Icon>} title="Logout" />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            {/* <MDBox pr={1}>
              <MDInput label="Search here" />
            </MDBox> */}
            <MDBox color={light ? "white" : "inherit"}>
              {/* <Link to="/authentication/sign-in/basic">
                <IconButton sx={navbarIconButton} size="small" disableRipple>
                  <Icon sx={iconsStyle}>account_circle</Icon>
                </IconButton>
              </Link> */}
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              {/* <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton> */}
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleOpenMenu}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton>

              {renderMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
              <Collapse in={openAlert}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenAlert(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                 {alertText}
                </Alert>
              </Collapse>
            </Grid>
            <Grid item xs={10} md={10}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Admin Profile
              </Typography>
            </Grid>
            <Grid item xs={1} md={1}>
             <CloseIcon style={{color:'white'}} onClick={() => setOpen(false)}/>
            </Grid>
           
            {/* <Grid item xs={12} md={6} mt={-4}>
              <MDTypography color="white"variant="h6" fontWeight="light">
                UserName *
              </MDTypography>
            </Grid>
            <Grid item xs={12} md={6} mt={-5}>
              <TextField value={userName}
                onChange={(e) => setUserName(e.target.value)
                } id="textFieldStyle" variant="outlined" />
            </Grid> */}
            <Grid item xs={12} md={12} >
              <MDBox mb={2}>
                {/* <MDInput value={email} id="textFieldMail"
                              onChange={(e) => setEmail(e.target.value)
                              } type="email" label="Email" /> */}
                <FormControl variant="outlined" style={{ width: '100%' }}>
                  <InputLabel >Username</InputLabel>
                  <OutlinedInput
                    // type={values.showPassword ? 'text' : 'password'}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton

                          edge="end"
                        >

                          <PersonIcon style={{ color: 'white' }} />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Username"
                  />
                </FormControl>
              </MDBox>
              <MDBox mb={2}>
                {/* <MDInput value={email} id="textFieldMail"
                              onChange={(e) => setEmail(e.target.value)
                              } type="email" label="Email" /> */}
                <FormControl variant="outlined" style={{ width: '100%' }}>
                  <InputLabel >Email</InputLabel>
                  <OutlinedInput
                    // type={values.showPassword ? 'text' : 'password'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton

                          edge="end"
                        >

                          <EmailIcon style={{ color: 'white' }} />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Email"
                  />
                </FormControl>
              </MDBox>
             
            </Grid>
            {/* <Grid item xs={12} md={6}>
              <MDTypography color="white" variant="h6" fontWeight="light">
                Email *
              </MDTypography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField value={email}
                onChange={(e) => setEmail(e.target.value)
                } id="textFieldStyle" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <MDTypography color="white"variant="h6" fontWeight="light">
                Password *
              </MDTypography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField type="password" disabled value={password}
                onChange={(e) => setPassword(e.target.value)
                } id="textFieldStyle" variant="outlined" />
            </Grid> */}
            <Grid item xs={12} md={12} align="center">
              <Button
                style={{ height: "fit-content", backgroundColor: "#1a2035", color: "white", margin: "2px", borderRadius: '10px' }}
                color="secondary"
                variant="contained"
                onClick={submitHandler}
              >
                Save
              </Button>
            </Grid>
          </Grid>
          <div>
            {renderSuccessSB}
          </div>


        </Box>
      </Modal>
      <Modal
        open={openPass}
        onClose={handleClosePass}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
              <Collapse in={openAlert}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenAlert(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                 {alertText}
                </Alert>
              </Collapse>
            </Grid>
            <Grid item xs={11} md={11}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Admin Password
              </Typography>
            </Grid>
            <Grid item xs={1} md={1}>
             <CloseIcon style={{color:'white'}} onClick={() => setOpenPass(false)}/>

            </Grid>
        
            <Grid item xs={12} md={12}>
            <MDBox mb={2}>
                {/* <MDInput value={email} id="textFieldMail"
                              onChange={(e) => setEmail(e.target.value)
                              } type="email" label="Email" /> */}
                <FormControl variant="outlined" style={{ width: '100%' }}>
                  <InputLabel >Email</InputLabel>
                  <OutlinedInput
                    // type={values.showPassword ? 'text' : 'password'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton

                          edge="end"
                        >

                          <EmailIcon style={{ color: 'white' }} />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Email"
                  />
                </FormControl>
              </MDBox>
              <MDBox mb={2}>
                <FormControl variant="outlined" style={{ width: '100%' }}>
                  <InputLabel >Password</InputLabel>
                  <OutlinedInput
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <VisibilityOff style={{ color: 'white' }} /> : <Visibility style={{ color: 'white' }} />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                {/* <MDInput value={password}
                              onChange={(e) => setPassword(e.target.value)
                              } type="password" label="Password" fullWidth /> */}
              </MDBox>
            </Grid>
            {/* <Grid item xs={12} md={6} mt={-5}>
              <TextField value={email}
                onChange={(e) => setEmail(e.target.value)
                } id="textFieldStyle" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <MDTypography color="white" variant="h6" fontWeight="light">
                Password *
              </MDTypography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField type="password"
                onChange={(e) => setPassword(e.target.value)
                } id="textFieldStyle" variant="outlined" />
            </Grid> */}
            <Grid item xs={12} md={12} align="center">
              <Button
                style={{ height: "fit-content", backgroundColor: "#1a2035", color: "white", margin: "2px", borderRadius: '10px' }}
                color="secondary"
                variant="contained"
                onClick={UpdatePass}
              >
                Save
              </Button>
            </Grid>
          </Grid>



        </Box>
      </Modal>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;

