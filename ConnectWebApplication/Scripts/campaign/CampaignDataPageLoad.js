function pageLoad() {


   

    $('.datePicker').each(function () {
        
            if (!$(this).is(':disabled')) {
                AddDatePicker('#' + this.id);
            }
    });

    // make parent div disable  and style the disabled
    // if input is disable, make the formGroup div disable so that every thing 
    // around it looks disabled
    $(":input").each(function () {
        if ($(this).attr("disabled")) {
            //alert('its disabled');
            var parentDiv = $(this.parentNode).parents('div.formGroup');
            //alert(parentDiv);
            $(parentDiv).addClass('disabled');
        }
    });
    setInitialValue();
    registerCancelButtonClick();
}

function ValidateSubmit() {

    var isValid = ValidateCampaignForm();

    return isValid;
}

function saveBtnClickJS() {
    if (!ValidateSubmit()) return false;

    return true;
    
}


function setInitialValue() {
    $(':input,textarea,select').each(function () {
        $(this).data('initialValue', $(this).val());
    });
}

function registerCancelButtonClick() {

    $('#btnCancel').click(function () {

        var msg = 'You have unsaved changes.  Are you sure you want to continue?';
         var isDirty = false;
            $(':input').each(function () {
                if ($(this).data('initialValue') != $(this).val()) {
                isDirty = true;
                }
            });

        if (isDirty == true) {
            //document.getElementById('messageDiv').innerHTML = msg;
            $('#messageDiv').html(msg);
            $('#messageDiv').attr("title", "Warning!");
             $("#messageDiv").dialog({
                 buttons:
                     {
                        'Ok': function () {
                        $(this).dialog("close");
                        window.location = '../Campaigns/CampaignList.aspx';
                        },
                        'Cancel': function () {
                        $(this).dialog("close");
                        return false;
                       }
                     }
            });


        } else {
            window.location = '../Campaigns/CampaignList.aspx';
        }

    }); //End of dialog Click
}


function ConfirmPdfOverWrite() {
    document.getElementById('messageDiv').innerHTML = "This will overwrite the existing pdf";
    $('#messageDiv').html("<b>This will overwrite the existing pdf</b>");

    //$("#messageDiv").dialog();
    $("#messageDiv").dialog("option", "buttons", {
        "Ok": function ()
        { $(this).dialog("close"); }
    });
}


function ShowMessage(msg, status) {
    $(function () {
        if (status == 'error') {
            document.getElementById('messageDiv').innerHTML = "<b>" + msg + "</b>";
            $('#messageDiv').attr("title", "Error!");
            $('#messageDiv').html("<b>" + msg + "</b>");
            $("#messageDiv").dialog({
                buttons: {
                    'Ok': function () {
                        $(this).dialog("close");
                    }
                }
            });
        }
        else {
            document.getElementById('infoDiv').innerHTML = msg;
            document.getElementById('messageDiv').innerHTML = "<b>Campaign saved successfully!!</b>";
            $('#messageDiv').attr("title", "Success!");
            $('#messageDiv').html("<b>Campaign saved successfully!!</b>");
            $("#messageDiv").dialog({
                buttons: {
                    'Ok': function () { $(this).dialog("close"); window.location = '../Campaigns/CampaignList.aspx'; }
                }
            });
        }
    });
};