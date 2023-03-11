import map from "../map";
import { OverviewMap } from "ol/control";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

// Minimap
const overviewMapControl = new OverviewMap({
  // layers: basemapList
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
});

map.addControl(overviewMapControl);
// end minimap
