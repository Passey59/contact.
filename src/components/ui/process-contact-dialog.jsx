import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { gql, useMutation } from "@apollo/client";
import { CONTACTS_QUERY } from "../../pages/contacts";

// mutation for adding a new contact
const ADD_CONTACT = gql`
  mutation AddContact($name: String!, $phone: String!) {
    addContact(name: $name, phone: $phone) {
      id
      name
      phone
    }
  }
`;

// mutation for editing an existing contact
const UPDATE_CONTACT = gql`
  mutation UpdateContact($id: String!, $name: String, $phone: String) {
    updateContact(id: $id, name: $name, phone: $phone) {
      id
      name
      phone
    }
  }
`;

const ProcessContactDialog = ({ handleAction, type, entry = null }) => {
  // mutation for adding new contact entry
  const [addContact, { error }] = useMutation(ADD_CONTACT, {
    refetchQueries: [{ query: CONTACTS_QUERY }],
  });
  const [updateContact, { updateError }] = useMutation(UPDATE_CONTACT);

  // State for dialog open status
  const [open, setOpen] = useState(true);
  // State for contact data
  const [contact, setContact] = useState(
    entry
      ? { id: entry.id, name: entry.name, phone: entry.phone }
      : { name: "", phone: "" }
  );

  // handle close dialog
  const handleClose = () => {
    setOpen(false);
    handleAction();
  };

  const phoneInputChecker = (e) => {
    const { value } = e.target;
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, "");
    // Check if a slash should be inserted after the fourth digit
    const formattedValue = numericValue.replace(/^(\d{4})(\d*)$/, "$1/$2");
    // Update the contact phone number
    setContact({ ...contact, phone: formattedValue });
  };

  const phoneInputHelper = (e) => {
    const { value, selectionStart } = e.target;
    // Check if the user is trying to delete the slash
    if (e.key === "Backspace" && value[selectionStart - 1] === "/") {
      e.preventDefault();
      // Remove the slash from the value
      const newValue =
        value.slice(0, selectionStart - 1) + value.slice(selectionStart);
      // Update the contact phone number
      setContact({ ...contact, phone: newValue });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add new contact</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Here you can add a new contact to your contact list.
        </DialogContentText>
        {error !== "" && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" fontWeight={600} color="error">
              {error}
            </Typography>
          </Box>
        )}
        {updateError !== "" && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" fontWeight={600} color="error">
              {updateError}
            </Typography>
          </Box>
        )}
        <form>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            color="accent"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
          />
          <TextField
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Phone"
            type="text"
            fullWidth
            variant="standard"
            color="accent"
            value={contact.phone}
            helperText="Please enter the number in the following format:
                        0123/24984023."
            onChange={(e) => phoneInputChecker(e)}
            onKeyDown={(e) => phoneInputHelper(e)}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              maxLength: 13, // Maximum length including the "/" character
            }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="accent">
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();

            if (type == "add") {
              addContact({
                variables: { name: contact.name, phone: contact.phone },
              });
            } else {
              updateContact({
                variables: {
                  id: contact.id,
                  name: contact.name,
                  phone: contact.phone,
                },
              });
            }

            handleClose();
          }}
          color="accent"
        >
          {type === "add" ? "Add contact" : "Save changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProcessContactDialog;
