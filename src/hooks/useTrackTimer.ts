import {useEffect, useRef} from "react";
import usePrevious from "./usePrevious";

export interface UseSongTimeForwardedArgs {
  isPlayingNow: boolean,
  progressMilis: number,
  durationMilis: number,
  switchPlayingState: (newPlayingState: boolean) => void
  forwardProgress: (newProgressMilis: number) => void,
}

export function useTrackTimer(args: UseSongTimeForwardedArgs) {
  const {
    isPlayingNow, progressMilis, durationMilis,
    forwardProgress, switchPlayingState
  } = args;
  const prevProgressMilis = usePrevious(progressMilis);
  const progressMilisPointer = useRef<number>(progressMilis);
  const tickTimerId = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    if(prevProgressMilis !== progressMilis)
      progressMilisPointer.current = progressMilis;
  }, [prevProgressMilis, progressMilis, progressMilisPointer]);

  useEffect(() => {
    function stopTimer() {
      if(tickTimerId.current) {
        clearInterval(tickTimerId.current);
        tickTimerId.current = null;
      }
    }

    if(isPlayingNow && !tickTimerId.current) {
      tickTimerId.current = setInterval(() => {
        const progressMilis = progressMilisPointer.current;
        const left: number = durationMilis - progressMilis;
        if(left < 1000) {
          stopTimer(); // niekonieczne, ale w sumie spoko, żeby nie było, że przekroczy o sekunde..?
          forwardProgress(progressMilis + left);
          switchPlayingState(false);
        } else {
          forwardProgress(progressMilis + 1000);
        }
      }, 1000);
    } else if(!isPlayingNow) {
      stopTimer();
    }

    return () => {
      if(!isPlayingNow && tickTimerId.current) {
        clearInterval(tickTimerId.current);
        tickTimerId.current = null;
      }
    };
  }, [
    isPlayingNow, tickTimerId, durationMilis,
    progressMilisPointer, forwardProgress, switchPlayingState
  ]);

}