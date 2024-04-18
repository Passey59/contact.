import { Box } from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";

const FooterLink = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(1),
}));

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
            <Link
                component={RouterLink}
                to="/imprint"
                color="inherit"
                underline="none"
                sx={{ "&:hover": { color: "accent.main" } }}
            >
                <FooterLink>Imprint</FooterLink>
            </Link>
            <Box
                sx={{
                    px: 1,
                }}
            >
                |
            </Box>
            <Link
                component={RouterLink}
                to="/privacy"
                color="inherit"
                underline="none"
                sx={{ "&:hover": { color: "accent.main" } }}
            >
                <FooterLink>Privacy</FooterLink>
            </Link>
        </Box>
    );
};

export default Footer;
