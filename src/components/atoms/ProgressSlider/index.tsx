import {Slider, withStyles} from "@material-ui/core";

const ProgressSlider = withStyles({
  root: {
    height: 5,
  },
  thumb: {
    height: 0,
    width: 0,
    display: 'none'
  },
  active: {},
  track: {
    height: 5,
    color: '#00c9b7',
  },
  rail: {
    color: '#00c9b7',
    marginTop: 1.5,
    height: 2,
    borderRadius: 1,
  },
})(Slider);

export default ProgressSlider;