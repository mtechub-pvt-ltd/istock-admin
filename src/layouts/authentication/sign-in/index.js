import React,{ useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";
import './stylesheet.css'
// @mui material components
import EmailIcon from '@mui/icons-material/Email';
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
// Material Dashboard 2 React components
import OutlinedInput from '@mui/material/OutlinedInput';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import url from "url/url";
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import MDSnackbar from "components/MDSnackbar";
// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
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

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [errorSB, setErrorSB] = useState(false);
  const [errorSBPass, setErrorSBPass] = useState(false);
  const [errorlengthSBPass, setErrorlengthSBPass] = useState(false);


  const closeErrorSB = () => setErrorSB(false);
  const closeErrorSBPass = () => setErrorSBPass(false);
  const closeErrorlengthSBPass = () => setErrorlengthSBPass(false);

  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const headers = {
    'Content-Type': 'application/json'
  }
 const submitHandler = () => {
    if(email===""||password===""){
      setErrorSB(true)
    }else if(password.length<6){
      console.log('error')
      setErrorlengthSBPass(true)
    }else{
      axios.post(`${url}api/admin/login`, {
        email:email,
        password: password,
      }, { headers }).then(response => {
        console.log(response)
        if(response.data.message==="Logged in successfully"){
        // navigate('/authentication/sign-in');
          localStorage.setItem('items', JSON.stringify(response.data._id));
        navigate('/dashboard'
        // ,
        // {
        //     state: {
        //         token:response.data.token,
        //         AdminId:response.data._id
        //     }
        // }
        );
        }else{
          setErrorSBPass(true)
        }
      })
        .catch(err => {
          console.log(err)
          setErrorSBPass(true)
        })
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
  const renderErrorSBPass = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error Message"
      content="Invalid Credentials"
      dateTime="now"
      open={errorSBPass}
      onClose={closeErrorSBPass}
      close={closeErrorSBPass}
      bgWhite
    />
  );
  const renderErrorLengthSBPass = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error Message"
      content="Password should be atleast 6 characters long"
      // dateTime="11 mins ago"
      open={errorlengthSBPass}
      onClose={closeErrorlengthSBPass}
      close={closeErrorlengthSBPass}
      bgWhite
    />
  );
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="success"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Admin Sign In
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              {/* <MDInput value={email} id="textFieldMail"
                              onChange={(e) => setEmail(e.target.value)
                              } type="email" label="Email" /> */}
                               <FormControl variant="outlined" style={{width:'100%'}}>
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
                  
 <EmailIcon style={{color:'white'}}/> 
                </IconButton>
              </InputAdornment>
            }
            id="textFieldPass"
            label="Password"
          />
        </FormControl>
            </MDBox>
            <MDBox mb={2}>
            <FormControl variant="outlined" style={{width:'100%'}}>
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
                  {values.showPassword ? <VisibilityOff style={{color:'white'}}/> : <Visibility style={{color:'white'}}/>}
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
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1}>
              <MDButton style={{width:'100%'}} variant="gradient" color="success" fullWidth onClick={()=>{submitHandler()}}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={1} mb={0} textAlign="right">
              <MDTypography
                component={Link}
                to="/authentication/reset-password"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Forget Password
              </MDTypography>
            </MDBox>
            {/* <MDBox mt={1} mb={1} textAlign="center">

              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
        <div>
        {renderErrorSB}
        </div>
        <div>
        {renderErrorSBPass}
        </div>
        <div>
        {renderErrorLengthSBPass}
        </div>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
