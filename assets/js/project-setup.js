let _dataItem;
$("document").ready(function () {
  $(".RequiredEcoDesignCriteria").hide();
  $(".RequiredNAPD3").hide();
  $(".RequiredNAPD3Show").show();

  let DisplayMode = getParameterByName("DisplayMode");
  if (DisplayMode == "NAPD3") {
    $(".RequiredNAPD3").show();
    $(".RequiredNAPD3Show").hide();
  }

  $("#SubmitProjectSetup").click(function () {
    SubmitProjectSetupInfo();
  });
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
    change: function (e) {
      if (e.checked) {
        $(".RequiredEcoDesignCriteria").show();
      } else {
        $(".RequiredEcoDesignCriteria").hide();
      }
    },
  });
  // Page_Init();
  $("#ProjectType").kendoDropDownList({
    dataTextField: "",
    dataValueField: "",
    filter: "contains",
    suggest: true,
    index: -1,
    dataSource: ["New product", "Improvement", "Market Defending"],
  });
  $("#ProjectCategory").kendoDropDownList({
    dataTextField: "",
    dataValueField: "",
    filter: "contains",
    suggest: true,
    index: -1,
    dataSource: ["Transformation", "x", "y"],
  });

  $("#BusinessUnit").kendoDropDownList({
    dataTextField: "",
    dataValueField: "",
    filter: "contains",
    suggest: true,
    index: -1,
    dataSource: ["GGC", "EOB", "PHN", "DYCT"],
  });
  $("#MainSegment").kendoDropDownList({
    dataTextField: "",
    dataValueField: "",
    filter: "contains",
    suggest: true,
    index: -1,
    dataSource: [
      "Laminations",
      "Non Laminations",
      "Stretch Wrape Films",
      "Strech hood",
      "Shrink Films",
      "Heavy Duty Bags",
      "Extrusion Coating",
    ],
  });
  $("#SubSegment").kendoDropDownList({
    dataTextField: "",
    dataValueField: "",
    filter: "contains",
    suggest: true,
    index: -1,
    dataSource: [
      "Dry food packaging",
      "Fresh food packaging",
      "Liquid food packaging",
      "Snack packaging",
    ],
  });
  $("#CustomerType").kendoDropDownList({
    dataTextField: "",
    dataValueField: "",
    filter: "contains",
    suggest: true,
    index: -1,
    dataSource: [
      "Customer Type 1",
      "Customer Type 2",
      "Customer Type 3",
      "Customer Type 4",
    ],
  });

  $("#Application").kendoDropDownList({
    dataTextField: "",
    dataValueField: "",
    filter: "contains",
    suggest: true,
    index: -1,
    dataSource: [
      "Flexible Packaging",
      "Cap & Closure",
      "Electrical Housing",
      "Wire & Cable",
      "Coating & Painting",
      "Epoxy Composite",
      "Rotomolding",
      "Pipe",
      "Others",
      "Interior & Exterior Part",
      "Film",
      "Large Blow & Solar Floating",
    ],
  });
  $("#IndustrySegmentation").kendoDropDownList({
    dataTextField: "",
    dataValueField: "",
    filter: "contains",
    suggest: true,
    index: -1,
    dataSource: ["Packaging", "Construction", "E&E", "Automotive"],
  });
  $("#BusinessImpact").kendoDropDownList({
    dataTextField: "",
    dataValueField: "",
    filter: "contains",
    suggest: true,
    index: -1,
    dataSource: ["1", "2", "3"],
  });
  $("#StrategicPriority").kendoDropDownList({
    dataTextField: "",
    dataValueField: "",
    filter: "contains",
    suggest: true,
    index: -1,
    dataSource: ["1", "2", "3"],
  });
  $("#StrategicObjective").kendoDropDownList({
    dataTextField: "",
    dataValueField: "",
    filter: "contains",
    suggest: true,
    index: -1,
    dataSource: ["1", "2", "3"],
  });
  $(".ddlTest").kendoDropDownList({
    index: -1,
    filter: "contains",
  });
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
  $("#KPIAdd").click(function () {
    var grid = $("#GridKPI").data("kendoGrid");
    grid.addRow();
    return false;
  });
  $("#GridKPI").kendoGrid({
    dataSource: {
      data: KPIData,
      schema: {
        model: {
          fields: {
            Year: { type: "string" },
            KPI: { Value: { type: "string" } },
            KPIType: { Value: { type: "string" } },
            ProposedTypeName: { Value: { type: "string" } },
            TargetDate: { type: "date" },
            AchievementDate: { type: "date" },
            Note: { type: "string" },
            CommercialGrade: { type: "string" },
            CustomerFeedback: { type: "string" },
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
    dataBound: onKPIDataBound,
    edit: function (e) {
      var dropdown = e.container
        .find("[data-role=dropdownlist]")
        .data("kendoDropDownList");
      if (dropdown) {
        dropdown.open();
      }
    },
    columns: [
      {
        field: "Year",
        title: "Year",
        width: "80px",
        editor: KPIYearDateEditor,

        template: "<span>#: kendo.toString(new Date(Year), 'yyyy') # </span>",
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:Year' class='dateSelectEdit' /></span>",
      },
      {
        field: "KPI",
        title: "KPI",
        width: "130px",
        editor: KPIDropDownEditor,
        //template: "#=KPI.KPIName#",
        template: function (dataItem) {
          if (dataItem && dataItem.KPI.Value) {
            return dataItem.KPI.Value;
          } else if (dataItem && dataItem.KPI != "") {
            return dataItem.KPI;
          } else {
            return "";
          }
        },
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:KPI.KPIName' class='ddlTestEdit' /></span>",
      },
      {
        field: "KPIType",
        title: "KPI Type",
        width: "130px",
        editor: KPITypeDropDownEditor,
        template: function (dataItem) {
          if (dataItem && dataItem.KPIType.Value) {
            return dataItem.KPIType.Value;
          } else if (dataItem && dataItem.KPIType != "") {
            return dataItem.KPIType;
          } else {
            return "";
          }
        },
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:KPIType.KPITypeNam' class='ddlTestEdit' /></span>",
      },
      {
        field: "ProposedTypeName",
        title: "Proposed / Committed / Additional",
        width: "200px",
        editor: ProposedTypeDropDownEditor,
        template: function (dataItem) {
          if (dataItem && dataItem.ProposedTypeName.Value) {
            return dataItem.ProposedTypeName.Value;
          } else if (dataItem && dataItem.ProposedTypeName != "") {
            return dataItem.ProposedTypeName;
          } else {
            return "";
          }
        },
        // template: "#=ProposedType.ProposedTypeName#",
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:ProposedTypeName' class='ddlTestEdit' /></span>",
      },
      {
        field: "TargetDate",
        title: "Target Date",
        width: "120px",
        editor: TargetDateEditor,
        template:
          "<span>#: kendo.toString(new Date(TargetDate), 'dd/MM/yyyy') # </span>",
        // template:
        //   "<span class='k-input k-textbox k-input-solid k-input-md k-rounded-md'><input data-bind='value:TargetDate' class='dateSelectEdit' /></span>",
      },
      {
        field: "AchievementDate",
        title: "Achievement Date",
        width: "120px",
        editor: AchievementDateEditor,
        template:
          "<span>#: kendo.toString(new Date(AchievementDate), 'dd/MM/yyyy') # </span>",
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
        width: "50px",
        // template:
        //   "#if(isDelete){# <a style='text-align: center;'><i class='fa-regular fa-trash k-grid-delete' style='cursor: pointer'></i></a>#}else{#  #}#",
        template:
          "<a style='text-align: center;'><i class='fa-regular fa-trash k-grid-delete' style='cursor: pointer'></i></a>",
        click: function (e) {
          e.preventDefault();
          var tr = $(e.target).closest("tr");
          $("#GridKPI").data("kendoGrid").removeRow(tr);
        },
      },
    ],
  });
  $("#GridEcoDesignTemplate").kendoGrid({
    dataSource: {
      data: EcoDesignTemplate,
      schema: {
        model: {
          fields: {
            Template: { type: "string" },
          },
        },
      },
      pageSize: 20,
    },
    scrollable: true,
    sortable: false,
    filterable: false,
    noRecords: {
      template:
        "<div class='noRecDiv'>There is no select Eco Design Criteria.</div>",
    },
    editable: {
      createAt: "bottom",
    },
    columns: [
      {
        field: "Template",
        title: "Template",
        width: "180px",
      },
      {
        field: "",
        title: "",
        width: "50px",
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
      // {
      //   field: "",
      //   title: " ",
      //   width: "30px",
      //   template: '<i class="fa-solid fa-trash-can"></i>',
      // },
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
        width: "100px",
      },
      {
        field: "Action",
        title: "Action",
        width: "100px",
      },
      {
        field: "Detail",
        title: "Detail",
        width: "300px",
      },
      {
        field: "From",
        title: "From",
        width: "180px",
      },
      {
        field: "To",
        title: "To",
        width: "180px",
      },
    ],
  });

  $(".multiselectTest").kendoMultiSelect().data("kendoMultiSelect");
  $("#EcoDesignCriteria").kendoMultiSelect({
    deselect: function (e) {
      debugger;
      var dataItem = e.dataItem;
      var item = e.item;
      var grid = $("#GridEcoDesignTemplate").data("kendoGrid");
      $(grid.dataSource.data()).each(function (i, x) {
        if (dataItem.text == x.Template) {
          grid.dataSource.remove(x);
        }
      });

      // Use the deselected data item or jQuery item
    },
    select: function (e) {
      var item = e.item;
      var text = item.text();
      var grid = $("#GridEcoDesignTemplate").data("kendoGrid");
      var newRow = {
        Template: text,
      };
      grid.dataSource.add(newRow);
      // Use the selected item or its text
    },
    change: function (e) {
      var value = this.value();

      // Use the value of the widget
    },
  });

  $("#VOCAdd").click(function () {
    var dataSource = $("#listView").data("kendoListView").dataSource;
    dataSource.add({
      No: dataSource.data().length + 1,
      VOCProjectCode: "",
      VOCInitiator: "",
      VOCApprovedDate: new Date(),
      CommentFromVOC: "",
      IsTerminated: true,
      IsShowTerminated: true,
      IsRemove: true,
      IsShowRemove: true,
      IsNew: true,
    });
    dataSource.sync();
  });
  $("#listView").kendoListView({
    dataSource: {
      data: VOCData,
      schema: {
        model: {
          fields: {
            No: { type: "string" },
            VOCProjectCode: { type: "string" },
            VOCInitiator: { type: "string" },
            VOCApprovedDate: { type: "date" },
            CommentFromVOC: { type: "string" },
            IsTerminated: { type: "boolean" },
            IsShowTerminated: { type: "boolean" },
            IsRemove: { type: "boolean" },
            IsShowRemove: { type: "boolean" },
          },
        },
      },
      pageSize: 21,
    },
    template: kendo.template($("#template").html()),
    pageable: false,
    dataBound: function () {
      $(".vocApprovedDate").kendoDatePicker({
        format: "dd/MM/yyyy",
      });
    },
  });
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
function TargetDateEditor(container, options) {
  $('<input required name="' + options.field + '"/>')
    .appendTo(container)
    .kendoDatePicker({
      start: "",
      depth: "",
      format: "dd/MM/yyyy",
    });
}
function AchievementDateEditor(container, options) {
  $('<input required name="' + options.field + '"/>')
    .appendTo(container)
    .kendoDatePicker({
      start: "",
      depth: "",
      format: "dd/MM/yyyy",
    });
}

function KPIDropDownEditor(container, options) {
  // "Prototype", "Spec In", "Commercial", "Enabling Know How";
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
        { Value: "Prototype" },
        { Value: "Spec In" },
        { Value: "Commercial" },
        { Value: "Enabling Know How" },
      ],
      autoBind: true,
      dataTextField: "Value",
      dataValueField: "Value",
    });
}
function KPITypeDropDownEditor(container, options) {
  // "Prototype", "Spec In", "Commercial", "Enabling Know How";
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
        { Value: "Process" },
        { Value: "Product" },
        { Value: "N/A" },
      ],
      autoBind: true,
      dataTextField: "Value",
      dataValueField: "Value",
    });
}

