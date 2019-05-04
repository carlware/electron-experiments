import {
  GET_VIDEO_INFO,
  VIDEO_PROGRESS,
  VIDEO_DOWNLOADED,
  START_DOWNLOADING,
  VIDEO_DONE,
  VIDEO_ERROR
} from "../actions/types";

const INITIAL_STATE = {
  downloading: false,
  message: "",
  progress: 0,
  thumbnail: null,
  title: null,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_DOWNLOADING:
      return {
        ...state,
        downloading: true,
        message: "Gathering video information",
        error: null
      };
    case GET_VIDEO_INFO:
      return {
        ...state,
        message: "Downloading...",
        thumbnail: action.payload.thumbnail_url,
        title: action.payload.title
      };
    case VIDEO_ERROR:
      return {
        ...INITIAL_STATE,
        error: action.payload
      };
    case VIDEO_PROGRESS:
      return { ...state, progress: action.payload };
    case VIDEO_DOWNLOADED:
      return { ...state, progress: 100, message: "MP3 is ready" };
    case VIDEO_DONE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
