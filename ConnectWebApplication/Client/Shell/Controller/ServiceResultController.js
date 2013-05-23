function onGetCampaignGroupResult(result) {
    //// console.log('Connect UI Log onGetCampaignGroup Result');


   if (result && result.Data && result.Data.CampaignGroupList) {
       connect.appViewModel.assignmentViewModel.programInfoViewModel.programList(result.Data.CampaignGroupList);

       //connect.appViewModel.assignmentViewModel.dataCompute();
        changeclient = true;
    }
    else {
        viewModel.Assignmentlist([]);
        changeclient = true;
    }
}

function onGetCampaignGroupFault(fault) {
    onServiceFault(fault);
    // console.log('Connect UI Log onGetCampaignGroup Fault' + fault.toString());
}

function onGetClientListResult(result) {

    if (result && result.Data) {
        connect.appViewModel.assignmentViewModel.clientInfoViewModel.clientList(result.Data.Clients);
        connect.appViewModel.assignmentViewModel.clientInfoViewModel.totalClients(result.Data.TotalClients);
        connect.navigators.assignmentNavigation.IncrementTemplateIndex();
        //connect.navigators.assignmentNavigationIncrement();
        //  navigationVM("assignments").IncrementTemplateIndex();
        $('.licall').click(function () {
            if (changeclient) {
                $('.licall').css("background-color", "white");
                $(this).css("background-color", "green");

            }
        });

        $('.programClientList').click(function () {
            if (changeclient) {
                $('.programClientList').css("background-color", "white");
                $('.programClientList').css("color", "black");
                $(this).css("background-color", "green");
                $(this).css("color", "white");
            }
        });
    }
}

function onGetClientListFault(fault) {

    onServiceFault(fault);
}


function onOfficeGetCampaignGroupResult(result) {
    if (result && result.Data) {
        viewModel.officeAssignmentlist(result.Data.CampaignGroupList);
        officeChangeclient = true;
    } else {
        viewModel.Assignmentlist([]);
        officeChangeclient = true;
    }
}

function onOfficeGetCampaignGroupFault(fault) {
    onServiceFault(fault);
}

function onGetClientSearchListResult(result) {
    if (result && result.Data) {

        viewModel.clientSearchListLength(result.Data.length);
        $.each(result.Data, function (index, value) {
            this.ComputedOfficeAddress = '';
            this.ComputedOfficeAddress = parseOfficeAddress(value);
            this.ComputedTPName = computeTaxProName(value);
        });
        viewModel.clientSearchList(result.Data);
        if (result.Data.length == 0) {
            viewModel.searchResultText("There were no clients found, please refine your search.");

        }
        $("#ClientSearchGrid").tablesorter();
        $("#loadingBar").hide();
        $("#noSearchResult").show();
    }
    else {

        viewModel.clientSearchList(null);
    }
}

function onGetClientSearchListFault(fault) {

    $("#loadingBar").hide();
    $("#noSearchResult").show();
    viewModel.searchResultText("Error in Client Search.");
}


function onOfficeGetClientListResult(result) {

    if (result && result.Data) {
        viewModel.officeFlowClientlist(result.Data.Clients);
        viewModel.officeFlowClientListCount(result.Data.TotalClients);

        $('.licall').click(function () {
            if (officeChangeclient) {
                $('.licall').css("background-color", "white");
                $(this).css("background-color", "green");

            }
        });

        $('.programClientList').click(function () {
            if (officeChangeclient) {
                $('.programClientList').css("background-color", "white");
                $('.programClientList').css("color", "black");
                $(this).css("background-color", "green");
                $(this).css("color", "white");
            }
        });
    }
}

function onOfficeGetClientListFault(fault) {
    onServiceFault(fault);
}






function onGetContactProfileResult(result) {
    if (result) {

        contactProfileResult = result;

        //   showOrHideAppointmentUrl(s);

        checkSearchAndSpouseNavigation(result);


        $(".plus").click(function () {
            if ($(this).html() == "+") {
                $(".contactinfo").removeClass("hide");
                $(this).html("&#8211;");
            }
            else {
                $(this).html("+");
                $(".contactinfo").addClass("hide");
            }
        });
        $("#campaigndesc").click(function () {
            if ($(".campdescli").hasClass('hide')) {
                $(".campdescli").removeClass('hide');
                $(this).html("&#8211;");
            }
            else {
                $(".campdescli").addClass('hide');
                $(this).html("+");
            }
        });
        $('#talkpts').click(function () {
            if ($("#talkingtextid").text() != '') {
                $.fancybox({
                    //'type': 'inline',                        
                    'content': '<div>' + $("#talkingtextid").text() + '</div>'
                });
            }
        });
        HideSearchPanel();
    }
}

