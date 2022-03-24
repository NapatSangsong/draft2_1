$("document").ready(function () {
  $(".rightBoxContent-item-collapse").click(function () {
    $(".showDownload").fadeIn();
  });
  $(".closeDownload").click(function () {
    $(".showDownload").fadeOut();
  });
  $("#panelbar").kendoPanelBar({
    expandMode: "single",
  });
  var panelBar = $("#panelbar").data("kendoPanelBar");
  // select the item with ID, "item1"
  panelBar.select("#item1");
  panelBar.expand($("#item1"));
});
