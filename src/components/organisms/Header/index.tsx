import React from "react";
import classes from './styles.module.scss';
import HeaderButton from "../../atoms/HeaderButton";
import backButtonImg from '../../../assets/images/back_ico.svg';
import moreButtonImg from '../../../assets/images/more_ico.svg';
import AlbumTitle from "../../molecules/AlbumTitle";

export interface HeaderProps {
  albumTitle: string,
}

function Header(props: HeaderProps) {
  return (
    <div className={classes.root}>
      <HeaderButton imgSrc={backButtonImg} altDescription={'Przycisk powrotu'} />
      <AlbumTitle title={props.albumTitle} />
      <HeaderButton imgSrc={moreButtonImg} altDescription={'Przycisk powrotu'} />
    </div>
  );
}

export default Header;