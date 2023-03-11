import map from "../map";
import { Draw, Modify, Snap } from "ol/interaction";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { get } from "ol/proj";
import { Style, Stroke, Fill, Circle, Text } from "ol/style";
import { style } from "./measure";
import showPanel from "../sidebar/hide";
import { disableAllFunction } from "./functionButtonControl";

const raster = new TileLayer({
  source: new OSM(),
});

export const source_analysis = new VectorSource();

const vectorAnalysis = new VectorLayer({
  map: map,
  source: source_analysis,
  style: {
    "fill-color": "rgba(255, 255, 255, 0.2)",
    "stroke-color": "rgba(0, 0, 0, 0.5)",
    "stroke-width": 2,
    "circle-radius": 7,
    "circle-fill-color": "#ffcc33",
  },
});

// Limit multi-world panning to one world east and west of the real world.
// Geometry coordinates have to be within that range.
const extent = get("EPSG:3857").getExtent().slice();
extent[0] += extent[0];
extent[2] += extent[2];

export const modifyCircleAnalysis = new Modify({
  source: source_analysis,
  style: new Style({
    image: new Circle({
      radius: 5,
      stroke: new Stroke({
        color: "rgba(0, 0, 0, 0.7)",
      }),
      fill: new Fill({
        color: "rgba(0, 0, 0, 0.4)",
      }),
    }),
    text: new Text({
      text: "Drag to modify",
      font: "12px Calibri,sans-serif",
      fill: new Fill({
        color: "rgba(255, 255, 255, 1)",
      }),
      backgroundFill: new Fill({
        color: "rgba(0, 0, 0, 0.7)",
      }),
      padding: [2, 2, 2, 2],
      textAlign: "left",
      offsetX: 15,
    }),
  }),
});
map.addInteraction(modifyCircleAnalysis);

export let drawCircle, snap; // global so we can remove them later

export function addInteractions() {
  drawCircle = new Draw({
    source: source_analysis,
    type: "Circle",
    style: style,
  });

  let circleCount = 0;

  drawCircle.on("drawend", function (e) {
    showPanel();
    circleCount++;
    // Get Coordinate
    var circle = e.feature.getGeometry();
    console.log("radius:" + circle.getRadius());
    console.log("center:" + circle.getCenter());
    if (circleCount > 4) {
      map.removeInteraction(drawCircle);
    }
  });

  modifyCircleAnalysis.setActive(true);
  map.addInteraction(drawCircle);
  snap = new Snap({ source: source_analysis });
  map.addInteraction(snap);
}

// $("#circleAnalysis").on("click", function() {
//   disableAllFunction($(this));
//   map.removeInteraction(drawCircle);
//   addInteractions();
// });

// End Circle Analysis
