import React, { useState, useEffect } from "react";
import ContentWrapper from "../components/layout/content-wrapper";
import Headline from "../components/ui/headline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import ListEntry from "../components/ui/list-entry";
import AddContactDialog from "../components/ui/add-contact-dialog";

const baseUrl = "http://localhost:4000/contacts";

const Contacts = () => {
    // contacts state
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState(contacts);
    // state for reloading the data
    const [reload, setReload] = useState(false);
    // state for loading and error handling
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    // state for search input
    const [searchValue, setSearchValue] = useState("");
    // state for pagination
    const [page, setPage] = useState(1);
    // state for add new contact dialog
    const [showDialog, setShowDialog] = useState(false);

    // define the number of items per page
    const itemsPerPage = 20;
    // define the range of contacts to display for pagination
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedContacts = filteredContacts.slice(startIndex, endIndex);

    // fetch contacts from the server
    useEffect(() => {
        setLoading(true);
        setError(false);
        setReload(false);

        fetch(baseUrl)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setLoading(false);
                setContacts(data);
                setFilteredContacts(data);
            })
            .catch((err) => {
                console.log(err);
                setError(true);
                setLoading(false);
            });
    }, [reload]);

    // handle page change
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    // handle search input change
    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);

        const filteredEntries = contacts.filter((contact) =>
            contact.name.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredContacts(filteredEntries);
    };

    // handle add contact dialog
    const handleAddContact = () => {
        setShowDialog(!showDialog);
    };

    // function to update contacts after adding a new contact
    const updateContacts = () => {
        setReload(true);
    };

    return (
        <ContentWrapper>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Headline title={"Contacts"} />
                <Box sx={{ mb: 4, pl: 2, pt: 2 }}>
                    <Tooltip title="Add a new contact.">
                        <IconButton color="accent" onClick={handleAddContact}>
                            <AddCircleOutlineIcon sx={{ fontSize: 60 }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                    fullWidth
                    id="search-input"
                    placeholder="Search ..."
                    variant="outlined"
                    color="mode"
                    value={searchValue}
                    onChange={handleInputChange}
                    sx={{
                        px: 0.5,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "20px",
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        style: {
                            borderRadius: "50px",
                        },
                    }}
                />
            </Box>
            {loading && (
                <Box sx={{ width: "100%", mt: 6, px: 1, textAlign: "center" }}>
                    <LinearProgress color="accent" />
                    <Typography sx={{ pt: 2 }}>Loading data ...</Typography>
                </Box>
            )}
            {error && (
                <Box sx={{ width: "100%", mt: 6, px: 1, textAlign: "center" }}>
                    <Alert variant="filled" severity="error">
                        Oops! Something went wrong while fetching the data.
                        Please check your internet connection and try again
                        later.
                    </Alert>
                </Box>
            )}
            <List
                sx={{
                    width: "100%",
                    bgcolor: "transparent",
                    px: 0.5,
                }}
            >
                {displayedContacts.map((contact, id) => (
                    <ListEntry contact={contact} key={id} />
                ))}
            </List>
            {!loading && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <Pagination
                            count={Math.ceil(
                                filteredContacts.length / itemsPerPage
                            )}
                            page={page}
                            onChange={handlePageChange}
                            color="accent"
                        />
                    </Stack>
                </Box>
            )}
            {showDialog && (
                <AddContactDialog
                    handleAddContact={handleAddContact}
                    updateContacts={updateContacts}
                />
            )}
        </ContentWrapper>
    );
};

export default Contacts;
