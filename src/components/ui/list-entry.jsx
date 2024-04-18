import React from "react";
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

const ListEntry = ({ contact }) => {
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
                        navigator.clipboard.writeText(
                            contact.phone.replace("/", "")
                        );
                    }}
                >
                    <ContentCopyIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="edit phone number">
                <IconButton color="accent">
                    <EditNoteIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="delete phone number">
                <IconButton color="error">
                    <DeleteOutlineIcon />
                </IconButton>
            </Tooltip>
        </ListItem>
    );
};

export default ListEntry;
