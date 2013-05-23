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