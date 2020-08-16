import {combineReducers} from "redux";
import {player} from "./features/player/slice";

export const rootReducer = combineReducers({
  player: player.reducer,
});