function onGetContactProfileFault(fault) {

    onServiceFault(fault);
}

function onGetServiceActivityResult(result) {
    if (result && result.Data) {
        viewModel.curYearService($.grep(result.Data, function (item, i) {

            if (item.AssociateData) {

                item.AssociateData.FullName = toTitleCase(item.AssociateData.FirstNm) +
                " " + toTitleCase(item.AssociateData.LastNm);

            }
            if (item.isCurrentYear) {
                if (item.RefundAmt < 0) {
                    item.RefundAmtStr = "<span>Bal Due</span><br /> $" + formatDollar(item.RefundAmt * -1);
                }
                else {
                    item.RefundAmtStr = "<span>Refund</span><br /> $" + formatDollar(item.RefundAmt);
                }

                return item;
            }
        }));
        viewModel.preYearService($.grep(result.Data, function (item, i) {


            if (!item.isCurrentYear) {

                if (item.RefundAmt < 0) {
                    item.RefundAmtStr = "<span>Bal Due</span><br /> $" + formatDollar(item.RefundAmt * -1);
                }
                else {
                    item.RefundAmtStr = "<span>Refund</span><br /> $" + formatDollar(item.RefundAmt);
                }

                return item;
            }
        }));
    }
    else {
        viewModel.curYearService(null);
        viewModel.preYearService(null);
    }
}
function formatDollar(num) {
    var p = num.toFixed(2).split(".");
    var chars = p[0].split("").reverse();
    var newstr = '';
    var count = 0;
    for (x in chars) {
        count++;
        if (count % 3 == 1 && count != 1) {
            newstr = chars[x] + ',' + newstr;
        } else {
            newstr = chars[x] + newstr;
        }
    }
    return newstr + "." + p[1];
}

function onGetServiceActivityFault(fault) {

    onServiceFault(fault);
}

function onGetUpComingAptsResult(result) {
    if (result && result.Data) {
        viewModel.upComingApts(result.Data.ApptInfoList);
        showOrHideServiceActivityAppointmentUrl(result.Data.AppointmentUrl);
    }
}

function onGetUpComingAptsFault(fault) {
    onServiceFault(fault);
}

function onGetDocumentListResult(result) {
    if (result.Data != null && result.Data.userid != "-1") {
        viewModel.guaUserId = result.Data.userid;

        viewModel.docList(parseDocumentListTreeStructure(result.Data.documentList));
        DocumentTreeLayout();
    }
    else {

        if ((result.Data) && (result.Data.userid == "-1")) {
            viewModel.docListErrorMessage("Connect is unable to retrieve the client’s uploaded documents due to multiple My H&R Block Accounts matching the client information.");
            viewModel.guaUserId = result.Data.userid;
        }
        else {
            //&nbsp;&nbsp;&nbsp;
            viewModel.docListErrorMessage("No documents available.");
            viewModel.guaUserId = null;
        }
        viewModel.docList(null);
    }
}

function onGetDocumentListFault(fault) {

    viewModel.docListErrorMessage("No documents available.");
    onServiceFault(fault);
}

function onGetBasicInfoResult(result) {

    //    if (result.Data) {
    //        result.Data.IsSpouseDeceased = true;
    //        result.Data.IsSpouseLatino = true;
    //        result.Data.IsDeceased = true;
    //        result.Data.IsLatino = true;
    //    }

    if (result && result.Data) {
        viewModel.datalist(result.Data);

        if (programid == "52") {

            ajaxService.getContactAppointments(selectedClientContactQueueId, programid, onGetContactAssignmentsResult, onGetContactAssignmentsFault);
        }
        if (isSearchFlow) {
            programid = 51;

        }
        if (viewModel.spouseTab() > 1) {
            viewModel.changetab(viewModel.spouseTab());
        }
        else {
            viewModel.changetab(1);
        }
    }
}


function onGetBasicInfoFault(fault) {
    onServiceFault(fault);
}

