"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkmy_webpack_project"] = self["webpackChunkmy_webpack_project"] || []).push([["listLayer"],{

/***/ "./app/Views/webgis/js/src/maptools/listLayer.js":
/*!*******************************************************!*\
  !*** ./app/Views/webgis/js/src/maptools/listLayer.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../map */ \"./app/Views/webgis/js/src/map.js\");\n/* harmony import */ var ol_layer_Tile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/layer/Tile */ \"./node_modules/ol/layer/Tile.js\");\n/* harmony import */ var ol_source_TileWMS__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/source/TileWMS */ \"./node_modules/ol/source/TileWMS.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n // import { none } from 'ol/centerconstraint';\n\njquery__WEBPACK_IMPORTED_MODULE_1___default()(\".item-wrapper[role='layer-switcher']\").each(function () {\n  var name = jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).find(\"input[type='checkbox']\").attr(\"id\");\n  var brightness = jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).find(\"input[type='range']\").val();\n  var layer;\n  jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).find(\"input[type='checkbox']\").on(\"change\", function () {\n    var notif = jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).closest(\".list-badge\").find(\"#notif\");\n    var total = parseInt(notif.attr(\"data-value\"));\n\n    if (jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).is(\":checked\")) {\n      layer = new ol_layer_Tile__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n        source: new ol_source_TileWMS__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n          url: \"https://dev.abbauf.com/cgi-bin/mapserv?map=MAPMAP\",\n          params: {\n            LAYERS: name,\n            TILED: true\n          },\n          serverType: \"geoserver\",\n          transition: 0,\n          zIndex: Infinity\n        }),\n        title: name\n      });\n      layer.setOpacity(brightness / 100);\n      layer.setVisible(true);\n      _map__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addLayer(layer);\n      notif.attr(\"data-value\", total + 1);\n      notif.html(notif.attr(\"data-value\"));\n    } else {\n      _map__WEBPACK_IMPORTED_MODULE_0__[\"default\"].removeLayer(layer);\n      layer = undefined;\n      notif.attr(\"data-value\", total - 1);\n      notif.html(notif.attr(\"data-value\"));\n    }\n\n    if (parseInt(notif.attr(\"data-value\")) <= 0) {\n      notif.css({\n        display: \"none\"\n      });\n    } else {\n      notif.css({\n        display: \"block\"\n      });\n    }\n  });\n  jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).find(\"input[type='range']\").on(\"input\", function () {\n    layer.setOpacity(jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).val() / 100);\n  });\n});\n\n//# sourceURL=webpack://my-webpack-project/./app/Views/webgis/js/src/maptools/listLayer.js?");

/***/ })

}]);