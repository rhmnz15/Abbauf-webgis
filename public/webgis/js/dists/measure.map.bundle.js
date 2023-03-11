"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkmy_webpack_project"] = self["webpackChunkmy_webpack_project"] || []).push([["measure"],{

/***/ "./app/Views/webgis/js/src/maptools/circleanalysis.js":
/*!************************************************************!*\
  !*** ./app/Views/webgis/js/src/maptools/circleanalysis.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addInteractions\": () => (/* binding */ addInteractions),\n/* harmony export */   \"drawCircle\": () => (/* binding */ drawCircle),\n/* harmony export */   \"modifyCircleAnalysis\": () => (/* binding */ modifyCircleAnalysis),\n/* harmony export */   \"snap\": () => (/* binding */ snap),\n/* harmony export */   \"source_analysis\": () => (/* binding */ source_analysis)\n/* harmony export */ });\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../map */ \"./app/Views/webgis/js/src/map.js\");\n/* harmony import */ var ol_interaction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/interaction */ \"./node_modules/ol/interaction/Modify.js\");\n/* harmony import */ var ol_interaction__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/interaction */ \"./node_modules/ol/interaction/Draw.js\");\n/* harmony import */ var ol_interaction__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/interaction */ \"./node_modules/ol/interaction/Snap.js\");\n/* harmony import */ var ol_source__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/source */ \"./node_modules/ol/source/OSM.js\");\n/* harmony import */ var ol_source__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/source */ \"./node_modules/ol/source/Vector.js\");\n/* harmony import */ var ol_layer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/layer */ \"./node_modules/ol/layer/Tile.js\");\n/* harmony import */ var ol_layer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/layer */ \"./node_modules/ol/layer/Vector.js\");\n/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/proj */ \"./node_modules/ol/proj.js\");\n/* harmony import */ var ol_style__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/style */ \"./node_modules/ol/style/Style.js\");\n/* harmony import */ var ol_style__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/style */ \"./node_modules/ol/style/Circle.js\");\n/* harmony import */ var ol_style__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/style */ \"./node_modules/ol/style/Stroke.js\");\n/* harmony import */ var ol_style__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/style */ \"./node_modules/ol/style/Fill.js\");\n/* harmony import */ var ol_style__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/style */ \"./node_modules/ol/style/Text.js\");\n/* harmony import */ var _measure__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./measure */ \"./app/Views/webgis/js/src/maptools/measure.js\");\n/* harmony import */ var _sidebar_hide__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sidebar/hide */ \"./app/Views/webgis/js/src/sidebar/hide.js\");\n/* harmony import */ var _functionButtonControl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./functionButtonControl */ \"./app/Views/webgis/js/src/maptools/functionButtonControl.js\");\n\n\n\n\n\n\n\n\n\nvar raster = new ol_layer__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n  source: new ol_source__WEBPACK_IMPORTED_MODULE_6__[\"default\"]()\n});\nvar source_analysis = new ol_source__WEBPACK_IMPORTED_MODULE_7__[\"default\"]();\nvar vectorAnalysis = new ol_layer__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n  map: _map__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  source: source_analysis,\n  style: {\n    \"fill-color\": \"rgba(255, 255, 255, 0.2)\",\n    \"stroke-color\": \"rgba(0, 0, 0, 0.5)\",\n    \"stroke-width\": 2,\n    \"circle-radius\": 7,\n    \"circle-fill-color\": \"#ffcc33\"\n  }\n}); // Limit multi-world panning to one world east and west of the real world.\n// Geometry coordinates have to be within that range.\n\nvar extent = (0,ol_proj__WEBPACK_IMPORTED_MODULE_1__.get)(\"EPSG:3857\").getExtent().slice();\nextent[0] += extent[0];\nextent[2] += extent[2];\nvar modifyCircleAnalysis = new ol_interaction__WEBPACK_IMPORTED_MODULE_9__[\"default\"]({\n  source: source_analysis,\n  style: new ol_style__WEBPACK_IMPORTED_MODULE_10__[\"default\"]({\n    image: new ol_style__WEBPACK_IMPORTED_MODULE_11__[\"default\"]({\n      radius: 5,\n      stroke: new ol_style__WEBPACK_IMPORTED_MODULE_12__[\"default\"]({\n        color: \"rgba(0, 0, 0, 0.7)\"\n      }),\n      fill: new ol_style__WEBPACK_IMPORTED_MODULE_13__[\"default\"]({\n        color: \"rgba(0, 0, 0, 0.4)\"\n      })\n    }),\n    text: new ol_style__WEBPACK_IMPORTED_MODULE_14__[\"default\"]({\n      text: \"Drag to modify\",\n      font: \"12px Calibri,sans-serif\",\n      fill: new ol_style__WEBPACK_IMPORTED_MODULE_13__[\"default\"]({\n        color: \"rgba(255, 255, 255, 1)\"\n      }),\n      backgroundFill: new ol_style__WEBPACK_IMPORTED_MODULE_13__[\"default\"]({\n        color: \"rgba(0, 0, 0, 0.7)\"\n      }),\n      padding: [2, 2, 2, 2],\n      textAlign: \"left\",\n      offsetX: 15\n    })\n  })\n});\n_map__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addInteraction(modifyCircleAnalysis);\nvar drawCircle, snap; // global so we can remove them later\n\nfunction addInteractions() {\n  drawCircle = new ol_interaction__WEBPACK_IMPORTED_MODULE_15__[\"default\"]({\n    source: source_analysis,\n    type: \"Circle\",\n    style: _measure__WEBPACK_IMPORTED_MODULE_2__.style\n  });\n  var circleCount = 0;\n  drawCircle.on(\"drawend\", function (e) {\n    (0,_sidebar_hide__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n    circleCount++; // Get Coordinate\n\n    var circle = e.feature.getGeometry();\n    console.log(\"radius:\" + circle.getRadius());\n    console.log(\"center:\" + circle.getCenter());\n\n    if (circleCount > 4) {\n      _map__WEBPACK_IMPORTED_MODULE_0__[\"default\"].removeInteraction(drawCircle);\n    }\n  });\n  modifyCircleAnalysis.setActive(true);\n  _map__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addInteraction(drawCircle);\n  snap = new ol_interaction__WEBPACK_IMPORTED_MODULE_16__[\"default\"]({\n    source: source_analysis\n  });\n  _map__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addInteraction(snap);\n} // $(\"#circleAnalysis\").on(\"click\", function() {\n//   disableAllFunction($(this));\n//   map.removeInteraction(drawCircle);\n//   addInteractions();\n// });\n// End Circle Analysis\n\n//# sourceURL=webpack://my-webpack-project/./app/Views/webgis/js/src/maptools/circleanalysis.js?");

/***/ }),

