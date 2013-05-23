var ToggleStyleType = { addCss: 1, removeCss: 2 }

/// common file for jquery styling and validation for forms elements on the page
$(document).ready(function () {
    // focus on the first text input field in the first field on the page
    $(function () {
        $("form:not(.filter) :input:visible:enabled:first").focus();
    });

    //we want to highlight the row only if the item focused on is a textbox, 
    //password or select list. Buttons should be ignored...
    $(":input").not(":button").focus(function () {

        //highlight the containing table row...
        var parentDiv = $(this.parentNode).parents('div.formGroup');
        //alert(parentDiv);
        $(parentDiv).addClass('active');
        //$(this).parents("tr").css({ 'background': '#14BDF4' });
    }).blur(function () {
        var parentDiv = $(this).parents('div.formGroup');
        //alert(parentDiv);
        //remove the background attribute from the inline style...
        $(parentDiv).removeClass('active');
    });

    // we want to highlight the disabled control row with grey background
    $(":input").each(function () {
        if ($(this).attr("disabled")) {
            //alert('its disabled');
            var parentDiv = $(this.parentNode).parents('div.formGroup');
            //alert(parentDiv);
            $(parentDiv).addClass('disabled');
        }
    });

    //This is for the search form
    //we want to highlight the row only if the item focused on is a textbox, 
    //password or select list. Buttons should be ignored...
    $(":input").not(":button").focus(function () {

        //highlight the containing table row...
        var parentDiv = $(this.parentNode).parents('div.searchFormGroup');
        //alert(parentDiv);
        $(parentDiv).addClass('active');
        //$(this).parents("tr").css({ 'background': '#14BDF4' });
    }).blur(function () {
        var parentDiv = $(this).parents('div.searchFormGroup');
        //alert(parentDiv);
        //remove the background attribute from the inline style...
        $(parentDiv).removeClass('active');
    });

    // we want to highlight the disabled control row with grey background
    $(":input").each(function () {
        if ($(this).attr("disabled")) {
            //alert('its disabled');
            var parentDiv = $(this.parentNode).parents('div.searchFormGroup');
            //alert(parentDiv);
            $(parentDiv).addClass('disabled');
        }
    });


    $('input:text,input:checkbox,input:radio,textarea,select').one('change', function () {
        $('BODY').attr('onbeforeunload', "return 'Leaving this page will cause any unsaved data to be lost.';");
    });
    //Expand Collapse functionality
    $(".expandView").hide();

    $('.expandCollapse').click(function () {
        $('#loading').show();
        //alert($(this).parent().html());
        ToggleExpandViewImage(this);
        $('#loading').hide();
        $(this).parent().next().slideToggle('slow');
        //icon.attr("src", icon.attr("src") == up ? down : up);
    });

    $('.expandCollapseCampaign').click(function () {
        $('#loading').show();
        //alert($(this).parent().html());
        ToggleExpandViewImageCampaign(this);
        $('#loading').hide();
        $(this).parent().next().slideToggle('slow');
        //icon.attr("src", icon.attr("src") == up ? down : up);
    });

    $('.searchExpandCollapse').click(function () {
        //$('#loading').show();
        ToggleSearchExpandViewImage(this);
        //$('#loading').hide();
        //$(this).parent().next().slideToggle('slow');
        //icon.attr("src", icon.attr("src") == up ? down : up);
    });

    //quick link fancybox for Campaign View.
    $(document).ready(function () {
        $('.quickLink').click(function () {
            var parentAnchor = $(this).parent();
            var anchor = parentAnchor.find('a');
            //alert(anchor.attr('id'));
            if (anchor.attr('href').toUpperCase().indexOf('CAMPAIGNVIEWLIST.ASPX') > 0) {
                //Logic here.
                //alert('in' + anchor.attr('href'));
                //alert(anchor.parent().html());
                $(anchor).fancybox({
                    'padding': 0,
                    'width': 867,
                    'height': 465,


                    'modal': true,
                    'titleShow': false,
                    'type': 'iframe',
                    'scrolling': 'no'



                });
            }
        });

    });


    $("#loading").bind("ajaxStart", function () {
        $(this).show();
    }).bind("ajaxStop", function () {
        $(this).hide();
    });

    //learnings: use class name instead of control ID to work lightbox in list view contorls
    function PdfLinkFancyBox() {
        $(".pdflink").fancybox();
        /*jquery plugin from
        http://jquery.malsup.com/corner/ */
        $('#dvSearchhdr').corner("cc:#081829");
        $('#dvSearchcontent').corner("cc:#081829");
    }

    ///PLACE HOLDER FOR POP MESSAGE AS CUSTOM DIALOG BOX
    // if user clicked on button, the overlay layer or the dialogbox, close the dialog
    $('a.btn-ok, #dialog-overlay, #dialog-box').click(function () {
        $('#dialog-overlay, #dialog-box').hide();
        return false;
    });
    // if user resize the window, call the same function again
    // to make sure the overlay fills the screen and dialogbox aligned to center  
    $(window).resize(function () {
        //only do it if the dialog box is not hidden  
        if (!$('#dialog-box').is(':hidden')) popup();
    });
});

