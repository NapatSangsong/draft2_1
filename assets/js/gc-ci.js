$("document").ready(function () {
  // ==== Preloader
  setTimeout(fadeout, 1000);
  initMenu();
});

function fadeout() {
  $(".preloader").fadeOut();
}

$("#menu-toggle").click(function (e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled-2");
  $(this).find("i").toggleClass("icon-rotate");
});

function initMenu() {
  $("#menu ul").hide();
  $("#menu ul").children(".current").parent().show();
  //$('#menu ul:first').show();
  $("#menu li a").click(function () {
    var checkElement = $(this).next();
    if (checkElement.is("ul") && checkElement.is(":visible")) {
      return false;
    }
    if (checkElement.is("ul") && !checkElement.is(":visible")) {
      $("#menu ul:visible").slideUp("normal");
      checkElement.slideDown("normal");
      return false;
    }
  });
  $("#wrapper").toggleClass("toggled-2");
  $("#menu ul").hide();
}
