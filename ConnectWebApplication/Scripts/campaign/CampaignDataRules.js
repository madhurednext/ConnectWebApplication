var CDValidationRules = CDValidationRules || {};

CDValidationRules.addRules = function () {

    ConnectJSValidators.list();
    $.each(CDValidationRules.Rules, function (index, value) {
        if ($(value.elementName).length > 0) {
            CDValidationRules.addRule(value.elementName, value.validators, value.errorMessage, value.params);
        }
        else {
          //  alert("value not there" + value.elementName);
        }
        
    });
}

CDValidationRules.addRule = function (elementSelector, validators, errorMessagesArray, ParamArray) {

    var ruleObject = {};
    var messages = {};
    $.each(validators, function (index, value) {
        ruleObject[value] = ParamArray[index];
        messages[value] = errorMessagesArray[index];
    });

    ruleObject["messages"] = messages;

        $(elementSelector).promise().done(function () {
        $(this).rules('add', ruleObject);

    });



}




CDValidationRules.removeRule = function (elementSelector, validationName) {
    $(elementSelector).promise().done(function () {
        $(this).rules('remove', validationName);
        return true;
    });
}

