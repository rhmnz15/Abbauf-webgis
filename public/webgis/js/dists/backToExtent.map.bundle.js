"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkmy_webpack_project"] = self["webpackChunkmy_webpack_project"] || []).push([["backToExtent"],{

/***/ "./app/Views/webgis/js/src/maptools/backToExtent.js":
/*!**********************************************************!*\
  !*** ./app/Views/webgis/js/src/maptools/backToExtent.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../map */ \"./app/Views/webgis/js/src/map.js\");\n/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/proj */ \"./node_modules/ol/proj.js\");\n\n\n$(\".back-to-extent\").on(\"click\", function () {\n  _map__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getView().animate({\n    center: (0,ol_proj__WEBPACK_IMPORTED_MODULE_1__.fromLonLat)([119.60033779930205, -1.0208357754324946]),\n    zoom: 4,\n    duration: 300\n  });\n});\n\n//# sourceURL=webpack://my-webpack-project/./app/Views/webgis/js/src/maptools/backToExtent.js?");

/***/ })

}]);