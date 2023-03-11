import OLCesium from "olcs/OLCesium";
import map from "../map";
import { disableAllFunction } from "./functionButtonControl";
//   Start Map 3D
// const ol3d = new olcs.OLCesium({ map: map });

var ol3d = new OLCesium({
  map,
  sceneOptions: {
    mapProjection: new Cesium.WebMercatorProjection(),
  },
});

Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmYzNjYzhlMS0wYTAyLTRjODUtOWY3Ny04MTliODhlNmI0NjIiLCJpZCI6MzQ1MzcsImlhdCI6MTYwMDQ0Mzk4Mn0.f48awS5COGtBeoKDr9WN_g2oJxhNy6Egh3tdn54AZok";

var scene = ol3d.getCesiumScene();
var terrainProvider = new Cesium.CesiumTerrainProvider({
  url: Cesium.IonResource.fromAssetId(1),
});

scene.terrainProvider = terrainProvider;

Cesium.Math.setRandomNumberSeed(0);

var osm3d = new Cesium.Cesium3DTileset({
  url: Cesium.IonResource.fromAssetId(96188),
});

scene.primitives.add(osm3d);

osm3d.style = new Cesium.Cesium3DTileStyle({
  color: {
    conditions: [["true", "color('white', 0.7)"]],
  },
});

scene.globe.depthTestAgainstTerrain = true;

ol3d.setEnabled(false);

let set = false;

$("#map3d").on("click", function () {
  disableAllFunction($(this));
  if (!set) {
    set = true;
    $(this).attr("data-function-active", true);
  } else {
    set = false;
    $(this).attr("data-function-active", false);
  }
  ol3d.setEnabled(!ol3d.getEnabled());
});

// End Map 3d
