$("document").ready(function () {
  $(".ddlTest").kendoDropDownList();
  $("#files").kendoUpload();

  $(".numerictextbox").kendoNumericTextBox({
    decimals: 3,
    step: 1,
    min: 0,
    spinners: false,
    restrictDecimals: true,
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

  $("#SaveDraftBTN").click(function () {});
  $("#SubmitBTN").click(function () {
    SubmitRDOpexInfo();
  });

  $("#btnCustomUpload").kendoButton({
    themeColor: "primary",
    click: function (e) {
      $("#btnUpload").click();
    },
  });
  $("#btnUpload").kendoUpload({
    showFileList: false,
    localization: {
      select: "Upload",
    },
    select: function (e) {
      debugger;
      var widget = $("#dvAttachmentList").data("kendoListView");
      if (!widget) {
        widget = $("#dvAttachmentList")
          .kendoListView({
            bordered: false,
            //layout: "grid",
            //contentElement: "",
            template: kendo.template($("#template-attachmentlist").html()),
            dataBound: function (e) {
              var inputs = $(e.sender.element).find(".attachment-textbox");
              if (inputs && inputs.length) {
                inputs.kendoTextBox();
              }
            },
          })
          .data("kendoListView");
      }

      widget.dataSource.data(e.files);
    },
  });
});
function SubmitRDOpexInfo() {
  //validate
  let RevenueData = $("#RevenueData").val();
  let EBITDAData = $("#EBITDAData").val();
  let EBITDAUpliftData = $("#EBITDAUpliftData").val();

  if (RevenueData == "" && EBITDAData == "" && EBITDAUpliftData == "") {
    $("#ValidateSummary").fadeIn();
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $("#ValidateSummary").offset().top,
      },
      2000
    );
  }
  //submit
}
