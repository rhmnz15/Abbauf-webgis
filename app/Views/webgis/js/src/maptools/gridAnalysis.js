import map from "../map";
import { Modify } from "ol/interaction";
import { register } from "ol/proj/proj4";
import Draw from "ol/interaction/Draw";
import { transform } from "ol/proj";
import { Vector as layerVector } from "ol/layer";
import { Vector as sourceVector } from "ol/source";
import { Style, Fill, Text, Stroke } from "ol/style";
import GridBin from "ol-ext/source/GridBin";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { style } from "./measure";
import Select from "ol/interaction/Select";
import Overlay from "ol/Overlay";
import { disableAllFunction } from "./functionButtonControl";
import {
  modifyCircleAnalysis,
  source_analysis,
  drawCircle,
} from "./circleanalysis";
import WKT from "ol/format/WKT";

// Define proj4 projection
proj4.defs(
  "EPSG:2154",
  "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
);
proj4.defs(
  "EPSG:3035",
  "+proj=laea +lat_0=52 +lon_0=10 +x_0=4321000 +y_0=3210000 +ellps=GRS80 +units=m +no_defs"
);
proj4.defs(
  "EPSG:27700",
  "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs"
);
proj4.defs(
  "EPSG:23032",
  "+proj=utm +zone=32 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs"
);
proj4.defs(
  "EPSG:2163",
  "+proj=laea +lat_0=45 +lon_0=-100 +x_0=0 +y_0=0 +a=6370997 +b=6370997 +units=m +no_defs"
);

// Define projection extent
register(proj4);

// Create Funtion to add Features point
export function addFeatures(nb) {
  let ssize = 5; // seed size
  let ext = map.getView().calculateExtent();
  let dx = ext[2] - ext[0];
  let dy = ext[3] - ext[1];
  let dl = Math.min(dx, dy);
  let features = [];
  for (let i = 0; i < nb / ssize; ++i) {
    let seed = [ext[0] + dx * Math.random(), ext[1] + dy * Math.random()];
    for (let j = 0; j < ssize; j++) {
      let f = new Feature(
        new Point([
          seed[0] + (dl / 10) * Math.random(),
          seed[1] + (dl / 10) * Math.random(),
        ])
      );
      features.push(f);
    }
  }
  source.clear(true);
  source.addFeatures(features);
  reset();
}

export const source = new sourceVector();
// Interaction to move the source features
// const modify = new Modify({ source: source });
// modify.setActive(false);
// map.addInteraction(modify);
const layerSource = new layerVector({ source: source, visible: false });
map.addLayer(layerSource);

const labelStyle = new Text({
  font: "12px Calibri,sans-serif",
  overflow: true,
  fill: new Fill({
    color: "#fff",
  }),
  stroke: new Stroke({
    color: "#000",
    width: 1,
  }),
});

let min, max;

// style for Grid color and add Text Style
let styleFn = function (f, res) {
  let color;
  let s = f.get("features").length;
  if (s > min + (2 * (max - min)) / 3) color = [136, 0, 0, 0.5];
  else if (s > min + (max - min) / 3) color = [255, 165, 0, 0.5];
  else color = [0, 136, 0, 0.5];
  let style = new Style({
    fill: new Fill({ color: color }),
    text: labelStyle,
  });
  style.getText().setText(s.toString());
  return [style];
};

// The Grid layer
const grid = new layerVector({
  minZoom: 14,
  maxZoom: 20,
  style: styleFn,
  source: new GridBin({
    source: source,
  }),
  declutter: true,
});
map.addLayer(grid);

// Create Bin
function calcMinMax() {
  max = 0;
  min = Infinity;
  grid
    .getSource()
    .getFeatures()
    .forEach(function (f) {
      let nb = f.get("features").length;
      if (nb > max) max = nb;
      if (nb < min) min = nb;
    });
}
function reset() {
  grid.getSource().setSize(0.001);
  calcMinMax();
}
// add features
addFeatures(0);

// function to setProjection
function setProjection(p) {
  let ex = map.getView().calculateExtent();
  let p1 = map.getView().getCenter();
  let p2 = [p[0], p[1] + 1];
  let p01 = transform(
    p1,
    map.getView().getProjection(),
    grid.getSource().get("gridProjection")
  );
  let p02 = transform(
    p2,
    map.getView().getProjection(),
    grid.getSource().get("gridProjection")
  );
  grid.getSource().set("gridProjection", "EPSG:" + p);
  let p11 = transform(
    p1,
    map.getView().getProjection(),
    grid.getSource().get("gridProjection")
  );
  let p12 = transform(
    p2,
    map.getView().getProjection(),
    grid.getSource().get("gridProjection")
  );

  reset();
}

setProjection(4326);

// Function Draw Point
export let draw;
export function addInteraction() {
  draw = new Draw({
    source: source,
    type: "Point",
    style: style,
  });

  draw.on("drawend", function (e) {
    const format = new WKT();
    const wktFeatureGeom = format.writeGeometry(e.feature.getGeometry());
    console.log(wktFeatureGeom);
    addFeatures(1000);
    map.removeInteraction(draw);
    $(".collapse").collapse("show");
  });
  map.addInteraction(draw);
}

const container = document.getElementById("popup-grid");

const overlayGrid = new Overlay({
  element: container,
});

map.addOverlay(overlayGrid);

export const select = new Select();

// Event Select on each feature
select.on("select", function (e) {
  if (e.selected.length) {
    let coordinate = e.mapBrowserEvent.coordinate;
    overlayGrid.setPosition(coordinate);
    $("#popup-grid").toggleClass("d-none", false);
  } else {
    overlayGrid.setPosition(undefined);
    $("#popup-grid").toggleClass("d-none", true);
  }
});

const content = document.getElementById("popup-select-grid");
const closer = document.getElementById("popup-closer-grid");

closer.onclick = function () {
  overlayGrid.setPosition(undefined);
  closer.blur();
  $("#popup-grid").toggleClass("d-none", true);
  return false;
};

// $("#gridAnalysis").on("click", function() {
// disableAllFunction($(this));
//   map.removeInteraction(draw);
//   map.addInteraction(select);
//   addInteraction();
// });

// $("#clearAnalysis").on("click", function() {
//   disableAllFunction($(this));
//   map.removeInteraction(drawCircle);
//   source_analysis.clear();
//   modifyCircleAnalysis.setActive(false);
//   map.removeInteraction(draw);
//   addFeatures(0);
//   source.clear();
//   map.removeInteraction(select);
// });
