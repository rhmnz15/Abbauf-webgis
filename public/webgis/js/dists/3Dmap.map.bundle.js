"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkmy_webpack_project"] = self["webpackChunkmy_webpack_project"] || []).push([["3Dmap"],{

/***/ "./app/Views/webgis/js/src/maptools/3Dmap.js":
/*!***************************************************!*\
  !*** ./app/Views/webgis/js/src/maptools/3Dmap.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var olcs_OLCesium__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! olcs/OLCesium */ \"./node_modules/olcs/OLCesium.js\");\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../map */ \"./app/Views/webgis/js/src/map.js\");\n/* harmony import */ var _functionButtonControl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functionButtonControl */ \"./app/Views/webgis/js/src/maptools/functionButtonControl.js\");\n\n\n //   Start Map 3D\n// const ol3d = new olcs.OLCesium({ map: map });\n\nvar ol3d = new olcs_OLCesium__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n  map: _map__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  sceneOptions: {\n    mapProjection: new Cesium.WebMercatorProjection()\n  }\n});\nCesium.Ion.defaultAccessToken = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmYzNjYzhlMS0wYTAyLTRjODUtOWY3Ny04MTliODhlNmI0NjIiLCJpZCI6MzQ1MzcsImlhdCI6MTYwMDQ0Mzk4Mn0.f48awS5COGtBeoKDr9WN_g2oJxhNy6Egh3tdn54AZok\";\nvar scene = ol3d.getCesiumScene();\nvar terrainProvider = new Cesium.CesiumTerrainProvider({\n  url: Cesium.IonResource.fromAssetId(1)\n});\nscene.terrainProvider = terrainProvider;\nCesium.Math.setRandomNumberSeed(0);\nvar osm3d = new Cesium.Cesium3DTileset({\n  url: Cesium.IonResource.fromAssetId(96188)\n});\nscene.primitives.add(osm3d);\nosm3d.style = new Cesium.Cesium3DTileStyle({\n  color: {\n    conditions: [[\"true\", \"color('white', 0.7)\"]]\n  }\n});\nscene.globe.depthTestAgainstTerrain = true;\nol3d.setEnabled(false);\nvar set = false;\n$(\"#map3d\").on(\"click\", function () {\n  (0,_functionButtonControl__WEBPACK_IMPORTED_MODULE_2__.disableAllFunction)($(this));\n\n  if (!set) {\n    set = true;\n    $(this).attr(\"data-function-active\", true);\n  } else {\n    set = false;\n    $(this).attr(\"data-function-active\", false);\n  }\n\n  ol3d.setEnabled(!ol3d.getEnabled());\n}); // End Map 3d\n\n//# sourceURL=webpack://my-webpack-project/./app/Views/webgis/js/src/maptools/3Dmap.js?");

/***/ }),

/***/ "./app/Views/webgis/js/src/maptools/functionButtonControl.js":
/*!*******************************************************************!*\
  !*** ./app/Views/webgis/js/src/maptools/functionButtonControl.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"disableAllFunction\": () => (/* binding */ disableAllFunction)\n/* harmony export */ });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n\nvar disableAllFunction = function disableAllFunction(parent) {\n  if (parent.attr(\"data-function-active\") == \"true\") {\n    return;\n  }\n\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#clear\").click();\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"button[data-function-active=true]\").each(function (id, el) {\n    el.click();\n    el.setAttribute(\"data-function-active\", false);\n  });\n};\n\n//# sourceURL=webpack://my-webpack-project/./app/Views/webgis/js/src/maptools/functionButtonControl.js?");

/***/ })

}]);