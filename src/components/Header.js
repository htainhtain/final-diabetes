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
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import clsx from 'clsx';
import { styled } from '@mui/system';
import { useSwitch } from '@mui/base/SwitchUnstyled';
import { LanguageApi } from '../App.js';

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
  const { t } = useTranslation();
  const [check, setCheck] = React.useState(true)
  const Lang = React.useContext(LanguageApi)

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
  
  const handleChange = (event) => {

    if (event.target.checked) {
      i18next.changeLanguage('th')
    } 
    else {
      i18next.changeLanguage('en')
    }
  }

  React.useEffect(() => {
    if (i18next['language'] === 'en-US' ||  i18next['language'] === 'en') {
      setCheck(false)
      Lang.setLang('en')
    }
    else {
      setCheck(true)
      Lang.setLang('th')
    }
  })
  
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{background:'#DE5C8E'}}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          {t('ProjectTitle.1')}
          </Typography>
          {isMobile ? (
            <>
              <MUISwitch onChange={handleChange} checked={check}/>
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
                <MenuItem style={{color: 'white'}} onClick={() => handleMenuClick('/diabetes2')}>{t('T2D.1')}</MenuItem>
                <MenuItem style={{color: 'white'}} onClick={() => handleMenuClick('/food')}>{t('Food.1')}</MenuItem>
                <MenuItem style={{color: 'white'}} onClick={() => handleMenuClick('/exercise')}>{t('Exercise.1')}</MenuItem>
                <MenuItem style={{ color: 'white' }} onClick={() => handleMenuClick('/stress')}>{t('StressManagement.1')}</MenuItem>
                <MenuItem style={{color: 'white'}} onClick={() => handleMenuClick('/glucoseconverter')}>{t('glucoseconverter.1')}</MenuItem>
                <MenuItem style={{color: 'white'}} onClick={() => handleMenuClick('/about')}>{t('About.1')}</MenuItem>
                <MenuItem style={{color: 'white'}} onClick={() => handleMenuClick('/login')}>{t('Login.1')}</MenuItem>
                <MenuItem style={{color: 'white'}} onClick={() => handleMenuClick('/register')}>{t('SignUp.1')}</MenuItem>  
              </Menu>   
            </>
          ) : (
            <div className={classes.headerOptions}>
              <IconButton
                size="large"  
                color="inherit"
                onClick={() => handleButtonClick("/")}
              >
                <Typography variant="h6" > <HomeIcon>Home</HomeIcon> </Typography>
              </IconButton>
              <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => handleMenuClick('/diabetes2')}
              >
                <Typography variant="subtitle1"> {t('T2D.1')} </Typography>
              </IconButton>
              <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => handleMenuClick('/food')}      
              >
                <Typography variant="subtitle1"> {t('Food.1')} </Typography>
              </IconButton>
              <IconButton
                      size="large"
                      color="inherit"
                      onClick={() => handleMenuClick('/exercise')}          
                  >
                  <Typography variant="subtitle1"> {t('Exercise.1')} </Typography>
              </IconButton>
              <IconButton
                      size="large"
                      color="inherit"
                      onClick={() => handleMenuClick('/stress')}          
                  >
                  <Typography variant="subtitle1"> {t('StressManagement.1')} </Typography>
              </IconButton>
              {/* <IconButton
                      size="large"
                      color="inherit"
                      onClick={() => handleMenuClick('/glucoseconverter')}          
                  >
                  <Typography variant="subtitle1"> Glucose Converter </Typography>
              </IconButton>   */}
              <IconButton
                    size="large"
                    color="inherit"
                    onClick={() => handleMenuClick('/about')}         
                >
                  <Typography variant="subtitle1"> {t('About.1')} </Typography>
              </IconButton>
              <IconButton
                    size="large"
                    color="inherit"
                    onClick={() => handleMenuClick('/login')}         
                >
                <Typography variant="subtitle1"> {t('Login.1')} </Typography>
              </IconButton>
              <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => handleMenuClick('/register')}         
              >
                <Typography variant="subtitle1"> {t('SignUp.1')} </Typography>
              </IconButton>    
              <MUISwitch onChange={handleChange} checked={check}/>   
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
