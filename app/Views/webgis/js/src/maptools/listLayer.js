import map from "../map";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import $ from "jquery";
// import { none } from 'ol/centerconstraint';

$(".item-wrapper[role='layer-switcher']").each(function () {
  const name = $(this).find("input[type='checkbox']").attr("id");
  const brightness = $(this).find("input[type='range']").val();

  let layer;

  $(this)
    .find("input[type='checkbox']")
    .on("change", function () {
      let notif = $(this).closest(".list-badge").find("#notif");
      const total = parseInt(notif.attr("data-value"));

      if ($(this).is(":checked")) {
        layer = new TileLayer({
          source: new TileWMS({
            url: `https://dev.abbauf.com/cgi-bin/mapserv?map=MAPMAP`,
            params: { LAYERS: name, TILED: true },
            serverType: "geoserver",
            transition: 0,
            zIndex: Infinity,
          }),
          title: name,
        });

        layer.setOpacity(brightness / 100);
        layer.setVisible(true);
        map.addLayer(layer);

        notif.attr("data-value", total + 1);
        notif.html(notif.attr("data-value"));
      } else {
        map.removeLayer(layer);
        layer = undefined;
        notif.attr("data-value", total - 1);
        notif.html(notif.attr("data-value"));
      }

      if (parseInt(notif.attr("data-value")) <= 0) {
        notif.css({ display: "none" });
      } else {
        notif.css({ display: "block" });
      }
    });

  $(this)
    .find("input[type='range']")
    .on("input", function () {
      layer.setOpacity($(this).val() / 100);
    });
});
