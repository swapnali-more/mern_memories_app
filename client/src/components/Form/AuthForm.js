import React, { useState } from "react";
import { Paper, Box, Button, Grid, TextField, Typography, InputAdornment, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import useStyles from "./Styles";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { createUser, loginUser } from "../../redux/actions/auth";
import { toast } from 'react-toastify';

const AuthForm = ({ handleModal }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false) // state to show/hide password
  const [isSignUp, setIsSignUp] = useState(false); // state to switch between login and signup
  const user = useSelector((state) => state.user); // get user state from redux store

  // form validation schema
  const validationSchema = Yup.object().shape({
    ...( // conditional fields for signup form
      isSignUp && {
        firstname: Yup.string().required('First Name is required'),
        lastname: Yup.string().required('Last Name is required'),
        password: Yup.string()
          .required('Password is required')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
          ),
      }
    ),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .required('Password is required')
  });

  const dispatch = useDispatch(); // to dispatch actions to the redux store

  const formik = useFormik({
    initialValues: {
      firstname: isSignUp ? user?.firstname : "", // pre-fill form fields if it's the signup form
      lastname: isSignUp ? user?.lastname : "",
      email: user?.email || "",
      password: user?.password || "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (isSignUp) { // handle form submission for signup
          await dispatch(createUser(values)); // dispatch create user action
          toast.success("User created successfully!", {
            autoClose: 2000,
            onClose: () => {
              window.location.reload(); // reload page on success
              resetForm(); // reset form fields
              handleModal(null, false); // close modal
            },
          });
        } else { // handle form submission for login
          await dispatch(loginUser(values)); // dispatch login user action
          toast.success("Logged in successfully!", {
            autoClose: 2000,
            onClose: () => {
              window.location.reload(); // reload page on success
              resetForm(); // reset form fields
              handleModal(null, false); // close modal
            },
          });
        }
      } catch (error) { // handle error
        toast.error(error.message);
      }
    },
  });

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword); // toggle show/hide password
  const switchMode = () => setIsSignUp((isSignUp) => !isSignUp) // switch between login and signup mode

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

          <Button type="submit" variant="contained" color="primary" fullWidth
            size="small" sx={{ mr: 1, mt: 2, backgroundColor: '#240090', color: "#fff" }}>{isSignUp ? "Create Account" : "Login"}
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
