import { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CommonDialog from "./common-dialog";
import ProcessContactDialog from "./process-contact-dialog";
import { gql, useMutation } from "@apollo/client";

import { CONTACTS_QUERY } from "../../pages/contacts";

// mutation for deleting an existing contact
const DELETE_CONTACT = gql`
  mutation DeleteContact($id: String!) {
    deleteContact(id: $id) {
      id
      name
      phone
    }
  }
`;

const ListEntry = ({ contact }) => {
  const [deleteContact] = useMutation(DELETE_CONTACT, {
    // update(cache, { data: { deleteContact } }) {
    //   const { contacts } = cache.readQuery({ query: CONTACTS_QUERY });
    //   const newContacts = contacts.filter((c) => c.id !== deleteContact.id);

    //   cache.writeQuery({
    //     query: CONTACTS_QUERY,
    //     data: { contacts: newContacts },
    //   });
    // },
    refetchQueries: [{ query: CONTACTS_QUERY }],
  });

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const deleteEntry = (action) => {
    setOpenDeleteDialog(false);

    if (action) {
      deleteContact({
        variables: {
          id: contact.id,
        },
      });
    }
  };

  const handleEditDialog = () => {
    setOpenEditDialog(false);
  };

  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        borderRadius: "25px",
        display: "flex",
        alignItems: "center",
        px: 0,
      }}
    >
      <ListItemAvatar>
        <Avatar alt={contact.name} src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={contact.name}
        secondary={
          <>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {contact.phone}
            </Typography>
          </>
        }
      />
      <Tooltip title="copy phone number">
        <IconButton
          color="accent"
          onClick={() => {
            navigator.clipboard.writeText(contact.phone.replace("/", ""));
          }}
        >
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="edit phone number">
        <IconButton color="accent" onClick={() => setOpenEditDialog(true)}>
          <EditNoteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="delete phone number">
        <IconButton color="error" onClick={() => setOpenDeleteDialog(true)}>
          <DeleteOutlineIcon />
        </IconButton>
      </Tooltip>
      {openDeleteDialog && (
        <CommonDialog
          open={openDeleteDialog}
          id={"warning"}
          title={"Delete"}
          text={"Do you really want to delete the entry?"}
          confirmText={"Delete"}
          denyText={"Close"}
          confirmAction={deleteEntry}
        />
      )}
      {openEditDialog && (
        <ProcessContactDialog
          handleAction={handleEditDialog}
          type={"edit"}
          entry={contact}
        />
      )}
    </ListItem>
  );
};

export default ListEntry;