/***/ "./app/Views/webgis/js/src/maptools/functionButtonControl.js":
/*!*******************************************************************!*\
  !*** ./app/Views/webgis/js/src/maptools/functionButtonControl.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"disableAllFunction\": () => (/* binding */ disableAllFunction)\n/* harmony export */ });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n\nvar disableAllFunction = function disableAllFunction(parent) {\n  if (parent.attr(\"data-function-active\") == \"true\") {\n    return;\n  }\n\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#clear\").click();\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"button[data-function-active=true]\").each(function (id, el) {\n    el.click();\n    el.setAttribute(\"data-function-active\", false);\n  });\n};\n\n//# sourceURL=webpack://my-webpack-project/./app/Views/webgis/js/src/maptools/functionButtonControl.js?");

/***/ }),

/***/ "./app/Views/webgis/js/src/maptools/measure.js":
/*!*****************************************************!*\
  !*** ./app/Views/webgis/js/src/maptools/measure.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addInteraction\": () => (/* binding */ addInteraction),\n/* harmony export */   \"draw\": () => (/* binding */ draw),\n/* harmony export */   \"modify\": () => (/* binding */ modify),\n/* harmony export */   \"style\": () => (/* binding */ style),\n/* harmony export */   \"vector_source_measure\": () => (/* binding */ vector_source_measure)\n/* harmony export */ });\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../map */ \"./app/Views/webgis/js/src/map.js\");\n/* harmony import */ var ol_interaction__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/interaction */ \"./node_modules/ol/interaction/Modify.js\");\n/* harmony import */ var ol_layer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/layer */ \"./node_modules/ol/layer/Vector.js\");\n/* harmony import */ var ol_source__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/source */ \"./node_modules/ol/source/Vector.js\");\n/* harmony import */ var ol_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/style */ \"./node_modules/ol/style/Style.js\");\n/* harmony import */ var ol_style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/style */ \"./node_modules/ol/style/Fill.js\");\n/* harmony import */ var ol_style__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/style */ \"./node_modules/ol/style/Stroke.js\");\n/* harmony import */ var ol_style__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/style */ \"./node_modules/ol/style/Circle.js\");\n/* harmony import */ var ol_style__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/style */ \"./node_modules/ol/style/Text.js\");\n/* harmony import */ var ol_style__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/style */ \"./node_modules/ol/style/RegularShape.js\");\n/* harmony import */ var ol_interaction__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/interaction */ \"./node_modules/ol/interaction/Draw.js\");\n/* harmony import */ var ol_geom__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/geom */ \"./node_modules/ol/geom/LineString.js\");\n/* harmony import */ var ol_geom__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/geom */ \"./node_modules/ol/geom/Point.js\");\n/* harmony import */ var ol_sphere__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/sphere */ \"./node_modules/ol/sphere.js\");\n/* harmony import */ var _circleanalysis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./circleanalysis */ \"./app/Views/webgis/js/src/maptools/circleanalysis.js\");\n/* harmony import */ var _functionButtonControl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functionButtonControl */ \"./app/Views/webgis/js/src/maptools/functionButtonControl.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n // measure\n\nvar vector_source_measure = new ol_source__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\nvar style = new ol_style__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n  fill: new ol_style__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n    color: \"rgba(255, 255, 255, 0.2)\"\n  }),\n  stroke: new ol_style__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n    color: \"rgba(0, 0, 0, 0.5)\",\n    width: 2\n  }),\n  image: new ol_style__WEBPACK_IMPORTED_MODULE_7__[\"default\"]({\n    radius: 5,\n    stroke: new ol_style__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n      color: \"rgba(0, 0, 0, 0.7)\"\n    }),\n    fill: new ol_style__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n      color: \"rgba(255, 255, 255, 0.2)\"\n    })\n  })\n});\nvar labelStyle = new ol_style__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n  text: new ol_style__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n    font: \"14px Calibri,sans-serif\",\n    fill: new ol_style__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n      color: \"rgba(255, 255, 255, 1)\"\n    }),\n    backgroundFill: new ol_style__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n      color: \"rgba(0, 0, 0, 0.7)\"\n    }),\n    padding: [3, 3, 3, 3],\n    textBaseline: \"bottom\",\n    offsetY: -15\n  }),\n  image: new ol_style__WEBPACK_IMPORTED_MODULE_9__[\"default\"]({\n    radius: 8,\n    points: 3,\n    angle: Math.PI,\n    displacement: [0, 10],\n    fill: new ol_style__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n      color: \"rgba(0, 0, 0, 0.7)\"\n    })\n  })\n});\nvar tipStyle = new ol_style__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n  text: new ol_style__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n    font: \"12px Calibri,sans-serif\",\n    fill: new ol_style__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n      color: \"rgba(255, 255, 255, 1)\"\n    }),\n    backgroundFill: new ol_style__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n      color: \"rgba(0, 0, 0, 0.4)\"\n    }),\n    padding: [2, 2, 2, 2],\n    textAlign: \"left\",\n    offsetX: 15\n  })\n});\nvar modifyStyle = new ol_style__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n  image: new ol_style__WEBPACK_IMPORTED_MODULE_7__[\"default\"]({\n    radius: 5,\n    stroke: new ol_style__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n      color: \"rgba(0, 0, 0, 0.7)\"\n    }),\n    fill: new ol_style__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n      color: \"rgba(0, 0, 0, 0.4)\"\n    })\n  }),\n  text: new ol_style__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n    text: \"Drag to modify\",\n    font: \"12px Calibri,sans-serif\",\n    fill: new ol_style__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n      color: \"rgba(255, 255, 255, 1)\"\n    }),\n    backgroundFill: new ol_style__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n      color: \"rgba(0, 0, 0, 0.7)\"\n    }),\n    padding: [2, 2, 2, 2],\n    textAlign: \"left\",\n    offsetX: 15\n  })\n});\nvar segmentStyle = new ol_style__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n  text: new ol_style__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n    font: \"12px Calibri,sans-serif\",\n    fill: new ol_style__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n      color: \"rgba(255, 255, 255, 1)\"\n    }),\n    backgroundFill: new ol_style__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n      color: \"rgba(0, 0, 0, 0.4)\"\n    }),\n    padding: [2, 2, 2, 2],\n    textBaseline: \"bottom\",\n    offsetY: -12\n  }),\n  image: new ol_style__WEBPACK_IMPORTED_MODULE_9__[\"default\"]({\n    radius: 6,\n    points: 3,\n    angle: Math.PI,\n    displacement: [0, 8],\n    fill: new ol_style__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n      color: \"rgba(0, 0, 0, 0.4)\"\n    })\n  })\n});\nvar segmentStyles = [segmentStyle];\n\nvar formatLength = function formatLength(line) {\n  var length = (0,ol_sphere__WEBPACK_IMPORTED_MODULE_10__.getLength)(line);\n  var output;\n\n  if (length > 100) {\n    output = Math.round(length / 1000 * 100) / 100 + \" km\";\n  } else {\n    output = Math.round(length * 100) / 100 + \" m\";\n  }\n\n  return output;\n};\n\nvar formatArea = function formatArea(polygon) {\n  var area = (0,ol_sphere__WEBPACK_IMPORTED_MODULE_10__.getArea)(polygon);\n  var output;\n\n  if (area > 10000) {\n    output = Math.round(area / 1000000 * 100) / 100 + \" km\\xB2\";\n  } else {\n    output = Math.round(area * 100) / 100 + \" m\\xB2\";\n  }\n\n  return output;\n};\n\nvar modify = new ol_interaction__WEBPACK_IMPORTED_MODULE_11__[\"default\"]({\n  source: vector_source_measure,\n  style: modifyStyle\n});\nvar tipPoint;\n\nfunction styleFunction(feature, segments, drawType, tip) {\n  var styles = [style];\n  var geometry = feature.getGeometry();\n  var type = geometry.getType();\n  var point, label, line;\n\n  if (!drawType || drawType === type) {\n    if (type === \"Polygon\") {\n      point = geometry.getInteriorPoint();\n      label = formatArea(geometry);\n      line = new ol_geom__WEBPACK_IMPORTED_MODULE_12__[\"default\"](geometry.getCoordinates()[0]);\n    } else if (type === \"LineString\") {\n      point = new ol_geom__WEBPACK_IMPORTED_MODULE_13__[\"default\"](geometry.getLastCoordinate());\n      label = formatLength(geometry);\n      line = geometry;\n    }\n  }\n\n  if (segments && line) {\n    var count = 0;\n    line.forEachSegment(function (a, b) {\n      var segment = new ol_geom__WEBPACK_IMPORTED_MODULE_12__[\"default\"]([a, b]);\n      var label = formatLength(segment);\n\n      if (segmentStyles.length - 1 < count) {\n        segmentStyles.push(segmentStyle.clone());\n      }\n\n      var segmentPoint = new ol_geom__WEBPACK_IMPORTED_MODULE_13__[\"default\"](segment.getCoordinateAt(0.5));\n      segmentStyles[count].setGeometry(segmentPoint);\n      segmentStyles[count].getText().setText(label);\n      styles.push(segmentStyles[count]);\n      count++;\n    });\n  }\n\n  if (label) {\n    labelStyle.setGeometry(point);\n    labelStyle.getText().setText(label);\n    styles.push(labelStyle);\n  }\n\n  if (tip && type === \"Point\" && !modify.getOverlay().getSource().getFeatures().length) {\n    tipPoint = geometry;\n    tipStyle.getText().setText(tip);\n    styles.push(tipStyle);\n  }\n\n  return styles;\n}\n\nnew ol_layer__WEBPACK_IMPORTED_MODULE_14__[\"default\"]({\n  map: _map__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  source: vector_source_measure,\n  style: function style(feature) {\n    return styleFunction(feature, true);\n  }\n});\nvar draw;\n_map__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addInteraction(modify);\nfunction addInteraction(type) {\n  var drawType = type;\n  var activeTip = \"Click to continue drawing the \" + (drawType === \"Polygon\" ? \"polygon\" : \"line\");\n  var idleTip = \"Click to start measuring\";\n  var tip = idleTip;\n  draw = new ol_interaction__WEBPACK_IMPORTED_MODULE_15__[\"default\"]({\n    source: vector_source_measure,\n    type: drawType,\n    style: function style(feature) {\n      return styleFunction(feature, true, drawType, tip);\n    }\n  });\n  draw.on(\"drawstart\", function () {\n    vector_source_measure.clear();\n    modify.setActive(false);\n    tip = activeTip;\n  });\n  draw.on(\"drawend\", function () {\n    modifyStyle.setGeometry(tipPoint);\n    modify.setActive(true);\n    _map__WEBPACK_IMPORTED_MODULE_0__[\"default\"].once(\"pointermove\", function () {\n      modifyStyle.setGeometry();\n    });\n    tip = idleTip;\n  });\n  modify.setActive(true);\n  _map__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addInteraction(draw);\n}\n$(\"#distance\").on(\"click\", function () {\n  (0,_functionButtonControl__WEBPACK_IMPORTED_MODULE_2__.disableAllFunction)($(this));\n  _map__WEBPACK_IMPORTED_MODULE_0__[\"default\"].removeInteraction(draw);\n  addInteraction(\"LineString\");\n});\n$(\"#area\").on(\"click\", function () {\n  (0,_functionButtonControl__WEBPACK_IMPORTED_MODULE_2__.disableAllFunction)($(this));\n  _map__WEBPACK_IMPORTED_MODULE_0__[\"default\"].removeInteraction(draw);\n  addInteraction(\"Polygon\");\n});\n$(\"#clear\").on(\"click\", function () {\n  (0,_functionButtonControl__WEBPACK_IMPORTED_MODULE_2__.disableAllFunction)($(this));\n  _map__WEBPACK_IMPORTED_MODULE_0__[\"default\"].removeInteraction(draw);\n  vector_source_measure.clear();\n  modify.setActive(false);\n}); // end measure\n\n//# sourceURL=webpack://my-webpack-project/./app/Views/webgis/js/src/maptools/measure.js?");

