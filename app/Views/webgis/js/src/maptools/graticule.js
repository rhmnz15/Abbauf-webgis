import Graticule from "ol/layer/Graticule";
import Stroke from "ol/style/Stroke";
import map from "../map";

// graticule
const graticule = new Graticule({
  strokeStyle: new Stroke({
    color: "rgba(225,225,255,0.2)",
    width: 2,
  }),
  targetSize: 70,
  showLabels: true,
  wrapX: true,
});

let showGraticule = false;
graticule.setMap(null);

$(".graticule").on("click", function () {
  if (!showGraticule) {
    showGraticule = true;
    graticule.setMap(map);
  } else {
    showGraticule = false;
    graticule.setMap(null);
  }
});
// end graticule
