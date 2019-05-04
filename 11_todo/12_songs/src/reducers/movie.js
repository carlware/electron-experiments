import {
  GET_MOVIES,
  START_FETCHING_MOVIES,
  SELECT_MOVIE,
  CLOSE_MOVIE
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  movies: null,
  page: 1,
  maxPage: null,
  CATEGORY_FOLDER: null,
  selectedMovie: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_FETCHING_MOVIES:
      return { ...state, loading: true };
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload.movies,
        page: action.payload.page,
        maxPage: action.payload.maxPage,
        CATEGORY_FOLDER: action.payload.CATEGORY_FOLDER,
        loading: false
      };
    case SELECT_MOVIE:
      return { ...state, selectedMovie: action.payload };
    case CLOSE_MOVIE:
      return { ...state, selectedMovie: null };
    default:
      return state;
  }
};
