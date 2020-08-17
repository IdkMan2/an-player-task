import * as React from 'react';
import classes from './styles.module.scss';
import {Component} from "react";
import {Song} from "../../../redux-store/features/player/types";
import {Cover} from "../../atoms/Cover";
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import {coversCarouselSettings, titlesCarouselSettings} from "./carousel-settings";
import SongTitle from "../../molecules/SongTitle";
import {MAX_ROOT_WIDTH} from "../../../utils/constans";

const coverSize = Math.floor(MAX_ROOT_WIDTH * 0.56);

export interface CoversSliderProps {
  currentSong: number,
  songs: Song[],
  playSpecifiedSong: (nextSongId: number) => void,
}
export interface CoversSliderState {
  currentSlideIndex: number,
}

class CoversSlider extends Component<CoversSliderProps, CoversSliderState> {
  constructor(props: CoversSliderProps) {
    super(props);
    this.renderCover = this.renderCover.bind(this);
    this.onSlideChange = this.onSlideChange.bind(this);
    this.renderTitle = this.renderTitle.bind(this);

    this.state = {
      currentSlideIndex: 0,
    };
  }

  componentDidUpdate(prevProps: Readonly<CoversSliderProps>) {
    if(prevProps.currentSong !== this.props.currentSong) {
      const song: Song = this.props.songs.find(
        song => song.id === this.props.currentSong
      ) as Song;
      const newSlideIndex = this.props.songs.indexOf(song);
      this.setState({
        currentSlideIndex: newSlideIndex,
      });
    }
  }
  private renderCover(song: Song, index: number) {
    return (
      <Cover
        key={song.id + ':' + index}
        song={song}
        enlarge={this.props.currentSong === song.id}
      />
    );
  }
  private async onSlideChange(index: number): Promise<void> {
    const songId = this.props.songs[index].id;
    this.setState({
      currentSlideIndex: index,
    });
    await this.props.playSpecifiedSong(songId);
  }
  private renderTitle(song: Song, index: number) {
    return (
      <SongTitle
        key={song.id + ':' + index + '-title'}
        song={song}
        visible={this.props.currentSong === song.id}
      />
    );
  }

  render() {
    const {songs} = this.props;
    const {currentSlideIndex} = this.state;

    return (
      <div className={classes.root}>
        <Carousel
          itemWidth={coverSize}
          offset={-32}
          value={currentSlideIndex}
          onChange={this.onSlideChange}
          {...coversCarouselSettings}
        >
          {songs.map(this.renderCover)}
        </Carousel>

        <div className={classes.divider} />

        <Carousel
          itemWidth={coverSize}
          offset={-32}
          value={currentSlideIndex}
          onChange={this.onSlideChange}
          {...titlesCarouselSettings}
        >
          {songs.map(this.renderTitle)}
        </Carousel>
      </div>
    );
  }
}

export default CoversSlider;