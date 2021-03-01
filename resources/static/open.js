
function currentcount(options) {
    document.addEventListener("DOMContentLoaded", function(){
      var exclusiveResponses = document.querySelectorAll('.myresponse');
      for (var i = 0; i < exclusiveResponses.length; i++) {
        exclusiveResponses[i].style.display = "none";
      }
    });

    if (options.strExclusiveResponseIds != "") {

      let strExclusiveResponseIds = options.strExclusiveResponseIds;
      let arrIds = strExclusiveResponseIds.split(',');
      for (var i = 0; i < arrIds.length; i++) {

        if (document.getElementById(arrIds[i]).checked) {
          document.getElementById(options.inputId).value = '';

          if (window.askia
              && window.arrLiveRoutingShortcut
              && window.arrLiveRoutingShortcut.length > 0
              && window.arrLiveRoutingShortcut.indexOf(options.exclusiveQuestion) >= 0) {
              askia.triggerAnswer();
          }

        }

        document.getElementById(arrIds[i]).addEventListener('change', function (e) {
          if (e.srcElement.checked) {
            uncheckResponses2(e.srcElement.id, strExclusiveResponseIds);
            document.getElementById(options.inputId).value = '';

            if (window.askia
                && window.arrLiveRoutingShortcut
                && window.arrLiveRoutingShortcut.length > 0
                && window.arrLiveRoutingShortcut.indexOf(options.exclusiveQuestion) >= 0) {
                askia.triggerAnswer();
            }
          }
        });
      }
      if (window.askia
          && window.arrLiveRoutingShortcut
          && window.arrLiveRoutingShortcut.length > 0
          && window.arrLiveRoutingShortcut.indexOf(options.currentQuestion) >= 0) {
          askia.triggerAnswer();
      }
    }
    options.adcSelector = '#adc_' + options.instanceId;

    // var openInputDK = document.querySelector('#adc_' + this.instanceId + ' .openDK input[type="checkbox"]');

    document.getElementById(options.inputId).addEventListener('keyup', function (e) {

        uncheckResponses(options.strExclusiveResponseIds);

        //var inputcontent= this.value.replace(/\r(?!\n)|\n(?!\r)/g, '\r\n'); //handling of line-break characters
        var inputcontent = this.value;
        options.counterdiv = document.querySelector(options.adcSelector + " .counterdiv .counter b");
        options.congratsdiv = document.querySelector(options.adcSelector + " .congrats-message");


        if (options.direction == 'desc') {
            options.val = (options.maxchar - inputcontent.length > 0 ? options.maxchar - inputcontent.length : 0);
            printcounter(options);
        } else {
            options.val = inputcontent.length;
            printcounter(options);
        }
        if (options.suggestedchar > 0 && options.showcongrats && inputcontent.length >= options.suggestedchar) {
            options.congratsdiv.style = "display:block";
        }
        else {
            options.congratsdiv.style = "display:none";
        }
        if (window.askia
            && window.arrLiveRoutingShortcut
            && window.arrLiveRoutingShortcut.length > 0
            && window.arrLiveRoutingShortcut.indexOf(options.currentQuestion) >= 0) {
            askia.triggerAnswer();
        }
    });

    document.getElementById(options.inputId).addEventListener('focus', function (e) {
      uncheckResponses(options.strExclusiveResponseIds);
    });

    document.getElementById(options.inputId).addEventListener('input', function (e) {
        uncheckResponses(options.strExclusiveResponseIds);

        var inputcontent = this.value;
        options.counterdiv = document.querySelector(options.adcSelector + " .counterdiv .counter b");
        options.congratsdiv = document.querySelector(options.adcSelector + " .congrats-message");

        if (options.maxchar > 0 && options.maxchar - inputcontent.length < 0) {
            this.value = this.value.substring(0, options.maxchar);
        }

        if (options.direction == 'desc') {
            options.val = (options.maxchar - inputcontent.length > 0 ? options.maxchar - inputcontent.length : 0);
            printcounter(options);
        }
        else {
            options.val = inputcontent.length;
            printcounter(options);
        }
        if (options.suggestedchar > 0 && options.showcongrats && inputcontent.length >= options.suggestedchar) {
            options.congratsdiv.style = "display:block";
        }
        else {
            options.congratsdiv.style = "display:none";
        }
        if (window.askia
            && window.arrLiveRoutingShortcut
            && window.arrLiveRoutingShortcut.length > 0
            && window.arrLiveRoutingShortcut.indexOf(options.currentQuestion) >= 0) {
            askia.triggerAnswer();
        }
    });

    document.getElementById(options.inputId).addEventListener('paste', function () {

        uncheckResponses(options.strExclusiveResponseIds);

        var inputcontent = this.value;
        options.counterdiv = document.querySelector(options.adcSelector + " .counterdiv .counter b");
        options.congratsdiv = document.querySelector(options.adcSelector + " .congrats-message");

        if (options.direction == 'desc') {
            options.val = (options.maxchar - inputcontent.length > 0 ? options.maxchar - inputcontent.length : 0);
            printcounter(options);
        }
        else {
            options.val = inputcontent.length;
            printcounter(options);
        }
        if (options.suggestedchar > 0 && options.showcongrats && inputcontent.length >= options.suggestedchar) {
            options.congratsdiv.style = "display:block";
        }
        else {
            options.congratsdiv.style = "display:none";
        }
        if (window.askia
            && window.arrLiveRoutingShortcut
            && window.arrLiveRoutingShortcut.length > 0
            && window.arrLiveRoutingShortcut.indexOf(options.currentQuestion) >= 0) {
            askia.triggerAnswer();
        }

    });

}

function uncheckResponses(exResponseIds){
  if (exResponseIds != "") {
    let arrIds = exResponseIds.split(',');
    for (var i = 0; i < arrIds.length; i++) {
      document.getElementById(arrIds[i]).checked = false;
    }
    return true;
  } else {
    return false;
  }
}

function uncheckResponses2(inputId, exResponseIds){
  let arrIds = exResponseIds.split(',');
  for (var i = 0; i < arrIds.length; i++) {
    if (arrIds[i] != inputId){
      document.getElementById(arrIds[i]).checked = false;
    }
  }
}

function printcounter(options) {
    if (options.direction != "none") {
        options.counterdiv.innerHTML = options.val;
    }
}

//onkeydown event
function imposeMaxLengthOnKeydown(Event, Object, MaxLen) {
    if ((Object.value.length < MaxLen) || (Event.keyCode == 8 || Event.keyCode == 46 || (Event.keyCode >= 35 && Event.keyCode <= 40))) {
        return true;
    } else {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/android/i.test(userAgent)) //android detects
            Object.value = (Object.value).substring(0, MaxLen - 1);

        (Event.preventDefault ? Event.preventDefault() : event.returnValue = false);
    }

}

//onkeypress event
function imposeMaxLength(Event, Object, MaxLen) {
    if ((Object.value.length < MaxLen) || (Event.keyCode == 8 || Event.keyCode == 46 || (Event.keyCode >= 35 && Event.keyCode <= 40))) {
        return true;
    } else {
        (Event.preventDefault ? Event.preventDefault() : event.returnValue = false);
    }

}

//onpaste event
function imposeMaxLengthOnPaste(Event, Object, MaxLen) {
    let paste = (Event.clipboardData || window.clipboardData).getData('text');
    var endP = (Object.value + paste);
    if (endP.length >= MaxLen) {
        paste = endP.substring(0, MaxLen);
        Object.value = paste;
        (Event.preventDefault ? Event.preventDefault() : event.returnValue = false);
    } else {
        return true;
    }
}
