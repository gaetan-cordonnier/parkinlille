import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
  LayersControl,
} from "react-leaflet";
import PMR_Icon from "./PMR_Icon";
import Pin_Icon from "./Pin_Icon";
import axios from "axios";

import { useEnderValue } from "./../contexts/EnderContext";

const Map = () => {
  const [state, dispatch] = useEnderValue();
  const defaultLat = 50.63271104278013;
  const defaultLng = 3.0708119630820554;
  const [lat, setLat] = useState(50.63271104278013);
  const [lng, setLng] = useState(3.0708119630820554);
  const [places, setPlaces] = useState([]);
  console.log(places);

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
        "https://api-adresse.data.gouv.fr/reverse/?lon=${state.longitude}&lat=${state.latitude}"
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

  useEffect(() => {
    if ((lat, lng)) {
      axios
        .get(
          "https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=places-pmr&q=&rows=20"
        )
        .then(({ data }) => {
          setPlaces(data.records);
        })
        .catch(function (error) {
          console.log("Reverse address request failed", error);
        });
    }
  }, [lat, lng]);

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
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Theme Stardard">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Theme Sombre">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          />
        </LayersControl.BaseLayer>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[lat, lng]} icon={Pin_Icon}>
          <Popup>
            <span>
              {state.location
                ? `${state.location}`
                : "9 rue Saint Sauveur 59800 Lille"}
            </span>
          </Popup>
          <SetViewOnClick coords={[lat, lng]} />
        </Marker>
        {places.map((place, id) => (
          <Marker
            key={id}
            position={[
              place.geometry.coordinates[1],
              place.geometry.coordinates[0],
            ]}
            icon={PMR_Icon}
          >
            <Popup>
              <span>{"Place PMR"}</span>
            </Popup>
          </Marker>
        ))}
        <Circle
          center={[lat, lng]}
          radius={500}
          color={"#696969"}
          fillColor={"#455A64"}
        />
      </LayersControl>
    </MapContainer>
  );
};

export default Map;
