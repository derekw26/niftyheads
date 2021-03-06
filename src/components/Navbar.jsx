import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const Navbar = (props) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const logOut = props.onLogOut;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null);
    if(event.target.innerText === "Logout") {
      console.log(logOut)
      logOut();
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);

  };

  const currentUser = props.currentUser;

  let pages = ['Marketplace', 'Mint Avatar', 'Connect Wallet'];
  if (!currentUser) {
    pages = ['Home'];
  } else if (currentUser.isAdmin) {
    pages = [...pages, 'Admin'];
  }

  let settings = ['Profile', 'Logout'];
  if (!currentUser) {
    settings = ['Register', 'Login'];
  }

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link to={"/"} style={{ textDecoration: 'none', color: 'white' }}>
              <img src={logo} alt="NIFTYHEADS" height="40px"/>
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Link to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none', color: 'black' }}>
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <Link to={"/"} style={{ textDecoration: 'none', color: 'white' }}>
              <img src={logo} alt="NIFTYHEADS" height="40px"/>
            </Link>
          </Typography>

          { currentUser ?
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Link to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none'}} >
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'black', display: 'block' }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>
          :
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'none' } }}>
            {pages.map((page) => (
              <Link to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none'}} >
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>
          }
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: `${ currentUser ? 'flex' : 'none' }`}}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={currentUser ? currentUser.username : "Niftyheads"} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Link to={`/${setting.toLowerCase()}`} style={{ textDecoration: 'none', color: 'black' }}>
                  <MenuItem
                    key={setting}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography
                      textAlign="center"
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md:`${ currentUser ? 'none' : 'flex' }` }, flexDirection: 'row-reverse'}}>
            {settings.map((setting) => (
              <Link to={`/${setting.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                <Button
                  key={setting}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  {setting}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
