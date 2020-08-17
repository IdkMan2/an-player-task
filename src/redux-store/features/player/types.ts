
export interface Song {
  id: number,
  title: string,
  author: string,
  album: string,
  coverImg: string,
  durationMillis: number,
}

export interface PlaybackStatus {
  currentSongId: number,
  historyCursorIndex: number,
  isPlayingNow: boolean,
  isShuffleModeEnabled: boolean,
  isLoopModeEnabled: boolean,
  progressMilis: number,
}

export interface InitialState {
  songs: Song[],
  history: number[],
  playlist: number[],
  playbackStatus: PlaybackStatus,
}