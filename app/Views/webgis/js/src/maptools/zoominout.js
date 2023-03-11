import map from "../map";

// Zoom in and Out
$("#zoomin").on("click", function () {
  map.getView().animate({
    zoom: map.getView().getZoom() + 1,
    duration: 300,
  });
});

$("#zoomout").on("click", function () {
  map.getView().animate({
    zoom: map.getView().getZoom() - 1,
    duration: 300,
  });
});
// end Zoom
