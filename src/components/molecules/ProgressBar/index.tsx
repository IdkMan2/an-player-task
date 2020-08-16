import React, {memo, useCallback} from "react";
import classes from "./styles.module.scss";
import ProgressSlider from "../../atoms/ProgressSlider";

export interface ProgressBarProps {
  durationMilis: number,
  progressMilis: number,
  setProgressMilis: (newLocalProgress: number, commited?: boolean) => void,
}

function ProgressBar(props: ProgressBarProps) {
  const {
    durationMilis, progressMilis, setProgressMilis
  } = props;

  const handleChange = useCallback((event: any, value: number | number[]) => {
    setProgressMilis(Array.isArray(value) ? value[0] : value);
  }, [setProgressMilis]);

  const handleChangeCommited = useCallback((_event: React.ChangeEvent<{}>, value: number | number[]) => {
    setProgressMilis(Array.isArray(value) ? value[0] : value, true);
  }, [setProgressMilis]);

  return (
    <div className={classes.root}>
      <ProgressSlider
        value={progressMilis}
        min={0}
        max={durationMilis}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommited}
        valueLabelDisplay={'off'}
      />
      <div className={classes.sliderEndDot} />
    </div>
  );
}

export default memo(ProgressBar);