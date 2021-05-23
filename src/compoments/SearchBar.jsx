import React, { useState } from "react";
import axios from "axios";
import { makeStyles, TextField } from "@material-ui/core";

import { useEnderValue } from "./../contexts/EnderContext";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginRight: theme.spacing(1),
    backgroundColor: "#595959",
    marginLeft: theme.spacing(2),
    maxWidth: "500px",
  },
}));

const SearchBar = () => {
  const classes = useStyles();
  const [address, setAddress] = useState([]);
  const [state, dispatch] = useEnderValue();

  const searchLocation = async () => {
    axios
      .get(
        "https://api-adresse.data.gouv.fr/search?" +
          new URLSearchParams({
            q: address,
          })
      )
      .then(({ data }) => {
        dispatch({
          type: "SET_COORDS",
          latitude: data.features[0].geometry.coordinates[1],
          longitude: data.features[0].geometry.coordinates[0],
        });
      })
      .catch(function (error) {
        console.log("Search address request failed", error);
      });
  };

  return (
    <>
      <TextField
        placeholder="24 rue du 8 Mai 1945..."
        type="search"
        variant="outlined"
        size="small"
        min-with="400px"
        className={classes.textField}
        onChange={(event) => setAddress(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            searchLocation();
          }
        }}
      />
    </>
  );
};

export default SearchBar;
