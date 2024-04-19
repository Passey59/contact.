import React, { useState, useEffect, useCallback } from "react";
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
import ProcessContactDialog from "../components/ui/process-contact-dialog";

const baseUrl = "http://localhost:4000/contacts";

const Contacts = () => {
    // State for contacts data
    const [contacts, setContacts] = useState([]);
    // State for loading status
    const [loading, setLoading] = useState(false);
    // State for error status
    const [error, setError] = useState(false);
    // State for search input value
    const [searchValue, setSearchValue] = useState("");
    // State for pagination
    const [page, setPage] = useState(1);
    // State for showing add contact dialog
    const [showDialog, setShowDialog] = useState(false);
    // State for dialog type
    const [dialogType, setDialogType] = useState("");

    // Define number of items per page
    const itemsPerPage = 20;
    // Calculate start index for pagination
    const startIndex = (page - 1) * itemsPerPage;
    // Calculate end index for pagination
    const endIndex = startIndex + itemsPerPage;

    // Function to fetch contacts from the server
    const fetchContacts = useCallback(() => {
        setLoading(true);
        setError(false);

        fetch(baseUrl)
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                setContacts(data);
            })
            .catch((err) => {
                console.log(err);
                setError(true);
                setLoading(false);
            });
    }, []);

    // Fetch contacts when component mounts or reloads
    useEffect(() => {
        fetchContacts();
    }, [fetchContacts]);

    // Handler for page change in pagination
    const handlePageChange = useCallback((event, value) => {
        setPage(value);
    }, []);

    // Handler for search input change
    const handleInputChange = useCallback((event) => {
        const value = event.target.value;
        setSearchValue(value);
    }, []);

    // Handler for toggling add contact dialog
    const handleAction = useCallback(() => {
        setShowDialog(!showDialog);

        if (dialogType === "") {
            setDialogType("add");
        }
    }, [showDialog]);

    // Function to update contacts after adding a new contact
    const updateContacts = useCallback(() => {
        fetchContacts();
    }, [fetchContacts]);

    // Filter contacts based on search input value
    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <ContentWrapper>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Headline title={"Contacts"} />
                <Box sx={{ mb: 4, pl: 2, pt: 2 }}>
                    <Tooltip title="Add a new contact.">
                        <IconButton color="accent" onClick={handleAction}>
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
                {filteredContacts
                    .slice(startIndex, endIndex)
                    .map((contact, id) => (
                        <ListEntry
                            contact={contact}
                            key={id}
                            updateContacts={updateContacts}
                        />
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
                <ProcessContactDialog
                    handleAction={handleAction}
                    updateContacts={updateContacts}
                    type={dialogType}
                />
            )}
        </ContentWrapper>
    );
};

export default Contacts;
