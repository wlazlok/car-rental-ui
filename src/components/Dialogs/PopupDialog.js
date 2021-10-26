import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const PopupDialog = (props) => {
  const [open, setOpen] = useState(false);
  const productId = props.productId;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlDelete = () => {
    setOpen(false);
    props.onDelete(productId);
  };

  return (
    <div>
      <Button variant="outlined" color="error" onClick={handleOpen}>
        Usuń
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Uwaga!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Czy na pewno chcesz usunąć element?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Anuluj</Button>
          <Button onClick={handlDelete} autoFocus>
            Usuń
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PopupDialog;
