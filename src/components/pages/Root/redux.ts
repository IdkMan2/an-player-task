import {Song} from "../../../redux-store/features/player/types";
import {RootState, StandardDispatch} from "../../../redux-store/types";
import {connect, ConnectedProps} from "react-redux";
import {bindActionCreators} from "redux";
import {player} from "../../../redux-store/features/player/slice";

const mapStateToProps = (state: RootState) => {
  const playbackStatus = state.player.playbackStatus;
  const currentSong: Song = state.player.songs.find(
    (song: Song) => song.id === playbackStatus.currentSongId
  ) as Song;

  return {
    currentSong: currentSong,
    previousSongs: state.player.previousSongs,
    nextSongs: state.player.nextSongs,
    songs: state.player.songs,
    playbackStatus: playbackStatus,
  };
};

const mapDispatchToProps = (dispatch: StandardDispatch) => (
  bindActionCreators({
    playSpecifiedSong: player.actions.playSpecifiedSong,
    playPreviousSong: player.actions.playPreviousSong,
    playNextSong: player.actions.playNextSong,
    switchPlayingState: player.actions.switchPlayingState,
    switchLoopMode: player.actions.switchLoopMode,
    switchShuffleMode: player.actions.switchShuffleMode,
  }, dispatch)
);

export const connectRedux = connect(mapStateToProps, mapDispatchToProps);

export type ConnectReduxProps = ConnectedProps<typeof connectRedux>;