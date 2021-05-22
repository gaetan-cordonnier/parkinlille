import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from "react-leaflet";

import { useEnderValue } from "./../contexts/EnderContext";

const Map = () => {
  const [state, dispatch] = useEnderValue();
  const [lat, setLat] = useState(50.63321968095209);
  const [lng, setLng] = useState(3.072508598298858);

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

  function SetViewOnClick({ coords }) {
    const map = useMap();
    map.panTo(coords, map.getZoom());
    return null;
  }

  useEffect(() => {
    if (state) {
      setLat(state.latitude);
      setLng(state.longitude);
    }
  }, [state]);

  function addressPopup() {
    return `${state.location}`;
  }

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
          <span>{addressPopup()}</span>
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
