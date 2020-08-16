import React, {memo, useCallback} from "react";
import classes from './styles.module.scss';
import shuffleBtnIcon from '../../../assets/images/shuffle_ico.svg';
import prevSongBtnIcon from '../../../assets/images/previous_ico.svg';
import nextSongBtnIcon from '../../../assets/images/next_ico.svg';
import loopSongBtnIcon from '../../../assets/images/repeat_ico.svg';
import playActiveBtnIcon from '../../../assets/images/Play_active.png';
import playInactiveBtnIcon from '../../../assets/images/Play_inactive.png';
import {PlaybackStatus} from "../../../redux-store/features/player/types";
import clsx from "clsx";

type PropsKeys = 'switchPlayingState' | 'switchLoopMode' | 'switchShuffleMode' | 'playPreviousSong' | 'playNextSong';
export type PlayerControlsProps = PlaybackStatus & Record<PropsKeys, () => void>;

function PlayerControls(props: PlayerControlsProps) {
  const {
    isPlayingNow, switchPlayingState,
    isLoopModeEnabled, switchLoopMode,
    isShuffleModeEnabled, switchShuffleMode,
    playPreviousSong, playNextSong
  } = props;

  const createSwitcher = useCallback(
    (fn: Function) => () => fn(), []
  );

  return (
    <div className={classes.root}>
      <div className={classes.controlBtn}>
        <img
          src={shuffleBtnIcon}
          alt={'Losowe'}
          onClick={createSwitcher(switchShuffleMode)}
          className={clsx(isShuffleModeEnabled && classes.active)}
        />
      </div>
      <div className={classes.controlBtn}>
        <img
          src={prevSongBtnIcon}
          alt={'Poprzedni utwór'}
          onClick={createSwitcher(playPreviousSong)}
        />
      </div>
      <div className={classes.playBtn}>
        <img
          src={playActiveBtnIcon}
          alt={'Pauza'}
          className={clsx(classes.active, !isPlayingNow && classes.fadeOut)}
          onClick={createSwitcher(switchPlayingState)}
        />
        <img
          src={playInactiveBtnIcon}
          alt={'Play'}
          className={clsx(isPlayingNow && classes.fadeOut)}
          onClick={createSwitcher(switchPlayingState)}
        />
      </div>
      <div className={classes.controlBtn}>
        <img
          src={nextSongBtnIcon}
          alt={'Następny utwór'}
          onClick={createSwitcher(playNextSong)}
        />
      </div>
      <div className={classes.controlBtn}>
        <img
          src={loopSongBtnIcon}
          alt={'Zapętlij bieżący'}
          onClick={createSwitcher(switchLoopMode)}
          className={clsx(isLoopModeEnabled && classes.active)}
        />
      </div>
    </div>
  );
}

export default memo(PlayerControls);