import React from "react";
import classes from './styles.module.scss';
import logoImg from '../../../assets/images/usertive_logo.svg';

function Logo() {
  return (
    <div className={classes.root}>
      <div className={classes.internalCircle}>
        <img src={logoImg} alt={'Logo'} className={classes.logo} />
      </div>
    </div>
  );
}

export default Logo;