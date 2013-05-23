function isValidName(value) {
    var result = false;
    //check first character should ONLY be alpha
    var regExpAlphs = /^[a-zA-Z]+$/;

    if (!regExpAlphs.test(value.charAt(0))) {
        result = false;
    } else {

        // regular expression to match only alphanumeric characters and spaces
        var regExpressionValue = /^[\w \-\']+$/;

        if (regExpressionValue.test(value)) {
            result = true;
        } else {
            result = false;
        }
    }
    return result;
}

//valid date check
function isValidDate(datestring) {
    if (datestring.match(/^(?:(0[1-9]|1[012])[\- \/.](0[1-9]|[12][0-9]|3[01])[\- \/.](19|20)[0-9]{2})$/)) {
        //Check for leap year
        var month = datestring.substring(0, 2);
        var day = datestring.substring(3, 5);
        var year = datestring.substring(6, 10);
        var date = new Date(year, (month - 1), day);
        var DateYear = date.getFullYear();
        var DateMonth = date.getMonth();
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
function isValidSSN4(ssn4) {
    var ssn4Number = Number(ssn4);
    if ((ssn4Number < 10000) && (ssn4Number > 0)) {
        return true;
    }
    return false;
}
// asyc call to get phone number from the given personID
// retunr a block of HTML content from contact.ashx to dynamically build phone number div
//
function getPhoneNumber(Id) {
    var jqxhr = $.get("contact.ashx", { personId: Id }, function (data) {
        $('.block').html(data);
    })
}

function btnsearch_onclick() {
}

function LeftColumnCollapse() {
    this.leftColumn.className = "hide";
    this.leftColumnB.className = "";
}

function LeftColumnExpand() {
    this.leftColumn.className = "";
    this.leftColumnB.className = "hide";
}


function AddDatePicker(element) {

    if ($) {
        $(element).datepicker({
            dateFormat: 'mm/dd/yy',
            showOn: "button",
            buttonImage: "../../Styles/images/ctrlcalendar.png",
            buttonImageOnly: true,
            onClose: function () {
                //TO DO Validation
                //$("#mainForm").valid();

               // $("#mainForm").validate().element($(this).attr("id"));
               // $('#input-id').trigger('focusout');
            }
        }).mask("99/99/9999");
    }
}
