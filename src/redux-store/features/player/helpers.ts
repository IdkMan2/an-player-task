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
  let newNextSongs: number[] = state.nextSongs.slice();

  let songIndex: number = newNextSongs[newNextSongs.length - 1] ?? 0;
  const limit = state.songs.length - state.previousSongs.length - 1;
  while(newNextSongs.length < limit) {
    songIndex += 1;

    if(songIndex === state.songs.length)
      songIndex = 0;

    newNextSongs.push(state.songs[songIndex].id);
  }

  return newNextSongs;
}

function fillShuffledPlaylist(state: InitialState): number[] {
  let newNextSongs: number[] = state.nextSongs.slice();

  let lastPushedSongId: number = newNextSongs[newNextSongs.length - 1] ?? 0;
  const limit = state.songs.length - state.previousSongs.length - 1;
  while(newNextSongs.length < limit) {
    const songIndex = getRandomInt(0, state.songs.length);
    const song: Song = state.songs[songIndex];
    if(song.id !== lastPushedSongId) {
      lastPushedSongId = song.id;
      newNextSongs.push(song.id);
    }
  }

  return newNextSongs;
}