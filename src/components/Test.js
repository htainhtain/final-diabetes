import React from 'react';
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
    background-color: ${theme.palette.mode === 'dark' ? '#003892' : '#001e3c'};
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
  
  console.log("checked inside muiswitch: ", checked)
  
    const stateClasses = {
      checked,
      disabled,
      focusVisible,
  };
  console.log("checked: ", stateClasses['checked'])

    return (
      <SwitchRoot className={clsx(stateClasses)}>
        <SwitchTrack>
          <SwitchThumb className={clsx(stateClasses)} />
        </SwitchTrack>
        <SwitchInput {...getInputProps()} aria-label="Demo switch" />
      </SwitchRoot>
    );
}
  

function Test() {
    const { t } = useTranslation();

    const handleChange = (event) => {
        event.target.checked ? i18next.changeLanguage('th') : i18next.changeLanguage('en')
    }

    return (
        <div className="App">
            <nav style={{ width: '100%', padding: '2rem 0', backgroundColor:'gray' }}>
          <MUISwitch defaultChecked onChange={handleChange} />    
            </nav>
            <header className="App-header">
            <p>
                <h3>{t('Profile.1')}</h3>  <h3>{t('T2D.1')}</h3> 
            </p>
            </header>
        </div>
    )
}

export default Test
