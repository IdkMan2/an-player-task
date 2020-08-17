import {InitialState, PlaybackStatus, Song} from "./types";
import {getRandomInt} from "../../../utils/random-utils";

export function playbackStatusUpdater(state: InitialState, newPlaybackStatus: Partial<PlaybackStatus>): InitialState {
  return {
    ...state,
    ...{
      playbackStatus: {
        ...state.playbackStatus,
        ...newPlaybackStatus
      }
    }
  };
}

export function fillPlaylist(state: InitialState): number[] {
  const {playbackStatus: {isShuffleModeEnabled}} = state;

  if(isShuffleModeEnabled)
    return fillShuffledPlaylist(state);
  else
    return fillOrderedPlaylist(state);
}

function fillOrderedPlaylist(state: InitialState): number[] {
  let newPlaylist: number[] = state.playlist.slice();

  let lastSongIndex: number = newPlaylist.length > 0 ? newPlaylist[newPlaylist.length - 1] : 1;
  while(newPlaylist.length < state.songs.length + 1) {
    if(lastSongIndex === state.songs.length)
      lastSongIndex = 0;

    newPlaylist.push(state.songs[lastSongIndex].id);

    lastSongIndex += 1;
  }

  return newPlaylist;
}

function fillShuffledPlaylist(state: InitialState): number[] {
  let newPlaylist: number[] = state.playlist.slice();

  let lastPushedSongId: number = newPlaylist.length > 0 ? newPlaylist[newPlaylist.length - 1] : 1;
  while(newPlaylist.length < state.songs.length + 1) {
    const songIndex = getRandomInt(0, state.songs.length - 1);
    const song: Song = state.songs[songIndex];
    if(song.id !== lastPushedSongId) {
      lastPushedSongId = song.id;
      newPlaylist.push(song.id);
    }
  }

  return newPlaylist;
}