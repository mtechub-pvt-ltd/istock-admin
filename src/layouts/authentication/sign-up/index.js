// react-router-dom components
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Input from '@mui/material/Input';
// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// Material Dashboard 2 React components
import OutlinedInput from '@mui/material/OutlinedInput';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from "axios";
import url from "url/url";
import MDSnackbar from "components/MDSnackbar";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover() {
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
  const navigate = useNavigate();

  const headers = {
    'Content-Type': 'application/json'
  }
  const [errorSB, setErrorSB] = useState(false);
  const [errorSBPass, setErrorSBPass] = useState(false);
  const [errorlengthSBPass, setErrorlengthSBPass] = useState(false);

  const closeErrorlengthSBPass = () => setErrorlengthSBPass(false);

  const closeErrorSB = () => setErrorSB(false);
  const closeErrorSBPass = () => setErrorSBPass(false);

  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const submitHandler = () => {
    if(name===""||email===""||password===""){
      setErrorSB(true)
    }else if(password.length<6){
      setErrorSBPass(true)
    }else{
      axios.post(`${url}api/admin/register`, {
        username: name,
        email:email,
        password: password,
      }, { headers }).then(response => {
        console.log(response)
        navigate('/authentication/sign-in');
      })
        .catch(err => {
          console.log(err)
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
      content="Password should be atleast 6 characters long"
      // dateTime="11 mins ago"
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
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign up
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput value={name}
                              onChange={(e) => setName(e.target.value)
                              } type="text" label="UserName" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput value={email}
                              onChange={(e) => setEmail(e.target.value)
                              } type="email" label="Email" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              {/* <MDInput value={password}
                              onChange={(e) => setPassword(e.target.value)
                              } type="password" label="Password" variant="standard" fullWidth /> */}
                                <FormControl variant="variant">
          <InputLabel >Password</InputLabel>
          <Input 
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
            style={{width:'144%'}}
            // fullWidth
            label="Password"
          />
        </FormControl>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" onClick={()=>{submitHandler()}} color="success" fullWidth >
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
        <div>
        {renderErrorSB}
        </div>
        <div>
        {renderErrorSBPass}
        </div>
        <div>{renderErrorLengthSBPass}
          </div>
      </Card>
    </BasicLayout>
  );
}

export default Cover;
