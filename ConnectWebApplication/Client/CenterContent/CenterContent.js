$(function () {
    loadCenterView();

});


function loadCenterView() {

    $('#CenterColumn').load('Client/CenterContent/CenterContent.htm #clientheaderpanel', onViewCenterLoad);

}

function onViewCenterLoad() {

    ea.publish(connect.EVENT_KEYS.VIEW_LOAD, "center");

    $(".setAppointment a").live("click", function () {

        if (mypopup) {
            closepopup();
            OpenAppointmentWindow();
        }
        else {
            OpenAppointmentWindow();
        }


    });

    $(".setAppointmentCaption a").live("click", function () {

        setServiceActivityAppointmentUrl = null;
        if (ko.dataFor(this).SetAppointmentURL) {
            setServiceActivityAppointmentUrl = ko.dataFor(this).SetAppointmentURL;
        }
        if (mypopup) {
            closepopup();
            OpenAppointmentWindow();
        }
        else {
            OpenAppointmentWindow();
        }


    });
    $(".ContactProfileARApptLinkClick").live("click", function () {
        var apptReminderUrl = ko.dataFor(this).AppointmentURL;
        if (apptReminderUrl) {

            if (mypopup) {

                openContactProfileAppointmentReminderUrl(apptReminderUrl);
            }
            else {
                openContactProfileAppointmentReminderUrl(apptReminderUrl);
            }
        }
    });


    $('.PdfImage').live("click", function () {

        var cpId = $(this).attr('pId');
        if (cpId) {
            pdfopenpopup(cpId);


        }

    });

    $('.cpDocLabel').live("click", function () {
        var cpId = $(this).attr('pId');
        //ko.dataFor(this).CampaignPdfId;
        if (cpId) {
            pdfopenpopup(cpId);

        }

    });

    // Hisotry 
    $('.cpDocLabelHistory').live("click", function () {
        var cpId = $(this).attr('pId');
        //ko.dataFor(this).CampaignPdfId;
        if (cpId) {

            ajaxService.pdfopen(cpId);
        }

    });

    $('.PdfImageHistory').live("click", function () {

        var cpId = $(this).attr('pId');
        if (cpId) {

            ajaxService.pdfopen(cpId);

        }

    });





    // setServiceActivityAppointmentUrl href = "${SetAppointmentURL}"
}




var setServiceActivityAppointmentUrl;



function closepopup() {
    if (false == mypopup.closed) {
        mypopup.close();
    }
    else {
        //  alert('Window already closed!');
    }

}


function pdfopenpopup(id) {
    var time = new Date();
    var url = "https://" + window.location.host + "/Connect/Modules/Campaigns/Download.ashx?CampaignPdfID=" + id + "&millsec=" + time.getMilliseconds();
    var title = "pdf" + id;
    window.open(url, title);

}

function formatCampaignPdfNameAbridge(CampaignPdfNm) {
    if (CampaignPdfNm) {
        if (CampaignPdfNm.length > 18) {
            return CampaignPdfNm.substring(0, 17) + '...'
        } else {
            return CampaignPdfNm;
        }
    }
    else {
        return '';
    }
}

function formatCampaignPdfName(CampaignPdfNm) {

    if (CampaignPdfNm) {
        return CampaignPdfNm;
    }
    else {
        return '';
    }
}


function formatCityStateZip(LocationData) {

    var formattedString = "";

    if (!isNullOrEmpty(toTitleCase(LocationData.City))) {
        formattedString += toTitleCase(LocationData.City);
    }

    if (!isNullOrEmpty(toTitleCase(LocationData.State))) {
        formattedString += ", " + toTitleCase(LocationData.State);
    }

    if (!isNullOrEmpty(toTitleCase(LocationData.ZipCode))) {
        formattedString += " " + toTitleCase(LocationData.ZipCode);
    }

    return formattedString;

}

function isNullOrEmpty(Str) {
    if (Str && Str != '') {
        return false;
    }

    return true;
}



function showOrHideServiceActivityAppointmentUrl(url) {
    setServiceActivityAppointmentUrl = null;
    if (url && url != '') {
        setServiceActivityAppointmentUrl = url;
    }
    else {
        $(".setAppointment").hide();
    }

}

