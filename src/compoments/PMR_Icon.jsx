import L from "leaflet";

import Icon from "./../img/pmr.png";

const PMR_Icon = L.icon({
  iconUrl: Icon,
  iconRetinaUrl: Icon,
  iconSize: [30, 30],
  iconAnchor: [21, 42],
  popupAnchor: [-7, -38],
});

export default PMR_Icon;
