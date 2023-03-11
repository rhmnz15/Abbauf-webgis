import map from "../map";
import { fromLonLat } from "ol/proj";

$(".back-to-extent").on("click", function () {
  map.getView().animate({
    center: fromLonLat([119.60033779930205, -1.0208357754324946]),
    zoom: 4,
    duration: 300,
  });
});
