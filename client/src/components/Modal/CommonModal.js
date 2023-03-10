import React from "react";
import { Modal, Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "./Styles";

const CommonModal = ({ children, open, currentId, handleModal }) => {
  const classes = useStyles();
  const handleClose = () => {
    handleModal( currentId ? currentId : null, false)
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.modal}>
        <Button
          onClick={handleClose}
          className={classes.closeBtn}
          sx={{
            background: "transparent",
            position: "absolute",
            color: "#000",
            minWidth: "auto",
          }}
        >
          <CloseIcon />
        </Button>
        {children}
      </Box>
    </Modal>
  );
};

export default CommonModal;
