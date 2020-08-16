import {Song} from "./types";
import cover1 from '../../../assets/images/cover.png';
import cover2 from '../../../assets/images/unreleased_cover.png';
import cover3 from '../../../assets/images/cover-1.png';

const demoSongs: Song[] = [
  {
    id: 1,
    title: 'Asian Hooker',
    album: 'Steel Panther',
    author: 'Feel the Steel',
    durationMillis: 242000,
    coverImg: cover1,
  },
  {
    id: 2,
    title: 'Self Conscious',
    album: 'Unreleased',
    author: 'Kanye West',
    durationMillis: 261000,
    coverImg: cover2,
  },
  {
    id: 3,
    title: 'Gossip Files',
    album: 'Unreleased',
    author: 'Kanye West',
    durationMillis: 233000,
    coverImg: cover3,
  },
];

export default demoSongs;