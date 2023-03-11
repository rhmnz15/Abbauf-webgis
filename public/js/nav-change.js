/**
 * ----------------------------------------------------------------------
 */

const path = window.location.pathname;

if (path == "/dashboard") initChangeTab(0, true);
if (path == "/dashboard/webgis") initChangeTab(1);
else initChangeTab(0, true);

function initChangeTab(number, showChart) {
  $(".tab-pane").each(function (i) {
    const el = $(this);

    if (showChart) {
      $(".chart-sidebar[role='tabpanel']").addClass("show").addClass("active");
      return;
    }

    if (i == number) {
      el.addClass("show").addClass("active");
      return;
    }

    el.removeClass("show").removeClass("active");
  });

  $(".nav-link[data-toggle=tab]").each(function (i) {
    const el = $(this);

    el.removeAttr("data-toggle");

    if (i == number) {
      el.addClass("active");
      return;
    }

    el.removeClass("active");
  });
}
