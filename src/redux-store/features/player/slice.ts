import {Action, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {InitialState} from "./types";
import demoSongs from "./demo-songs";
import {fillPlaylist, playbackStatusUpdater} from "./helpers";

const initialState: InitialState = {
  songs: demoSongs,
  previousSongs: [],
  nextSongs: [],
  playbackStatus: {
    isPlayingNow: true,
    currentSongId: demoSongs[0].id,
    isLoopModeEnabled: false,
    isShuffleModeEnabled: false,
    progressMillis: 0,
  }
};
initialState.nextSongs = fillPlaylist(initialState);

export const player = createSlice({
  name: 'APP/FEATURES/PLAYER',
  initialState: initialState,
  reducers: {
    playSpecifiedSong: (state: InitialState, action: PayloadAction<number>) => {
      const nextSongId = action.payload;
      const {previousSongs, playbackStatus: {currentSongId}, nextSongs} = state;

      if(nextSongId === currentSongId) {
        // loop
        return playbackStatusUpdater(state, {
          progressMillis: 0,
        });
      } else if(previousSongs.indexOf(nextSongId) !== -1) {
        const newCurrentSongIndex = previousSongs.indexOf(nextSongId);
        const songsToTransfer = previousSongs.slice(newCurrentSongIndex + 1, previousSongs.length);
        const newPreviousSongs = previousSongs.slice(0, newCurrentSongIndex);
        const newNextSongs = nextSongs.slice();
        newNextSongs.unshift(...songsToTransfer, currentSongId);

        return {
          ...state,
          previousSongs: newPreviousSongs,
          nextSongs: newNextSongs,
          playbackStatus: {
            ...state.playbackStatus,
            currentSongId: nextSongId,
            progressMillis: 0,
            isLoopModeEnabled: false,
          }
        };
      } else if(nextSongs.indexOf(nextSongId) !== -1) {
        const newCurrentSongIndex = nextSongs.indexOf(nextSongId);
        const songsToTransfer = nextSongs.slice(0, newCurrentSongIndex);
        const newNextSongs = nextSongs.slice(newCurrentSongIndex + 1, nextSongs.length);
        const newPreviousSongs = previousSongs.slice();
        newPreviousSongs.push(currentSongId, ...songsToTransfer);

        return {
          ...state,
          previousSongs: newPreviousSongs,
          nextSongs: newNextSongs,
          playbackStatus: {
            ...state.playbackStatus,
            currentSongId: nextSongId,
            progressMillis: 0,
            isLoopModeEnabled: false,
          }
        };
      }
    },
    playPreviousSong: (state: InitialState, _action: Action) => {
      if(state.previousSongs.length === 0)
        return playbackStatusUpdater(state, {
          progressMillis: 0,
        });

      const newNextSongs = state.nextSongs.slice();
      const newPrevSongs = state.previousSongs.slice();
      const songId = newPrevSongs.pop() as number;
      const currentSongId = state.playbackStatus.currentSongId;
      newNextSongs.unshift(currentSongId);

      return {
        ...state,
        previousSongs: newPrevSongs,
        nextSongs: newNextSongs,
        playbackStatus: {
          ...state.playbackStatus,
          currentSongId: songId,
          progressMillis: 0,
          isLoopModeEnabled: false,
        }
      };
    },
    playNextSong: (state: InitialState, _action: Action) => {
      if(state.nextSongs.length === 0)
        return;

      const newNextSongs = state.nextSongs.slice();
      const newPrevSongs = state.previousSongs.slice();
      const songId = newNextSongs.shift() as number;
      const currentSongId = state.playbackStatus.currentSongId;
      newPrevSongs.push(currentSongId);

      return {
        ...state,
        previousSongs: newPrevSongs,
        nextSongs: newNextSongs,
        playbackStatus: {
          ...state.playbackStatus,
          currentSongId: songId,
          progressMillis: 0,
          isLoopModeEnabled: false,
        }
      };
    },
    loopSong: (state: InitialState, _action: Action) => {
      return playbackStatusUpdater(state, {
        progressMillis: 0,
      });
    },
    switchShuffleMode: (state: InitialState, action: PayloadAction<boolean | undefined>) => {
      return playbackStatusUpdater(state, {
        isShuffleModeEnabled: action.payload ? action.payload : !state.playbackStatus.isShuffleModeEnabled,
      });
    },
    switchLoopMode: (state: InitialState, action: PayloadAction<boolean | undefined>) => {
      return playbackStatusUpdater(state, {
        isLoopModeEnabled: action.payload ? action.payload : !state.playbackStatus.isLoopModeEnabled,
      });
    },
    switchPlayingState: (state: InitialState, action: PayloadAction<boolean | undefined>) => {
      return playbackStatusUpdater(state, {
        isPlayingNow: action.payload ? action.payload : !state.playbackStatus.isPlayingNow,
      });
    },
    forwardProgress: (state: InitialState, action: PayloadAction<number>) => {
      return playbackStatusUpdater(state, {
        progressMillis: action.payload,
      });
    },
  },
});