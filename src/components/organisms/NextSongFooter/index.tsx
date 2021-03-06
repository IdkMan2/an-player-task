import React, {memo, useMemo} from "react";
import {InitialState, Song} from "../../../redux-store/features/player/types";
import classes from './styles.module.scss';
import playlistImg from '../../../assets/images/playlist_ico.svg';
import {easyTimeFormat} from "../../../utils/time-utils";

export type NextSongFooterProps = Pick<InitialState, 'playlist' | 'songs'>;

function NextSongFooter(props: NextSongFooterProps) {
  const {playlist, songs} = props;
  let nextSong: Song | undefined = undefined;
  if(playlist.length > 0)
    nextSong = songs.find(song => song.id === playlist[0]) as Song;

  const songDuration: string | undefined = useMemo(() => {
    return nextSong ? easyTimeFormat(nextSong.durationMillis) : undefined;
  }, [nextSong]);

  return (
    <div className={classes.root}>
      <div className={classes.playlistImgWrapper}>
        <img src={playlistImg} alt={'Lista'} className={classes.playlistImg} />
      </div>
      <div className={classes.nextSongContentWrapper}>
        <span className={classes.label}>NEXT</span>
        <div className={classes.songInfoRow}>
          <span className={classes.songTitle}>{nextSong ? nextSong.title : 'END OF PLAYLIST'}</span>
          {nextSong && (
            <span className={classes.songDuration}>{songDuration}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(NextSongFooter);