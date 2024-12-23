import { createSlice } from "@reduxjs/toolkit";
import EarthScene from "../../Components/Earth";
import MoonScene from "../../Components/Moon";
import MarsScene from "../../Components/Mars";
import JupiterScene from "../../Components/Jupiter";

export const initialState = {
  activePlanet: {
    name: "EARTH",
    position: 1,
  },
  hideOtherPlanets: false,
  // planets: [
  //   { Component: EarthScene, name: "Earth" },
  //   { Component: MoonScene, name: "Moon" },
  //   { Component: MarsScene, name: "Mars" },
  //   { Component: JupiterScene, name: "Jupiter" },
  // ],
};

export const homepageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {
    setActivePlanet: (state, action) => {
      state.activePlanet.name = action.payload.name;
      state.activePlanet.position = action.payload.position;
      console.log("redux action.payload.name",action.payload.name)
      console.log("redux action.payload.position",action.payload.position)
    },
    toggleHideOtherPlanets: (state, action) => {
      state.hideOtherPlanets = action.payload;
    },
    // editPlanetList: (state, action) => {
    //   state.planets = action.payload;
    // },
  },
});

export const { reducer, actions, name: sliceKey } = homepageSlice;
