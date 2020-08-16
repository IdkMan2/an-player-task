import React, {memo, useCallback, useEffect, useMemo, useState} from "react";
import ProgressBar from "../../molecules/ProgressBar";
import {PlaybackStatus, Song} from "../../../redux-store/features/player/types";
import classes from './styles.module.scss';
import {easyTimeFormat} from "../../../utils/time-utils";
import usePrevious from "../../../hooks/usePrevious";

export interface ProgressControlsProps extends PlaybackStatus {
  songs: Song[],
  forwardProgress: (newProgressMilis: number) => void,
}

function ProgressControls(props: ProgressControlsProps) {
  const {currentSongId, songs, progressMilis, forwardProgress} = props;
  const prevProgressMilis = usePrevious(progressMilis);
  const [localProgress, setLocalProgress] = useState<number>(progressMilis);
  const [isSwipingNow, setSwipingNow] = useState<boolean>(false);

  useEffect(() => {
    if(!isSwipingNow && prevProgressMilis !== progressMilis)
      setLocalProgress(progressMilis);
  }, [isSwipingNow, prevProgressMilis, progressMilis, setLocalProgress]);

  const currentSong: Song = useMemo(() => {
    return songs.find(song => song.id === currentSongId) as Song;
  }, [currentSongId, songs]);
  const {durationMillis} = currentSong;

  const handleSliderProgressChange = useCallback((newValue: number, commited?: boolean) => {
    if(commited) {
      forwardProgress(newValue);
      setSwipingNow(false);
    } else {
      if(isSwipingNow) {
        if(newValue === localProgress)
          return;
      } else {
        if(!isSwipingNow)
          setSwipingNow(true);
      }

      setLocalProgress(newValue);
    }
  }, [isSwipingNow, setSwipingNow, localProgress, setLocalProgress, forwardProgress]);

  const startTime = useMemo(() => easyTimeFormat(localProgress), [localProgress]);
  const endTime = useMemo(() => easyTimeFormat(durationMillis), [durationMillis]);

  return (
    <div className={classes.root}>
      <span className={classes.timeLabel}>
        {startTime}
      </span>
      <ProgressBar
        progressMilis={localProgress}
        durationMilis={currentSong.durationMillis}
        setProgressMilis={handleSliderProgressChange}
      />
      <span className={classes.timeLabel}>
        {endTime}
      </span>
    </div>
  );
}

export default memo(ProgressControls);