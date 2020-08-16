import * as React from "react";
import classes from './styles.module.scss';

function BackgroundImage() {
  return (
    <React.Fragment>
      <div className={classes.image} />
      <div className={classes.gradient} />
    </React.Fragment>
  );
}

export default BackgroundImage;