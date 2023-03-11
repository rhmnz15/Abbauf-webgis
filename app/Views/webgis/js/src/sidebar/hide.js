import $ from "jquery";
// import map from '../map';

let hide = true;

function showPanel() {
  $(".sidenav").width("400");
  if (hide) {
    $(".sidenav").css("left", 80);
  } else {
    $(".sidenav").css("left", 335);
  }
}

// Ketika dim screen (mobile) maka panel akan di hide
$(".dim-screen").on("click", function () {
  $("[data-move=true]").removeClass("move-right");

  $("button[role='sidebar-toggle']").attr("data-hide", !hide);
  $(".fixed-content-body").attr("data-hide", !hide);
  $(".fixed-content-box").attr("data-hide", !hide);
  hide = !hide;
});

// Ketika tombol sidebar di klik
$("button[role='sidebar-toggle']").on("click", () => {
  if (!hide) {
    $("[data-move=true]").removeClass("move-right");
  }

  if (hide) {
    $("[data-move=true]").addClass("move-right");
  }

  $("button[role='sidebar-toggle']").attr("data-hide", !hide);
  $(".fixed-content-body").attr("data-hide", !hide);
  $(".fixed-content-box").attr("data-hide", !hide);
  hide = !hide;
});

// Hide sidebar function
export const hideSidebar = () => {
  $("[data-move=true]").removeClass("move-right");

  $("button[role='sidebar-toggle']").attr("data-hide", true);
  $(".fixed-content-body").attr("data-hide", true);
  $(".fixed-content-box").attr("data-hide", true);
  hide = true;
};

$(".close-side-content").on("click", function () {
  $(".sidenav").width("0");
});

export default showPanel;
