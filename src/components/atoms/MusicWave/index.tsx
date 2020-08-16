import React from "react";
import musicWaveImg from '../../../assets/images/wave.png';
import classes from './styles.module.scss';

function MusicWave() {
  return (
    <div className={classes.root}>
      <img src={musicWaveImg} alt={'Fala muzyczna'} className={classes.img} />
    </div>
  );
}

export default MusicWave;