import { useState, useEffect } from "react";
// @mui material components
import Card from "@mui/material/Card";
// import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";
// Material Dashboard 2 React examples
// import DataTable from "examples/Tables/DataTable";
import axios from "axios";
import url from "url/url";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
// Data
// import data from "layouts/categories/Projects/data";
// import MaterialTable, { MTableToolbar } from 'material-table';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
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
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function Projects() {
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [visibleCategorySub, setVisibleCategorySub] = useState(false)

  const [productId, setProductId] = useState('');
  const [categoryName, setcategoryName] = useState('');

  const headers = {
    'Content-Type': 'application/json'
  }
  // const { columns, rows } = data();
  const [menu, setMenu] = useState(null);
  const closeSuccessSB = () => setSuccessSB(false);
  const closeSuccessDelete = () => setSuccessDelete(false);
  const closeSuccessAdd = () => setSuccessAdd(false);
  const closeSuccessAddCat = () => setSuccessAddCat(false);

  const [successSB, setSuccessSB] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [successAdd, setSuccessAdd] = useState(false);
  const [successAddCat, setSuccessAddCat] = useState(false);

  // const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  const renderSuccessSB = (
    <MDSnackbar
      icon="notifications"
      title="Category Updated Successfully"
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
      title="Category Deleted Successfully"
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
      title="Category Added Successfully"
      content="This is a notification message"
      open={successAdd}
      onClose={closeSuccessAdd}
      close={closeSuccessAdd}
      color="success"
    />
  );
  const renderSuccessAddCat = (
    <MDSnackbar
      icon="notifications"
      title="Sub Category Added Successfully"
      content="This is a notification message"
      open={successAddCat}
      onClose={closeSuccessAddCat}
      close={closeSuccessAddCat}
      color="success"
    />
  );
  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );
  const submitHandler = () => {
    setSignalAdd(true)
    setSignalData(false)

  }
  const saveCategory = () => {
    axios.post(`${url}api/category_signal/createCategorySignal`, {
      name: categoryName,
    }, { headers }).then(response => {
      console.log(response)
      getAllData();
      setSignalAdd(false)
      setSignalData(true)
      setSuccessAdd(true)
      setcategoryName('');

    })
      .catch(err => {
        console.log(err)
      })

  }
  const saveSubCat = () => {

    axios.post(`${url}api/type_category_signal/createType_categorySignal`, {
      name: subCatName,
      category_signal_id: productIdCategory
    }, { headers }).then(response => {
      console.log(response)
      getAllData();
      setSuccessAddCat(true)
      setSignalAdd(false)
      setSignalData(true)
      setSubCatName('');
      setVisibleCategorySub(false)

    })
      .catch(err => {
        console.log(err)
      })
  }
  const deleteData = (idData) => {
    setVisibleDelete(true)
    setProductId(idData)
  }
  // Category Sub
  // get 
  const [allSubCat, setAllSubCat] = useState([])
  const [subCatName, setSubCatName] = useState('')
  const [productIdCategory, setProductIdCategory] = useState('')
  const [addCatSub, setAddCatSub] = useState(false)
  const [subData, setSubData] = useState(true)

  const categorySub = (idData) => {
    setProductIdCategory(idData)
    axios.get(`${url}api/type_category_signal/getTypeCatSignalByCategory_signal_id/${idData}`)
      .then((response) => {
        console.log('History')
        const allData = response.data.result;
        console.log(allData);
        setAllSubCat(response.data.result)
        setSubData(true)
        setAddCatSub(false)
        setVisibleCategorySub(true)
      })
      .catch(error => console.error(`Error:${error}`));


  }
  // Delete 
  const deleteDataSub = (idData) => {

    axios.delete(`${url}api/type_category_signal/deleteCategorySignals_types/${idData}`
      , { headers })
      .then(res => {

        console.log(res.data);
        if (res.data.message == "successfully deleted type_category_signal") {
          setVisibleCategorySub(false)
          setSuccessDelete(true)
          getAllData();
        } else {

        }

      }).catch(err => {
        console.log(err)
      })
  }
  const deleteDataProduct = () => {

    axios.delete(`${url}api/category_signal/deleteCategorySignals/${productId}`
      , { headers })
      .then(res => {

        console.log(res.data);
        if (res.data.message == "successfully deleted category_signal") {
          setVisibleDelete(false)
          setSuccessDelete(true)
          getAllData();
        } else {

        }

      }).catch(err => {
        console.log(err)
      })
  }
  const [signalAdd, setSignalAdd] = useState(false)
  const [signalData, setSignalData] = useState(true)
  const [user, setUser] = useState([])

  const getAllData = () => {
    axios.get(`${url}api/category_signal/getAllCategory_Signals`)
      .then((response) => {
        const users = response.data.result;
        console.log(response.data.result)
        setUser(users);
      })
      .catch(error => console.error(`Error:${error}`));
  }
  useEffect(() => {
    getAllData();
  }, []);

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <Grid container >
            <Grid item xs={10} md={10}>
              <MDTypography variant="h6" >
                Signal categories
              </MDTypography>
            </Grid>
            <Grid item xs={2} md={2}>
              {signalData ? <><Button
                style={{ height: "fit-content", backgroundColor: "#1a2035", color: "white", margin: "10px", borderRadius: '10px' }}
                color="secondary"
                variant="contained"
                onClick={submitHandler}
              >
                Add
              </Button></> :
                <> <Button
                  style={{ height: "fit-content", backgroundColor: "#1a2035", color: "white", margin: "10px", borderRadius: '10px' }}
                  color="secondary"
                  variant="contained"
                  onClick={saveCategory}
                >
                  Save
                </Button>
                </>
              }
            </Grid>
            <Grid item xs={12} md={12}>
              {signalAdd ? <>
                <Grid container mt spacing={6}>
                  <Grid item xs={6} md={3}>
                    <MDTypography color="white">
                      Name *
                    </MDTypography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField value={categoryName}
                      onChange={(e) => setcategoryName(e.target.value)
                      } id="textFieldStyle" label="Enter Category Name" variant="outlined" />
                  </Grid>
                </Grid>
              </> : null}
            </Grid>
          </Grid>

        </MDBox>
        {renderMenu}
      </MDBox>
      <MDBox>
        <TableContainer >
          <Table aria-label="simple table">
            {/* <TableHead> */}
            <TableRow>
              <TableCell style={{ fontWeight: 700, color: 'white' }}>Categories</TableCell>
              <TableCell style={{ fontWeight: 700, color: 'white' }}>Actions</TableCell>

            </TableRow>
            {/* </TableHead> */}
            <TableBody>
              {user.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell style={{ color: 'white' }}>
                    {row.name}
                  </TableCell>
                  <TableCell >
                    <Icon onClick={() => { categorySub(row._id) }}
                      style={{ color: 'white', cursor: 'pointer' }}
                      fontSize="small"
                    >
                      category_icon
                    </Icon>
                    <Icon style={{ color: 'red', cursor: 'pointer' }} onClick={() => { deleteData(row._id) }} fontSize="small">delete</Icon>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MDBox>
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
                  Are you sure you want to delete this category?
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
          open={visibleCategorySub}
          onClose={() => setVisibleCategorySub(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid container spacing={2} align="center">
              <Grid item xs={12} md={6}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Sub Categories
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                {subData ?
                  <Button autoFocus style={{ border: '1px solid white', color: 'white', borderRadius: '10px' }}
                    onClick={() => {
                      setAddCatSub(true)
                      setSubData(false)
                    }}>
                    Add
                  </Button>
                  : <Button autoFocus style={{ border: '1px solid white', color: 'white', borderRadius: '10px' }} onClick={() => saveSubCat()}>
                    Save
                  </Button>}


              </Grid>
              {addCatSub ? <>
                <Grid item xs={12} md={6}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Name
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField value={subCatName}
                    onChange={(e) => setSubCatName(e.target.value)
                    } id="textFieldStyle" label="Enter Name" variant="outlined" />
                </Grid>
              </> : null}



              <Grid item xs={12} md={12}>
                <TableContainer >
                  <Table aria-label="simple table">
                    {/* <TableHead> */}
                    <TableRow>
                      <TableCell style={{ fontWeight: 700, color: 'white' }}>Sub Category name</TableCell>
                      <TableCell style={{ fontWeight: 700, color: 'white' }}>Actions</TableCell>

                    </TableRow>
                    {/* </TableHead> */}
                    <TableBody>
                      {allSubCat.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell style={{ color: 'white' }}>
                            {row.name}
                          </TableCell>
                          <TableCell >
                            <Icon style={{ color: 'red', cursor: 'pointer' }} onClick={() => { deleteDataSub(row._id) }} fontSize="small">delete</Icon>

                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
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
        {renderSuccessAddCat}
      </div>
    </Card>
  );
}

export default Projects;
