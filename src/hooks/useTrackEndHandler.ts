import {useEffect} from "react";

export interface UseTrackEndHandlerProps {
  isPlayingNow: boolean,
  progressMilis: number,
  durationMilis: number,
  isLoopModeEnabled: boolean,
  isShuffleModeEnabled: boolean,
  loopSong: () => void,
  playNextSong: () => void,
  playRandomSong: () => void,
  switchPlayingState: (newPlayingState: boolean) => void,
}

export default function useTrackEndHandler(args: UseTrackEndHandlerProps) {
  const {
    isPlayingNow, progressMilis, durationMilis,
    isLoopModeEnabled, loopSong, playNextSong,
    switchPlayingState, isShuffleModeEnabled,
    playRandomSong,
  } = args;

  useEffect(() => {
    if(!isPlayingNow && progressMilis === durationMilis) {
      if(isLoopModeEnabled)
        loopSong();
      else if(isShuffleModeEnabled)
        playRandomSong();
      else
        playNextSong();

      switchPlayingState(true);
    }
  }, [
    isPlayingNow, progressMilis, durationMilis,
    isLoopModeEnabled, loopSong, playNextSong,
    switchPlayingState, isShuffleModeEnabled,
    playRandomSong
  ]);
}