function onGetBasicInfoWithChangeResult(result) {
    if (result && result.Data) {
        viewModel.datalist(result.Data);
        if (getBasicInfoPersonIndex) {

            if (programid == "52") {
                var contactQueueSeqId = "1234";
                ajaxService.getContactAppointments(contactQueueSeqId, programid, onGetContactAssignmentsResult, onGetContactAssignmentsFault);
            }

            ajaxService.getContactProfile(getBasicInfoPersonIndex, programid, onGetContactProfileResult, onGetContactProfileFault);
        }
    }
}

function onGetContactAssignmentsResult(result) {
    viewModel.apptReminderProfileComingApts(result.Data);

}

function onGetContactAssignmentsFault(fault) {

}
function onGetContactHistoryResult(result) {
    if (result && result.Data) {
        viewModel.contactactivitylength(result.Data.length);
        viewModel.contactactivity(result.Data);
        $("#example").tablesorter();
    }
}

function onGetContactHistoryFault(fault) {
    onServiceFault(fault);
}

function onGetContactActivityDetailsResult(result) {
    var contactactivityid = contactHistoryContactActivityId;
    if (result != null) {



        $("#tr" + contactactivityid).after("<tr class='expandedactivity'><td class='expanded rightBorder' colspan='6'>" + result.Data + "</td></tr>");
        $("#img" + contactactivityid).attr("src", "Styles/images/ctrlCollapse.png");
    }
    else {
        $("#tr" + contactactivityid).after("<tr class='expandedactivity'><td class='expanded rightBorder'  colspan='6'>Cannot retrieve Data.</td></tr>");
        $("#img" + contactactivityid).attr("src", "Styles/images/ctrlCollapse.png");
    }

}

function onGetContactActivityDetailsFault(fault) {
    onServiceFault(fault);

}




function onSaveContactResultResult(result) {

    if (isOfficeView) {
        window.setTimeout(officeReloadclientlist, 200);
    } else {
        window.setTimeout(reloadclientlist, 200);

    }
    window.setTimeout(reloadcontactprofiletab, 100);


    // window.setTimeout(officeReloadcontactprofiletab, 100);
}

function onSaveContactResultFault(fault) {
    onServiceFault(fault);
}


function onServiceFault(fault) {
    if (!fault) return;
    if (fault.responseText) {
        var err = fault.responseText;
        if (err)
            alert(err);
        else
            error({ Message: "Unknown server error." })
    }
}

function onGetOfficeViewResult(result) {

    if (result && result.Data && result.Data.length > 0) {

        viewModel.officeListCount(result.Data[0].TotalCount);
        viewModel.officeList(result.Data);
        viewModel.officeListCurrentLength(result.Data.length);
    }
    else {
        viewModel.officeList([]);

    }
}

function onGetOfficeViewFault(fault) {
    onServiceFault(fault);
}

function onGetOfficeAssociatesResult(result) {
    if (result && result.Data && result.Data.length > 0) {
        $.each(result.Data, function (index, value) {
            this.TPFullName = getTpName(toTitleCase(value.FirstNm)) + ' ' + getTpName(toTitleCase(value.LastNm));
            this.TPCompleteFullName = this.TPFullName;
            if (this.TPFullName.length > 35) {
                this.TPFullName = this.TPFullName.substring(0, 32);
                this.isTPFullNameOverFlow = true;

            } else {

                this.isTPFullNameOverFlow = false;
            }
        });

        viewModel.officeTaxProListCount(result.Data[0].TotalCount);
        viewModel.officeTaxproList(result.Data);
        viewModel.officeTaxProListCurrentLength(result.Data.length);

    }
    else {
        var currentTitle = viewModel.officeFlowTPViewTitle();
        // Logic to Get Curent Selected Office Id 
        var titleArr = currentTitle.split("TaxPros in Office ");
        if (titleArr && titleArr.length > 1) {
            var currentOfficeId = titleArr[1];
            viewModel.officeFlowTPViewTitle("No contact assignments available for this office (" + currentOfficeId + ")");

            viewModel.officeTaxProListCount(0);

            viewModel.officeTaxProListCurrentLength(0);
        }

        viewModel.officeTaxproList(null);

    }
}

function onGetOfficeAssociatesFault(fault) {
    onServiceFault(fault);
}

function getTpName(name) {
    if (name) {
        return name;
    } else {
        return ' '
    }
}