import { useState, useEffect } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from "react-leaflet";

import { SEARCH_ADRESS_URL } from "../env";
import { useEnderValue } from "./../contexts/EnderContext";

const Map = () => {
  const [state, dispatch] = useEnderValue();
  const defaultLat = 50.63271104278013;
  const defaultLng = 3.0708119630820554;
  const [lat, setLat] = useState(50.63271104278013);
  const [lng, setLng] = useState(3.0708119630820554);

  useEffect(() => {
    dispatch({
      type: "SET_COORDS",
      latitude: defaultLat,
      longitude: defaultLng,
    });
  }, []);

  useEffect(() => {
    if (state) {
      setLat(state.latitude);
      setLng(state.longitude);
    }
  }, [state]);

  function SetViewOnClick({ coords }) {
    const map = useMap();
    map.panTo(coords, map.getZoom());
    return null;
  }

  useEffect(() => {
    if (lat !== defaultLat && lng !== defaultLng) {
      searchLocation();
    }
  }, [lat, lng]);

  const searchLocation = async () => {
    axios
      .get(
        `${SEARCH_ADRESS_URL}reverse/?lon=${state.longitude}&lat=${state.latitude}`
      )
      .then(({ data }) => {
        dispatch({
          type: "SET_LOCATION",
          location: data.features[0].properties.label,
        });
      })
      .catch(function (error) {
        console.log("Reverse address request failed", error);
      });
  };

  return (
    <MapContainer
      center={[lat, lng]}
      zoomControl={false}
      zoom={15}
      minZoom={6}
      style={{
        height: "100%",
        width: "100%",
        margin: "0%",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>
          <span>
            {state.location
              ? `${state.location}`
              : "9 rue Saint Sauveur 59800 Lille"}
          </span>
        </Popup>
        <SetViewOnClick coords={[lat, lng]} />
      </Marker>
      <Circle
        center={[lat, lng]}
        radius={500}
        color={"#292929"}
        fillColor={"#455A64"}
      />
    </MapContainer>
  );
};

export default Map;
