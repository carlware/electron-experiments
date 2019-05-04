import { SET_SETTINGS, FOLDER_CHANGE } from "./types";

export const setSettings = settings => {
  return {
    type: SET_SETTINGS,
    payload: settings
  };
};

export const changeFolder = folderPath => {
  return { type: FOLDER_CHANGE, payload: folderPath };
};
