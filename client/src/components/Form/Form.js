import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useStyles from './Styles';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../redux/actions/posts';

// Fields used in the form
const fields = [
  { name: 'creator', label: 'Creator', autoFocus: true },
  { name: 'title', label: 'Title' },
  { name: 'message', label: 'Message' },
  { name: 'tags', label: 'Tags' },
];

// Functional Component Form
const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();

  // State used in the form
  const [formData, setFormData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  // Redux's dispatch function
  const dispatch = useDispatch();

  // Get post from Redux store
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );

  // Set formData with post data if there is post for edit
  useEffect(() => {
    if (post) {
      setFormData(post);
    }
  }, [post]);

  // Clear form fields and setCurrentId
  const clear = useCallback(() => {
    setCurrentId(null);
    setFormData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
  }, [setCurrentId]);

  // Handle form submission
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (currentId) {
        dispatch(updatePost(currentId, formData));
      } else {
        dispatch(createPost(formData));
      }

      clear();
    },
    [currentId, clear, dispatch, formData]
  );

  //const postMemo = useMemo(() => post, [post]);

  // Handle form field changes
  const handleChange = useCallback(
    (e) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: e.target.value,
      }));
    },
    [setFormData]
  );

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? 'Edit Memory' : 'Create Memory'}</Typography>
         {/* Form fields */}
        {fields.map((field) => (
          <TextField
            key={field.name}
            name={field.name}
            variant="outlined"
            label={field.label}
            fullWidth
            autoFocus={field.autoFocus}
            value={formData[field.name]}
            onChange={handleChange}
          />
        ))}

        {/* File input for image */}
        <Box className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setFormData({ ...formData, selectedFile: base64 })} />
        </Box>

        {/* Submit and Clear Buttons */}
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
          {currentId ? 'Save Changes' : 'Submit'}
        </Button>

        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
