$("document").ready(function () {
  // ==== Preloader

  setTimeout(fadeout, 500);
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

  calStageGate2();
  fontFamSet();
  fontSizeSet();

  $("#auto").click(function () {
    location.reload();
  });
  $("#align").click(function () {
    calStageGateAlign();
  });
});

function calStageGate() {
  $(".StageGate-item-status").each(function (i, v) {
    var w = Math.floor($(this).width() / 2) + 10;
    $(this).css("margin-left", -w);
  });

  $(".StageGate-item-status-last").each(function (i, v) {
    var w = Math.floor($(this).width() / 2);
    $(this).css("right", -w);
  });

  $(".StageGate-item-status-first").each(function (i, v) {
    var w = Math.floor($(this).width() / 2);
    $(this).css("margin-left", "0px");
  });
}
function calStageGate2() {
  var minW = 0;
  var leftItem = 0;
  $(".StageGate-bar-items-div").each(function (ix, vx) {
    var xItem = $(vx)
      .find(".StageGate-item-status")
      .not(".StageGate-item-status-last")
      .not(".StageGate-item-status-first");

    xItem.css("margin-left", "-25px");
  });
}

function calStageGateAlign() {
  var maxW = 0;
  var leftItem = 0;
  $(".StageGate-bar-items-div").each(function (ix, vx) {
    var xItem = $(vx)
      .find(".StageGate-item-status")
      .not(".StageGate-item-status-last");
    if (xItem.length > 1) {
      $(xItem).each(function (i, v) {
        if ($(v).width() > maxW) {
          maxW = $(v).width();
          leftItem = $(v).css("margin-left");
          console.log(leftItem);
        }
      });

      $(xItem).css("width", maxW + "px");
      $(xItem).css("margin-left", leftItem);
    }

    maxW = 0;
    leftItem = 0;
  });
  // $(".StageGate-bar-items-div").each(function (ix, vx) {
  //   $(vx)
  //     .find(".StageGate-item-status")
  //     .each(function (i, v) {
  //       var w = Math.floor($(this).width() / 2) + 10;
  //       $(this).css("margin-left", -w);
  //     });
  // });

  // $(".StageGate-item-status-last").each(function (i, v) {
  //   var w = Math.floor($(this).width() / 2);
  //   $(this).css("right", -w);
  // });

  // $(".StageGate-item-status-first").each(function (i, v) {
  //   var w = Math.floor($(this).width() / 2);
  //   $(this).css("margin-left", "0px");
  // });
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
function GoUpToValidate() {
  $(".itemValidate").click(function () {
    var goto = $(this).attr("div-id");
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $("#" + goto).offset().top - 50,
      },
      500
    );
  });
}
function fadeout() {
  // document.querySelector(".preloader").style.opacity = "0";
  // document.querySelector(".preloader").style.display = "none";
  $(".preloader").fadeOut();
}
