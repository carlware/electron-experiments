import {
  GET_CATEGORIES,
  START_FETCHING_CATEGORIES,
  SELECT_CATEGORY
} from "../actions/types";
const { ipcRenderer } = window.require("electron");

export const startFetchingCategories = () => {
  return { type: START_FETCHING_CATEGORIES };
};

export const getCategories = () => dispatch => {
  ipcRenderer.send("categories:get");
  ipcRenderer.on("categories:list", (event, categories) => {
    dispatch({ type: GET_CATEGORIES, payload: categories });
  });
};

export const selectCategory = categoryId => {
  return { type: SELECT_CATEGORY, payload: categoryId };
};
