$("document").ready(function () {
  $(".download-content-click").click(function () {
    if ($(this).hasClass("isExpand")) {
      $(this).removeClass("isExpand");
      $(this)
        .find("span")
        .html(
          '<i class="fa-duotone fa-chevrons-down"></i> CLICK HERE TO EXPAND'
        );
    } else {
      $(this).addClass("isExpand");
      $(this)
        .find("span")
        .html(
          '<i class="fa-duotone fa-chevrons-up"></i> CLICK HERE TO COLLAPSE'
        );
    }
    $(".download-content-row2").slideToggle("slow");
  });

  $("#recent-icon").click(function () {
    $(".project-list").css("left", "150px");
    $(".project-list").css("top", "50px");
    $(".project-list").slideToggle("slow");
  });

  calStageGate();
  fontFamSet();
  fontSizeSet();
});

function calStageGate() {
  $(".StageGate-item-status").each(function (i, v) {
    var w = Math.floor($(this).width() / 2);
    w += 20;
    $(this).css("margin-left", -w);
  });

  $("  .StageGate-item-status-last").each(function (i, v) {
    var w = Math.floor($(this).width() / 2);
    $(this).css("right", -w);
  });
}

function fontFamSet() {
  $("#font-fam-set li").click(function () {
    $("body").css("font-family", $(this).text());
    $("#font-fam-set li").removeClass("setFontActive");
    $(this).addClass("setFontActive");
  });
}
function fontSizeSet() {
  $("#font-size-set li").click(function () {
    $("nav").css("fontSize", $(this).text() + "px");
    $("section").css("fontSize", $(this).text() + "px");
    $("#font-size-set li").removeClass("setFontActive");
    $(this).addClass("setFontActive");
  });
}
