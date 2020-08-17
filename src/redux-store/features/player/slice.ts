import {Action, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {InitialState} from "./types";
import demoSongs from "./demo-songs";
import {fillPlaylist, playbackStatusUpdater} from "./helpers";

const initialState: InitialState = {
  songs: demoSongs,
  history: [],
  playlist: [],
  playbackStatus: {
    isPlayingNow: true,
    currentSongId: demoSongs[0].id,
    historyCursorIndex: 0,
    isLoopModeEnabled: false,
    isShuffleModeEnabled: false,
    progressMilis: 0,
  }
};
initialState.playlist = fillPlaylist(initialState);

export const player = createSlice({
  name: 'APP/FEATURES/PLAYER',
  initialState: initialState,
  reducers: {
    playSpecifiedSong: (state: InitialState, action: PayloadAction<number>) => {
      const previousSongId = state.playbackStatus.currentSongId;
      const nextSongId = action.payload;
      const {history, playbackStatus: {currentSongId}} = state;

      if(nextSongId === currentSongId) {
        // loop
        return playbackStatusUpdater(state, {
          progressMilis: 0,
        });
      } else {
        const newHistory = history.slice();
        newHistory.push(previousSongId);

        return {
          ...state,
          history: newHistory,
          playbackStatus: {
            ...state.playbackStatus,
            currentSongId: nextSongId,
            historyCursorIndex: newHistory.length,
            progressMilis: 0,
            isLoopModeEnabled: false
          }
        };
      }
    },
    playRandomSong: (state: InitialState, _action: Action) => {
      const historyCursor = state.playbackStatus.historyCursorIndex;
      const newPlaylist = fillPlaylist(state);
      const newHistory = state.history.slice();

      // maintain history
      if(historyCursor === state.history.length) {
        const prevSongId = state.playbackStatus.currentSongId;
        newHistory.push(prevSongId);
      }

      // keep history cursor updated
      const newHistoryCursor = newHistory.length;

      // get song
      const newCurrentSongId = newPlaylist.shift() as number;

      return {
        ...state,
        history: newHistory,
        playlist: newPlaylist,
        playbackStatus: {
          ...state.playbackStatus,
          currentSongId: newCurrentSongId,
          historyCursorIndex: newHistoryCursor,
          progressMilis: 0,
          isLoopModeEnabled: false
        }
      };
    },
    playPreviousSong: (state: InitialState, _action: Action) => {
      const historyCursor = state.playbackStatus.historyCursorIndex;
      if(state.history.length === 0 || historyCursor === 0)
        return playbackStatusUpdater(state, {
          progressMilis: 0,
        });

      const nextHistoryCursor = historyCursor - 1;
      const nextSongId = state.history[nextHistoryCursor];

      return {
        ...state,
        playbackStatus: {
          ...state.playbackStatus,
          currentSongId: nextSongId,
          historyCursorIndex: nextHistoryCursor,
          progressMilis: 0,
          isLoopModeEnabled: false
        }
      };
    },
    playNextSong: (state: InitialState, _action: Action) => {
      const historyCursor = state.playbackStatus.historyCursorIndex;
      const newPlaylist = fillPlaylist(state);
      let newHistory, newCurrentSongId, newHistoryCursor;

      if(historyCursor === state.history.length) { // playing new songs
        newHistory = state.history.slice();
        newCurrentSongId = newPlaylist.shift() as number;
        // maintain history
        const prevSongId = state.playbackStatus.currentSongId;
        newHistory.push(prevSongId);
        newHistoryCursor = newHistory.length;
      } else { // searching in history
        newHistoryCursor = historyCursor + 1;
        newHistory = state.history.slice();
        if(newHistory.length === newHistoryCursor) {
          newCurrentSongId = newPlaylist.shift() as number;
        } else {
          newCurrentSongId = newHistory[newHistoryCursor];
        }
      }

      return {
        ...state,
        history: newHistory,
        playlist: newPlaylist,
        playbackStatus: {
          ...state.playbackStatus,
          currentSongId: newCurrentSongId,
          historyCursorIndex: newHistoryCursor,
          progressMilis: 0,
          isLoopModeEnabled: false
        }
      };
    },
    loopSong: (state: InitialState, _action: Action) => {
      return playbackStatusUpdater(state, {
        progressMilis: 0
      });
    },
    switchShuffleMode: (state: InitialState, action: PayloadAction<boolean | undefined>) => {
      const isShuffleModeEnabled = typeof(action.payload) === 'boolean' ? action.payload : !state.playbackStatus.isShuffleModeEnabled;

      return {
        ...state,
        playlist: isShuffleModeEnabled ? [] : [1],
        playbackStatus: {
          ...state.playbackStatus,
          isShuffleModeEnabled,
        }
      };
    },
    switchLoopMode: (state: InitialState, action: PayloadAction<boolean | undefined>) => {
      return playbackStatusUpdater(state, {
        isLoopModeEnabled: typeof(action.payload) === 'boolean' ? action.payload : !state.playbackStatus.isLoopModeEnabled,
      });
    },
    switchPlayingState: (state: InitialState, action: PayloadAction<boolean | undefined>) => {
      return playbackStatusUpdater(state, {
        isPlayingNow: typeof(action.payload) === 'boolean' ? action.payload : !state.playbackStatus.isPlayingNow,
      });
    },
    forwardProgress: (state: InitialState, action: PayloadAction<number | undefined>) => {
      return playbackStatusUpdater(state, {
        progressMilis: typeof(action.payload) === 'number' ? action.payload : state.playbackStatus.progressMilis + 1000,
      });
    },
  },
});