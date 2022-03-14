let _dataItem;
$("document").ready(function () {
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
  // Page_Init();
  $(".ddlTest").kendoDropDownList();
  $("#eq1").kendoCheckBox({
    checked: true,
    label: "Yes/No",
  });
  $("#eq2").kendoCheckBox({
    checked: true,
    label: "Yes/No",
  });
  $("#topup").kendoCheckBox({
    checked: false,
    label: "Top Up",
  });
  $(".yearSelect").kendoDatePicker({
    format: "yyyy",
  });
  $(".dateSelect").kendoDatePicker({
    format: "dd/MM/yyyy",
  });

  $("#GridKPI").kendoGrid({
    dataSource: {
      data: KPIData,
      schema: {
        model: {
          fields: {
            Year: { type: "string" },
          },
        },
      },
      pageSize: 20,
    },
    scrollable: true,
    sortable: false,
    filterable: false,
    editable: true,
    dataBound: onKPIDataBound,
    columns: [
      {
        field: "Year",
        title: "Year",
        width: "80px",
        editor: KPIYearDateEditor,

        template: "<span>#: kendo.toString(Year, 'yyyy') # </span>",
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:Year' class='dateSelectEdit' /></span>",
      },
      {
        field: "KPI",
        title: "KPI",
        width: "130px",
        editor: KPIDropDownEditor,
        template: "#=KPI.KPIName#",
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:KPI.KPIName' class='ddlTestEdit' /></span>",
      },
      {
        field: "KPIType",
        title: "KPI Type",
        width: "130px",
        editor: KPITypeDropDownEditor,
        template: "#=KPIType.KPITypeName#",
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:KPIType.KPITypeNam' class='ddlTestEdit' /></span>",
      },
      {
        field: "ProposedTypeName",
        title: "Proposed / Committed / Additional",
        width: "200px",
        editor: ProposedTypeDropDownEditor,
        // template: "#=ProposedType.ProposedTypeName#",
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:ProposedTypeName' class='ddlTestEdit' /></span>",
      },
      {
        field: "TargetDate",
        title: "Target Date",
        width: "120px",
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:TargetDate' class='dateSelectEdit' /></span>",
      },
      {
        field: "AchievementDate",
        title: "Achievement Date",
        width: "120px",
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:AchievementDate' class='dateSelectEdit' /></span>",
      },
      {
        field: "Note",
        title: "Note",
        width: "130px",
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:Note' class='k-input-inner' /></span>",
      },
      {
        field: "CommercialGrade",
        title: "Commercial Grade",
        width: "130px",
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:CommercialGrade' class='k-input-inner' /></span>",
      },
      {
        field: "CustomerFeedback",
        title: "Customer Feedback",
        width: "130px",
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:CustomerFeedback' class='k-input-inner' /></span>",
      },
      {
        field: "",
        title: " ",
        width: "25px",
        template: '<i class="fa-solid fa-trash-can"></i>',
      },
    ],
  });
  $("#GridEcoDesignTemplate").kendoGrid({
    dataSource: {
      data: EcoDesignTemplate,
      schema: {
        model: {
          fields: {
            Year: { type: "string" },
          },
        },
      },
      pageSize: 20,
    },
    scrollable: true,
    sortable: false,
    filterable: false,
    editable: true,
    columns: [
      {
        field: "Template",
        title: "Template",
        width: "180px",
      },
      {
        field: "",
        title: "",
        width: "42px",
        template: "<div class='k-button'>UPLOAD</div>",
      },
      {
        field: "FileName",
        title: "FileName",
        width: "200px",
      },
      {
        field: "Revision",
        title: "Revision",
        width: "80px",
      },
      {
        field: "",
        title: " ",
        width: "25px",
        template: '<i class="fa-solid fa-trash-can"></i>',
      },
    ],
  });
  $("#GridMaterial").kendoGrid({
    dataSource: {
      data: MaterialData,
      schema: {
        model: {
          fields: {
            Year: { type: "string" },
          },
        },
      },
      pageSize: 20,
    },
    scrollable: true,
    sortable: false,
    filterable: false,
    editable: true,
    dataBound: onMaterialDataBound,
    columns: [
      {
        field: "Year",
        title: "Year",
        width: "100px",
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:Year' class='dateSelectEditMaterial' /></span>",
      },
      {
        field: "MaterialA",
        title: "Material A (%)",
        width: "130px",
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:MaterialA' class='k-input-inner' /></span>",
      },
      {
        field: "MaterialB",
        title: "Material B (%)",
        width: "130px",
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:MaterialB' class='k-input-inner' /></span>",
      },
      {
        field: "kgCO2eq",
        title: "kg CO2eq",
        width: "130px",
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:kgCO2eq' class='k-input-inner' /></span>",
      },
      {
        field: "ClimateChangeEcosystem",
        title: "Climate Change Ecosystem",
        width: "180px",
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:ClimateChangeEcosystem' class='k-input-inner' /></span>",
      },
      {
        field: "FossilDepletion",
        title: "Fossil Depletion",
        width: "130px",
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:FossilDepletion' class='k-input-inner' /></span>",
      },
      {
        field: "EnvironmentalImpact",
        title: "Environmental Impact",
        width: "150px",
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:EnvironmentalImpact' class='k-input-inner' /></span>",
      },

      {
        field: "",
        title: " ",
        width: "25px",
        template: '<i class="fa-solid fa-trash-can"></i>',
      },
    ],
  });

  function deleteItemKPI(e) {
    e.preventDefault();

    var grid = $("#GridKPI").data("kendoGrid");
    var row = $(e.currentTarget).closest("tr");
    var dataItem = this.dataItem(row);
    grid.removeRow(row);
  }
  function deleteItem(e) {
    e.preventDefault();

    var grid = $("#grid").data("kendoGrid");
    var row = $(e.currentTarget).closest("tr");
    var dataItem = this.dataItem(row);
    if (grid.dataSource.total() > 70) {
      grid.removeRow(row);
    }
  }
  $("#GridHistoryLog").kendoGrid({
    dataSource: {
      data: HistoryLogData,
      schema: {
        model: {
          fields: {
            Year: { type: "string" },
          },
        },
      },
      pageSize: 20,
    },
    scrollable: true,
    sortable: true,
    filterable: true,
    editable: false,
    columns: [
      {
        field: "EventDate",
        title: "Event Date",
      },
      {
        field: "ActionBy",
        title: "Action By",
      },
      {
        field: "Revision",
        title: "Revision",
      },
      {
        field: "Action",
        title: "Action",
      },
      {
        field: "Detail",
        title: "Detail",
      },
      {
        field: "From",
        title: "From",
      },
      {
        field: "To",
        title: "To",
      },
    ],
  });

  $(".multiselectTest").kendoMultiSelect().data("kendoMultiSelect");
});
function KPIYearDateEditor(container, options) {
  $('<input required name="' + options.field + '"/>')
    .appendTo(container)
    .kendoDatePicker({
      start: "decade",
      depth: "decade",
      format: "yyyy",
    });
}
function KPIDropDownEditor(container, options) {
  $('<input required name="' + options.field + '"/>')
    .appendTo(container)
    .kendoDropDownList({
      autoBind: false,
      dataTextField: "",
      dataValueField: "",
      dataSource: ["Prototype", "Spec In", "Commercial", "Enabling Know How"],
    });
}
function KPITypeDropDownEditor(container, options) {
  $('<input required name="' + options.field + '"/>')
    .appendTo(container)
    .kendoDropDownList({
      autoBind: false,
      dataTextField: "",
      dataValueField: "",
      dataSource: ["Process", "Product", "N/A"],
    });
}

