$("document").ready(function () {
  $(".rightBoxContent-item-collapse").click(function () {
    $(".showDownload").fadeIn();
  });
  $(".closeDownload").click(function () {
    $(".showDownload").fadeOut();
  });
});
