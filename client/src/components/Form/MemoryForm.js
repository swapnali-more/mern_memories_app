import React from "react";
import { Paper, Box, Button, FormLabel, Grid, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import FileBase from "react-file-base64";
import { createPost, updatePost } from "../../redux/actions/posts";
import useStyles from "./Styles";
import { toast } from 'react-toastify';

// Define the MemoryForm component that will handle creating and updating memory posts
const MemoryForm = ({ currentId, handleModal }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
  const user = JSON.parse(localStorage.getItem('profile'))

  //Define form validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    message: Yup.string().required("Message is required"),
    tags: Yup.array().min(1, "Tags is required"),
    selectedFile: Yup.mixed().required("File is required"),
  });

  // Use Formik to manage the form state and handle form submission
  const formik = useFormik({
    initialValues: {
      title: post?.title || "",
      message: post?.message || "",
      tags: post?.tags || [],
      selectedFile: post?.selectedFile || "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (currentId) {
          // Update existing post if currentId is provided
          await dispatch(updatePost(currentId, { ...values, name: user?.result?.name }));
          toast.success("Post updated successfully!", {
            autoClose: 2000,
            onClose: () => {
              window.location.reload();
              resetForm();
              handleModal(null, false);
            },
          });
        } else {
          // Create new post if no currentId is provided
          await dispatch(createPost({ ...values, name: user?.result?.name }));
          toast.success("Post created successfully!", {
            autoClose: 2000,
            onClose: () => {
              window.location.reload();
              resetForm();
              handleModal(null, false);
            },
          });
        }
      } catch (error) {
        // Handle form submission error
        toast.error(error.message);
      }
    },
  });

  // Define function to clear form fields
  const clearForm = () => formik.resetForm();

  return (
    <Paper className={classes.paper}>
      <Box className={`${classes.root} ${classes.form}`} component="form" onSubmit={formik.handleSubmit}>
        <Typography variant="h6" mb={3}>{currentId ? "Edit Memory" : "Create Memory"}</Typography>
        <Grid container spacing={2}>
          {["title", "message", "tags"].map((field) => (
            <Grid item xs={12} key={field}>
              <TextField key={field}
                name={field}
                variant="outlined"
                size="small"
                multiline={field === 'message'}
                maxRows={2}
                fullWidth
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formik.values[field]}
                onChange={(e) => {
                  if (field === 'tags') {
                    formik.setFieldValue('tags', e.target.value.split(',')); // Split string into array of strings
                  } else {
                    formik.handleChange(e); // Use default handleChange for other fields
                  }
                }}
                error={formik.touched[field] && Boolean(formik.errors[field])}
                helperText={formik.touched[field] && formik.errors[field]} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              {formik.values.selectedFile && <img style={{ marginRight: 10 }}
                src={formik.values.selectedFile} alt="Memory" width="60" height="60" />}
              <Box className={classes.fileInput}>
                <FileBase type="file" multiple={false} onDone={({ base64 }) => formik.setFieldValue("selectedFile", base64)} />
                <FormLabel>{formik.values.selectedFile ? "Upload New" : "Upload File"}</FormLabel>
              </Box>
            </Box>
            <div className={classes.error}>{formik.touched.selectedFile && formik.errors.selectedFile ? (<>{formik.errors.selectedFile}</>) : null}</div>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary"
            size="small" sx={{ mr: 1, backgroundColor: '#240090', color: "#fff" }}>{currentId ? "Save Changes" : "Submit"}
          </Button>
          <Button type="button" variant="contained" color="secondary"
            size="small" sx={{ backgroundColor: '#3c3c3c', color: "#fff" }} onClick={clearForm}>Clear
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default MemoryForm;
