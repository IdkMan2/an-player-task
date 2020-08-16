import React from "react";
import classes from './styles.module.scss';

export interface HeaderButtonProps {
  imgSrc?: string,
  altDescription?: string,
}

function HeaderButton(props: HeaderButtonProps) {
  const {imgSrc, altDescription} = props;

  return (
    <div className={classes.btnContainer}>
      <img src={imgSrc} alt={altDescription} className={classes.img} />
    </div>
  );
}

export default HeaderButton;