import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { AuthApi, TokenApi } from '../App.js';
import Cookies from 'js-cookie';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: '#DE5C8E'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    [theme.breakpoints.down("md")]: {
      flexGrow: 1
    }
  },
  headerOptions: {
    display: "flex",
    flex: 1,
    justifyContent: "space-evenly"
  },
  menu: {
    "& .MuiPaper-root": {
      backgroundColor: "#DE5C8E"
    }
  }
}));

export default function Heroku() {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const Auth = React.useContext(AuthApi);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = pageURL => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  const handleButtonClick = pageURL => {
    history.push(pageURL);
  };

  const handleonclick = () => {
    Auth.setAuth(false);
    Cookies.remove("token");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{background:'#DE5C8E'}}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Diabetes Reversal Project
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
                className={classes.menu}
              >
                <MenuItem style={{color: 'white'}} onClick={() => handleMenuClick('/')}><HomeIcon>Home</HomeIcon></MenuItem>
                <MenuItem style={{color: 'white'}} onClick={() => handleMenuClick('/Uploadfood')}>Upload Daily Diet</MenuItem>
                <MenuItem style={{color: 'white'}} onClick={() => handleMenuClick('/bloodsugar')}>Blood Sugar</MenuItem>
                <MenuItem style={{color: 'white'}} onClick={() => handleMenuClick('/myexercise')}>My Exercise</MenuItem>
                <MenuItem style={{ color: 'white' }} onClick={() => handleMenuClick('/diabetes2')}>T2D</MenuItem>
                <MenuItem style={{ color: 'white' }} onClick={() => handleMenuClick('/food')}>Food</MenuItem>
                <MenuItem style={{ color: 'white' }} onClick={() => handleMenuClick('/exercise')}>Exercise</MenuItem>
                <MenuItem style={{color: 'white'}} onClick={() => handleMenuClick('/stress')}>Stress Management</MenuItem>
                <MenuItem style={{color: 'white'}} onClick={() => handleMenuClick('/about')}>My Coach</MenuItem>
                <MenuItem style={{color: 'white'}} onClick={handleonclick}>Log Out</MenuItem>  
              </Menu>
            </>
          ) : (
            <div className={classes.headerOptions}>
              <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => handleMenuClick('/')}
              >
                <Typography variant="h6"> <HomeIcon>Home</HomeIcon> </Typography>
              </IconButton>    
              <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => handleMenuClick('/Uploadfood')}
              >
              <Typography variant="h6"> Upload Daily Diet </Typography>
              </IconButton>
              <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => handleMenuClick('/bloodsugar')}      
              >
                <Typography variant="h6"> Blood Sugar </Typography>
              </IconButton>
              <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => handleMenuClick('/myexercise')}          
              >
                <Typography variant="h6"> My Exercise </Typography>
              </IconButton>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <Typography variant="h6"> Guide </Typography>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                keepMounted
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                open={open}
                onClose={() => setAnchorEl(null)}
                className={classes.menu}
              >
                  <MenuItem style={{ color: 'white' }} onClick={() => handleMenuClick('/diabetes2')}>T2D</MenuItem>
                  <MenuItem style={{ color: 'white' }} onClick={() => handleMenuClick('/food')}>Food</MenuItem>
                  <MenuItem style={{ color: 'white' }} onClick={() => handleMenuClick('/exercise')}>Exercise</MenuItem>
                  <MenuItem style={{color: 'white'}} onClick={() => handleMenuClick('/stress')}>Stress Management</MenuItem>
              </Menu>
              {/* <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => handleMenuClick('/about')}         
              >
                <Typography variant="h6"> My Coach </Typography>
              </IconButton> */}
              <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => handleMenuClick('/user')}         
              >
                <Typography variant="h6"> Profile </Typography>
              </IconButton>  
              <IconButton
                  size="large"
                  color="inherit"
                  onClick={handleonclick}         
              >
                <Typography variant="h6"> Log Out </Typography>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
