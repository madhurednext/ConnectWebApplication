ValidateCampaignForm = function () {
    var isValid = true;


    var form = $("#mainForm");
    if (form != null) {
        form.validate({
            onsubmit: false,
            highlight: function (element, errorClass) {
                CDValidationHelper.highlight(element, errorClass);
            },
            unhighlight: function (element, errorClass) {
                CDValidationHelper.unhighlight(element, errorClass);
            },
            errorPlacement: function (error, element) {
                CDValidationHelper.errorPlacement(error, element);
            },
            success: function (element) {
                CDValidationHelper.success(element);
            }
        });


        CDValidationRules.addRules();
   

    if (form != null) {
        isValid = form.valid();
    }

    return isValid;
 }

}

