import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { Box } from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

const logo = "src/assets/logo.png";

// define pages for navigation
const pages = [
    {
        name: "Contacts",
        path: "/contacts",
    },
    {
        name: "Imprint",
        path: "/imprint",
    },
    {
        name: "Privacy",
        path: "/privacy",
    },
];

const Navigation = (props) => {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    return (
        <AppBar
            position="relative"
            color="transparent"
            elevation={0}
            sx={{ height: "6vh" }}
        >
            <Container>
                <Toolbar disableGutters>
                    <Link
                        component={RouterLink}
                        color="inherit"
                        to="/"
                        sx={{
                            display: { xs: "none", md: "flex" },
                            mr: 1,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img style={{ width: 50 }} src={logo} alt="" />
                    </Link>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.name}
                                    onClick={handleCloseNavMenu}
                                    component={RouterLink}
                                    to={page.path}
                                >
                                    <Typography textAlign="center">
                                        {page.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Link
                        component={RouterLink}
                        to="/"
                        sx={{
                            display: { xs: "flex", md: "none" },
                            mr: 1,
                            flexGrow: 1,
                        }}
                    >
                        <img style={{ width: 50 }} src={logo} alt="" />
                    </Link>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2,
                                    color: "inherit",
                                    display: "block",
                                }}
                                component={RouterLink}
                                to={page.path}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    <IconButton
                        onClick={props.toggleMode}
                        color="inherit"
                        sx={{
                            width: "40px",
                            height: "40px",
                        }}
                    >
                        {props.color === "dark" ? (
                            <Brightness7Icon />
                        ) : (
                            <Brightness4Icon />
                        )}
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navigation;
