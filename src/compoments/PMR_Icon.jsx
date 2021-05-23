import L from "leaflet";

import Icon from "./../img/pmr.png";

const PMR_Icon = L.icon({
  iconUrl: Icon,
  iconRetinaUrl: Icon,
  iconSize: [28, 28],
  iconAnchor: [21, 42],
  popupAnchor: [0, -42],
});

export default PMR_Icon;
