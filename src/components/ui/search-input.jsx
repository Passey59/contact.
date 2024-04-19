import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({ value, onChange }) => {
    return (
        <TextField
            fullWidth
            id="search-input"
            placeholder="Search ..."
            variant="outlined"
            color="mode"
            value={value}
            onChange={onChange}
            sx={{
                px: 0.5,
                "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                },
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default SearchInput;
