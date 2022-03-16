let _dataItem;
var dataSourceBenefit = new kendo.data.DataSource({
  data: BenefitData,
});
$("document").ready(function () {
  // Page_Init();

  $("#SuggestProcessBTN").click(function () {
    SuggestProcess();
  });
  $("#SubmitBTN").click(function () {
    SubmitInfo();
  });
  $("#BenefitAdd").click(function () {
    var grid = $("#GridBenefit").data("kendoGrid");
    grid.addRow({
      isDelete: true,
    });
    return false;
  });
  $("#Proposed-Start-Date").kendoDatePicker({
    format: "dd/MM/yyyy",
  });
  $("#Estimated-Finish-Date").kendoDatePicker({
    format: "dd/MM/yyyy",
  });
  // $("#RegisterDate").kendoDatePicker();

  // var InitiativeCreator = $("#Initiative-Creator")
  //   .kendoMultiSelect()
  //   .data("kendoMultiSelect");
  // InitiativeCreator.enable(false);

  var InitiativeOwner = $("#Initiative-Owner")
    .kendoMultiSelect()
    .data("kendoMultiSelect");
  InitiativeOwner.enable(true);

  var CoDevelopers = $("#Co-Developers")
    .kendoMultiSelect()
    .data("kendoMultiSelect");
  CoDevelopers.enable(true);

  var Stakeholders = $("#Stakeholders")
    .kendoMultiSelect()
    .data("kendoMultiSelect");
  InitiativeOwner.enable(true);

  $("#Company").kendoDropDownList({
    dataTextField: "",
    dataValueField: "",
    filter: "contains",
    suggest: true,
    index: -1,
    dataSource: [
      "PTTGC",
      "Glycol",
      "SUN",
      "GGC",
      "TFA",
      "NPC S&E",
      "GCME",
      "GCS",
      "Vencorex (Thailand)",
      "PPCL",
      "GCO",
      "GCP",
      "GCMPTA",
      "TPRC",
    ],
  });
  $("#Organization").kendoDropDownList({
    dataTextField: "",
    dataValueField: "",
    filter: "contains",
    suggest: true,
    index: -1,
    dataSource: [
      "A-P1",
      "A-P1-AU",
      "A-P1-OP",
      "A-P1-TE",
      "A-P2",
      "A-P2-AU",
      "A-P2-OP",
      "A-P2-TE",
      "F-MA",
      "F-MA-BG",
      "F-MA-CO",
      "F-MA-EO",
      "F-MA-GP",
      "F-MA-PC",
      "F-MA-PO",
      "TP-PM",
      "TP-PM-CC",
      "TP-PM-CO",
      "TP-PM-DM",
      "TP-PO-SO",
    ],
  });
  $("#Location").kendoDropDownList({
    dataTextField: "",
    dataValueField: "",
    filter: "contains",
    suggest: true,
    index: -1,
    dataSource: [
      "A-P1",
      "A-P2",
      "E-GC1.1",
      "E-GC1.2",
      "G-OL1.1",
      "G-OL1.2",
      "G-OL2",
      "O-P1",
      "O-P1.1",
      "O-P1.2",
      "O-P2.1",
      "O-P2.2",
      "O-P2.3",
      "O-P3",
      "O-P4",
      "P-HD1.1",
      "P-HD1.2",
      "P-HD2",
      "PH-P1.1",
      "PH-P1.2",
      "PH-P2",
      "P-LD",
      "P-LL1.1",
      "P-LL1.2",
      "P-PO",
      "P-PS",
      "P-PY",
      "R-P1",
      "R-RM",
      "T-TA",
      "U-CM",
      "U-P1",
      "VCR",
    ],
  });
  $("#EstimateOPEXCost").kendoDropDownList();

  $("#Type1").kendoDropDownList();
  $("#Type2").kendoDropDownList();
  $("#Type3").kendoDropDownList();
  $("#Type4").kendoDropDownList();
  $("#Type5").kendoDropDownList();
  $("#Type6").kendoDropDownList();

  $(".ddlBenefit").kendoDropDownList();

  $("#DirectBenefit").kendoDropDownList();
  $("#IndirectBenefit").kendoDropDownList();

  $("#Non-Financial-Benefit1").kendoDropDownList();
  $("#Non-Financial-Benefit2").kendoDropDownList();
  $("#Non-Financial-Benefit3").kendoDropDownList();

  $("#Environmental-Objective").kendoDropDownList();

  $("#switch1").kendoSwitch({
    messages: {
      checked: "YES",
      unchecked: "NO",
    },
  });
  $("#switch2").kendoSwitch({
    messages: {
      checked: "YES",
      unchecked: "NO",
    },
  });
  $("#switch3").kendoSwitch({
    messages: {
      checked: "YES",
      unchecked: "NO",
    },
  });

  $(".numerictextbox").kendoNumericTextBox({
    decimals: 3,
    step: 1,
    min: 0,
    spinners: false,
    restrictDecimals: true,
  });

  dataSourceBenefit.read();

  $("#GridBenefit").kendoGrid({
    dataSource: {
      data: dataSourceBenefit.data(),
      schema: {
        model: {
          fields: {
            Benefit: { type: "string" },
            BenefitPlan: { type: "string" },
            isDelete: { type: "boolean" },
          },
        },
      },
      pageSize: 20,
    },
    scrollable: true,
    sortable: false,
    filterable: false,
    editable: {
      createAt: "bottom",
    },
    dataBound: onBenefitDataBound,
    beforeEdit: function (e) {
      if (!e.model.isNew()) {
        e.preventDefault();
      }
    },
    edit: function (e) {
      if (e.model.isNew() && !e.model.dirty) {
        e.model.isDelete = true;
      }

      var dropdown = e.container
        .find("[data-role=dropdownlist]")
        .data("kendoDropDownList");
      if (dropdown) {
        dropdown.open();
      }
    },
    columns: [
      {
        field: "Benefit",
        title: "Benefit <span class='content-required'>*</span>",
        width: "250px",
        editor: BenefitEditor,
        template: function (dataItem) {
          if (dataItem && dataItem.Benefit) {
            return dataItem.Benefit;
          } else {
            return "";
          }
        },
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:Benefit' class='k-textbox k-input' /></span>",
      },
      {
        field: "BenefitType",
        title: "Type",
        width: "250px",
        editor: BenefitTypeEditor,
        template: function (dataItem) {
          if (dataItem && dataItem.BenefitType) {
            return dataItem.BenefitType.Value;
          } else {
            return "";
          }
        },
        //editor: KPIDropDownEditor,
        //template: "#=KPIType.KPITypeName#",
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:KPI.KPIName' class='ddlTestEdit' /></span>",
      },
      {
        field: "BenefitTarget",
        title: "Target (Description) <span class='content-required'>*</span>",
        width: "300px",
        //editor: TextAreaEditor,
        // editor: KPITypeDropDownEditor,
        // template: "#=KPIType.KPITypeName#",
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:BenefitTarget' class='ddlTestEdit' /></span>",
      },
      {
        field: "BenefitPlan",
        title: "Plan (MTHB) <span class='content-required'>*</span>",
        width: "120px",
        // editor: ProposedTypeDropDownEditor,
        template: "<div class='numberRight'>#=BenefitPlan#</div>",
        editor: numericEditor2,
        attributes: {
          class: "gridcolumn-right",
        },
        template: function (dataItem) {
          if (dataItem && dataItem.BenefitPlan) {
            return kendo.toString(dataItem.BenefitPlan, "#,###.###");
          } else {
            return "";
          }
        },
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:BenefitPlan' class='k-textbox k-input' /></span>",
      },
      {
        field: "BenefitDetail",
        title: "Detail",
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:BenefitDetail' class='k-textbox k-input' /></span>",
      },
      {
        field: "",
        title: " ",
        width: "50px",
        // template:
        //   "#if(isDelete){# <a style='text-align: center;'><i class='fa-regular fa-trash k-grid-delete' style='cursor: pointer'></i></a>#}else{#  #}#",
        template:
          "<a style='text-align: center;'><i class='fa-regular fa-trash k-grid-delete' style='cursor: pointer'></i></a>",
        click: function (e) {
          e.preventDefault();
          var tr = $(e.target).closest("tr");
          $("#GridBenefit").data("kendoGrid").removeRow(tr);
        },
      },
    ],
  });
});
function Page_Init() {
  console.log("Page Init");
  tlm.global
    .ajaxCallResult({
      url: tlm.global.SERVICE_URL + "/CMInformation",
      crossOrign: true,
      type: "post",
      success: function (data) {
        _dataItem = data;
        console.log(_dataItem);
      },
    })
    .done(function () {
      console.log("done!");
    });
}