function formatKeyMessages(KeyMessageDescription) {
    return KeyMessageDescription;
}


function checkContactActivityAppointmentUrl(url) {

    if (!url || (url == '')) {
        $('.setAppointmentCaption').hide();
    }
    return '';

}

function checkSpouseName(spouseFirstName, spouseLastName) {
    var name = '';
    if (spouseFirstName && spouseFirstName != '') {
        name += spouseFirstName;
    }

    if (spouseLastName && spouseLastName != '') {
        name += '&nbsp;' + spouseLastName;
    }

    if (name != '') {
        return name;
    }
    else {

        return '';
    }


}

function checkAppointmentUrl() {
    if (!setServiceActivityAppointmentUrl) {

        $(".setAppointment").hide();
    }
    return '';
}

function checkServiceChannelType(ChannelType) {

    if (ChannelType && ChannelType.length > 0) {
        return '- ' + ChannelType;
    }
    else {
        return '';
    }
}

function showOrHideAppointmentUrl(s) {
    var href;

    if (s && s.Data && s.Data.ContactProfileList) {

        $.each(s.Data.ContactProfileList, function (index, value) {
            href = value.SetAppointmentURL;
        });

    }

    if (!href) {

        $(".setAppointment").hide();
    }




}

function OpenAppointmentWindow() {

    if (setServiceActivityAppointmentUrl) {
        mypopup = window.open(setServiceActivityAppointmentUrl, "AppointmentWindow");
    }
}

function openContactProfileAppointmentReminderUrl(apptReminderUrl) {
    if (apptReminderUrl) {
        mypopup = window.open(apptReminderUrl, "AppointmentWindow");
    }
}



function ShowOrHideOtherTabs() {
    if ($("#clientSearchPanel").hasClass('hide')) {
        //$("#clientheaderpanel").removeClass('hide');
    } else {
        $("#clientSearchPanel").addClass('hide');
    }

    if ($("#clientheaderpanel").hasClass('hide')) {
        $("#clientheaderpanel").removeClass('hide');
    }
}

function HideSearchPanel() {
    if ($("#clientSearchPanel").hasClass('hide')) {
        //
    } else {
        $("#clientSearchPanel").addClass('hide');
    }

    if ($("#clientheaderpanel").hasClass('hide')) {
        $("#clientheaderpanel").removeClass('hide');
    }


}

function HideCenterPanel() {

    if ($("#clientSearchPanel").hasClass('hide')) {
        $("#clientSearchPanel").removeClass('hide');
    }

    if ($("#clientheaderpanel").hasClass('hide')) {
        //
    } else {
        $("#clientheaderpanel").addClass('hide');
    }

}


function formatContactAssignmentLocationAddress(Location) {

    var formatString = '';

    if (Location) {
        formatString += (isNullOrEmpty(Location.Officeid) ? ('') : (Location.Officeid));
        formatString += "&nbsp;&ndash;&nbsp;"
        formatString += (isNullOrEmpty(Location.AddressLine1txt) ? ('') : (Location.AddressLine1txt + "\n"));
        formatString += (isNullOrEmpty(Location.City) ? ('&nbsp;') : (Location.City + ",&nbsp;"));
        formatString += (isNullOrEmpty(Location.State) ? ('&nbsp;') : (Location.State + ",&nbsp;"));
        formatString += (isNullOrEmpty(Location.ZipCode) ? ('&nbsp;') : (Location.ZipCode + "&nbsp;"));
        formatString += (isNullOrEmpty(Location.Phone) ? ('&nbsp;') : ("\n" + Location.Phone + "\n"));
    }
    return formatString;

}

