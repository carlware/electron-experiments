import {
  GET_MOVIES,
  START_FETCHING_MOVIES,
  SELECT_MOVIE,
  CLOSE_MOVIE
} from "../actions/types";
const { ipcRenderer } = window.require("electron");

export const startFetchingMovies = () => {
  return { type: START_FETCHING_MOVIES };
};

export const getMovies = (categoryId, page) => dispatch => {
  ipcRenderer.send("movies:get", { categoryId, page });
  ipcRenderer.on(
    "movies:list",
    (event, { movies, maxPage, CATEGORY_FOLDER }) => {
      dispatch({
        type: GET_MOVIES,
        payload: { movies, maxPage, CATEGORY_FOLDER, page }
      });
    }
  );
};

export const selectMovie = moviePath => {
  return { type: SELECT_MOVIE, payload: moviePath };
};

export const closeMovie = () => {
  return { type: CLOSE_MOVIE };
};
