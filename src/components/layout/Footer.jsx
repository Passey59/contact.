import { Box } from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "6vh",
            }}
        >
            <Link component={RouterLink} to="/imprint">
                Impressum
            </Link>
            <Box
                sx={{
                    px: 1,
                }}
            >
                |
            </Box>
            <Link component={RouterLink} to="/privacy">
                Datenschutz
            </Link>
        </Box>
    );
};

export default Footer;
