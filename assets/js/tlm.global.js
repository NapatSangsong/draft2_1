"use strict";

(function (window) {
  if (window.tlm === undefined) {
    window.tlm = {};
  }

  var tlm = window.tlm;
  tlm.global = null;

  var fullLoading = "";

  tlm.global = {
    SERVICE_URL: "https://localhost:5001",
    TIMEOUT_INTERVAL: 100,
    EMPTY_GUID: "00000000-0000-0000-0000-000000000000",
    trimClaimBased: function (loginName) {
      return loginName.indexOf("|") == -1 ? loginName : loginName.split("|")[1];
    },
    ajaxCallResult: function (options) {
      var args = {
        url: options.url,
        type: options.type === undefined ? "GET" : options.type,
        contentType:
          options.contentType === undefined
            ? "application/json; charset=utf-8"
            : options.contentType,
        dataType: options.dataType === undefined ? "json" : options.dataType,
        crossOrigin:
          options.crossOrigin === undefined ? false : options.crossOrigin,
        async: options.async === undefined ? true : options.async,
        xhrFields: {
          withCredentials: true,
        },
        success: function (msg) {
          tlm.global.hideFullLoading();
          switch (msg.d.Status) {
            case 1:
              {
                if (options.success !== undefined) {
                  options.success(msg.d.Data);
                }
              }
              break;
            case -1:
              {
                if (options.error !== undefined) {
                  options.error(msg.d);
                } else {
                  tlm.global.showAlertDialog({
                    title: false,
                    content: msg.d.Message,
                  });
                }
              }
              break;
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          tlm.global.hideFullLoading();
          if (options.error !== undefined) {
            options.error(jqXHR, textStatus, errorThrown);
          } else {
            tlm.global.showAlertDialog({
              title: jqXHR.statusText + " : " + jqXHR.status,
              height: 300,
              content: jqXHR.responseText,
            });
          }
        },
      };

      if (options.data !== undefined) {
        args.data = options.data;
      }

      if (options.success !== undefined) {
        args.success = function (msg) {
          if (
            options.showLoadding === undefined ||
            options.showLoadding == true
          ) {
            tlm.global.hideFullLoading();
          }

          switch (msg.d.Status) {
            case 1:
              {
                options.success(msg.d.Data);
              }
              break;
            case -1:
              {
                if (options.error !== undefined) {
                  options.error(msg.d);
                } else {
                  alert(msg.d.Message);
                }
              }
              break;
          }
        };
      }

      if (options.showLoadding === undefined || options.showLoadding == true) {
        tlm.global.showFullLoading();
      }

      return $.ajax(args);
    },
    ajaxCall: function (options) {
      var that = this;

      if (options.async === undefined) options.async = true;
      if (options.type === undefined) options.type = "GET";
      if (options.data === undefined) options.data = null;
      if (options.contentType === undefined)
        options.contentType =
          "application/x-www-form-urlencoded; charset=UTF-8";
      if (options.dataType === undefined) options.dataType = "json";
      if (options.processData === undefined) options.processData = true;

      //var authorization = "Basic " + btoa("thalamodev\\devadmin:isylzjkoTLMDev10");
      var userAccount = "";
      if (_spPageContextInfo && _spPageContextInfo.userLoginName) {
        userAccount = _spPageContextInfo.userLoginName;
      }

      if (options.headers === undefined) {
        options.headers = {
          accept: "application/json;odata=verbose",
          "content-type": "application/json;odata=verbose",
        };
      }

      // $("#tcm-authentication").attr("src", function (i, val) { return val; });

      return $.ajax({
        async: options.async,
        type: options.type,
        contentType: options.contentType,
        processData: options.processData,
        url: options.url,
        data: options.data,
        cache: false,
        // xhrFields: {
        //     withCredentials: true
        // },
        // beforeSend: function (xhr) {
        //     //xhr.setRequestHeader("Authorization", authorization);
        //     xhr.setRequestHeader("SPO-UserAccount", userAccount);
        // },
        success: function (data) {
          if (options.success) {
            options.success(data);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          if (options.error) {
            options.error(jqXHR, textStatus, errorThrown);
          }
        },
        complete: function (jqXHR, textStatus) {
          if (options.complete) {
            options.complete(jqXHR, textStatus);
          }
        },
      });
    },
    GetURLParameter: function (param) {
      var sPageURL = window.location.search.substring(1);
      var sURLVariables = sPageURL.split("&");
      for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split("=");
        if (sParameterName[0] == param) {
          return sParameterName[1];
        }
      }
    },
    showYesNoDialog: function (options) {
      var dialog = $("<div></div>");
      dialog
        .kendoDialog({
          width: options.width ? options.width : "450px",
          title: options.title ? options.title : "",
          closable: options.closable ? options.closable : false,
          modal: options.modal ? options.modal : true,
          content: options.content ? options.content : "Are you sure?",
          actions: [
            {
              text: "YES",
              action: options.onYes ? options.onYes : function (e) {},
            },
            {
              text: "NO",
              action: options.onNo ? options.onNo : function (e) {},
            },
          ],
          close: function (e) {
            if (typeof options.onClose === "function") {
              options.onClose();
            }
            e.sender.destroy();
          },
        })
        .data("kendoDialog")
        .open();
    },
    showOkCancelDialog: function (options) {
      var dialog = $("<div></div>");
      dialog
        .kendoDialog({
          width: options.width ? options.width : "450px",
          title: options.title ? options.title : "",
          closable: options.closable ? options.closable : false,
          modal: options.modal ? options.modal : true,
          content: options.content ? options.content : "Are you sure?",
          actions: [
            {
              text: "OK",
              action: options.onOk ? options.onOk : function (e) {},
            },
            {
              text: "CANCEL",
              action: options.onCancel ? options.onCancel : function (e) {},
            },
          ],
          close: function (e) {
            if (typeof options.onClose === "function") {
              options.onClose();
            }
            e.sender.destroy();
          },
        })
        .data("kendoDialog")
        .open();
    },
    _showFullLoadingCount: 0,
    showFullLoading: function () {
      if (tlm.global._showFullLoadingCount == 0) this.showLoading();
      tlm.global._showFullLoadingCount++;
    },
    hideFullLoading: function () {
      tlm.global._showFullLoadingCount--;
      if (tlm.global._showFullLoadingCount == 0) this.hideLoading();
    },
    showAlertDialog: function (options) {
      var dialog = $("<div></div>");
      dialog
        .kendoDialog({
          width: options.width ? options.width : "450px",
          height: options.height ? options.height : undefined,
          title: options.title !== undefined ? options.title : "TBU",
          closable: options.closable ? options.closable : false,
          modal: options.modal ? options.modal : true,
          content: options.content ? options.content : "Alert!!!",
          actions: [
            {
              text: options.actionTitle ? options.actionTitle : "OK",
              action: options.onOk ? options.onOk : function (e) {},
            },
          ],
          close: function (e) {
            if (typeof options.onClose === "function") {
              options.onClose();
            }
            e.sender.destroy();
          },
        })
        .data("kendoDialog")
        .open();
    },
    showMessageDialog: function (options) {
      var dialog = $("<div></div>");
      dialog
        .kendoDialog({
          width: options.width ? options.width : "450px",
          title: false,
          closable: false,
          modal: true,
          content: options.content ? options.content : "Alert!!!",
          close: function (e) {
            if (typeof options.onClose === "function") {
              options.onClose();
            }
            e.sender.destroy();
          },
        })
        .data("kendoDialog")
        .open();

      return dialog.data("kendoDialog");
    },
    showSuccessDialog: function (options) {
      // พี่ตองบอกให้ซ่อนไปก่อน
      if (typeof options.onClose === "function") {
        options.onClose();
      }
      return;

      var dialog = $("<div style='color: #28a745; text-align: center;'></div>");
      dialog
        .kendoDialog({
          width: options.width ? options.width : "450px",
          title: false,
          closable: true,
          modal: true,
          content: options.content ? options.content : "Save successfully",
          close: function (e) {
            if (typeof options.onClose === "function") {
              options.onClose();
            }
            e.sender.destroy();
          },
        })
        .data("kendoDialog")
        .open();

      var autoClose = options.autoClose == null ? true : options.autoClose;
      var autoTime = options.autoTime == null ? 1600 : options.autoTime;
      if (autoClose) {
        setTimeout(() => {
          var x = $(dialog).data("kendoDialog");
          if (x != null) {
            $(dialog).fadeOut("fast", function () {
              x = $(dialog).data("kendoDialog");
              if (x != null) x.close();
            });
          }
        }, autoTime);
      }

      return dialog.data("kendoDialog");
    },
    getURLParameter: function (param) {
      var sPageURL = window.location.search.substring(1);
      var sURLVariables = sPageURL.split("&");
      for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split("=");
        if (sParameterName[0] == param) {
          return sParameterName[1];
        }
      }
    },
    validation: {
      url: function (text) {
        var expression =
          /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);

        return text.match(regex) != null;
      },
      url_https: function (text) {
        var expression =
          /https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
        var regex = new RegExp(expression);

        return text.match(regex) != null;
      },
    },
    showLoading: function () {
      var isHasLoadingDiv = $("#tlmloading").length;
      if (isHasLoadingDiv <= 1) {
        var html =
          '<div id="tlmloading" style="" class="tlm_loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>';
        var loading = $("html").prepend(html);
      }
      $("#tlmloading").fadeIn();
    },
    hideLoading: function () {
      $("#tlmloading").fadeOut();
    },
    showLoadmoreLoading: function () {
      $("#LOADING").fadeIn();
    },
    hideLoadmoreLoading: function () {
      $("#LOADING").hide();
    },
    isEmpty(val) {
      return val === undefined || val == null || val.length <= 0 ? true : false;
    },
    hideCloseButtonDialog: function () {
      $("#dlgTitleBtns").hide();
    },
    NewGUID: function () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
  };
})(window);
