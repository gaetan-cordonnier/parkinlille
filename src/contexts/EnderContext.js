import { createContext, useContext, useReducer } from "react";

const initialState = {
  latitude: "",
  longitude: "",
  location: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOCATION":
      return { ...state, location: action.location };
    case "SET_COORDS":
      return {
        ...state,
        latitude: action.latitude,
        longitude: action.longitude,
      };
    default:
      return state;
  }
};

const EnderContext = createContext();

export const EnderProvider = ({ children }) => (
  <EnderContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </EnderContext.Provider>
);

export const useEnderValue = () => useContext(EnderContext);
