import React, { useState } from "react";
import { Paper, Box, Button, FormLabel, Grid, TextField, Typography, InputAdornment, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import useStyles from "./Styles";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { createUser, loginUser } from "../../redux/actions/auth";

const AuthForm = ({handleModal}) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false);
  const user = useSelector((state) => state.user);

  const validationSchema = Yup.object().shape({
    ...(
      isSignUp && {
        firstname: Yup.string().required('First Name is required'),
        lastname: Yup.string().required('Last Name is required'),
      }
    ),
    email: Yup.string().email('Invalid email').required('Required'), 
    password: Yup.string()
      .required('Password is required') 
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });
  

  console.log(user, "user auth form")

  const dispatch = useDispatch();
  
  const formik = useFormik({
    initialValues: {
      firstname: isSignUp ? user?.firstname : "", 
      lastname: isSignUp ? user?.lastname : "", 
      email: user?.email || "", 
      password: user?.password || "", 
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
    isSignUp ? dispatch(createUser(values)) : dispatch(loginUser(values));
    resetForm(); 
    handleModal(null, false)
    },
  });

  //const clearForm = () => formik.resetForm();

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
  const switchMode = () => setIsSignUp((isSignUp) => !isSignUp)

  const googleSuccess = async (res) => {
    console.log(res)
    const result = res?.profileObj;
    const token = res?.clientId;

    console.log(result, token)

    try {
      dispatch({type: 'AUTH', data: {result, token}})
    } catch (error) {
      console.log(error)
    }
  }

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

  return (
    
    <Paper className={classes.paper}>
      <Box className={`${classes.root} ${classes.form}`} component="form" onSubmit={formik.handleSubmit}>
        <Typography variant="h6" mb={3}>{isSignUp ? "Create Account" : "Log In"}</Typography>
        <Grid container spacing={2}>
          {[isSignUp ? ["firstname", "lastname", "email", "password"] : ["email", "password"]].map((fields) => (
            fields.map((field) => (
              <Grid item xs={12} md={12} key={field}>
              <TextField key={field} 
              name={field} 
              variant="outlined" 
              size="small" 
              multiline={field === 'message'} 
              maxRows={2} 
              fullWidth 
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formik.values[field]} 
              onChange={formik.handleChange}
              error={formik.touched[field] && Boolean(formik.errors[field])} 
              helperText={formik.touched[field] && formik.errors[field]}
              InputProps={field === 'password' && {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
                type: showPassword ? 'text' : 'password'
              }}
              />
            </Grid>
            ))
          ))}
        </Grid>
        <Box mt={2}>
          <GoogleLogin
            onSuccess={googleSuccess}
            onError={googleError}
            auth-code
          />
          
          <Button type="submit" variant="contained" color="primary" fullWidth
          size="small" sx={{ mr: 1,  mt: 2, backgroundColor: '#240090', color: "#fff" }}>{isSignUp ? "Create Account" : "Login"}
          </Button>
        </Box>
      </Box>
      <Box fullWidth textAlign="center" mt={2}>
          <Button onClick={switchMode}>
            {isSignUp ? 'Already have an account? Log In' : "Dont't have an account? Sign Up"}
          </Button>
        </Box>
    </Paper>
  );
};

export default AuthForm;
