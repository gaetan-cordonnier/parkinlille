import { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import Marker_Icon from "./Marker_Icon";

const GeoLocation = () => {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return (
    <>
      {position === null ? null : (
        <Marker position={position} icon={Marker_Icon}>
          <Popup>
            <span>Vous-êtes ici</span>
          </Popup>
        </Marker>
      )}
    </>
  );
};
export default GeoLocation;
