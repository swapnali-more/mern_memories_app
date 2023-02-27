import React from "react";
import { Modal, Box, Button } from "@mui/material";
import MemoryForm from "../Form/MemoryForm";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "./Styles";

const MemoryModal = ({ open, setOpen, currentId, setCurrentId }) => {
  const classes = useStyles();
  const handleClose = () => {
    setCurrentId(null);
    setOpen(false);
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
        <MemoryForm
          currentId={currentId}
          setCurrentId={setCurrentId}
          setOpen={setOpen}
        />
      </Box>
    </Modal>
  );
};

export default MemoryModal;
