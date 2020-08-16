import React, {memo} from "react";
import RootTemplate from "../../templates/Root";
import BackgroundImage from "../../atoms/BackgroundImage";
import Header from "../../organisms/Header";
import {connectRedux, ConnectReduxProps} from "./redux";
import CoversSlider from '../../organisms/CoversSlider';
import PlayerControls from "../../organisms/PlayerControls";

type RootPageProps = ConnectReduxProps;

function RootPage(props: RootPageProps) {
  const {currentSong, playbackStatus} = props;

  return (
    <RootTemplate
      backgroundLayer={<BackgroundImage />}
      header={<Header albumTitle={currentSong.album} />}
      body={<CoversSlider {...{...props, currentSong: currentSong.id}} />}
      player={<PlayerControls {...playbackStatus} {...props} />}
    />
  );
}

export default connectRedux(memo(RootPage));