var ConnectJSValidators = ConnectJSValidators || {};

ConnectJSValidators.validateDropDown = function (value, element) {
    return  (value.indexOf("0") != 0) || this.optional(element) ;
}


ConnectJSValidators.validateKeyMessageCheckBox = function (value, element, options) {

    var maxLimit = options.maxLimit;
    var checkBoxSelector = 'input[id ^= MainContent_checkBoxListKeyMessage]';

    ConnectJSValidators.checkValid(checkBoxSelector);
    
    //Validate if its atleast one selected
    var selectedCheckBoxes = $(checkBoxSelector + ':checked').length;

    //check for this validity = (this.disabled) || (this.checked);
    if (selectedCheckBoxes <= maxLimit && selectedCheckBoxes > 0) {

        return true;
    }


   var messages = $('#mainForm').validate().settings.messages;

    $.each(messages, function (key, value) {
          if (value.hasOwnProperty("KeyMessageValidator")) {
              value.KeyMessageValidator = ConnectJSValidators.getKeyMessageError(maxLimit);
         }
     });
 
    $(checkBoxSelector).click(function () {
        var erMessage = ConnectJSValidators.getKeyMessageError(maxLimit);
      $.each(CDValidationRules.Rules, function (index,value) {
            if (value.validtor == "KeyMessageValidator") {
                value.errorMessage = erMessage;
            }
      });
      $("#mainForm").valid();
  });

    return false;
     


}




ConnectJSValidators.list = function () {
    $.validator.addMethod("DropDownListValidator", ConnectJSValidators.validateDropDown,"Please select one from the drop down.");
    $.validator.addMethod("KeyMessageValidator", ConnectJSValidators.validateKeyMessageCheckBox, "Please select atleast one check box");
    $.validator.addMethod("DateValidator", ConnectJSValidators.validateDate, "Please enter a valid campaign start date.");
    $.validator.addMethod("DateCompareValidator", ConnectJSValidators.validateDateCompare, "please enter value greater than start date.");

    return true;
}

ConnectJSValidators.getKeyMessageError = function (maxLimit) {
    var checkBoxSelector = 'input[id ^= MainContent_checkBoxListKeyMessage]';


    var selectCheckBoxes = $(checkBoxSelector + ':checked').length;


    var message = "";
    if (selectCheckBoxes == 0) {
        message = "Please select atleast one key message";
    }
    else if (selectCheckBoxes > maxLimit) {
        message = "Please select maximum " + maxLimit + " key messages";
    }

    return message;


}

ConnectJSValidators.checkValid = function (checkBoxSelector) {
    if ($(checkBoxSelector).length < 0) {

        return true;
    }
    else {

        var areAnyDisabled = $(checkBoxSelector + "[disabled = 'true']").length;

        if (areAnyDisabled > 0) {

            return true;
        }

    }

    return false;

}

ConnectJSValidators.validateDate = function (value, element) {
    if (value.match(/^(?:(0[1-9]|1[012])[\- \/.](0[1-9]|[12][0-9]|3[01])[\- \/.](19|20)[0-9]{2})$/)) {
        //Check for leap year
        var month = parseInt(value.substring(0, 2));
        var day = parseInt(value.substring(3, 5));
        var year = parseInt(value.substring(6, 10));
        var date = new Date(year, (month - 1), day);
        var DateYear = date.getFullYear();
        var DateMonth = date.getMonth() ;
        var DateDay = date.getDate();
        if (DateYear == year && DateMonth == (month - 1) && DateDay == day) {
            return true;
        }
        else {
            return false;
        }
        //return true;
    }
    else {
        return false;
    }

  
}

ConnectJSValidators.validateDateCompare = function (value, element, options) {
    var startDateSelector = options.startDateSelector;
    var compare = options.compare;
    var startDate;
    if (startDateSelector == "today") {
        startDate = (new Date().getMonth() + 1) + '/' + (new Date().getDate()) + '/' + (new Date().getFullYear());

    }
    else {
        startDate = $(startDateSelector).val();
    }

    
    if (startDate) {

        if (compare == ">=") {
            //var startDate = $('.campaignStartDate').val();
            return  Date.parse(value) >= Date.parse(startDate);
        }
        else if (compare == "<=") {
            return Date.parse(value) <= Date.parse(startDate);
        }
        else if (compare == "<") {
            return Date.parse(value) < Date.parse(startDate);
        }
    }
   
    
    return true;
    

}