function onBenefitDataBound(e) {
  //BenefireditAll();
}

function BenefireditAll() {
  var GridBenefit = $("#GridBenefit").data("kendoGrid");
  $("#GridBenefit tbody")
    .find("tr")
    .each(function () {
      var model = GridBenefit.dataItem(this);
      kendo.bind(this, model);
    });
  $("#GridBenefit").focus();

  // $(".dateSelectEdit").kendoDatePicker({
  //   format: "dd/MM/yyyy",
  // });
  $(".ddlTestEdit").kendoDropDownList();
}

function BenefitEditor(container, options) {
  $(
    '<input id="' +
      options.field +
      '" data-bind="value:' +
      options.field +
      '"/>'
  )
    .appendTo(container)
    .kendoDropDownList({
      dataSource: [
        { Value: "Increase Production" },
        { Value: "FTE Saving" },
        { Value: "Environment" },
        { Value: "Energy Saving" },
        { Value: "Safety" },
        { Value: "Law and Regulation" },
        { Value: "Manhour Saving" },
        { Value: "Others" },
      ],
      autoBind: true,
      dataTextField: "Value",
      dataValueField: "Value",
    });
}
function BenefitTypeEditor(container, options) {
  $(
    '<input id="' +
      options.field +
      '" data-bind="value:' +
      options.field +
      '"/>'
  )
    .appendTo(container)
    .kendoDropDownList({
      dataSource: [
        { Value: "Direct" },
        { Value: "Indirect" },
        { Value: "Non Financial" },
      ],
      autoBind: true,
      dataTextField: "Value",
      dataValueField: "Value",
    });
}
function TextAreaEditor(container, options) {
  $(
    '<span id="' +
      options.field +
      '" data-bind="value:' +
      options.field +
      '" class="textarea textareaOneLine textareaGrid" role="textbox" contenteditable/>'
  ).appendTo(container);
}
function numericEditor2(container, options) {
  $('<input data-bind="value:' + options.field + '"/>')
    .appendTo(container)
    .kendoNumericTextBox({
      decimals: 3,
      step: 1,
      min: 0,
      spinners: false,
      restrictDecimals: true,
    });
}
function SubmitInfo() {
  //validate
  let InitiativeNameData = $("#InitiativeNameData").text();

  if (InitiativeNameData == "") {
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

function SuggestProcess() {
  $("#SuggestionProcessDIV").fadeIn();
  $("#SuggestionProcessDIV2").fadeIn();
  $("#SubmitBTN").fadeIn();
  $([document.documentElement, document.body]).animate(
    {
      scrollTop: $("#SuggestionProcessDIV").offset().top,
    },
    2000
  );
  GoUpToValidate();
}
