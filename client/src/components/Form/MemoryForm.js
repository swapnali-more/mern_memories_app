import React from "react";
import { Paper, Box, Button, FormLabel, Grid, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import FileBase from "react-file-base64";
import { createPost, updatePost } from "../../redux/actions/posts";
import useStyles from "./Styles";

const validationSchema = Yup.object({creator: Yup.string().required("Creator is required"), title: Yup.string().required("Title is required"), message: Yup.string().required("Message is required"), tags: Yup.string().required("Tags is required"), selectedFile: Yup.mixed().required("File is required"),});

const MemoryForm = ({ currentId, setCurrentId, setOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);

  const formik = useFormik({
    initialValues: {creator: post?.creator || "", title: post?.title || "", message: post?.message || "", tags: post?.tags || "", selectedFile: post?.selectedFile || "",},
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      currentId ? dispatch(updatePost(currentId, values)) : dispatch(createPost(values));
      resetForm(); setCurrentId(null); setOpen(false)
    },
  });

  const clearForm = () => formik.resetForm();

  return (
    <Paper className={classes.paper}>
      <Box className={`${classes.root} ${classes.form}`} component="form" onSubmit={formik.handleSubmit}>
        <Typography variant="h6" mb={3}>{currentId ? "Edit Memory" : "Create Memory"}</Typography>
        <Grid container spacing={2}>
          {["creator", "title", "message", "tags"].map((field) => (
            <Grid item xs={12} md={field === 'message' ? 12 : 6 && field === 'tags' ? 12 : 6} key={field}>
              <TextField key={field} name={field} variant="outlined" size="small" multiline={field === 'message'} maxRows={2} fullWidth label={field.charAt(0).toUpperCase() + field.slice(1)} value={formik.values[field]} onChange={formik.handleChange} error={formik.touched[field] && Boolean(formik.errors[field])} helperText={formik.touched[field] && formik.errors[field]}/>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              {formik.values.selectedFile && <img style={{ marginRight: 10 }} src={formik.values.selectedFile} alt="Memory" width="60" height="60" />}
              <Box className={classes.fileInput}>
                <FileBase type="file" multiple={false} onDone={({ base64 }) => formik.setFieldValue("selectedFile", base64)}/>
                <FormLabel>{formik.values.selectedFile ? "Upload New" : "Upload File"}</FormLabel>
              </Box>
            </Box>
            <Typography type="error">{formik.touched.selectedFile && formik.errors.selectedFile ? (<div>{formik.errors.selectedFile}</div>) : null}</Typography>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" size="small" sx={{ mr: 1, backgroundColor: '#240090', color: "#fff" }}>{currentId ? "Save Changes" : "Submit"}
          </Button>
          <Button type="button" variant="contained" color="secondary" size="small" sx={{ backgroundColor: '#3c3c3c', color: "#fff" }} onClick={clearForm}>Clear
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default MemoryForm;
