import React from "react";
import classes from './styles.module.scss';

export interface AlbumTitleProps {
  title: string,
}

function AlbumTitle(props: AlbumTitleProps) {
  return (
    <div className={classes.root}>
      <h6 className={classes.albumInfo}>ALBUM</h6>
      <h4 className={classes.albumTitle}>{props.title}</h4>
    </div>
  );
}

export default AlbumTitle;