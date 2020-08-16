import React, {memo} from "react";
import {Song} from "../../../redux-store/features/player/types";
import classes from './styles.module.scss';
import Logo from "../Logo";
import clsx from "clsx";

export interface CoverProps {
  song: Song,
  enlarge?: boolean,
}

export function Cover(props: CoverProps) {
  const {song, enlarge=false} = props;

  return (
    <div className={clsx(classes.root, enlarge && classes.enlarge)}>
      <div
        className={classes.background}
        style={{
          backgroundImage: `url("${song.coverImg}")`
        }}
      />

      {enlarge && (
        <div className={classes.logoOverlay}>
          <Logo />
        </div>
      )}
    </div>
  );
}

export default memo(Cover);