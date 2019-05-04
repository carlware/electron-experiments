import moment from "moment";
import {
  GET_VIDEO_INFO,
  VIDEO_PROGRESS,
  VIDEO_DOWNLOADED,
  START_DOWNLOADING,
  VIDEO_DONE,
  VIDEO_ERROR
} from "./types";
const { ipcRenderer } = window.require("electron");

export const startDownloading = url => dispatch => {
  ipcRenderer.send("video:url", { url });
  dispatch({
    type: START_DOWNLOADING
  });
};

export const getVideoInfo = info => {
  return { type: GET_VIDEO_INFO, payload: info };
};

export const videoError = message => {
  return { type: VIDEO_ERROR, payload: message };
};

export const videoProgress = ({ progress, info }) => {
  const timemarkInMilliseconds = moment
    .duration(progress.timemark)
    .asMilliseconds();
  const percentage = Math.round(
    (timemarkInMilliseconds / (info.length_seconds * 1000)) * 100
  );
  return {
    type: VIDEO_PROGRESS,
    payload: percentage
  };
};

export const videoDownloaded = () => {
  return { type: VIDEO_DOWNLOADED };
};

export const videoDone = () => {
  return {
    type: VIDEO_DONE
  };
};
