import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const CommonDialog = ({
  open,
  id,
  title,
  text,
  confirmText,
  denyText,
  confirmAction,
}) => {
  const handleClose = (action) => {
    confirmAction(action);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id={`alert-title-` + id}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id={`alert-description` + id}>
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="accent">
            {denyText}
          </Button>
          <Button onClick={() => handleClose(true)} autoFocus color="error">
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CommonDialog;
