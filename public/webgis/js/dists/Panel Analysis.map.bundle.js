"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkmy_webpack_project"] = self["webpackChunkmy_webpack_project"] || []).push([["Panel Analysis"],{

/***/ "./app/Views/webgis/js/src/maptools/panelAnalysis.js":
/*!***********************************************************!*\
  !*** ./app/Views/webgis/js/src/maptools/panelAnalysis.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ion_rangeslider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ion-rangeslider */ \"./node_modules/ion-rangeslider/js/ion.rangeSlider.js\");\n/* harmony import */ var ion_rangeslider__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ion_rangeslider__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ion_rangeslider_css_ion_rangeSlider_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ion-rangeslider/css/ion.rangeSlider.min.css */ \"./node_modules/ion-rangeslider/css/ion.rangeSlider.min.css\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);\nfunction _readOnlyError(name) { throw new TypeError(\"\\\"\" + name + \"\\\" is read-only\"); }\n\n\n\n\njquery__WEBPACK_IMPORTED_MODULE_2___default()(\".select_criteria\").selectpicker(); // this should be where the data come from\n\nvar grid_analysis_item = [\"U20\", \"U25\", \"U30\", \"U35\"];\nvar min = 0;\nvar max = 100;\nvar initial_value = 5;\nvar defaultOptions = {\n  width: \"50px\",\n  height: \"50px\"\n};\nvar lock = false;\n\nfunction chartData(value) {\n  var cd = {\n    labels: [\" \", \" \"],\n    series: [{\n      value: value,\n      className: \"the-one\"\n    }, {\n      value: 100 - value,\n      className: \"grey-one\"\n    }]\n  };\n  return cd;\n}\n\nfunction createChart(selector) {\n  return new Chartist.Pie(selector, chartData(initial_value), defaultOptions);\n}\n\nvar chart = {};\nvar updatedDataChart = {};\nvar min_threshold = 20000;\nvar max_threshold = 50000;\nvar from_threshold = 20000;\nvar to_threshold = 50000;\nvar marks = [40000];\n\nfunction convertToPercent(num) {\n  return (num - min_threshold) / (max_threshold - min_threshold) * 100;\n}\n\nfunction addMarks($slider) {\n  var html = \"\";\n  var left = 0;\n  var i;\n\n  for (i = 0; i < marks.length; i++) {\n    // console.log(marks[i]);\n    left = convertToPercent(marks[i]);\n    html += \"<span class=\\\"threshold__mark\\\" style=\\\"left:\".concat(left, \"%\\\"></span>\");\n  }\n\n  $slider.append(html);\n} // loop the data\n\n\ngrid_analysis_item.forEach(function (item, index) {\n  // create pie chart for each data\n  chart[index] = createChart(\".\".concat(item, \"_chart\")); // console.log(chart);\n  // create a function where take updated data chart value from slider and text input\n\n  function updateChart(value) {\n    var updatedData = {};\n    updatedDataChart[index] = value;\n    updatedData = chartData(updatedDataChart[index]);\n    chart[index].update(updatedData);\n  } // create weight range slider for each content\n\n\n  jquery__WEBPACK_IMPORTED_MODULE_2___default()(\".\".concat(item, \"_weight-range-slider\")).ionRangeSlider({\n    skin: \"round\",\n    hide_min_max: true,\n    hide_from_to: true,\n    min: min,\n    max: max,\n    from: initial_value,\n    onStart: function onStart(data) {\n      jquery__WEBPACK_IMPORTED_MODULE_2___default()(\"#\".concat(item, \"_amount\")).prop(\"value\", data.from);\n    },\n    onChange: function onChange(data) {\n      jquery__WEBPACK_IMPORTED_MODULE_2___default()(\"#\".concat(item, \"_amount\")).prop(\"value\", data.from);\n    },\n    onFinish: function onFinish(data) {\n      updateChart(data.from);\n    }\n  });\n  jquery__WEBPACK_IMPORTED_MODULE_2___default()(\"#\".concat(item, \"_amount\")).on(\"change input\", function () {\n    var val = jquery__WEBPACK_IMPORTED_MODULE_2___default()(this).prop(\"value\"); // validate\n\n    if (val < min) {\n      min, _readOnlyError(\"val\");\n    } else if (val > max) {\n      max, _readOnlyError(\"val\");\n    }\n\n    jquery__WEBPACK_IMPORTED_MODULE_2___default()(\".\".concat(item, \"_weight-range-slider\")).data(\"ionRangeSlider\").update({\n      from: val\n    });\n    updateChart(val);\n  }); // show more\n\n  jquery__WEBPACK_IMPORTED_MODULE_2___default()(\"#\".concat(item, \"_show\")).on(\"click\", function () {\n    jquery__WEBPACK_IMPORTED_MODULE_2___default()(\"#\".concat(item, \"_displayed\")).slideToggle();\n  }); // this is where locked happen\n  // sebelumnya aku minta maaf ke developer selanjutnya jika ini sulit dibaca, hidup memang sulit\n\n  jquery__WEBPACK_IMPORTED_MODULE_2___default()(\"#\".concat(item, \"_locked\")).on(\"click\", function () {\n    jquery__WEBPACK_IMPORTED_MODULE_2___default()(\"#\".concat(item, \"_locked\")).toggleClass(\"bi-lock bi-unlock\");\n    jquery__WEBPACK_IMPORTED_MODULE_2___default()(\"#\".concat(item, \"_locked\")).attr(\"data-lock\", !lock);\n    jquery__WEBPACK_IMPORTED_MODULE_2___default()(\"#\".concat(item, \"_box\")).attr(\"data-lock\", !lock);\n    var er = jquery__WEBPACK_IMPORTED_MODULE_2___default()(\"#\".concat(item, \"_checkbox\")).prop(\"disabled\");\n    jquery__WEBPACK_IMPORTED_MODULE_2___default()(\"#\".concat(item, \"_checkbox\")).prop(\"disabled\", !er);\n    var re = jquery__WEBPACK_IMPORTED_MODULE_2___default()(\"#\".concat(item, \"_amount\")).prop(\"readonly\");\n    jquery__WEBPACK_IMPORTED_MODULE_2___default()(\"#\".concat(item, \"_amount\")).prop(\"readonly\", !re);\n\n    if (jquery__WEBPACK_IMPORTED_MODULE_2___default()(\".\".concat(item, \"_weight-range-slider\")).data(\"ionRangeSlider\").options.block === true) {\n      jquery__WEBPACK_IMPORTED_MODULE_2___default()(\".\".concat(item, \"_weight-range-slider\")).data(\"ionRangeSlider\").update({\n        block: false\n      });\n    } else {\n      jquery__WEBPACK_IMPORTED_MODULE_2___default()(\".\".concat(item, \"_weight-range-slider\")).data(\"ionRangeSlider\").update({\n        block: true\n      });\n    }\n\n    lock = !lock;\n  });\n  jquery__WEBPACK_IMPORTED_MODULE_2___default()(\"#\".concat(item, \"_weight-close\")).on(\"click\", function () {\n    jquery__WEBPACK_IMPORTED_MODULE_2___default()(\"#\".concat(item, \"_box\")).hide();\n  }); // create threshold range slider for each item\n\n  jquery__WEBPACK_IMPORTED_MODULE_2___default()(\".\".concat(item, \"_threshold-range-slider\")).ionRangeSlider({\n    skin: \"round\",\n    type: \"double\",\n    min: min_threshold,\n    max: max_threshold,\n    from: from_threshold,\n    to: to_threshold,\n    prettify_enabled: true,\n    prettify_separator: \",\",\n    onStart: function onStart(data) {\n      addMarks(data.slider);\n    }\n  });\n}); // reset weight\n\njquery__WEBPACK_IMPORTED_MODULE_2___default()(\"#reset_weight\").on(\"click\", function () {\n  grid_analysis_item.forEach(function (item, index) {\n    jquery__WEBPACK_IMPORTED_MODULE_2___default()(\"#\".concat(item, \"_box\")).show();\n\n    if (!jquery__WEBPACK_IMPORTED_MODULE_2___default()(\"#\".concat(item, \"_checkbox\")).prop(\"checked\")) {\n      jquery__WEBPACK_IMPORTED_MODULE_2___default()(\"#\".concat(item, \"_checkbox\")).prop(\"checked\", true);\n    } // reset weight slider\n\n\n    jquery__WEBPACK_IMPORTED_MODULE_2___default()(\".\".concat(item, \"_weight-range-slider\")).data(\"ionRangeSlider\").reset(); //  reset input\n\n    jquery__WEBPACK_IMPORTED_MODULE_2___default()(\"#\".concat(item, \"_amount\")).prop(\"value\", initial_value); // reset pie chart\n\n    var resetData = {};\n    updatedDataChart[index] = initial_value;\n    resetData = chartData(updatedDataChart[index]);\n    chart[index].update(resetData);\n  });\n});\n\n//# sourceURL=webpack://my-webpack-project/./app/Views/webgis/js/src/maptools/panelAnalysis.js?");

/***/ })

}]);