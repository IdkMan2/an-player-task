
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
  isPlayingNow: boolean,
  isShuffleModeEnabled: boolean,
  isLoopModeEnabled: boolean,
  progressMillis: number,
}

export interface InitialState {
  songs: Song[],
  previousSongs: number[],
  nextSongs: number[],
  playbackStatus: PlaybackStatus,
}