import * as React from 'react';
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
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../img/profile-logo.jpg'
import Logos from '../img/epicGame.png'
import { useAuth } from '../../contexts/AuthContextProvider';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { useCart } from '../../contexts/CartContextProvider';
import { Badge } from '@mui/material';
import { getCountProductsInCart } from '../../helpers/function';
import { ADMIN } from '../../helpers/consts';

const pages = [
  { name: 'Home', link: '/', id: 1 },
  { name: 'Our Partners', link: '/partners', id: 2 },
  { name: 'Products', link: '/products', id: 3 },
  { name: 'About Us', link: '/about', id: 4 },
  // { name: 'Admin', link: '/admin', id: 5 },


];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {

  const { handleLogOut, user: { email } } = useAuth()
  const { checkProductInCart } = useCart()
  console.log(email);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate()
  const [count, setCount] = React.useState(0)
  const { addProductToCart } = useCart()

  React.useEffect(() => {
    setCount(getCountProductsInCart)
  }, [addProductToCart])

  return (
    <AppBar position="fixed" color='success' >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Avatar alt="Remy Sharp" src={Logos} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            STORE
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
                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                  <Link to={page.link}>
                    <Typography textAlign="end">{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}

              {email === ADMIN ? (<MenuItem onClick={handleCloseNavMenu}>
                <Link to='/admin'>
                  <Typography textAlign="canter">ADMIN</Typography>
                </Link>
              </MenuItem>) : (
            null
              )}

            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MAGAZ
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page.id} to={page.link}>
                <Button

                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              </Link>

            ))}

            {email === ADMIN ? ( <Link  to='/admin'>
                <Button

                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  ADMIN
                </Button>
              </Link>) : (null) }
          </Box>
          <Typography>
            {email ? `Hello , ${email}` : 'Login please'}
          </Typography>

          <Link to='/cart'>
            <Button>
              <Badge color='primary' badgeContent={count}>
                <LocalGroceryStoreIcon color={checkProductInCart() ? 'primary' : ''} sx={{ color: 'white', width: 30, height: 30 }} />
              </Badge>
            </Button>
          </Link>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={Logo} />
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
              <MenuItem onClick={handleCloseUserMenu}>
                {email ?
                  <Typography onClick={handleLogOut} textAlign="center">Log Out</Typography> :
                  <Typography onClick={() => navigate('/auth')} textAlign="center">Log In</Typography>
                }

              </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;