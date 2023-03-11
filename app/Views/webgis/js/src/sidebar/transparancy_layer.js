import $ from "jquery";

// Layers Transparancy
$(".item-wrapper").each(function () {
  let wrapper = $(this);
  $(this)
    .children(".over-zone")
    .on("mouseenter", function () {
      wrapper.children(".brightness-wrapper").addClass("show");
    });
  $(this)
    .children(".over-zone")
    .on("mouseleave", function () {
      wrapper.children(".brightness-wrapper").removeClass("show");
    });

  wrapper.children(".brightness-wrapper").on("mouseenter", function () {
    wrapper.children(".brightness-wrapper").addClass("show");
  });
  wrapper.children(".brightness-wrapper").on("mouseleave", function () {
    wrapper.children(".brightness-wrapper").removeClass("show");
  });
});

$(".brightness-wrapper span.back-icon").on("click", function () {
  $(this).parent().toggleClass("show");
});

$(".brightness-box").each(function () {
  let val = $(this).children("input").val();
  let span = $(this).children("span");
  let indicator = $(this).parent().parent().children("span.brightness-icon");

  $(this)
    .children("input")
    .on("input", function (e) {
      span.html(e.target.value);
      indicator.css("filter", `invert(${e.target.value}%)`);
    });
});
