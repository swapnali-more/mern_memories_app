import React from "react";
import { Paper, Box, Button, FormLabel, Grid, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import useStyles from "./Styles";

const validationSchema = Yup.object({
  creator: Yup.string().required("Creator is required"), 
  title: Yup.string().required("Title is required"), 
  message: Yup.string().required("Message is required"), 
  tags: Yup.array().min(1, "Tags is required"), 
  selectedFile: Yup.mixed().required("File is required"),
});

const AuthForm = () => {
  const classes = useStyles();

  const isSignUp = false;
  
  const formik = useFormik({
    initialValues: {
      firstName:  "", 
      lastName: "", 
      emailAdd:  "", 
      passWord:  "", 
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      //dispatch(createPost(values));
      resetForm(); 
      //setOpen(false)
    },
  });

  const clearForm = () => formik.resetForm();

  return (
    <Paper className={classes.paper}>
      <Box className={`${classes.root} ${classes.form}`} component="form" onSubmit={formik.handleSubmit}>
        <Typography variant="h6" mb={3}>{isSignUp ? "Create Account" : "Login"}</Typography>
        <Grid container spacing={2}>
          {isSignUp ? ["firstName", "lastName", "email", "password"] : ["email", "password"].map((field) => (
            <Grid item xs={12} md={12} key={field}>
              <TextField key={field} 
              name={field} 
              variant="outlined" 
              size="small" 
              multiline={field === 'message'} 
              maxRows={2} 
              fullWidth 
              //label={field.charAt(0).toUpperCase() + field.slice(1)} 
              label={field}
              value={formik.values[field]} 
              onChange={formik.handleChange}
              error={formik.touched[field] && Boolean(formik.errors[field])} 
              helperText={formik.touched[field] && formik.errors[field]}/>
            </Grid>
          ))}
        </Grid>
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" 
          size="small" sx={{ mr: 1, backgroundColor: '#240090', color: "#fff" }}>{isSignUp ? "Create Account" : "Login"}
          </Button>
          <Button type="button" variant="contained" color="secondary" 
          size="small" sx={{ backgroundColor: '#3c3c3c', color: "#fff" }} onClick={clearForm}>Clear
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default AuthForm;
