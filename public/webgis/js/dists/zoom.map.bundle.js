"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkmy_webpack_project"] = self["webpackChunkmy_webpack_project"] || []).push([["zoom"],{

/***/ "./app/Views/webgis/js/src/maptools/zoominout.js":
/*!*******************************************************!*\
  !*** ./app/Views/webgis/js/src/maptools/zoominout.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../map */ \"./app/Views/webgis/js/src/map.js\");\n // Zoom in and Out\n\n$(\"#zoomin\").on(\"click\", function () {\n  _map__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getView().animate({\n    zoom: _map__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getView().getZoom() + 1,\n    duration: 300\n  });\n});\n$(\"#zoomout\").on(\"click\", function () {\n  _map__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getView().animate({\n    zoom: _map__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getView().getZoom() - 1,\n    duration: 300\n  });\n}); // end Zoom\n\n//# sourceURL=webpack://my-webpack-project/./app/Views/webgis/js/src/maptools/zoominout.js?");

/***/ }),

/***/ "./app/Views/webgis/js/src/sidebar/transparancy_layer.js":
/*!***************************************************************!*\
  !*** ./app/Views/webgis/js/src/sidebar/transparancy_layer.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n // Layers Transparancy\n\njquery__WEBPACK_IMPORTED_MODULE_0___default()(\".item-wrapper\").each(function () {\n  var wrapper = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children(\".over-zone\").on(\"mouseenter\", function () {\n    wrapper.children(\".brightness-wrapper\").addClass(\"show\");\n  });\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children(\".over-zone\").on(\"mouseleave\", function () {\n    wrapper.children(\".brightness-wrapper\").removeClass(\"show\");\n  });\n  wrapper.children(\".brightness-wrapper\").on(\"mouseenter\", function () {\n    wrapper.children(\".brightness-wrapper\").addClass(\"show\");\n  });\n  wrapper.children(\".brightness-wrapper\").on(\"mouseleave\", function () {\n    wrapper.children(\".brightness-wrapper\").removeClass(\"show\");\n  });\n});\njquery__WEBPACK_IMPORTED_MODULE_0___default()(\".brightness-wrapper span.back-icon\").on(\"click\", function () {\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().toggleClass(\"show\");\n});\njquery__WEBPACK_IMPORTED_MODULE_0___default()(\".brightness-box\").each(function () {\n  var val = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children(\"input\").val();\n  var span = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children(\"span\");\n  var indicator = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).parent().parent().children(\"span.brightness-icon\");\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).children(\"input\").on(\"input\", function (e) {\n    span.html(e.target.value);\n    indicator.css(\"filter\", \"invert(\".concat(e.target.value, \"%)\"));\n  });\n});\n\n//# sourceURL=webpack://my-webpack-project/./app/Views/webgis/js/src/sidebar/transparancy_layer.js?");

/***/ })

}]);