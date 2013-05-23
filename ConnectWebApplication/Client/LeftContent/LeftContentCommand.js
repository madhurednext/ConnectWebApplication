$(function () {
    loadLeftView();
    var psid = $('#psid').html();

    CallOmnitureWS(pageTitle, "Login");

    OfficeID = $(Officeid).html();
    virtualOfficeId = OfficeID;
    roleId = $(RoleIds).html();

    if (psid && psid != "") {
        callGetCampaignGroup(virtualOfficeId, psid, false);
        

    }


});

var changeclient = false;

function loadLeftView() {

    $('#leftColumnNew').load('Client/LeftContent/LeftTabView.htm #leftTabDiv', onViewLeftLoad);

}
function callGetCampaignGroup(OfficeId,psid,isOfficeView) {
   
    ajaxService.getCampaignGroup(OfficeId, psid, roleId, isOfficeView, onGetCampaignGroupResult, onGetCampaignGroupFault);
}




function onViewLeftLoad() {

  


   

//    $('.displayTaxProToolTip').livequery(function () {
//        $(this).qtip();

//    });


    //quick link fancybox for Campaign View.
    $('.quickLink').click( function () {
        var parentAnchor = $(this).parent();
        var anchor = parentAnchor.find('A');

        //alert('Anchor ' + parentAnchor.html());
        //alert(anchor.attr('href'));
        var m_href = anchor.attr('href');
        if ((m_href.toLowerCase().indexOf('campaignviewlist.aspx') > 0)
           ) {
            //Logic here.
            //alert(anchor.parent().html());
            $(parentAnchor).fancybox({
                'padding': 0,
                'width': 867,
                'height': 465,
                'modal': true,
                'titleShow': false,
                'type': 'iframe',
                'scrolling': 'no',
                'href': m_href
            });
        } else if (m_href.toLowerCase().indexOf('campaignlist.aspx') > 0) {
            window.open(m_href);
            return false;
        }
    });


    /* http://digitalbush.com/projects/masked-input-plugin */
    $('#txtDOB').mask("99/99/9999", { placeholder: "_" });
    $.mask.definitions['_'] = '[0-9]';
    $('#txtSSN').mask("____", { placeholder: "_" });

    $('div.tabs').tabs();

    if (($('#leftContentplaceholder___EVENTVARS').val() & 16) != 16) {
        $('[href$="#tab1"]').hide();
        $('[href$="#tab3"]').hide();
       $('[href$="#tab2"]').tab('show');
   }
   else {
       CallOmnitureWS(pageTitle, "MyAssignmentsView");
    }


//    jQuery('.nav-tabs a').click(function (event) {
//        var tmplItem = $('#tabSelectWidgetDiv').tmplItem();
//        alert("Description: " + tmplItem.data.description);
//    });




    ea.publish(connect.EVENT_KEYS.VIEW_LOAD, "left");

    registerEventHandlers();

    
}



function callOfficeList() {
  //   OfficeID = 27223
    ajaxService.getOfficeView(OfficeID, 0, onGetOfficeViewResult, onGetOfficeViewFault);
}


function endsWith(str,pattern) {
    var d = str.length - pattern.length;
    return d >= 0 && str.lastIndexOf(pattern) === d;
};

