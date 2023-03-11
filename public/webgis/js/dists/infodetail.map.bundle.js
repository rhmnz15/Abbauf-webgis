"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkmy_webpack_project"] = self["webpackChunkmy_webpack_project"] || []).push([["infodetail"],{

/***/ "./app/Views/webgis/js/src/maptools/functionButtonControl.js":
/*!*******************************************************************!*\
  !*** ./app/Views/webgis/js/src/maptools/functionButtonControl.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"disableAllFunction\": () => (/* binding */ disableAllFunction)\n/* harmony export */ });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n\nvar disableAllFunction = function disableAllFunction(parent) {\n  if (parent.attr(\"data-function-active\") == \"true\") {\n    return;\n  }\n\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"#clear\").click();\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"button[data-function-active=true]\").each(function (id, el) {\n    el.click();\n    el.setAttribute(\"data-function-active\", false);\n  });\n};\n\n//# sourceURL=webpack://my-webpack-project/./app/Views/webgis/js/src/maptools/functionButtonControl.js?");

/***/ }),

/***/ "./app/Views/webgis/js/src/maptools/infodetail.js":
/*!********************************************************!*\
  !*** ./app/Views/webgis/js/src/maptools/infodetail.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../map */ \"./app/Views/webgis/js/src/map.js\");\n/* harmony import */ var ol_coordinate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/coordinate */ \"./node_modules/ol/coordinate.js\");\n/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/proj */ \"./node_modules/ol/proj.js\");\n/* harmony import */ var _functionButtonControl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functionButtonControl */ \"./app/Views/webgis/js/src/maptools/functionButtonControl.js\");\n\n\n\n\nvar content = document.getElementById(\"popup-content\");\nvar closer = document.getElementById(\"popup-closer\");\n\ncloser.onclick = function () {\n  _map__WEBPACK_IMPORTED_MODULE_0__.overlay.setPosition(undefined);\n  closer.blur();\n  return false;\n};\n\nvar a = false;\n$(\"#info\").on(\"click\", function () {\n  (0,_functionButtonControl__WEBPACK_IMPORTED_MODULE_2__.disableAllFunction)($(this));\n\n  if (!a) {\n    _map__WEBPACK_IMPORTED_MODULE_0__[\"default\"].on(\"singleclick\", callbackInfo);\n    $(\"#popup\").toggle(true);\n    a = true;\n    $(this).attr(\"data-function-active\", true);\n  } else {\n    _map__WEBPACK_IMPORTED_MODULE_0__[\"default\"].un(\"singleclick\", callbackInfo);\n    $(\"#popup\").toggle(false);\n    a = false;\n    $(this).attr(\"data-function-active\", false);\n  }\n});\n\nfunction callbackInfo(evt) {\n  var coordinate = evt.coordinate;\n  var hdms = (0,ol_coordinate__WEBPACK_IMPORTED_MODULE_3__.toStringHDMS)((0,ol_proj__WEBPACK_IMPORTED_MODULE_1__.toLonLat)(coordinate));\n  content.innerHTML = \"<p>Coordinate</p><code>\" + hdms + \"</code>\";\n  _map__WEBPACK_IMPORTED_MODULE_0__.overlay.setPosition(coordinate);\n}\n\n//# sourceURL=webpack://my-webpack-project/./app/Views/webgis/js/src/maptools/infodetail.js?");

/***/ })

}]);