import { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles, TextField } from "@material-ui/core";

import { SEARCH_ADRESS_URL } from "../env";
import { useEnderValue } from "./../contexts/EnderContext";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginRight: theme.spacing(1),
    backgroundColor: "#595959",
    marginLeft: theme.spacing(2),
  },
}));

const SearchBar = () => {
  const classes = useStyles();
  const [resp, setResp] = useState({});
  const [address, setAddress] = useState([]);
  const [state, dispatch] = useEnderValue();

  useEffect(() => {
    dispatch({
      type: "SET_COORDS",
      latitude: 50.63321968095209,
      longitude: 3.072508598298858,
    });
    dispatch({
      type: "SET_LOCATION",
      location: "Mairie de Lille",
    });
  }, []);

  const searchLocation = async () => {
    axios
      .get(
        `${SEARCH_ADRESS_URL}search?` +
          new URLSearchParams({
            q: address,
          })
      )
      .then(({ data }) => {
        setResp({ data });
        dispatch({
          type: "SET_COORDS",
          latitude: data.features[0].geometry.coordinates[1],
          longitude: data.features[0].geometry.coordinates[0],
        });
        dispatch({
          type: "SET_LOCATION",
          location: data.features[0].properties.label,
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