function rebindCommonJQueryEvents() {
    /// common file for jquery styling and validation for forms elements on the page
    $(document).ready(function () {
        //        // focus on the first text input field in the first field on the page
        //        $(function () {
        //            $("form:not(.filter) :input:visible:enabled:first").focus();
        //        });

        //we want to highlight the row only if the item focused on is a textbox, 
        //password or select list. Buttons should be ignored...
        $(":input").not(":button").focus(function () {

            //highlight the containing table row...
            var parentDiv = $(this.parentNode).parents('div.formGroup');
            //alert(parentDiv);
            $(parentDiv).addClass('active');
            //$(this).parents("tr").css({ 'background': '#14BDF4' });
        }).blur(function () {
            var parentDiv = $(this).parents('div.formGroup');
            //alert(parentDiv);
            //remove the background attribute from the inline style...
            $(parentDiv).removeClass('active');
        });

        // we want to highlight the disabled control row with grey background
        $(":input").each(function () {
            if ($(this).attr("disabled")) {
                //alert('its disabled');
                var parentDiv = $(this.parentNode).parents('div.formGroup');
                //alert(parentDiv);
                $(parentDiv).addClass('disabled');
            }
        });

        //Expand Collapse functionality
        $(".expandView").hide();
        //ToggleExpandViewImage();
        //if postback happens then reset the mode to collapse
        $('.expandCollapse').click(function () {
            ToggleExpandViewImage(this);
            $(this).parent().next().slideToggle('slow');
            //icon.attr("src", icon.attr("src") == up ? down : up);
        });

        $('.expandCollapseCampaign').click(function () {
            ToggleExpandViewImageCampaign(this);
            $(this).parent().next().slideToggle('slow');
            //icon.attr("src", icon.attr("src") == up ? down : up);
        });

        //learnings: use class name instead of control ID to work lightbox in list view contorls

        //$(".pdflink").fancybox();
        /*jquery plugin from
        http://jquery.malsup.com/corner/ */
        $('#dvSearchhdr').corner("cc:#081829");
        $('#dvSearchcontent').corner("cc:#081829");

        ///PLACE HOLDER FOR POP MESSAGE AS CUSTOM DIALOG BOX
        // if user clicked on button, the overlay layer or the dialogbox, close the dialog
        $('a.btn-ok, #dialog-overlay, #dialog-box').click(function () {
            $('#dialog-overlay, #dialog-box').hide();
            return false;
        });
        // if user resize the window, call the same function again
        // to make sure the overlay fills the screen and dialogbox aligned to center  
        $(window).resize(function () {
            //only do it if the dialog box is not hidden  
            if (!$('#dialog-box').is(':hidden')) popup();
        });
    });
}

ToggleSearchExpandViewImage = function (element) {
    var up = "/Connect/Styles/images/ctrlSearchExpand.png";
    var down = "/Connect/Styles/images/ctrlSearchCollapse.png";
    var expandalt = "Expand";
    var collapsealt = "Collapse";
    //var parentDiv = $(element).parent("div").parent("div").parent("div");
    //alert($(parentDiv).html());
    var icon = $('.searchicon', element);

    if (icon.attr("alt") == expandalt) {
        icon.attr("src", down);
        icon.attr("alt", collapsealt);
        var searchFormDiv = $(element).next("div");
        var leftColumnDiv = $("#leftColumnNew");
        leftColumnDiv.removeClass('collapsed');
        leftColumnDiv.addClass('expanded');


        searchFormDiv.removeClass('hide');
        var primaryColumnDiv = $("#primaryColumnB");
        primaryColumnDiv.attr('id', 'primaryColumn');

    } else {
        icon.attr("src", up);

        icon.attr("alt", expandalt);
        var leftColumnDiv = $("#leftColumnNew");
        leftColumnDiv.removeClass('expanded');
        leftColumnDiv.addClass('collapsed');

        //alert($(element).next("div").next("div").html());
        var searchFormDiv = $(element).next("div");
        searchFormDiv.addClass('hide');
        var primaryColumnDiv = $("#primaryColumn");
        primaryColumnDiv.attr('id', 'primaryColumnB');
        //alert($("#primaryColumn").html());
        //alert($(element).next("div").next("div").attr('id', 'primaryColumn').html());
    }
}

ToggleExpandViewImage = function (element) {
    var parentrow = $(element).parent();
    //alert(parentrow.html());
    var up = "../../Styles/images/ctrlExpand.png";
    var down = "../../Styles/images/ctrlCollapse.png";
    var expandalt = "Expand";
    var collapsealt = "Collapse";
    var icon = $('.icon', parentrow);
    var icontableCell = $('.icon', parentrow).parent();
    //$(this).next(".message_body").slideToggle(500);
    if (icon.attr("src") == up) {
        icon.attr("src", down);
        icon.attr("alt", collapsealt);
        ToggleExpandedStyle(icontableCell, ToggleStyleType.addCss);
        GetContactActivityDetails(icontableCell);
        //Omniture Data collection
        var pageTitle = GetPageTitle();
        var variableName = pageTitle + ">Expand Collapse Click";
        CallOmnitureWS(pageTitle, variableName);
        //ToggleExpandedStyle(element, ToggleStyleType.addCss);
        //GetContactActivityDetails(element);
    } else {
        icon.attr("src", up);
        icon.attr("alt", expandalt);
        ToggleExpandedStyle(icontableCell, ToggleStyleType.removeCss);
        //ToggleExpandedStyle(element, ToggleStyleType.removeCss);
        //        var parentTableRow = $(element).parent();
        //        $(parentTableRow).each(function (index, element) {
        //            var e = $(element).find("td");
        //            e.removeClass('expanded');
        //        });
    }
}

