import {Slider, withStyles} from "@material-ui/core";

const SecondaryProgressSlider = withStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0, right: 0,
    height: 5,
    zIndex: -10,
  },
  thumb: {
    height: 6,
    width: 6,
    backgroundColor: '#00c9b7',
    marginTop: -1.5,
    marginRight: -100,
  },
  active: {},
  track: {
    color: '#00c9b7',
    height: 2,
    borderRadius: 1,
  },
  rail: {
    color: '#00c9b7',
    height: 2,
    borderRadius: 1,
  },
})(Slider);

export default SecondaryProgressSlider;