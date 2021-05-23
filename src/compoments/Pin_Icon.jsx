import L from "leaflet";

import Icon from "./../img/pin.svg";
import Shadow from "./../img/shadow.png";

const Pin_Icon = L.icon({
  iconUrl: Icon,
  iconRetinaUrl: Icon,
  shadowUrl: Shadow,
  iconSize: [42, 42],
  iconAnchor: [21, 42],
  shadowAnchor: [14, 48],
  popupAnchor: [0, -42],
});

export default Pin_Icon;
