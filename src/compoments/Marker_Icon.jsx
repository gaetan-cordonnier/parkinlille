import L from "leaflet";

import Icon from "./../img/marker.png";
import Shadow from "./../img/shadow.png";

const Marker_Icon = L.icon({
  iconUrl: Icon,
  iconRetinaUrl: Icon,
  shadowUrl: Shadow,
  iconSize: [42, 42],
  iconAnchor: [21, 42],
  shadowAnchor: [11, 42],
  popupAnchor: [0, -42],
});

export default Marker_Icon;
