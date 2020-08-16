import React, {memo} from "react";
import RootTemplate from "../../templates/RootTemplate";
import BackgroundImage from "../../atoms/BackgroundImage";
import Header from "../../organisms/Header";
import {connectRedux, ConnectReduxProps} from "./redux";
import CoversSlider from '../../organisms/CoversSlider';
import PlayerControls from "../../organisms/PlayerControls";
import ProgressControls from "../../organisms/ProgressControls";
import {useSongTimeForwarded} from "../../../hooks/useSongTimeForwarded";

type RootPageProps = ConnectReduxProps;

function RootPage(props: RootPageProps) {
  const {currentSong, playbackStatus, forwardProgress} = props;
  const {isPlayingNow, progressMilis} = playbackStatus;
  useSongTimeForwarded(isPlayingNow, progressMilis, forwardProgress);

  return (
    <RootTemplate
      backgroundLayer={<BackgroundImage />}
      header={<Header albumTitle={currentSong.album} />}
      body={<CoversSlider {...{...props, currentSong: currentSong.id}} />}
      player={<PlayerControls {...playbackStatus} {...props} />}
      progressBar={<ProgressControls {...playbackStatus} songs={props.songs} forwardProgress={forwardProgress} />}
    />
  );
}

export default connectRedux(memo(RootPage));