ToggleExpandViewImageCampaign = function (element) {
    var parentrow = $(element).parent();
    var up = "/Connect/Styles/images/ctrlExpand.png";
    var down = "/Connect/Styles/images/ctrlCollapse.png";
    var expandalt = "Expand";
    var collapsealt = "Collapse";
    var icon = $('.icon', parentrow);
    var icontableCell = $('.icon', parentrow).parent();
    if (icon.attr("src") == up) {
        icon.attr("src", down);
        icon.attr("alt", collapsealt);
        ToggleExpandedStyle(icontableCell, ToggleStyleType.addCss);
        GetCampaignDetails(icontableCell);
    } else {
        icon.attr("src", up);
        icon.attr("alt", expandalt);
        ToggleExpandedStyle(icontableCell, ToggleStyleType.removeCss);
    }
}



ToggleExpandedStyle = function (element, toggleType) {
    var parentTableRow = $(element).parent();

    if (toggleType == ToggleStyleType.addCss) {
        $(parentTableRow).each(function (index, element) {
            var e = $(element).find("td");
            e.addClass('expanded');
        });
    } else if (toggleType == ToggleStyleType.removeCss) {
        $(parentTableRow).each(function (index, element) {
            var e = $(element).find("td");
            e.removeClass('expanded');
        });
    }

}

