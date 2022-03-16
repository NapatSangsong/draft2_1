let _dataItem;
var dataSourceBenefit = new kendo.data.DataSource({
  data: BenefitData,
});
$("document").ready(function () {
  // Page_Init();

  $("#BenefitAdd").click(function () {
    var grid = $("#GridBenefit").data("kendoGrid");
    grid.addRow({
      Benefit: "Increase Production",
      BenefitType: "Direct",
      BenefitTarget: "200 Ton/Year xxxxx",
      BenefitPlan: "70",
      BenefitDetail: "Demo",
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

  $("#Company").kendoDropDownList();
  $("#Organization").kendoDropDownList();
  $("#Location").kendoDropDownList();
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
    spinners: false,
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
    columns: [
      {
        field: "Benefit",
        title: "Benefit <span class='content-required'>*</span>",
        width: "250px",
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:Benefit' class='k-textbox k-input' /></span>",
      },
      {
        field: "BenefitType",
        title: "Type",
        width: "250px",
        //editor: KPIDropDownEditor,
        //template: "#=KPIType.KPITypeName#",
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:KPI.KPIName' class='ddlTestEdit' /></span>",
      },
      {
        field: "BenefitTarget",
        title: "Target (Description) <span class='content-required'>*</span>",
        width: "300px",
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
        template:
          "#if(isDelete){# <i class='fa-solid fa-trash-can'></i>#}else{#  #}#",
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
