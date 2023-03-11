"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkmy_webpack_project"] = self["webpackChunkmy_webpack_project"] || []).push([["sidebarHide"],{

/***/ "./app/Views/webgis/js/src/sidebar/hide.js":
/*!*************************************************!*\
  !*** ./app/Views/webgis/js/src/sidebar/hide.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"hideSidebar\": () => (/* binding */ hideSidebar)\n/* harmony export */ });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n // import map from '../map';\n\nvar hide = true;\n\nfunction showPanel() {\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".sidenav\").width(\"400\");\n\n  if (hide) {\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".sidenav\").css(\"left\", 80);\n  } else {\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".sidenav\").css(\"left\", 335);\n  }\n} // Ketika dim screen (mobile) maka panel akan di hide\n\n\njquery__WEBPACK_IMPORTED_MODULE_0___default()(\".dim-screen\").on(\"click\", function () {\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"[data-move=true]\").removeClass(\"move-right\");\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"button[role='sidebar-toggle']\").attr(\"data-hide\", !hide);\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".fixed-content-body\").attr(\"data-hide\", !hide);\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".fixed-content-box\").attr(\"data-hide\", !hide);\n  hide = !hide;\n}); // Ketika tombol sidebar di klik\n\njquery__WEBPACK_IMPORTED_MODULE_0___default()(\"button[role='sidebar-toggle']\").on(\"click\", function () {\n  if (!hide) {\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"[data-move=true]\").removeClass(\"move-right\");\n  }\n\n  if (hide) {\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"[data-move=true]\").addClass(\"move-right\");\n  }\n\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"button[role='sidebar-toggle']\").attr(\"data-hide\", !hide);\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".fixed-content-body\").attr(\"data-hide\", !hide);\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".fixed-content-box\").attr(\"data-hide\", !hide);\n  hide = !hide;\n}); // Hide sidebar function\n\nvar hideSidebar = function hideSidebar() {\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"[data-move=true]\").removeClass(\"move-right\");\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"button[role='sidebar-toggle']\").attr(\"data-hide\", true);\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".fixed-content-body\").attr(\"data-hide\", true);\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".fixed-content-box\").attr(\"data-hide\", true);\n  hide = true;\n};\njquery__WEBPACK_IMPORTED_MODULE_0___default()(\".close-side-content\").on(\"click\", function () {\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(\".sidenav\").width(\"0\");\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showPanel);\n\n//# sourceURL=webpack://my-webpack-project/./app/Views/webgis/js/src/sidebar/hide.js?");

/***/ })

}]);