ValidateForm = function () {


    var isValid = true;
    var form = $("#mainForm");
    if (form != null) {
        form.validate({
            onsubmit: false,
            highlight: function (element, errorClass) {
                var parentDiv = $(element).parents('div.formGroup');
                parentDiv.addClass('error');
            },
            unhighlight: function (element, errorClass) {
                var parentDiv = $(element).parents('div.formGroup');
                parentDiv.removeClass('error');
            },
            errorPlacement: function (error, element) {
                var parentDiv = $(element).parents('div.formGroup');
                var errorParagraph = $('<p class=errorMessage />');
                error.appendTo(errorParagraph);
                errorParagraph.insertAfter(element);
            },
            success: function (element) {
                var parentDiv = $(element).parents('div.formGroup');
                parentDiv.find('p').remove();
            },

            highlight: function (element, errorClass) {
                var parentDiv = $(element).parents('div.searchFormGroup');
                parentDiv.addClass('error');
            },
            unhighlight: function (element, errorClass) {
                var parentDiv = $(element).parents('div.searchFormGroup');
                parentDiv.removeClass('error');
            },


            errorPlacement: function (error, element) {
                var parentDiv = $(element).parents('div.searchFormGroup');
                var errorParagraph = $('<p class=errorMessage />');
                error.appendTo(errorParagraph);
                errorParagraph.insertAfter(element);
            },
            success: function (element) {
                var parentDiv = $(element).parents('div.searchFormGroup');
                parentDiv.find('p').remove();
            }
        });

        $.validator.addMethod("FNameLNameSpecialCharacters", function (value, element) {
            return this.optional(element) || /^[a-zA-Z]+$/i.test(value) || /^[\w \-\']+$/i.test(value);
        }, "Username must contain only letters, numbers, or dashes.");


        //        $.validator.addMethod("SSNValidation", function (value, element) {
        //            return (($("#txtSSN").val() !== '') || ($("#txtDOB").val() !== ''));
        //        }, "Please enter client information in the Last 4 SSN or Date of birth fields.");


        $.validator.addMethod("DOBValidation", function (value, element) {
            return (($("#txtSSN").val() !== '') || ($("#txtDOB").val() !== ''));
        }, "Please enter client information in the Last 4 SSN or Date of birth fields.");

        $.validator.addMethod("removeSSNValidation", function (value, element) {

            if (!ssnRemoved) {
                if ($("#txtDOB").val() !== '') {

                    if ($("#txtDOB").val() !== '__/__/____') {

                        jQuery('#txtSSN').each(function () {
                            var parentDiv = $('#txtSSN').parents('div.searchFormGroup');
                            parentDiv.removeClass('error');
                            $(parentDiv + '.errorMessage').remove();
                            ssnRemoved = true;
                        });
                    }
                }
            }
            return true;

        }, "Remove SSN Validation");



        jQuery('.firstname').rules('add', {
            required: true,
            FNameLNameSpecialCharacters: true,
            messages: {
                required: 'Please enter a first name.',
                FNameLNameSpecialCharacters: 'Please enter a valid first name.'
            }
        });
        jQuery('.lastname').rules('add', {
            required: true,
            FNameLNameSpecialCharacters: true,
            messages: {
                required: 'Please enter a last name.',
                FNameLNameSpecialCharacters: 'Please enter a valid last name.'
            }
        });

        jQuery('#txtSSN').each(function () {
            $(this).rules('add', {
                DOBValidation: true,
                removeSSNValidation: true,
                messages: {
                    DOBValidation: 'Please enter client information in the Last 4 SSN or Date of birth fields.',
                    removeSSNValidation: 'Remove SSN Validation.'
                }
            });
        });

        jQuery('#txtDOB').each(function () {
            $(this).rules('add', {
                DOBValidation: true,
                date: true,
                removeSSNValidation: true,
                messages: {
                    DOBValidation: 'Please enter client information in the Last 4 SSN or Date of birth fields.',
                    date: 'Invalid date entered, please refine your entry.',
                    removeSSNValidation: 'Remove SSN Validation.'
                }
            });
        });



    }
    if (form != null) {
        isValid = form.valid();
    }
    return isValid;
}

ValidateCampaignForm = function () {
    var isValid = true;

    //    var oldCheckBoxInnerHtml = $("#formCheckBoxValidation").html();
    //    var changeCheckBoxHtml = '<div id="formCheckBoxValidation">' + oldCheckBoxInnerHtml + '</div>';
    //    $("#formCheckBoxValidation").replaceWith(changeCheckBoxHtml);


    var form = $("#mainForm");
    if (form != null) {
        form.validate({
            onsubmit: false,
            highlight: function (element, errorClass) {
                var parentDiv = $(element).parents('div.formGroup');
                parentDiv.addClass('error');
            },
            unhighlight: function (element, errorClass) {
                var parentDiv = $(element).parents('div.formGroup');
                parentDiv.removeClass('error');
            },
            errorPlacement: function (error, element) {
                var parentDiv = $(element).parents('div.formGroup');
                //var spanElement = parentDiv.find('span');
                //error.appendTo(spanElement);
                if (parentDiv.hasClass('disabled')) {
                    parentDiv.removeClass('disabled');
                }
                //alert(error);
                var errorParagraph = $('<p class=errorMessage />');
                error.appendTo(errorParagraph);
                //added this logic because of if multiple elements are on same row
                //then if one element is valid then it removed the validation from 
                //second element too.
                errorParagraph.addClass(element.attr('id'));
                var next = element.next().attr('class');
                if (next == 'ui-datepicker-trigger')
                    errorParagraph.appendTo(element.parent());
                    //errorParagraph.insertAfter(element.parent());

                else
                    errorParagraph.insertAfter(element);
            },
            success: function (element) {
                var parentDiv = $(element).parents('div.formGroup');
                var elementParentDiv = $(element).parents('p');
                //alert(elementParentDiv.attr('class'));
                var classList = elementParentDiv.attr('class').split(/\s+/);
                var removeItem = false;
                $.each(classList, function (index, item) {
                    //alert(item);
                    //alert(elementParentDiv.attr('class'));
                    if (elementParentDiv.hasClass(item)) {
                        removeItem = true;
                    }
                });

                //only remove the element which has error associated with the ID
                if (removeItem) {
                    elementParentDiv.remove();
                }
            }
        });

        $.validator.addMethod("firstNameRegex", function (value, element) {
            return this.optional(element) || /^[a-zA-Z]+$/i.test(value) || /^[\w \-\']+$/i.test(value);
        }, "Username must contain only letters, numbers, or dashes.");

        jQuery.validator.addMethod("KeyMessageSelectOne", function (value, element) {
            var checkBoxes = $('table#MainContent_checkBoxListKeyMessage input[type=checkbox]');

            if (checkBoxes == null) return true;
            for (var i = 0; i < checkBoxes.length; i++) {
                if (checkBoxes[i].disabled) {
                    return true;
                }
                if (checkBoxes[i].checked) {
                    return true;
                }
            }
            return false;
        }, "Please select atleast one key message");

        jQuery.validator.addMethod("KeyMessageValidatorMax3", function (value, element) {
            var checkBoxes = $('table#MainContent_checkBoxListKeyMessage input[type=checkbox]:checked');
            if (checkBoxes == null) return true;
            if (checkBoxes.length > 3) {
                return false;
            }
            return true;

        }, "Please select maximum 3 key messages");

        //        jQuery('.Description').rules('add', {
        //            KeyMessageValidator: true,
        //            messages: {
        //                KeyMessageValidator: 'Please select a key message'
        //            }
        //        });

        $.validator.addMethod('ContactSource',
          function (value, element) {
              return this.optional(element) || (value.indexOf("0") != 0);
          }, "Please select a contact source.");

        jQuery('.ContactSource').rules('add', {
            required: true,
            messages: {
                required: 'Please select a contact source.'
            }
        });


        $.validator.addMethod('ContactType',
          function (value, element) {
              return this.optional(element) || (value.indexOf("0") != 0);
          }, "Please select a contact type.");


        jQuery('.ContactType').rules('add', {
            required: true,
            messages: {
                required: 'Please select a contact type.'
            }
        });

        $.validator.addMethod('Program',
          function (value, element) {
              return this.optional(element) || (value.indexOf("0") != 0);
          }, "Please select a program.");


        jQuery('.Program').rules('add', {
            required: true,
            messages: {
                required: 'Please select a program.'
            }
        });

        $.validator.addMethod('UserGroup',
          function (value, element) {
              return this.optional(element) || (value.indexOf("0") != 0);
          }, "Please select a UserGroup.");


        jQuery('.UserGroup').each(function (index) {
            $(this).rules('add', {
                required: true,
                messages: {
                    required: 'Please select a UserGroup.'
                }
            });
        });

        //        jQuery('.UserGroup').rules('add', {
        //            required: true,
        //            messages: {
        //                required: 'Please select a UserGroup.'
        //            }
        //        });

        jQuery.validator.addMethod("campaignEndDateGreaterThan", function (value, element) {
            var startDate = $('.campaignStartDate').val();
            return Date.parse(startDate) <= Date.parse(value);
        }, "Please enter a campaign end date that is greater than the start date.");

        jQuery.validator.addMethod("campaignInHomeEndDateGreaterThan", function (value, element) {
            var startDate = $('.campaignInHomeStartDate').val();
            return Date.parse(startDate) <= Date.parse(value);
        }, "Please enter a campaign in-home end date that is greater than the start date.");

        jQuery.validator.addMethod("dateSentGreaterThan", function (value, element) {
            var startDate = $('.campaignInHomeStartDate').val();
            return Date.parse(startDate) > Date.parse(value);
        }, "Please enter a date sent that is before the campaign in-home start date.");

        jQuery.validator.addMethod("dateSentGreaterThan", function (value, element) {
            var startDate = $('.campaignInHomeStartDate').val();
            return Date.parse(startDate) > Date.parse(value);
        }, "Please enter a date sent that is before the campaign in-home start date.");

        jQuery.validator.addMethod("AppointmentEndDateGreaterThan", function (value, element) {
            var startDate = $('.AppointmentStartDate').val();
            return Date.parse(startDate) <= Date.parse(value);
        }, "Please enter a appointment end date that is greater than the start date.");

        jQuery.validator.addMethod("ServiceEndDateGreaterThan", function (value, element) {
            var startDate = $('.OffListStDate').val();
            return Date.parse(startDate) <= Date.parse(value);
        }, "Please enter a service end date that is greater than the start date.");

        jQuery.validator.addMethod("OnListServiceEndDateGreaterThan", function (value, element) {
            var startDate = $('.OnListStDate').val();
            return Date.parse(startDate) <= Date.parse(value);
        }, "Please enter a service end date that is greater than the start date.");

        jQuery.validator.addMethod("OnListSurveyEndDateGreaterThan", function (value, element) {
            var startDate = $('.OnListSurveyStDate').val();
            return Date.parse(startDate) <= Date.parse(value);
        }, "Please enter a service end date that is greater than the start date.");

        jQuery.validator.addMethod("approxQuantityRegex", function (value, element) {
            return this.optional(element) || /^[0-9]+$/.test(value.replace(/,/g, ''));
        }, "");

        jQuery.validator.addMethod("campaignPDFDateLessThanToday", function (value, element) {
            var currentDate = new Date();
            var curr_date = currentDate.getDate();
            var curr_month = currentDate.getMonth();
            curr_month = curr_month + 1;
            var curr_year = currentDate.getFullYear();

            var sdate = curr_month + '/' + curr_date + '/' + curr_year;
            var startDate = Date.parse(value);

            return startDate >= Date.parse(sdate);
        }, "Please enter a campaign example start date that is equal to or greater than today.");

        jQuery.validator.addMethod("campaignPDFStartDateGreaterThanEffectiveEndDate", function (value, element) {
            var startDate = $('.campaignEndDate').val();
            return Date.parse(startDate) >= Date.parse(value);
        }, "Please enter a campaign example start date that is less than the campaign end date.");

        //                jQuery.validator.addMethod("greaterThan", function (value, element, params) {
        //                    if (!/Invalid|NaN/.test(new Date(value))) {
        //                        return new Date(value) > new Date($(params).val());
        //                    }
        //                    return isNaN(value) && isNaN($(params).val()) || (parseFloat(value) > parseFloat($(params).val()));
        //                }, 'Must be greater than {0}.');

        //        $.validator.addMethod("endDateGreaterThan", function (value, element) {
        //            var startDate = $("#<%=txtEffectiveStDt.ClientID %>").val();
        //            return Date.parse(startDate) <= Date.parse(value);
        //        }, "* End date must be after start date");


        $.validator.addMethod("validDate", function (value, element) {
            if (value.match(/^(?:(0[1-9]|1[012])[\- \/.](0[1-9]|[12][0-9]|3[01])[\- \/.](19|20)[0-9]{2})$/)) {
                //Check for leap year
                var month = value.substring(0, 2);
                var day = value.substring(3, 5);
                var year = value.substring(6, 10);
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
        }, "Please enter a valid date.");



        jQuery('.campaignID').rules('add', {
            required: true,
            messages: {
                required: 'Please enter a campaign ID that is unique for this season.'
            }
        });
        jQuery('.Title').rules('add', {
            required: true,
            messages: {
                required: 'Please enter a title.'
            }
        });
        jQuery('.Description').rules('add', {
            required: true,
            messages: {
                required: 'Please enter a description.'
            }
        });


        //Validation is done for checkbox list by checking the ID value and adding the rules against it.
        jQuery('input[id^=MainContent_checkBoxListKeyMessage]').rules('add', {
            KeyMessageSelectOne: true,
            KeyMessageValidatorMax3: true,
            messages: {
                KeyMessageSelectOne: 'Please select a key message.',
                KeyMessageValidatorMax3: 'Please select less than 4 key messages.'
            }
        });



        ////        jquery('input[id^=maincontent_chkservicestatus]').each(function (index) {
        ////            $(this).rules('add', {
        ////                servicestatusselectone: true,
        ////                messages: {
        ////                    servicestatusselectone: 'please select a status.'
        ////                }
        ////            });
        ////        });


        //////        jQuery('input[id^=MainContent_chkServiceStatus]').rules('add', {
        //////            ServiceStatusSelectOne: true,
        //////            messages: {
        //////                ServiceStatusSelectOne: 'Please select a status.'
        //////            }
        //////        });

        ////        jQuery.validator.addMethod("ServiceStatusSelectOne", function (value, element) {
        ////            var checkBoxes = $('table#MainContent_chkServiceStatus input[type=checkbox]');

        ////            if (checkBoxes == null) return true;
        ////            for (var i = 0; i < checkBoxes.length; i++) {
        ////                if (checkBoxes[i].disabled) {
        ////                    return true;
        ////                }
        ////                if (checkBoxes[i].checked) {
        ////                    return true;
        ////                }
        ////            }
        ////            return false;
        ////        }, "Please select atleast one status");

        jQuery('input[id^=MainContent_chkServiceType]').each(function (index) {

            $(this).rules('add', {
                ServiceTypeSelectOne: true,
                messages: {
                    ServiceTypeSelectOne: 'Please select a service.'
                }
            });
        });

        //        jQuery('input[id^=MainContent_chkOnServiceType]').each(function (index) {
        //            $(this).rules('add', {
        //                OnListServiceTypeSelectOne: true,
        //                messages: {
        //                    OnListServiceTypeSelectOne: 'Please select a service.'
        //                }
        //            });
        //        });

        //jQuery('input[id^=MainContent_chkOnServiceType]').each(function (index) {
        //    if (index == 0) {
        //        $(this).rules('add', {
        //            OnListServiceTypeSelectOne: true,
        //            messages: {
        //                OnListServiceTypeSelectOne: 'Please select a service.'
        //            }
        //        });
        //    }
        //    else {
        //        $(this).rules('add', {
        //            OnListServiceTypeSelectOne: true,
        //            messages: {
        //                OnListServiceTypeSelectOne: ''
        //            }
        //        });
        //    }
        //});

        //////        jQuery('input[id^=MainContent_chkServiceType]').rules('add', {
        //////            ServiceTypeSelectOne: true,
        //////            messages: {
        //////                ServiceTypeSelectOne: 'Please select a service.'
        //////            }
        //////        });

        jQuery.validator.addMethod("ServiceTypeSelectOne", function (value, element) {
            var checkBoxes = $('table#MainContent_chkServiceType input[type=checkbox]');

            if (checkBoxes == null) return true;
            for (var i = 0; i < checkBoxes.length; i++) {
                if (checkBoxes[i].disabled) {
                    return true;
                }
                if (checkBoxes[i].checked) {
                    return true;
                }
            }
            return false;
        }, "Please select atleast one service");

        jQuery.validator.addMethod("OnListServiceTypeSelectOne", function (value, element) {
            var checkBoxes = $('table#MainContent_chkOnServiceType input[type=checkbox]');

            if (checkBoxes == null) return true;
            for (var i = 0; i < checkBoxes.length; i++) {
                if (checkBoxes[i].disabled) {
                    return true;
                }
                if (checkBoxes[i].checked) {
                    return true;
                }
            }
            return false;
        }, "Please select atleast one service");

        jQuery('input[id^=MainContent_chkChannelType]').each(function (index) {
            $(this).rules('add', {
                ChannelTypeSelectOne: true,
                messages: {
                    ChannelTypeSelectOne: 'Please select a channel.'
                }
            });
        });

        //////        jQuery('input[id^=MainContent_chkChannelType]').rules('add', {
        //////            ChannelTypeSelectOne: true,
        //////            messages: {
        //////                ChannelTypeSelectOne: 'Please select a channel.'
        //////            }
        //////        });



        jQuery.validator.addMethod("ChannelTypeSelectOne", function (value, element) {
            var checkBoxes = $('table#MainContent_chkChannelType input[type=checkbox]');

            if (checkBoxes == null) return true;
            for (var i = 0; i < checkBoxes.length; i++) {
                if (checkBoxes[i].disabled) {
                    return true;
                }
                if (checkBoxes[i].checked) {
                    return true;
                }
            }
            return false;
        }, "Please select atleast one channel");
        ////        //        jQuery('#MainContent_txtHidden1').rules('add', {
        ////        //            KeyMessageValidator: true,
        ////        //            KeyMessageValidatorMax3: true,
        ////        //            messages: {
        ////        //                KeyMessageValidator: 'Please select a key message',
        ////        //                KeyMessageValidatorMax3: 'Please select less than 4 key messages'
        ////        //            }
        ////        //        }
        ////        //        );
        jQuery('.campaignStartDate').rules('add', {
            required: true,
            validDate: true,
            messages: {
                required: 'Please enter a valid campaign start date.'
            }
        });
        jQuery('.campaignEndDate').rules('add', {
            required: true,
            validDate: true,
            campaignEndDateGreaterThan: true,
            messages: {
                required: 'Please enter a valid campaign end date.'
            }
        });
        jQuery('.sentDate').rules('add', {
            required: true,
            validDate: true,
            dateSentGreaterThan: true,
            messages: {
                required: 'Please enter a valid date sent.'
            }
        });
        jQuery('.campaignInHomeStartDate').rules('add', {
            required: true,
            validDate: true,
            messages: {
                required: 'Please enter a valid in-home start date.'
            }
        });
        jQuery('.campaignInHomeEndDate').rules('add', {
            required: true,
            validDate: true,
            campaignInHomeEndDateGreaterThan: true,
            messages: {
                required: 'Please enter a valid in-home end date.'
            }
        });

        //        jQuery('.PdfFileUpload').rules('add', {           
        //            required: true,
        //            accept: "pdf",
        //            messages: {
        //                required: 'Please attach a sample file in PDF format.',
        //                accept: 'Invalid file format.  Please select an Adobe PDF-formatted file.'
        //          }
        //        });

        jQuery('.PdfFileUpload').each(function (index) {
            $(this).rules('add', {
                required: true,
                accept: "pdf",
                messages: {
                    required: 'Please attach a sample file in PDF format.',
                    accept: 'Invalid file format.  Please select an Adobe PDF-formatted file.'
                }
            });
        });

        jQuery('.PdfFileUploadNotRequired').each(function (index) {
            $(this).rules('add', {
                accept: "pdf",
                messages: {
                    accept: 'Invalid file format.  Please select an Adobe PDF-formatted file.'
                }
            });
        });

        //        jQuery('.PdfFileUploadNotRequired').rules('add', {          
        //            accept: "pdf",
        //            messages: {                
        //                accept: 'Invalid file format.  Please select an Adobe PDF-formatted file.'
        //            }
        //        });

        jQuery('.sentDate').rules('add', {
            required: true,
            validDate: true,
            messages: {
                required: 'Please enter a valid date sent.'
            }
        });
        jQuery('.campaignPdfStartDate').rules('add', {
            required: true,
            validDate: true,
            campaignPDFDateLessThanToday: true,
            campaignPDFStartDateGreaterThanEffectiveEndDate: true,
            messages: {
                required: 'Please enter a valid campaign example start date.'
            }
        });

        jQuery('.AppointmentStartDate').each(function (index) {
            $(this).rules('add', {
                required: true,
                validDate: true,
                messages: {
                    required: 'Please enter a valid appointment Start Date.'
                }
            });
        });

        //////        jQuery('.AppointmentStartDate').rules('add', {
        //////            required: true,
        //////            validDate: true,
        //////            messages: {
        //////                required: 'Please enter a valid appointment Start Date.'
        //////            }
        ////        //        });

        jQuery('.AppointmentEndDate').each(function (index) {
            $(this).rules('add', {
                required: true,
                validDate: true,
                AppointmentEndDateGreaterThan: true,
                messages: {
                    required: 'Please enter a valid appointment end date.'
                }
            });
        });

        //////        jQuery('.AppointmentEndDate').rules('add', {
        //////            required: true,
        //////            validDate: true,
        //////            AppointmentEndDateGreaterThan: true,
        //////            messages: {
        //////                required: 'Please enter a valid appointment end date.'
        //////            }
        //////        });

        jQuery('.OffListStDate').each(function (index) {
            $(this).rules('add', {
                required: true,
                validDate: true,
                messages: {
                    required: 'Please enter a valid service Start Date.'
                }
            });
        });

        jQuery('.OnListStDate').each(function (index) {
            $(this).rules('add', {
                required: true,
                validDate: true,
                messages: {
                    required: 'Please enter a valid service Start Date.'
                }
            });
        });

        jQuery('.OnListSurveyStDate').each(function (index) {
            $(this).rules('add', {
                required: true,
                validDate: true,
                messages: {
                    required: 'Please enter a valid Survey Start Date.'
                }
            });
        });

        //////        jQuery('.OffListStDate').rules('add', {
        //////            required: true,
        //////            validDate: true,
        //////            messages: {
        //////                required: 'Please enter a valid service Start Date.'
        //////            }
        //////        });

        jQuery('.OffListEndDate').each(function (index) {
            $(this).rules('add', {
                required: true,
                validDate: true,
                ServiceEndDateGreaterThan: true,
                messages: {
                    required: 'Please enter a valid service end date.'
                }
            });
        });

        jQuery('.OnListEndDate').each(function (index) {
            $(this).rules('add', {
                required: true,
                validDate: true,
                OnListServiceEndDateGreaterThan: true,
                messages: {
                    required: 'Please enter a valid service end date.'
                }
            });
        });

        jQuery('.OnListSurveyEndDate').each(function (index) {
            $(this).rules('add', {
                required: true,
                validDate: true,
                OnListSurveyEndDateGreaterThan: true,
                messages: {
                    required: 'Please enter a valid Survey end date.'
                }
            });
        });

        //////        jQuery('.OffListEndDate').rules('add', {
        //////            required: true,
        //////            validDate: true,
        //////            ServiceEndDateGreaterThan: true,
        //////            messages: {
        //////                required: 'Please enter a valid service end date.'
        //////            }
        //////        });




    }







    if (form != null) {
        isValid = form.valid();
    }


    $('td > [id^="MainContent_chkOnServiceType"]').each(function () {
        this.name = 'OnListServiceChkbox';
    });

    var validationRules = new Object();
    validationRules['OnListServiceChkbox'] = { OnListServiceTypeSelectOne: true };

    var validationMessages = new Object();
    validationMessages['OnListServiceChkbox'] = { OnListServiceTypeSelectOne: 'at least one has be checked.' };

    //    var oldFormCheckBoxInnerHtml = $("#formCheckBoxValidation").html();
    //    var changedCheckBoxHtml = '<form id="formCheckBoxValidation">' + oldFormCheckBoxInnerHtml + '</form>';
    //    $("#formCheckBoxValidation").replaceWith(changedCheckBoxHtml);


    var checkBoxform = $("#formCheckBoxValidation");
    if (checkBoxform != null) {
        jQuery('#formCheckBoxValidation').validate({
            wrapper: 'div',
            rules: validationRules,
            messages: validationMessages,
            onfocusout: false,
            onkeyup: false,
            submitHandler: function (label) {


            },
            errorPlacement: function (error, element) {
                var parentDiv = $(element).parents('div.formGroup');
                var errorParagraph = $('<p class=errorMessage />');
                error.appendTo(errorParagraph);
                errorParagraph.insertBefore(element);
                $('#MainContent_chkOnServiceType').css("background-color", "#ffe2b9");

            },
            success: function () {
                $('#MainContent_chkOnServiceType').css("background-color", "#ffffff");

            },

            invalidHandler: function (form, validator) {
                $('#MainContent_chkOnServiceType').css("background-color", "#ffe2b9");
            },
            onclick: function (error, element) {

                //   $("#formCheckBoxValidation").valid();
            }

        });


    }
    //End of Check Box Form Validate


    var isChkBoxValid = true; //$("#formCheckBoxValidation").valid();

    if (isChkBoxValid) {
        $('#MainContent_chkOnServiceType').css("background-color", "#ffffff");
    }

    if (isChkBoxValid && isValid) {
        return true;
    }
    else {
        return false;
    }


}
//this function includes all necessary js files for the application
//function include(file) {

//    var script = document.createElement('script');
//    script.src = file;
//    script.type = 'text/javascript';
//    script.defer = true;

//    document.getElementsByTagName('head').item(0).appendChild(script);

//}


function MessageBoxPopUp(message) {
    $('#messageDiv').html(message)
    //document.getElementById('messageDiv').innerHTML = message;
    //$("#messageDiv").dialog();
    $("#messageDiv").dialog({
        buttons: {
            'Ok': function () { $(this).dialog("close"); }
        }
    });
}

jQuery.fn.fadeToggle = function (s, fn) {
    return (this.is(":visible"))
            ? this.fadeOut(s, fn)
            : this.fadeIn(s, fn);
};

formatNumber = function (seperator, every, precision) {
    var val = '';
    if (this.is("span") || this.is("div")) {
        val += this.text();
    } else {
        val += this.val();
    }
    val = parseFloat(val).toFixed(precision);
    val += '';
    var arr = val.split('.', 2);
    var i = parseInt(arr[0]);
    if (isNaN(i)) return '';
    i = Math.abs(i);
    var n = new String(i);
    var d = arr.length > 1 ? '.' + arr[1] : '';
    var a = [];
    var nn;
    while (n.length > every) {
        nn = n.substr(n.length - every);
        a.unshift(nn);
        n = n.substr(0, n.length - every);
    }
    if (n.length > 0) a.unshift(n);
    n = a.join(seperator);
    if (this.is("span") || this.is("div")) {
        this.text(n + d);
    } else {
        this.val(n + d);
    }
}

//Popup dialog 
function popup(message) {
    // get the screen height and width 
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();
    // calculate the values for center alignment
    var dialogTop = (maskHeight / 3) - ($('#dialog-box').height());
    var dialogLeft = (maskWidth / 2) - ($('#dialog-box').width() / 2);
    // assign values to the overlay and dialog box 
    $('#dialog-overlay').css({ height: maskHeight, width: maskWidth }).show();
    $('#dialog-box').css({ top: dialogTop, left: dialogLeft }).show();
    // display the message  
    $('#dialog-message').html(message);
}
//gets the first form element from the page.
function documentForm() {
    return document.forms[0];
}


///Post data to the contact activity oage and redirect user.
function GetContactActivityPage(postedData) {
    //alert('in');
    var docForm = documentForm();
    docForm.postData.value = postedData;
    docForm.action = '/Connect/Modules/History/ContactActivity.aspx';

    docForm.submit();
    return true;
}

///Post data to the contact activity oage and redirect user.
function GetClientInfoPage(postedData) {
    //alert('in');
    var docForm = documentForm();
    docForm.postData.value = postedData;
    docForm.action = '/Connect/Modules/History/ClientInfo.aspx';
    docForm.__EVENTTARGET.value = '';
    docForm.submit();
    return true;
}

//Omniture implementation.

function SetOmnitureEvent(pagename, controlname, variablename) {
    var controlobject = document.getElementById(controlname);
    //alert(controlobject);
    //alert('<%=' + controlname + '%>');
    if (controlobject) {
        //alert('in');
        if (controlobject.onclick != null) {
            var old = (controlobject.onclick) ? controlobject.onclick : function () { };
            controlobject.onclick = function () { CallOmnitureWS(pagename, variablename); return old(); };
        }
        else {
            controlobject.onclick = function () { CallOmnitureWS(pagename, variablename); }
        }
    }
}
function CallOmnitureWS(pagename, variablename) {
    //alert(pagename);
    //alert(variablename);
    //Ommni WS call with variable name
    s_hrb.pageName = pagename;
    //alert (s_hrb.pageName);
    s_hrb.server = ""
    s_hrb.channel = "Connect"
    s_hrb.pageType = ""
    s_hrb.prop1 = pagename;
    s_hrb.prop2 = ""
    /* E-commerce Variables */
    s_hrb.campaign = ""
    s_hrb.state = ""
    s_hrb.zip = ""
    s_hrb.events = ""
    s_hrb.products = ""
    s_hrb.purchaseID = ""
    s_hrb.eVar1 = ""
    s_hrb.eVar2 = ""
    s_hrb.eVar12 = "Connect"
    s_hrb.eVar13 = pagename;
    s_hrb.eVar48 = variablename;
    /************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
    var s_code = s_hrb.t(); if (s_code) document.write(s_code)//--></script>  
}

function GetOmnitureVariableName(fname, lname, ssn, dob) {
    var result = "";

    if (fname.length != 0) {
        result = result + "First Name";
    }
    if (lname.length != 0) {
        result = result + ":Last Name";
    }
    if (ssn.length != 0) {
        result = result + ":SSN";
    }
    if (dob.length != 0) {
        result = result + ":Date of Birth";
    }
    return result;
}

function GetPageTitle() {
    var pageTitle = $('title').html();
    return pageTitle;
}

var ssnRemoved = false;