function checkSearchAndSpouseNavigation(result) {

    if (programClientId && spouseClientId && (programClientId != spouseClientId)) {
        if (result.Data) {
            result.Data.ContactProfileList = null;
        }
    }

    if (isSearchFlow) {
        if (!navigateOtherTabs) {
            viewModel.changetab(2);
            navigateOtherTabs = true;
            viewModel.contactprofile(null);
        }
        else {

            if (viewModel.spouseTab() > 1) {
                viewModel.changetab(viewModel.spouseTab());
                viewModel.contactprofile(null);
            }
            else {
                viewModel.contactprofile(null);
            }
        }

    }
    else {


        if (viewModel.spouseTab() > 1) {
            viewModel.changetab(viewModel.spouseTab());

        }
        //Comma Separated Key Messages
        //        var keyMessages = '';
        //        if (result && result.Data && result.Data.ContactProfileList) {
        //            $.each(result.Data.ContactProfileList, function () {
        //                if (this.KeyMessagesList) {

        //                    $.each(this.KeyMessagesList, function () {
        //                        if (keyMessages != '') {
        //                            keyMessages += ', ';
        //                        }
        //                        keyMessages += this.m_key_message_desc_txt;
        //                    });
        //                }
        //                this.m_key_message_desc_txt = keyMessages;
        //            });

        //        }

        //s.Data.ContactProfileList.KeyMessagesList = keyMessages;

        viewModel.contactprofile(result.Data.ContactProfileList);

    }

}

function getSelectedClientDetails(index) {

    if ($("#notes1").val() == '' || $("#notes1").val() == undefined) {

        if (unsavedchangesalert()) {
            changeclient = true;
            prevclientselected = index;
            $("#tempcontactresult").html('');
            viewModel.tempradioid([]);
            $("#tempnotes").html('');
            viewModel.temphtmlvalues([]);
            ajaxService.getBasicInfo(index, onGetBasicInfoResult, onGetBasicInfoFault);

        }
        else {
            changeclient = false;
        }
    }
    else {
        var answer = confirm("There are unsaved changes. Do you want to continue?")
        if (answer) {
            changeclient = true;
            $("#tempnotes").html('');
            $("#tempcontactresult").html('');
            //viewModel.datalist(null);
            viewModel.tempradioid([]);
            $("#tempnotes").html('');
            viewModel.temphtmlvalues([]);
            getBasicInfoPersonIndex = index;
            ajaxService.getBasicInfo(index, onGetBasicInfoWithChangeResult, onGetBasicInfoFault);
        }
        else {
            changeclient = false;
        }
    }
}

function GetContactActivitydetails(contactactivityid) { }

function callcontactexpand(contactactivityid) {

    contactHistoryContactActivityId = contactactivityid;
    var m_imagePath = $("#img" + contactactivityid).attr("src");
    if (m_imagePath.indexOf("Styles/images/ctrlExpand.png") >= 0) {
        $(".icon").attr("src", "Styles/images/ctrlExpand.png");
        $(".expandedactivity").remove();
        // Sample Url:'http://localhost:51724/Connect/Services/ContactDetails.svc/GetContactActivityDetails/' + contactactivityid + '&millsec=' + time.getMilliseconds(),
        ajaxService.getContactActivityDetails(contactactivityid, onGetContactActivityDetailsResult, onGetContactActivityDetailsFault);
    }
    else {
        $("#img" + contactactivityid).attr("src", "Styles/images/ctrlExpand.png");
        $(".expandedactivity").remove();
    }
}

function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
}

function htmlEncode(value) {
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}


function saveclicked(ContactQueueId) {
    var result = checkselection(ContactQueueId);
    if (result != null) {

        var noteString = $("#notes1").val();

        //          noteString =  noteString.replace("<", "&lt;");
        //          noteString =  noteString.replace(">", "&gt;");



        var notetext = fixedEncodeURIComponent(htmlEncode(noteString));




        //     fixedEncodeURIComponent(noteString);

        //        var notetext = $("#notes1").val();
        //        notetext = notetext.replace(/\'/g, "%26apos;");
        //        notetext = notetext.replace(/\&/g, "%26");
        //        notetext = notetext.replace(/\#/g, "%23");
        //        notetext = notetext.replace(/\+/g, "%2B");
        //        notetext = notetext.replace(/\</g, "%26lt;");
        //        notetext = notetext.replace(/\>/g, "%26gt;");
        //        notetext = notetext.replace(/\_/g, "%5F");

        //        notetext = notetext.replace(/\?/g, "%3F");
        //Sample Url : 'http://localhost:50000/Connect/Services/ContactDetails.svc/SaveContactResult/' + ContactQueueId + '?ssoid=' + '123456' + '&callResult=' + result + '&officeID=' + '99999' + '&comment=' + notetext + '&millsec=' + time.getMilliseconds(),
        ajaxService.saveContactResult(ContactQueueId, result, notetext, onSaveContactResultResult, onSaveContactResultFault);
    }
    else {
        alert('Contact Profile: You must choose a contact result in order to save.');
    }
}

