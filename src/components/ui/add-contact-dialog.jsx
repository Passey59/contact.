import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const baseUrl = "http://localhost:4000/contacts";

const AddContactDialog = ({
    handleAddContact,
    updateContacts,
    type,
    entry = null,
}) => {
    const [open, setOpen] = useState(true);
    const [contact, setContact] = useState(
        entry
            ? { name: entry.name, phone: entry.phone }
            : { name: "", phone: "" }
    );

    const regex = /\d{4}\/\d{8}/;

    const handleClose = () => {
        setOpen(false);
        handleAddContact();
    };

    const handleSubmit = () => {
        if (type === "add") {
            addNewContact();
        } else if (type === "edit") {
            updateContact();
        }
    };

    const addNewContact = () => {
        if (contact.name === "" || contact.phone === "") {
            alert("Please fill out all fields");
        } else if (contact.name.length < 2 || contact.phone.length < 10) {
            alert(
                "Please enter a valid name and phone number. Name must be longer than 2 characters. Phone number must be in the following format: 0123/45678901"
            );
        } else if (!regex.test(contact.phone)) {
            alert(
                "Please enter a valid phone number. Phone number must be in the following format: 0123/45678901"
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
    };

    const updateContact = () => {};

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add new contact</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Here you can add a new contact to your contact list.
                </DialogContentText>
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
                        onChange={(e) =>
                            setContact({ ...contact, phone: e.target.value })
                        }
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="accent">
                    Cancel
                </Button>
                <Button type="submit" onClick={handleSubmit} color="accent">
                    Add contact
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddContactDialog;
