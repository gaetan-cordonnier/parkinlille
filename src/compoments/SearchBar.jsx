import React, { useState } from "react";
import axios from "axios";
import { makeStyles, TextField } from "@material-ui/core";
import { useEnderValue } from "./../contexts/EnderContext";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginRight: theme.spacing(1),
    backgroundColor: "#696969",
    marginLeft: theme.spacing(2),
    maxWidth: "500px",
    border: "none",
    borderRadius: "35px",
  },
  noBorder: {
    border: "none",
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
          }) +
          "&limit=5"
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
        placeholder="Adresse..."
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
        InputProps={{
          classes: { notchedOutline: classes.noBorder },
        }}
      />
    </>
  );
};

export default SearchBar;
