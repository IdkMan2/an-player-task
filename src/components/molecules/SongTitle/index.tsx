import React, {memo} from "react";
import classes from './styles.module.scss';
import {Song} from "../../../redux-store/features/player/types";
import clsx from "clsx";

export interface SongTitleProps {
  song: Song,
  visible?: boolean,
}

function SongTitle(props: SongTitleProps) {
  const {song, visible=false} = props;

  return (
    <div className={clsx(classes.root, visible && classes.fadeIn)}>
      <h6 className={classes.title}>{song.title}</h6>
      <h4 className={classes.subtitle}>{song.author.toUpperCase()}</h4>
    </div>
  );
}

export default memo(SongTitle);