function registerEventHandlers() {

    $('.nav-tabs li a').click(function () {
        var selectedTabId = $(this).attr('href');

        if ((selectedTabId) && (endsWith(selectedTabId,'#tab3')))
        {
            if (viewModel) {
                viewModel.officeFlowcurrentIndex(0);
            }
            CallOmnitureWS(pageTitle, "OfficeView");

        } else if ((selectedTabId) && (endsWith(selectedTabId, '#tab1'))) {

            viewModel.BackBtn(viewModel.prevscr());
            CallOmnitureWS(pageTitle, "MyAssignmentsView");

        } else if ((selectedTabId) && (endsWith(selectedTabId, '#tab2'))) {


            CallOmnitureWS(pageTitle, "SearchTab");

        }


    });

    $('#quickLink_quickLinkMenu a').click(function () {

        if ($(this) && $(this)[0] && $(this)[0].href) {
            if ($(this)[0].href.indexOf("Modules/Campaigns/CampaignViewList.aspx") != "-1") {
                CallOmnitureWS(pageTitle, "CampaignViewListClick");
            } else {
                CallOmnitureWS(pageTitle, "CampaignAdminClick");
            }
        }
    });

    $('.officeListItem').live("click", function () {
        viewModel.officeTaxProListCurrentIndex(0);
        var officeId = ko.dataFor(this).Officeid;
        if (officeId) {
            viewModel.officeTaxProListOfficeId(officeId);
            viewModel.officeFlowTPViewTitle('TaxPros in Office ' + officeId);
            getOfficeTaxProList(officeId);
            CallOmnitureWS(pageTitle, "OfficeView>TaxProView");
        }

        viewModel.officeFlowcurrentIndex(1);
        viewModel.officeTabWidgetView();
    });

    $('.officeBackButton').live("click", function () {
        var currIndex = viewModel.officeFlowcurrentIndex();
        currIndex--;
        viewModel.officeFlowcurrentIndex(currIndex);
        viewModel.officeTabWidgetView();

    });


  


    $('.officetaxproListItem').live("click", function () {
        //TODO CLICK ON TAXPRO TO get campaign group
        if (ko.dataFor(this)) {
            viewModel.officeSelectedOfficeId(ko.dataFor(this).OfficeId);
            if (ko.dataFor(this) && ko.dataFor(this).TPFullName) {
                viewModel.officeAssignmentsHeading(ko.dataFor(this).TPFullName + ' (Office ' + ko.dataFor(this).OfficeId + ')');
            }


            CallOmnitureWS(pageTitle, "OfficeView>TaxProView>MyAssignmentsView");
            var psid = ko.dataFor(this).PsftId;
            if (psid && psid != '') {
                ajaxService.getCampaignGroup(ko.dataFor(this).OfficeId, psid, roleId, true, onOfficeGetCampaignGroupResult, onOfficeGetCampaignGroupFault);
            }

            viewModel.officeFlowcurrentIndex(2);
            viewModel.officeTabWidgetView();
        }
    });

    $('.officeProgramClientListItem').live("click", function () {
        var dataItem = ko.dataFor(this);
        if (dataItem.ClientCount < 1) {
            return;
        }
        var CampaignGroupId = dataItem.CampaignGroupId;
        var ClientCount = dataItem.ClientCount;
        var psId = dataItem.PsftId;
        var officeID = dataItem.OfficeId;
        viewModel.officePSID(psId);
        viewModel.officeTotalclients(ClientCount);
        viewModel.officeFlowcurrentIndex(3);
        viewModel.officeTabWidgetView();

        CallOmnitureWS(pageTitle, "OfficeView>TaxProView>MyAssignmentsView>" + GetCampaignGroupName(CampaignGroupId));

        if (psId && psId != '') {
            viewModel.officeViewCurrentIndex(0);
            ajaxService.getClientList(0, CampaignGroupId, officeID, psId, roleId, true, onOfficeGetClientListResult, onOfficeGetClientListFault);
        }
        viewModel.officeCampaignGroupIdselected(CampaignGroupId);

        //viewModel.Assignmentselected(CampaignGroupId,ClientCount)}
        //  viewModel.officeFlowcurrentIndex(2);
        //  viewModel.officeTabWidgetView();
    });

    $('#officeTabLineItem a').live("click", function () {
        callOfficeList();
     
    });
}

function GetCampaignGroupName(CampaignGroupId) {

   switch(CampaignGroupId) {
   case  51:
   return "MakeAnAppointment";
   	break;
   case 52:
    return "AppointmentReminder";
    break;
   case 53:
    return "FollowUp";
    break;
   case 54:
    return "ThankYou";
    break;

 
       }

    return "";
}

//viewModel.officeAssignmentSelected(CampaignGroupId, ClientCount)

function callGetClientSearchList(fName, lName, ssn, dob) {
    HideCenterPanel();
    viewModel.isClientSearchTemplate = true;
    $("#noSearchResult").hide();
    $("#loadingBar").show();
    ajaxService.getClientSearchList(fName, lName, ssn, dob, onGetClientSearchListResult, onGetClientSearchListFault);
}

function getOfficeTaxProList(officeId) {

    ajaxService.getOfficeAssociates(officeId, 0, onGetOfficeAssociatesResult, onGetOfficeAssociatesFault);

}

function getCurrentPageOfficeTaxProList(index){
    ajaxService.getOfficeAssociates(viewModel.officeTaxProListOfficeId(), index, onGetOfficeAssociatesResult, onGetOfficeAssociatesFault);
}

function computeTaxProName(value) {
    var camelCaseName = ' ';

    if (value && value.TpFirstName != '') {
        camelCaseName = toTitleCase(value.TpFirstName) + ' ' + toTitleCase((value.TpLastName != '') ? (value.TpLastName) : (''));
    }

    return camelCaseName;
}

function toTitleCase(str) {

    if (str) {
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }
    else {
        return "";
    }
}

function parseOfficeAddress(value) {
    var officeAddress = ' ';
    if (value && value.OfficeId != "" && value.OfficeAddress != "" && value.OfficeCity != "") {
        officeAddress = value.OfficeId + "-" + value.OfficeAddress + "," + "\n" + ((value.OfficeState != "") ? (value.OfficeCity + "," + value.OfficeState) : (value.OfficeCity)) + "\n" + value.OfficeZipCode;
    }
    officeAddress = toTitleCase(officeAddress);
    return officeAddress;
}
