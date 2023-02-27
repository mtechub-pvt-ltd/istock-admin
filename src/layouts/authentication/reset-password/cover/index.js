// @mui material components
import url from "url/url";
import axios from "axios";
import Card from "@mui/material/Card";
import React, { useState } from "react"
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useNavigate } from 'react-router-dom';
import MDSnackbar from "components/MDSnackbar";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";

function Cover() {
  const navigate = useNavigate();

  const headers = {
    'Content-Type': 'application/json'
  }
  const [loading, setLoading] = useState(false)
  const [loadingPassword, setLoadingpassword] = useState(false)
  const [loading1, setLoading1] = useState(true)

  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorSB, setErrorSB] = useState(false);
  const [errorSBOTP, setErrorSBOTP] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [infoUpdate, setInfoUpdate] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [errorUpdate, setErrorUpdate] = useState(false);

  const closeInfoSB = () => setInfoSB(false);
  const closeInfoUpdate = () => setInfoUpdate(false);
  const closeErrorSB = () => setErrorSB(false);
  const closeErrorUpdate = () => setErrorUpdate(false);
  const closeErrorSBOTP = () => setErrorSBOTP(false);

  const sendEmailOtp = () => {
    axios.post(`${url}api/forgetPassword/userForgetPassword`, {
      email: email,
    }, { headers }).then(response => {
      console.log(response.data.data.otp)
      if (response.data.message === "No one found with This Email address") {
        setErrorSB(true)
      } else {
        setLoading(true)
        setLoading1(false)
        setLoadingpassword(false)
      }

    })
      .catch(err => {
        console.log(err)
      })
  }
  const [errorlengthSBPass, setErrorlengthSBPass] = useState(false);
  const closeErrorlengthSBPass = () => setErrorlengthSBPass(false);

  const UpdatePassword = () => {
    if(newPassword.length<6){
      setErrorlengthSBPass(true)
    }else{
      axios.put(`${url}api/admin/updateAdminPassword/`, {
        email: email,
        newPassword: newPassword,
        adminId: adminId,
      }, { headers }).then(response => {
        console.log(response);
        if (response.data.message === "password updated successfully") {
          setInfoUpdate(true)
          setTimeout(() => {
            navigate('/authentication/sign-in');
          }, 3000)
        } else {
          setErrorUpdate(true)
        }
      })
        .catch(err => {
          console.log(err)
        })
    }
   
  }
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
  const sendVerifyOtp = () => {
    axios.post(`${url}api/forgetPassword/verifyOTP`, {
      email: email,
      userEnteredOtp: otpCode
    }, { headers }).then(response => {
      console.log(response.data)
      if (response.data.message === "user found , OTP successfully matched") {
        setLoading(false)
        setAdminId(response.data.data.userId);
        setEmail(response.data.data.email);
        setInfoSB(true)
        setLoading1(false)
        setLoadingpassword(true)
      } else {
        setErrorSBOTP(true)
      }
    })
      .catch(err => {
        console.log(err)
      })

  }

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error Message"
      content="Please Enter Valid Email Address"
      // dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );
  const renderErrorUpdate = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error Message"
      content="There is some error in updating password"
      // dateTime="11 mins ago"
      open={errorUpdate}
      onClose={closeErrorUpdate}
      close={closeErrorUpdate}
      bgWhite
    />
  );
  const renderErrorSBOTP = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error Message"
      content="Invalid OTP, OTP doesnot matched"
      // dateTime="11 mins ago"
      open={errorSBOTP}
      onClose={closeErrorSBOTP}
      close={closeErrorSBOTP}
      bgWhite
    />
  );
  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      color="success"
      title="Matched Successfully"
      content="OTP Matched Successfully, Enter New Password"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );
  const renderInfoUpdate = (
    <MDSnackbar
      icon="notifications"
      color="success"
      title="Updated Successfully"
      content="Password Updated Successfully, Sign In to continue"
      open={infoUpdate}
      onClose={closeInfoUpdate}
      close={closeInfoUpdate}
    />
  );

  return (
    <BasicLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="success"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Reset Password
          </MDTypography>
          {loading ? <MDTypography display="block" variant="button" color="white" my={1}>
            You will receive an Otp in maximum 60 seconds
          </MDTypography> : null}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={4}>
              <MDTypography display="block" variant="button" color="white" my={1}>
                Enter Valid Email to verify
              </MDTypography>
              <MDInput style={{ marginBottom: '10px' }} value={email}
                onChange={(e) => setEmail(e.target.value)
                } type="email" label="Email" variant="standard" fullWidth />
              {loading ? <MDInput value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)
                } type="text" label="Enter Otp" variant="standard" fullWidth /> : null}
              {loadingPassword ?
               <MDInput value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)
                } type="text" label="Enter New Password" variant="standard" fullWidth /> : null}
            </MDBox>
            <MDBox mt={6} mb={1}>

              {loading1 ? <MDButton variant="gradient" color="success" onClick={sendEmailOtp} fullWidth>
                send Otp
              </MDButton> : null}

              {loading ? <MDButton variant="gradient" color="success" onClick={sendVerifyOtp} fullWidth>
                verify
              </MDButton> : null}
              {loadingPassword ?
                <MDButton variant="gradient"
                  color="success"
                  onClick={UpdatePassword}
                  fullWidth>
                  update
                </MDButton> : null}
            </MDBox>
          </MDBox>
        </MDBox>
        <div>
          {renderErrorSB}
        </div>
        <div>
          {renderErrorSBOTP}
        </div>
        <div>
          {renderInfoSB}
        </div>
        <div>
          {renderInfoUpdate}
        </div>
        <div>
          {renderErrorUpdate}
        </div>
        <div>
        {renderErrorLengthSBPass}
        </div>
      </Card>
    </BasicLayout>
  );
}

export default Cover;
