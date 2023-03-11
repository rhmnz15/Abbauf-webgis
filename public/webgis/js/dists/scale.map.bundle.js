"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkmy_webpack_project"] = self["webpackChunkmy_webpack_project"] || []).push([["scale"],{

/***/ "./app/Views/webgis/js/src/maptools/scale.js":
/*!***************************************************!*\
  !*** ./app/Views/webgis/js/src/maptools/scale.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../map */ \"./app/Views/webgis/js/src/map.js\");\n/* harmony import */ var ol_control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/control */ \"./node_modules/ol/control/ScaleLine.js\");\n\n // scale\n\nvar scaleControl = new ol_control__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n  units: \"metric\",\n  bar: true,\n  steps: 4,\n  text: true,\n  minWidth: 140\n});\n_map__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addControl(scaleControl); // end scale\n\n//# sourceURL=webpack://my-webpack-project/./app/Views/webgis/js/src/maptools/scale.js?");

/***/ })

}]);