function ProposedTypeDropDownEditor(container, options) {
  $('<input required name="' + options.field + '"/>')
    .appendTo(container)
    .kendoDropDownList({
      autoBind: false,
      dataTextField: "",
      dataValueField: "",
      dataSource: ["Proposed", "Committed", "Additional"],
    });
}

function onKPIDataBound(e) {
  //KPIeditAll();
}
function onMaterialDataBound(e) {
  MaterialeditAll();
}
function KPIeditAll() {
  var GridKPI = $("#GridKPI").data("kendoGrid");
  $("#GridKPI tbody")
    .find("tr")
    .each(function () {
      var model = GridKPI.dataItem(this);
      kendo.bind(this, model);
    });
  $("#GridKPI").focus();

  $(".dateSelectEdit").kendoDatePicker({
    format: "dd/MM/yyyy",
  });
  $(".ddlTestEdit").kendoDropDownList();
}

function MaterialeditAll() {
  var GridMaterial = $("#GridMaterial").data("kendoGrid");
  $("#GridMaterial tbody")
    .find("tr")
    .each(function () {
      var model = GridMaterial.dataItem(this);
      kendo.bind(this, model);
    });
  $("#GridMaterial").focus();

  $(".dateSelectEditMaterial").kendoDatePicker({
    format: "dd/MM/yyyy",
  });
}