function checkselection(id) {
    var s = document.getElementById(id);
    var selection = s.getElementsByTagName("input");
    for (i = 0; i < selection.length; i++) {
        if (selection[i].checked == true) {
            return selection[i].value;
        }
    }
    return null;
};

function reloadcontactprofiletab() {
    ajaxService.getContactProfile(personseqid, programid, onGetContactProfileResult, onGetContactProfileFault);
};

function reloadclientlist() {
    var psid = $('#psid').html();
    ajaxService.getClientList(ind, programid, virtualOfficeId, psid, roleId, false, onGetClientListResult, onGetClientListFault);
    //pop $(".fade").remove();

    $("#MessageSaved").bPopup({ modalClose: false, modal: true, closeClass: 'popClose' });
    //pop $("#savedMessage").append('<div class="fade" style="background-color:orange;width:300px; position:relative; padding-left:150px; left:180px; height: 18px; ">successfully saved!!!</div>');
    //pop $(".fade").fadeOut(6000);
    //alert("saved successfully");
    $("#tempcontactresult").html('');
    viewModel.tempradioid([]);
    $("#tempnotes").html('');
    viewModel.temphtmlvalues([]);

    setTimeout(function () {
        $("#MessageSaved").bPopup().close();
        viewModel.CloseBtnClicked();
    }, 6000);

};

function onMessageSavePopupClose() {
    $("#MessageSaved").bPopup().close();
}


function officeReloadclientlist() {

    if (viewModel.officePSID()) {
        var selectedOfficeId = viewModel.officeSelectedOfficeId();
        ajaxService.getClientList(parseInt(viewModel.officeViewCurrentIndex()), viewModel.officeCampaignGroupIdselected(), selectedOfficeId, viewModel.officePSID(), roleId, true, onOfficeGetClientListResult, onOfficeGetClientListFault);
        $("#MessageSaved").bPopup({ modalClose: false, modal: true, closeClass: 'popClose' });
        //pop   $(".fade").remove();
        //pop $("#savedMessage").append('<div class="fade" style="background-color:orange;width:300px; left:180px; position:relative;  padding-left:150px; height: 18px; ">successfully saved!!!</div>');
        //pop $(".fade").fadeOut(6000);
        //alert("saved successfully");
        $("#tempcontactresult").html('');
        viewModel.tempradioid([]);
        $("#tempnotes").html('');
        viewModel.temphtmlvalues([]);

        setTimeout(function () {
            $("#MessageSaved").bPopup().close();
            viewModel.CloseBtnClicked();
        }, 6000);
    }

}

//Documents

function DocumentTreeLayout() {



    $("#document-table-body tr").each(function () {
        if ($.tmplItem(this).data.rowClassName != "folder") {
            $(this).addClass($.tmplItem(this).data.rowClassName);
        }

        $(this).attr('id', $.tmplItem(this).data.rowNodeId);
    });


    $("#document-table-body tr .file").each(function () {
        if ($.tmplItem(this).data.rowClassName == "folder") {
            $(this).removeClass('file').addClass('folder');
        }
    });


    //  $("#document-table-body tr:first").attr('id', 'node-1').removeClass('child-of-node-1');

    //  $("#document-table-body tr:first .file").attr('id', 'node-1').removeClass('file').addClass('folder');

    // On File Click, Open SWF Document Viewer

    $("#document-table-body tr .file").click(function () {
        var clientName = (viewModel.datalist() ? (viewModel.datalist().FirstName + " " + viewModel.datalist().LastName) : (" "));
        var fileName = $.tmplItem(this).data.fileName;
        ajaxService.viewClientDoc($.tmplItem(this).data.fileId, fileName, clientName);
    });
    $(".documentList").treeTable();

    // Drag & Drop documentList Code
    $("#documentTable .file, #documentTable .folder").draggable({
        helper: "clone",
        opacity: .75,
        refreshPositions: true,
        revert: "invalid",
        revertDuration: 300,
        scroll: true
    });

    $("#documentTable .folder").each(function () {
        $($(this).parents("tr")[0]).droppable({
            accept: ".file, .folder",
            drop: function (e, ui) {
                $($(ui.draggable).parents("tr")[0]).appendBranchTo(this);
            },
            hoverClass: "accept",
            over: function (e, ui) {
                if (this.id != $(ui.draggable.parents("tr")[0]).id && !$(this).is(".expanded")) {
                    $(this).expand();

                }
            }
        });
    });

    // Make visible that a row is clicked
    $("table#documentTable tbody tr").mousedown(function () {
        $("tr.selected").removeClass("selected"); // Deselect currently selected rows
        $(this).addClass("selected");
    });

    // Make sure row is selected when span is clicked
    $("table#documentTable tbody tr span").mousedown(function () {
        $($(this).parents("tr")[0]).trigger("mousedown");
    });


    $("#documentTable").tablesorter();



}

