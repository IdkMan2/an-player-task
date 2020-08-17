import React, {memo} from "react";
import RootTemplate from "../../templates/RootTemplate";
import BackgroundImage from "../../atoms/BackgroundImage";
import Header from "../../organisms/Header";
import {connectRedux, ConnectReduxProps} from "./redux";
import CoversSlider from '../../organisms/CoversSlider';
import PlayerControls from "../../organisms/PlayerControls";
import ProgressControls from "../../organisms/ProgressControls";
import {useTrackTimer} from "../../../hooks/useTrackTimer";
import useTrackEndHandler from "../../../hooks/useTrackEndHandler";
import MusicWave from "../../atoms/MusicWave";
import NextSongFooter from "../../organisms/NextSongFooter";

type RootPageProps = ConnectReduxProps;

function RootPage(props: RootPageProps) {
  const {
    currentSong, playbackStatus, forwardProgress,
    switchPlayingState, loopSong, playNextSong,
    songs, playRandomSong, playlist
  } = props;
  const {isPlayingNow, progressMilis, isLoopModeEnabled, isShuffleModeEnabled} = playbackStatus;

  useTrackTimer({
    isPlayingNow,
    progressMilis,
    forwardProgress,
    switchPlayingState,
    durationMilis: currentSong.durationMillis,
  });

  useTrackEndHandler({
    isPlayingNow,
    progressMilis,
    isLoopModeEnabled,
    isShuffleModeEnabled,
    durationMilis: currentSong.durationMillis,
    loopSong,
    playNextSong,
    switchPlayingState,
    playRandomSong
  });

  return (
    <RootTemplate
      backgroundLayer={<BackgroundImage />}
      header={<Header albumTitle={currentSong.album} />}
      body={<CoversSlider {...{...props, currentSong: currentSong.id}} />}
      player={<PlayerControls {...playbackStatus} {...props} />}
      progressBar={<ProgressControls {...playbackStatus} songs={props.songs} forwardProgress={forwardProgress} />}
      musicWave={<MusicWave />}
      footer={<NextSongFooter songs={songs} playlist={playlist} />}
    />
  );
}

export default connectRedux(memo(RootPage));