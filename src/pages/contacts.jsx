import { useState, useCallback } from "react";
import ContentWrapper from "../components/layout/content-wrapper";
import Headline from "../components/ui/headline";
import Box from "@mui/material/Box";
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
import SearchInput from "../components/ui/search-input";
import ProcessContactDialog from "../components/ui/process-contact-dialog";

import { useQuery, gql } from "@apollo/client";

// query for data fetching
export const CONTACTS_QUERY = gql`
  {
    contacts {
      id
      name
      phone
    }
  }
`;

const Contacts = () => {
  // query for retrieving contacts data from "API"
  const { data, loading, error } = useQuery(CONTACTS_QUERY);

  console.log("data > ", data);

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

  let filteredContacts = [];

  // Filter contacts based on search input value
  if (data) {
    console.log(data);

    filteredContacts = data?.contacts?.filter((contact) =>
      contact.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  return (
    <ContentWrapper>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Headline title={"Contacts"} />
        <Box sx={{ mb: 4, pl: 2, pt: { md: 2, xs: 1 } }}>
          <Tooltip title="Add a new contact.">
            <IconButton color="accent" onClick={handleAction}>
              <AddCircleOutlineIcon sx={{ fontSize: { md: 60, xs: 45 } }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <SearchInput value={searchValue} onChange={handleInputChange} />
      {loading && (
        <Box sx={{ width: "100%", mt: 6, px: 1, textAlign: "center" }}>
          <LinearProgress color="accent" />
          <Typography sx={{ pt: 2 }}>Loading data ...</Typography>
        </Box>
      )}
      {error && (
        <Box sx={{ width: "100%", mt: 6, px: 1, textAlign: "center" }}>
          <Alert variant="filled" severity="error">
            Oops! Something went wrong while fetching the data. Please check
            your internet connection and try again later.
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
        {filteredContacts.slice(startIndex, endIndex).map((contact, id) => (
          <ListEntry contact={contact} key={id} />
        ))}
      </List>
      {!loading && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Pagination
              count={Math.ceil(filteredContacts.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="accent"
            />
          </Stack>
        </Box>
      )}
      {showDialog && (
        <ProcessContactDialog handleAction={handleAction} type={dialogType} />
      )}
    </ContentWrapper>
  );
};

export default Contacts;
