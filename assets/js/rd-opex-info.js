$("document").ready(function () {
  $(".ddlTest").kendoDropDownList();
  $("#files").kendoUpload();

  $(".numerictextbox").kendoNumericTextBox({
    spinners: false,
  });
  var tooltip = $(".copyIconDiv")
    .kendoTooltip({
      filter: "span",
      width: 120,
      position: "top",
      showOn: "click",
      animation: {
        open: {
          effects: "zoom",
          duration: 150,
        },
      },
    })
    .data("kendoTooltip");
});
