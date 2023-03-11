/*
 * ---------------------------------------------------------------
 * Search bar
 * ---------------------------------------------------------------
 */

import map from "../map";
import $ from "jquery";
import { transformExtent, transform, fromLonLat } from "ol/proj";
import { easeOut } from "ol/easing";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Icon } from "ol/style";
import { Feature } from "ol";
import Point from "ol/geom/Point";

// Import css
import "../../../scss/search.scss";

var markers = new VectorLayer({
  source: new VectorSource(),
  style: new Style({
    image: new Icon({
      anchor: [0.5, 1],
      crossOrigin: "anonymous",
      src: "/icons/marker-icon.png",
    }),
  }),
  visible: false,
});

map.addLayer(markers);

let pointFeature = new Point(fromLonLat([0, 0]));

markers.getSource().addFeature(new Feature(pointFeature));

// Configurations
const placesEndpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyAy9LBntbQWYkjZjjWSxkdxpLMOW6_W9YU`;
const placeDetailEndpoint = `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyAy9LBntbQWYkjZjjWSxkdxpLMOW6_W9YU`;
const delaySearch = 300;
const useCorsAnywhere = true;
const durationToMovePlace = 1000;

var delayTimer = 0;
function delay(callback, ms) {
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(delayTimer);
    delayTimer = setTimeout(function () {
      callback.apply(context, args);
    }, ms || 0);
  };
}

function transformExtentToCoordinate(extent) {
  return transformExtent(extent, "EPSG:4326", "EPSG:3857");
}

function getDetailLocation(placeId) {
  return $.ajax({
    url: useCorsAnywhere
      ? "https://cors-anywhere.herokuapp.com/" + placeDetailEndpoint
      : placeDetailEndpoint,
    type: "GET",
    dataType: "json",
    data: {
      place_id: placeId,
    },
    beforeSend: function () {
      $("[role='search-loading']").show();
    },
    complete: function () {
      $("[role='search-loading']").hide();
    },
    success: function (data) {
      const { lat, lng: long } = data.result.geometry.location;
      const { lat: neLat, lng: neLong } =
        data.result.geometry.viewport.northeast;
      const { lat: swLat, lng: swLong } =
        data.result.geometry.viewport.southwest;

      markers.setVisible(true);

      pointFeature.setCoordinates(fromLonLat([long, lat]));

      map
        .getView()
        .fit(transformExtentToCoordinate([neLong, neLat, swLong, swLat]), {
          duration: durationToMovePlace,
          easing: easeOut,
        });
    },
  });
}

function clickPlace() {
  const $this = $(this);
  const placeId = $this.attr("data-place-id");
  getDetailLocation(placeId);
}

function templateSearchItem(data) {
  let button = $(document.createElement("button"))
    .attr({
      "data-place-id": data.place_id,
      role: "place",
    })
    .append(
      `
            <li>
                <h6 class="name" role="place">${
                  data.structured_formatting.main_text
                }</h6>
                ${
                  data.structured_formatting.secondary_text
                    ? `<span class="address" role="place">${data.structured_formatting.secondary_text}</span>`
                    : ""
                }
            </li>
            `
    )
    .on("click", clickPlace);

  return button;
}

const empty = `<button>
                        <li>
                            <h6 class="name">No match</h6>
                        </li>
                    </button>`;

$("input[role='search-places']").on(
  "input",
  delay(function () {
    const value = $(this).val();
    const resultBox = $(".result-box ul");
    let location = transform(
      map.getView().getCenter(),
      "EPSG:3857",
      "EPSG:4326"
    );
    location = `${location[1].toString()},${location[0].toString()}`;

    $.ajax({
      type: "GET",
      url: useCorsAnywhere
        ? "https://cors-anywhere.herokuapp.com/" + placesEndpoint
        : placesEndpoint,
      data: {
        input: value,
        location: location,
        radius: 50000,
      },
      crossDomain: false,
      dataType: "json",
      beforeSend: function () {
        $("[role='search-loading']").show();
      },
      complete: function () {
        $("[role='search-loading']").hide();
      },
    }).done(function (data) {
      data = data.predictions;
      resultBox.empty();

      if (data.length <= 0) {
        resultBox.append(empty);
      }

      data.slice(0, 5).forEach(function (d, i) {
        resultBox.append(templateSearchItem(d));
      });

      $(".searchbar-container .result-box").attr("data-show", true);
    });
  }, delaySearch)
);

$("input[role='search-places']").on("keyup", (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    clearTimeout(delayTimer);
    $("input[role='search-places']")[0].blur();
    let location = transform(
      map.getView().getCenter(),
      "EPSG:3857",
      "EPSG:4326"
    );
    location = `${location[1].toString()},${location[0].toString()}`;

    $.ajax({
      type: "GET",
      url:
        (useCorsAnywhere ? "https://cors-anywhere.herokuapp.com/" : "") +
        "https://maps.googleapis.com/maps/api/place/textsearch/json",
      data: {
        location: location,
        query: e.target.value,
        key: "AIzaSyAy9LBntbQWYkjZjjWSxkdxpLMOW6_W9YU",
      },
      crossDomain: false,
      dataType: "json",
      beforeSend: function () {
        $("[role='search-loading']").show();
      },
      complete: function () {
        $(".searchbar-container .result-box").attr("data-show", false);
        $("[role='search-loading']").hide();
      },
    }).done((data) => {
      console.log(data, location);
      const { lat, lng: long } = data.results[0].geometry.location;
      const { lat: neLat, lng: neLong } =
        data.results[0].geometry.viewport.northeast;
      const { lat: swLat, lng: swLong } =
        data.results[0].geometry.viewport.southwest;

      markers.setVisible(true);

      pointFeature.setCoordinates(fromLonLat([long, lat]));

      map
        .getView()
        .fit(transformExtentToCoordinate([neLong, neLat, swLong, swLat]), {
          duration: durationToMovePlace,
          easing: easeOut,
        });
    });
  }
});

$(window).on("click", function (e) {
  if (
    e.target.getAttribute("role") == "place" ||
    e.target.getAttribute("role") == "search-places"
  )
    return;

  $(".searchbar-container .result-box").attr("data-show", false);
});

$("input[role='search-places']").on("focusin", () => {
  $(".tab-icon-container").css({
    width: 0,
  });
});

$("input[role='search-places']").on("focusout", (e) => {
  if (e.target.value === "") {
    $(".searchbar-container .input-box input[type='text']").removeAttr("style");
    $(".tab-icon-container").removeAttr("style");
  }
  if (e.target.value !== "") {
    $(".searchbar-container .input-box input[type='text']").css({
      width: 300,
      "max-width": "calc(100vw - 245px)",
      margin: 0,
    });
  }
});

$("input[role='search-places']").on("focus", (e) => {
  e.target.select();
});

$(".searchbar-container .input-box .icon").on("click", () => {
  $("input[role='search-places']")[0].focus();
});

$(document).on("keydown", (e) => {
  if (e.key === "/") e.preventDefault();

  if (e.key === "/" && !$("input[role='search-places']").is(":focus")) {
    $("input[role='search-places']")[0].focus();
  }

  if (e.key === "Escape" && $("input[role='search-places']").is(":focus")) {
    $(".searchbar-container .result-box").attr("data-show", false);
    $("input[role='search-places']")[0].blur();
  }
});

/*
 * END SEARCH BAR *
 */
