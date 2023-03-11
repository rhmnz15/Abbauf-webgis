import ionRangeSlider from "ion-rangeslider";
import "ion-rangeslider/css/ion.rangeSlider.min.css";
import $ from "jquery";

$(".select_criteria").selectpicker();

// this should be where the data come from
const grid_analysis_item = ["U20", "U25", "U30", "U35"];

const min = 0;
const max = 100;
const initial_value = 5;
const defaultOptions = { width: "50px", height: "50px" };
let lock = false;

function chartData(value) {
  let cd = {
    labels: [" ", " "],
    series: [
      {
        value: value,
        className: "the-one",
      },
      {
        value: 100 - value,
        className: "grey-one",
      },
    ],
  };

  return cd;
}

function createChart(selector) {
  return new Chartist.Pie(selector, chartData(initial_value), defaultOptions);
}

let chart = {};
let updatedDataChart = {};

const min_threshold = 20000;
const max_threshold = 50000;
const from_threshold = 20000;
const to_threshold = 50000;
const marks = [40000];

function convertToPercent(num) {
  return ((num - min_threshold) / (max_threshold - min_threshold)) * 100;
}

function addMarks($slider) {
  let html = "";
  let left = 0;
  let i;

  for (i = 0; i < marks.length; i++) {
    // console.log(marks[i]);
    left = convertToPercent(marks[i]);
    html += `<span class="threshold__mark" style="left:${left}%"></span>`;
  }

  $slider.append(html);
}

// loop the data
grid_analysis_item.forEach((item, index) => {
  // create pie chart for each data
  chart[index] = createChart(`.${item}_chart`);
  // console.log(chart);

  // create a function where take updated data chart value from slider and text input
  function updateChart(value) {
    let updatedData = {};
    updatedDataChart[index] = value;

    updatedData = chartData(updatedDataChart[index]);

    chart[index].update(updatedData);
  }

  // create weight range slider for each content
  $(`.${item}_weight-range-slider`).ionRangeSlider({
    skin: "round",
    hide_min_max: true,
    hide_from_to: true,
    min: min,
    max: max,
    from: initial_value,
    onStart: function (data) {
      $(`#${item}_amount`).prop("value", data.from);
    },
    onChange: function (data) {
      $(`#${item}_amount`).prop("value", data.from);
    },
    onFinish: function (data) {
      updateChart(data.from);
    },
  });

  $(`#${item}_amount`).on("change input", function () {
    const val = $(this).prop("value");

    // validate
    if (val < min) {
      val = min;
    } else if (val > max) {
      val = max;
    }

    $(`.${item}_weight-range-slider`).data("ionRangeSlider").update({
      from: val,
    });

    updateChart(val);
  });

  // show more
  $(`#${item}_show`).on("click", function () {
    $(`#${item}_displayed`).slideToggle();
  });

  // this is where locked happen
  // sebelumnya aku minta maaf ke developer selanjutnya jika ini sulit dibaca, hidup memang sulit
  $(`#${item}_locked`).on("click", function () {
    $(`#${item}_locked`).toggleClass("bi-lock bi-unlock");
    $(`#${item}_locked`).attr("data-lock", !lock);
    $(`#${item}_box`).attr("data-lock", !lock);

    const er = $(`#${item}_checkbox`).prop("disabled");

    $(`#${item}_checkbox`).prop("disabled", !er);

    const re = $(`#${item}_amount`).prop("readonly");

    $(`#${item}_amount`).prop("readonly", !re);

    if (
      $(`.${item}_weight-range-slider`).data("ionRangeSlider").options.block ===
      true
    ) {
      $(`.${item}_weight-range-slider`).data("ionRangeSlider").update({
        block: false,
      });
    } else {
      $(`.${item}_weight-range-slider`).data("ionRangeSlider").update({
        block: true,
      });
    }

    lock = !lock;
  });

  $(`#${item}_weight-close`).on("click", function () {
    $(`#${item}_box`).hide();
  });

  // create threshold range slider for each item
  $(`.${item}_threshold-range-slider`).ionRangeSlider({
    skin: "round",
    type: "double",
    min: min_threshold,
    max: max_threshold,
    from: from_threshold,
    to: to_threshold,
    prettify_enabled: true,
    prettify_separator: ",",
    onStart: function (data) {
      addMarks(data.slider);
    },
  });
});

// reset weight
$("#reset_weight").on("click", function () {
  grid_analysis_item.forEach((item, index) => {
    $(`#${item}_box`).show();

    if (!$(`#${item}_checkbox`).prop("checked")) {
      $(`#${item}_checkbox`).prop("checked", true);
    }
    // reset weight slider
    $(`.${item}_weight-range-slider`).data("ionRangeSlider").reset();

    //  reset input
    $(`#${item}_amount`).prop("value", initial_value);

    // reset pie chart
    let resetData = {};
    updatedDataChart[index] = initial_value;

    resetData = chartData(updatedDataChart[index]);

    chart[index].update(resetData);
  });
});
