import { SET_SETTINGS, FOLDER_CHANGE } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_SETTINGS:
      return action.payload;
    case FOLDER_CHANGE:
      return {
        ...state,
        folderPath: action.payload
      };
    default:
      return state;
  }
};
