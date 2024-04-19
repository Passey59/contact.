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

const baseUrl = "http://localhost:4000/contacts";

const ProcessContactDialog = ({
    handleAction,
    updateContacts,
    type,
    entry = null,
}) => {
    // State for dialog open status
    const [open, setOpen] = useState(true);
    // State for contact data
    const [contact, setContact] = useState(
        entry
            ? { name: entry.name, phone: entry.phone }
            : { name: "", phone: "" }
    );
    // State for error message
    const [errorMessage, setErrorMessage] = useState("");

    const regex = /\d{4}\/\d{8}/;

    // handle close dialog
    const handleClose = () => {
        setOpen(false);
        handleAction();
    };

    // add or update contact
    const processContact = () => {
        setErrorMessage("");

        if (contact.name === "" || contact.phone === "") {
            setErrorMessage("Please fill out all fields.");
        } else if (contact.name.length < 2 || contact.phone.length < 10) {
            setErrorMessage(
                "Please enter a valid name and phone number. Name must be longer than 2 characters. Phone number must be in the following format: 0123/45678901"
            );
        } else if (!regex.test(contact.phone)) {
            setErrorMessage(
                "Please enter a valid phone number. Phone number must be in the following format: 0123/45678901"
            );
        } else {
            if (type === "edit") {
                fetch(baseUrl + "/" + entry.id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(contact),
                })
                    .then((res) => res.json())
                    .then(() => {
                        updateContacts();
                        handleClose();
                    })
                    .catch((error) =>
                        console.error("Error updating contact:", error)
                    );
            } else {
                fetch(baseUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(contact),
                })
                    .then((res) => res.json())
                    .then(() => {
                        updateContacts();
                        handleClose();
                    })
                    .catch((error) =>
                        console.error("Error adding contact:", error)
                    );
            }
        }
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
                value.slice(0, selectionStart - 1) +
                value.slice(selectionStart);
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
                {errorMessage !== "" && (
                    <Box sx={{ mt: 2 }}>
                        <Typography
                            variant="body1"
                            fontWeight={600}
                            color="error"
                        >
                            {errorMessage}
                        </Typography>
                    </Box>
                )}
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        addNewContact();
                    }}
                >
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
                        onChange={(e) =>
                            setContact({ ...contact, name: e.target.value })
                        }
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
                <Button type="submit" onClick={processContact} color="accent">
                    {type === "add" ? "Add contact" : "Save changes"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProcessContactDialog;
