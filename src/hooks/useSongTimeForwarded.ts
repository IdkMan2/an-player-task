import {useCallback, useEffect, useRef} from "react";

export function useSongTimeForwarded(
  isPlayingNow: boolean,
  progressMilis: number,
  forwardProgress: () => void,
) {
  const tickTimerId = useRef<null | NodeJS.Timeout>(null);

  const setupTimer = useCallback(() => {
    tickTimerId.current = setInterval(() => {
      forwardProgress();
    }, 1000);
  }, [tickTimerId, forwardProgress]);

  const destroyTimer = useCallback(() => {
    if(tickTimerId.current) {
      clearInterval(tickTimerId.current);
      tickTimerId.current = null;
    }
  }, [tickTimerId]);


  useEffect(() => {
    if(isPlayingNow && !tickTimerId.current)
      setupTimer();
    else if(!isPlayingNow && tickTimerId.current)
      destroyTimer();

    return () => {
      if(!isPlayingNow && tickTimerId.current)
        destroyTimer();
    };
  }, [isPlayingNow, tickTimerId, setupTimer, destroyTimer]);

}