function parseDocumentListTreeStructure(docList) {
    var structuredDocumentList = [];

    //structuredDocumentList.push({ "fileName": "2012 Filing Year", "fileSize": "", "timeUploaded": "02/11/2013", "notes": "" });

    $.each(docList, function (index, value) {

        if ((docList[index].taxYear) && (docList[index].taxYear != 'null')) {


        }
        else {

            var curr_year = new Date().getFullYear();
            docList[index].taxYear = curr_year;
        }


        if (docList[index].taxYear < currentYear) {
            currentYear = docList[index].taxYear;

            structuredDocumentList.push({
                "fileName": "  " + currentYear + " Filing Year", "fileSize": "",
                "notes": "", "rowNodeId": "node-" + currentYear, "rowClassName": "folder"
            });

        }


        docList[index].rowNodeId = "node-" + docList[index].taxYear + 'c1';
        docList[index].rowClassName = "child-of-node-" + docList[index].taxYear;

        structuredDocumentList.push(docList[index]);
    });

    return structuredDocumentList;
}



//The following Lines are commented as this is implmeneted in ContactProfileView Model
//function checkpreviousvalue() {
//    if ($("#tempnotes").html() == '') {
//        viewModel.temphtmlvalues($("#tempnotes").html());

//    }
//    else {
//        viewModel.temphtmlvalues($("#tempnotes").html());
//    }
//    if ($("#tempcontactresult").html() == '') {
//    }
//    else {
//        viewModel.tempradioid($("#tempcontactresult").html());
//    }
//};
//function savetempradioselection(radiobtnid) {

//    try {
//        $("#tempcontactresult").html(radiobtnid);
//        if (window && window.event) {
//            window.event.cancelBubble = true;
//        }
//        return true;
//    }
//    catch (e) {

//    }
//};
//function checkTempNotesEmpty() {
//    if (($("#tempnotes").html() == '') || ($("#tempnotes").html() == 'undefined')) {
//        return true;
//    }

//    return false;

//}
//function unsavedchangesalert() {
//    if (checkTempNotesEmpty() && $("#tempcontactresult").html() == '') {
//        return true;
//    }
//    else {
//        var answer = confirm("Contact Profile: There are unsaved changes. Do you want to continue?")
//        if (answer) {
//            $("#tempnotes").html('');
//            $("#tempcontactresult").html('');
//            return true;
//        }
//        else {
//            return false;
//        }
//    }
//}


ToggleExpandViewImageCampaign = function (element) {
    var parentrow = $(element).parent();
    var up = "/Connect/Styles/images/ctrlExpand.png";
    var down = "/Connect/Styles/images/ctrlCollapse.png";
    var expandalt = "Expand";
    var collapsealt = "Collapse";
    var icon = $('.icon', parentrow);
    var icontableCell = $('.icon', parentrow).parent();
    if (icon.attr("src") == down) {
        icon.attr("src", up);
        icon.attr("alt", collapsealt);
        ToggleExpandedStyle(icontableCell, ToggleStyleType.removeCss);
    } else {
        icon.attr("src", down);
        icon.attr("alt", expandalt);

        GetCampaignDetails(icontableCell);
        ToggleExpandedStyle(icontableCell, ToggleStyleType.addCss);

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
