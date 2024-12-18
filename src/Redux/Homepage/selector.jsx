import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./slice";

const selectDomain = (state) => {
  if (state && state.homepage) {
    return state.homepage;
  } else {
    return initialState;
  }
};
export const selectActivePlanets = createSelector(
  [selectDomain],
  (state) => state.activePlanet
);
export const selectPlanetsList = createSelector(
  [selectDomain],
  (state) => state.planets
);
export const selectHideOtherPlanets = createSelector(
  [selectDomain],
  (state) => state.hideOtherPlanets
);