function ProposedTypeDropDownEditor(container, options) {
  // "Prototype", "Spec In", "Commercial", "Enabling Know How";
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
        { Value: "Proposed" },
        { Value: "Committed" },
        { Value: "Additional" },
      ],
      autoBind: true,
      dataTextField: "Value",
      dataValueField: "Value",
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
function SubmitProjectSetupInfo() {
  //validate
  debugger;
  let Background = $("#Background").text();
  let Objectives = $("#Objectives").text();
  let ScopeOfWork = $("#ScopeOfWork").text();
  $("#ValidateSummaryUL").html("");
  if (Background == "") {
    $("#ValidateSummaryUL").append(
      ' <li><div data-field="" style="cursor: pointer;" class="itemValidate" div-id="InitiativeNameData">Background is required</div>'
    );
  }
  if (Objectives == "") {
    $("#ValidateSummaryUL").append(
      ' <li><div data-field="" style="cursor: pointer;" class="itemValidate" div-id="InitiativeNameData">Objectives is required</div>'
    );
  }
  if (ScopeOfWork == "") {
    $("#ValidateSummaryUL").append(
      ' <li><div data-field="" style="cursor: pointer;" class="itemValidate" div-id="InitiativeNameData">Scope Of Work is required</div>'
    );
  }
  if (ScopeOfWork == "" || Objectives == "" || ScopeOfWork == "") {
    $("#ValidateSummary").fadeIn();
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $("#ValidateSummary").offset().top,
      },
      2000
    );
  }

  GoUpToValidate();
  //submit
}

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
