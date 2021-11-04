import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ResetPasswordForm from "../ResetPasswordForm/ResetPasswordForm";
import { useHistory } from "react-router";

const PopupResetPassword = (props) => {
  const history = useHistory();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    history.push("/");
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ResetPasswordForm
              uuid={props.uuid}
              userId={props.userId}
              onReset={handleClose}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default PopupResetPassword;
