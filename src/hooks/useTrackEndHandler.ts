import {useEffect} from "react";

export interface UseTrackEndHandlerProps {
  isPlayingNow: boolean,
  progressMilis: number,
  durationMilis: number,
  isLoopModeEnabled: boolean,
  loopSong: () => void,
  playNextSong: () => void,
  switchPlayingState: (newPlayingState: boolean) => void,
}

export default function useTrackEndHandler(args: UseTrackEndHandlerProps) {
  const {
    isPlayingNow, progressMilis, durationMilis,
    isLoopModeEnabled, loopSong, playNextSong,
    switchPlayingState
  } = args;

  useEffect(() => {
    if(!isPlayingNow && progressMilis === durationMilis) {
      if(isLoopModeEnabled)
        loopSong();
      else
        playNextSong();

      switchPlayingState(true);
    }
  }, [
    isPlayingNow, progressMilis, durationMilis,
    isLoopModeEnabled, loopSong, playNextSong,
    switchPlayingState
  ]);
}