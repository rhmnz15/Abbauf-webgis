/**
 * ----------------------------------------------------------------------------
 * This file is the entrypoint of the map
 * ----------------------------------------------------------------------------
 */

import "./map";
import(/* webpackChunkName: "baseLayers" */ "./baseLayers");
import(/* webpackChunkName: "baseLayerSwitcher" */ "./baseLayerSwitcher");

// Map tools
import(/* webpackChunkName: "zoom" */ "./maptools/zoominout");
import(/* webpackChunkName: "zoom" */ "./sidebar/transparancy_layer");
import(/* webpackChunkName: "backToExtent" */ "./maptools/backToExtent");
import(/* webpackChunkName: "infodetail" */ "./maptools/infodetail");
import(/* webpackChunkName: "searchBar" */ "./maptools/searchBar");
import(/* webpackChunkName: "scale" */ "./maptools/scale");
import(/* webpackChunkName: "graticule" */ "./maptools/graticule");
import(/* webpackChunkName: "measure" */ "./maptools/measure");
import(/* webpackChunkName: "geoLocation" */ "./maptools/geoLocation");
// import(/* webpackChunkName: "minimap" */ './maptools/minimap');
import(/* webpackChunkName: "3Dmap" */ "./maptools/3Dmap");
import(/* webpackChunkName: "Grid Analysis" */ "./maptools/gridAnalysis");
import(/* webpackChunkName: "Grid Filter" */ "./maptools/gridFilter");
import(/* webpackChunkName: "Panel Analysis" */ "./maptools/panelAnalysis");
import(/* webpackChunkName: "Circle Analysis" */ "./maptools/circleanalysis");
import(/* webpackChunkName: "ButtonDraw" */ "./maptools/buttondraw");
import(/* webpackChunkName: "drawing" */ "./maptools/drawing");
import(/* webpackChunkName: "streetview" */ "./maptools/streetview");
import(/* webpackChunkName: "listLayer" */ "./maptools/listLayer");
import(/* webpackChunkName: "searchKoor" */ "./maptools/searchKoor");

// Etc
import(/* webpackChunkName: "sidebarHide" */ "./sidebar/hide");
import(/* webpackChunkName: "showhide" */ "./maptools/showhide");
