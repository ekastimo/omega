import React from 'react';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/core/Menu';
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../data/types";
import {handleLogout} from "../data/redux/coreActions";
import {localRoutes} from "../data/constants";
import {useHistory} from "react-router-dom";
import Link from "@material-ui/core/Link";
import IconButton from '@material-ui/core/IconButton';
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import {getInitials} from "../utils/stringHelpers";

export const Profile = () => {
    const profile = useSelector((state: AppState) => state.core.user)
    const dispatch = useDispatch();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);

    function doLogout() {
        dispatch(handleLogout())
    }

    function handleMenu(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleCloseMenu() {
        setAnchorEl(null);
    }

    function handleLogin(e: any) {
        e.preventDefault()
        history.push(localRoutes.login)
    }
    return <>
        {
            profile ?
                <>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <Avatar>{getInitials(profile.fullName)}</Avatar>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        keepMounted
                        open={menuOpen}
                        onClose={handleCloseMenu}
                    >
                        <Box p={2} pt={1}>
                            <Grid container spacing={2} style={{width: 250}}>
                                <Grid item xs={12}>
                                    <Typography variant='h6'>User profile</Typography>
                                    <Divider/>
                                </Grid>
                                <Box display='flex' px={2} pb={1} width='100%'>
                                    <Box pr={1} pt={0.5}>
                                        <Typography variant='body1'>
                                            <PersonIcon fontSize='small'/>
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant='body1'><b>{profile.fullName}</b></Typography>
                                    </Box>
                                </Box>
                                <Box display='flex' px={2} pb={2} width='100%'>
                                    <Box pr={1} pt={0.5}>
                                        <Typography variant='body1'>
                                            <EmailIcon fontSize='small'/>
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant='body1'><b>{profile.email}</b></Typography>
                                    </Box>
                                    <Divider/>
                                </Box>

                                <Box display='flex' pl={2} justifyContent='flex-start' width='100%'>
                                    <Button onClick={doLogout} color='primary' variant='text'
                                            startIcon={<ExitToAppIcon/>}
                                    >Log out</Button>
                                </Box>
                            </Grid>
                        </Box>
                    </Menu>
                </> :
                <Link
                    variant="button"
                    onClick={handleLogin}
                    color="inherit"
                    style={{textDecoration: "none"}}
                >Login</Link>
        }
    </>
}