/***/ }),

/***/ "./app/Views/webgis/js/src/sidebar/hide.js":
/*!*************************************************!*\
  !*** ./app/Views/webgis/js/src/sidebar/hide.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"hideSidebar\": () => (/* binding */ hideSidebar)\n/* harmony export */ });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n // import map from '../map';\n\nvar hide = true;\n\nfunction showPanel() {\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".sidenav\").width(\"400\");\n\n  if (hide) {\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".sidenav\").css(\"left\", 80);\n  } else {\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".sidenav\").css(\"left\", 335);\n  }\n} // Ketika dim screen (mobile) maka panel akan di hide\n\n\njquery__WEBPACK_IMPORTED_MODULE_0___default()(\".dim-screen\").on(\"click\", function () {\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"[data-move=true]\").removeClass(\"move-right\");\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"button[role='sidebar-toggle']\").attr(\"data-hide\", !hide);\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".fixed-content-body\").attr(\"data-hide\", !hide);\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".fixed-content-box\").attr(\"data-hide\", !hide);\n  hide = !hide;\n}); // Ketika tombol sidebar di klik\n\njquery__WEBPACK_IMPORTED_MODULE_0___default()(\"button[role='sidebar-toggle']\").on(\"click\", function () {\n  if (!hide) {\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"[data-move=true]\").removeClass(\"move-right\");\n  }\n\n  if (hide) {\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"[data-move=true]\").addClass(\"move-right\");\n  }\n\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"button[role='sidebar-toggle']\").attr(\"data-hide\", !hide);\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".fixed-content-body\").attr(\"data-hide\", !hide);\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".fixed-content-box\").attr(\"data-hide\", !hide);\n  hide = !hide;\n}); // Hide sidebar function\n\nvar hideSidebar = function hideSidebar() {\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"[data-move=true]\").removeClass(\"move-right\");\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"button[role='sidebar-toggle']\").attr(\"data-hide\", true);\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".fixed-content-body\").attr(\"data-hide\", true);\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".fixed-content-box\").attr(\"data-hide\", true);\n  hide = true;\n};\njquery__WEBPACK_IMPORTED_MODULE_0___default()(\".close-side-content\").on(\"click\", function () {\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".sidenav\").width(\"0\");\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showPanel);\n\n//# sourceURL=webpack://my-webpack-project/./app/Views/webgis/js/src/sidebar/hide.js?");

/***/ })

}]);