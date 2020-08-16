import React, {memo} from "react";
import RootTemplate from "../../templates/Root";
import BackgroundImage from "../../atoms/BackgroundImage";
import Header from "../../organisms/Header";
import {connectRedux, ConnectReduxProps} from "./redux";
import CoversSlider from '../../organisms/CoversSlider';

type RootPageProps = ConnectReduxProps;

function RootPage(props: RootPageProps) {
  const {currentSong} = props;

  return (
    <RootTemplate
      backgroundLayer={<BackgroundImage />}
      header={<Header albumTitle={currentSong.album} />}
      body={<CoversSlider {...{...props, currentSong: currentSong.id}} />}
    />
  );
}

export default connectRedux(memo(RootPage));