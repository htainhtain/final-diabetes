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
import { AuthApi, LanguageApi } from '../App.js';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import clsx from 'clsx';
import { styled } from '@mui/system';
import { useSwitch } from '@mui/base/SwitchUnstyled';

const SwitchRoot = styled('span')`
  display: inline-block;
  position: relative;
  width: 62px;
  height: 34px;
  padding: 7px;
`;

const SwitchInput = styled('input')`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
  cursor: pointer;
`;

const SwitchThumb = styled('span')(
    ({ theme }) => `
    position: absolute;
    display: block;
    background-color: ${theme.palette.mode === 'dark' ? '#e75480' : '#e75480'};
    width: 32px;
    height: 32px;
    border-radius: 16px;
    top: 1px;
    left: 7px;
    transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  
    &:before {
      display: block;
      content: "";
      width: 100%;
      height: 100%;
      background: url('https://www.svgrepo.com/show/125454/united-states-of-america.svg') center center no-repeat;
    }
  
    &.focusVisible {
      background-color: #79B;
    }
  
    &.checked {
      transform: translateX(16px);
      
      &:before {
        background-image: url('https://www.svgrepo.com/show/128879/thailand.svg');
      }
    }
  `,
);
  
const SwitchTrack = styled('span')(
    ({ theme }) => `
    background-color: ${theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'};
    border-radius: 17px;
    width: 73%;
    height: 70%;
    display: block;
  `,
);
  
function MUISwitch(props) {
    const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);
  
    const stateClasses = {
      checked,
      disabled,
      focusVisible,
    };

    return (
      <SwitchRoot className={clsx(stateClasses)}>
        <SwitchTrack>
          <SwitchThumb className={clsx(stateClasses)} />
        </SwitchTrack>
        <SwitchInput {...getInputProps()} aria-label="Demo switch" />
      </SwitchRoot>
    );
}


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
  const { t } = useTranslation();
  const [check, setCheck] = React.useState(false)
  const Lang = React.useContext(LanguageApi)

  console.log("Lang inside Headerauth: ", Lang)

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

  const handleChange = (event) => {

    if (event.target.checked) {
      i18next.changeLanguage('th')
    } 
    else {
      i18next.changeLanguage('en')
    }
  }

  React.useEffect(() => {
    console.log(i18next['language'])
    if (i18next['language'] === 'en-US' ||  i18next['language'] === 'en') {
      setCheck(false)
      Lang.setLang('en')
    }
    else {
      setCheck(true)
      Lang.setLang('th')
    }
  })

  console.log("check: ", check)

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{background:'#DE5C8E'}}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          {t('ProjectTitle.1')}
          </Typography>
          {isMobile ? (
            <>
              <MUISwitch  onChange={handleChange} checked={check}/>
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
                <MenuItem style={{color: 'white'}} onClick={() => handleMenuClick('/Uploadfood')}>{t('Upload.1')}</MenuItem>
                <MenuItem style={{color: 'white'}} onClick={() => handleMenuClick('/bloodsugar')}>{t('Blood.1')}</MenuItem>
                <MenuItem style={{color: 'white'}} onClick={() => handleMenuClick('/myexercise')}>{t('MyExercise.1')}</MenuItem>
                <MenuItem style={{ color: 'white' }} onClick={() => handleMenuClick('/diabetes2')}>{t('T2D.1')}</MenuItem>
                <MenuItem style={{ color: 'white' }} onClick={() => handleMenuClick('/food')}>{t('Food.1')}</MenuItem>
                <MenuItem style={{ color: 'white' }} onClick={() => handleMenuClick('/exercise')}>{t('Exercise.1')}</MenuItem>
                <MenuItem style={{color: 'white'}} onClick={() => handleMenuClick('/stress')}>{t('StressManagement.1')}</MenuItem>
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
              <Typography variant="h6"> {t('Upload.1')} </Typography>
              </IconButton>
              <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => handleMenuClick('/bloodsugar')}      
              >
                <Typography variant="h6"> {t('Blood.1')} </Typography>
              </IconButton>
              <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => handleMenuClick('/myexercise')}          
              >
                <Typography variant="h6"> {t('MyExercise.1')} </Typography>
              </IconButton>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <Typography variant="h6"> {t('Guide.1')} </Typography>
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
                  <MenuItem style={{ color: 'white' }} onClick={() => handleMenuClick('/diabetes2')}>{t('T2D.1')}</MenuItem>
                  <MenuItem style={{ color: 'white' }} onClick={() => handleMenuClick('/food')}>{t('Food.1')}</MenuItem>
                  <MenuItem style={{ color: 'white' }} onClick={() => handleMenuClick('/exercise')}>{t('Exercise.1')}</MenuItem>
                  <MenuItem style={{color: 'white'}} onClick={() => handleMenuClick('/stress')}>{t('StressManagement.1')}</MenuItem>
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
                <Typography variant="h6"> {t('Profile.1')} </Typography>
              </IconButton>  
              <IconButton
                  size="large"
                  color="inherit"
                  onClick={handleonclick}         
              >
                <Typography variant="h6"> {t('LogOut.1')} </Typography>
              </IconButton>
              <MUISwitch onChange={handleChange} checked={check}/>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
