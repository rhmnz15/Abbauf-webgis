import map from "../map";
import { transform } from "ol/proj";

$(".search").on("click", function () {
  openpanel(5);
});

// Search
$("#dlgsearchbycoordinate_rdodd").on("change", function () {
  dlgSearchByCoordinate_setTrUnlocked("dd");
});

$("#dlgsearchbycoordinate_rdodms").on("change", function () {
  dlgSearchByCoordinate_setTrUnlocked("dms");
});

$("#dlgsearchbycoordinate_rdoutm").on("change", function () {
  dlgSearchByCoordinate_setTrUnlocked("utm");
});

$("#btnsearch").on("click", function () {
  dlgSearchByCoordinate_search();
});

function dlgSearchByCoordinate_search() {
  let x, y;
  let source;
  let dest;
  let loc;

  switch (
    $(".popup-5 input[name='dlgsearchbycoordinate_rdocoord']:checked").val()
  ) {
    case "dd":
      x = $("#dlgsearchbycoordinate_dd_lon").val();
      y = $("#dlgsearchbycoordinate_dd_lat").val();
      source = "EPSG:4326";
      dest = "EPSG:3857";
      break;
    case "dms":
      x =
        Math.abs(parseFloat($("#dlgsearchbycoordinate_dms_lon_d").val())) +
        Math.abs(parseFloat($("#dlgsearchbycoordinate_dms_lon_m").val())) / 60 +
        Math.abs(parseFloat($("#dlgsearchbycoordinate_dms_lon_s").val())) /
          3600;
      y =
        Math.abs(parseFloat($("#dlgsearchbycoordinate_dms_lat_d").val())) +
        Math.abs(parseFloat($("#dlgsearchbycoordinate_dms_lat_m").val())) / 60 +
        Math.abs(parseFloat($("#dlgsearchbycoordinate_dms_lat_s").val())) /
          3600;

      if (parseFloat($("#dlgsearchbycoordinate_dms_lat_d").val()) < 0) {
        y = y * -1;
      }

      source = "EPSG:4326";
      dest = "EPSG:3857";
      break;
    case "utm":
      x = $("#dlgsearchbycoordinate_utm_x").val();
      y = $("#dlgsearchbycoordinate_utm_y").val();
      source = "EPSG:4326"; //TODO: what is EPSG code for UTM?
      dest = "EPSG:3857";
  }

  loc = transform([x, y], source, dest);

  map.getView().animate({
    center: loc,
    zoom: 10,
    duration: 300,
  });
}

function dlgSearchByCoordinate_setTrUnlocked(obj) {
  $(".popup-5 input[type='text']").prop("disabled", true);
  $(".popup-5 tr." + obj + " input").prop("disabled", false);
}

// Panel
function openpanel(i) {
  closepanel();
  $(".popup-" + i).addClass("panel-fab-open");
}

function minimizepanel() {
  $(".panel-fab .body-panel-fab").addClass("minimize-panel");
  $(".panel-fab .footer-panel-fab").addClass("minimize-panel");
  $("#minimize").hide();
  $("#maximize").show();
}

function maximizepanel() {
  $(".panel-fab .body-panel-fab").removeClass("minimize-panel");
  $(".panel-fab .footer-panel-fab").removeClass("minimize-panel");
  $("#minimize").show();
  $("#maximize").hide();
}

function closepanel() {
  $(".panel-fab").removeClass("panel-fab-open");
}

$(".searchkoor #minimize").on("click", minimizepanel);
$(".searchkoor #maximize").on("click", maximizepanel);
$(".searchkoor #closepanel").on("click", closepanel);

// Draggable
// The current position of mouse
let x = 0;
let y = 0;

// Query the element
const ele = document.querySelector(".draggable-div");

// Handle the mousedown event
// that's triggered when user drags the element
const mouseDownHandler = function (e) {
  // Get the current mouse position
  x = e.clientX;
  y = e.clientY;

  // Attach the listeners to `document`
  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseup", mouseUpHandler);
};

const mouseMoveHandler = function (e) {
  // How far the mouse has been moved
  const dx = e.clientX - x;
  const dy = e.clientY - y;

  // Set the position of element
  ele.style.top = `${ele.offsetTop + dy}px`;
  ele.style.left = `${ele.offsetLeft + dx}px`;

  // Reassign the position of mouse
  x = e.clientX;
  y = e.clientY;
};

const mouseUpHandler = function () {
  // Remove the handlers of `mousemove` and `mouseup`
  document.removeEventListener("mousemove", mouseMoveHandler);
  document.removeEventListener("mouseup", mouseUpHandler);
};

ele.addEventListener("mousedown", mouseDownHandler);
