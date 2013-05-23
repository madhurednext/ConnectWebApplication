var ajaxService = (function () {

    var getCampaignGroup = function (officeId, psid, roleId, isOffficeView, resultCallBack, faultCallBack) {

        resultCallBack(GetCampaignGroupResult);

    },

    getClientSearchList = function (fName, lName, ssn, dob, resultCallBack, faultCallBack) {
        viewModel.clientSearchList(null);
        $("#loadingBar").show();

        var method = 'Search?firstName=' + fName + '&lastName=' + lName + '&ssn4=' + ssn + '&birthDate=' + dob + '&maxRows=10';
        ajaxGetJson(getSvcUrl(method, false), 'Search', resultCallBack, faultCallBack);
    },

   getClientList = function (index, Id, officeId, psid, roleId, isOffficeView, resultCallBack, faultCallBack) {
       programid = Id;
       ind = index;
       //$('#psid').html()
       var method = 'GetList/?programTypeId=' + Id + '&peopleSoftId=' + psid + '&sortBy=abc&asc=true&index=' + index + '&pagesize=10' + '&officeId=' + officeId + '&roleIds=' + roleId + '&isOfficeView=' + isOffficeView;
       ajaxGetJson(getSvcUrl(method, true), 'GetList', resultCallBack, faultCallBack);

   },
   getContactAppointments = function (contactQueueSeqId, programTypeId, resultCallBack, faultCallBack) {
       if (programTypeId == '52') {
           var method = "GetContactAppointments/" + contactQueueSeqId + "?programTypeId=" + programTypeId;
           ajaxGetJson(getSvcUrl(method, true), 'GetContactAppointments', resultCallBack, faultCallBack);
       }
   },
     getContactProfile = function (id, programid, resultCallBack, faultCallBack) {
         personseqid = id;
         viewModel.contactprofile([]);
         var method = 'GetContactProfileInfo/' + id + '?programTypeId=' + programid + '&officeId=' + OfficeID;
         ajaxGetJson(getSvcUrl(method, true), 'GetContactProfileInfo', resultCallBack, faultCallBack);
     },

     getServiceActivity = function (id, resultCallBack, faultCallBack) {
         viewModel.curYearService(null);
         viewModel.preYearService(null);
         var method = 'GetServiceListByPersonId/' + id;
         ajaxGetJson(getSvcUrl(method, true), 'GetServiceListByPersonId', resultCallBack, faultCallBack);
     },
     getUpComingApts = function (id, resultCallBack, faultCallBack) {

         var method = 'GetUpcomingAptsByPersonId/' + id + '?OfficeId=' + OfficeID
         ajaxGetJson(getSvcUrl(method, true), 'GetUpcomingAptsByPersonId', resultCallBack, faultCallBack);
     },

     getDocumentList = function (id, resultCallBack, faultCallBack) {
         currentYear = 9999;
         var method = 'GetDocumentList/' + id;
         ajaxGetJson(getSvcUrl(method, true), 'GetDocumentList', resultCallBack, faultCallBack);

     },

     getBasicInfo = function (index, resultCallBack, faultCallBack) {
         var method = 'GetBasicInfo/' + index;
         ajaxGetJson(getSvcUrl(method, true), 'GetBasicInfo', resultCallBack, faultCallBack);
     },

     getContactHistory = function (id, resultCallBack, faultCallBack) {
         var method = 'GetContactHistory/' + id + '?startIndex=0&maxRows=100&sortExpression=';
         ajaxGetJson(getSvcUrl(method, true), 'GetContactHistory', resultCallBack, faultCallBack);
     },

     getOfficeView = function (officeId, startIndex, resultCallBack, faultCallBack) {
         if (officeId && officeId != '') {
             var method = "GetOfficeView/" + officeId + "?startIndex=" + startIndex + "&pagesize=10";
             ajaxGetJson(getSvcUrl(method, true), 'GetOfficeView', resultCallBack, faultCallBack);
         }
     },

     getOfficeAssociates = function (officeId, startIndex, resultCallBack, faultCallBack) {
         var method = "GetAssociate/" + officeId + "?startIndex=" + startIndex + "&pagesize=10";
         ajaxGetJson(getSvcUrl(method, true), 'GetAssociate', resultCallBack, faultCallBack);
     },
    //"/GetOfficeView/{officeId}?startIndex={startIndex}&pagesize={pagesize}&millsec={millsec}"

    getContactActivityDetails = function (contactactivityid, resultCallBack, faultCallBack) {

        var method = 'GetContactActivityDetails/' + contactactivityid;
        ajaxGetJson(getContactDetailsSvcUrl(method, true), 'GetContactActivityDetails', resultCallBack, faultCallBack);
    },

     saveContactResult = function (ContactQueueId, result, notetext, resultCallBack, faultCallBack) {

         var method = 'SaveContactResult/' + ContactQueueId + '?ssoid=' + $("#ssoid").html() + '&callResult=' + result + '&officeID=' + $("#Officeid").html() + '&comment=' + notetext;
         ajaxGetJson(getContactDetailsSvcUrl(method, true), 'SaveContactResult', resultCallBack, faultCallBack);
     },
    pdfopen = function (id) {

        openDocument(id);

    },
    viewClientDoc = function (fileId, fileName, clientName) {

        var method = '?docPath=' + viewModel.guaUserId + '/document/' + fileId + "&clientName=" + clientName + "&fileName=" + fileName;
        openClientDoc(getClientDocUrl(method, true));
    };



    return {
        getCampaignGroup: getCampaignGroup,
        getClientSearchList: getClientSearchList,
        getClientList: getClientList,
        getContactProfile: getContactProfile,
        getServiceActivity: getServiceActivity,
        getUpComingApts: getUpComingApts,
        getContactAppointments: getContactAppointments,
        getDocumentList: getDocumentList,
        getBasicInfo: getBasicInfo,
        getContactHistory: getContactHistory,
        getOfficeView: getOfficeView,
        getOfficeAssociates: getOfficeAssociates,
        getContactActivityDetails: getContactActivityDetails,
        saveContactResult: saveContactResult,
        pdfopen: pdfopen,
        viewClientDoc: viewClientDoc
    };

})();


var getClientDocUrl = function (method, addTime) {

    if (addTime) {
        var time = new Date().getMilliseconds();
        if (method.indexOf('?') == '-1') {
            return $('#clientdocurl').html() + method + '?millsec=' + time;
        }
        else {
            return $('#clientdocurl').html() + method + '&millsec=' + time;
        }
    }
    else {
        return $('#clientdocurl').html() + method;
    }
};

var getContactDetailsSvcUrl = function (method, addTime) {
    if (addTime) {
        var time = new Date().getMilliseconds();
        if (method.indexOf('?') == '-1') {
            return $('#lblContactDetailsServiceURL').html() + method + '?millsec=' + time;
        }
        else {
            return $('#lblContactDetailsServiceURL').html() + method + '&millsec=' + time;
        }
    }
    else {
        return $('#lblContactDetailsServiceURL').html() + method;
    }


};


var getSvcUrl = function (method, addTime) {
    if (addTime) {
        var time = new Date().getMilliseconds();
        if (method.indexOf('?') == '-1') {
            return $('#clientdataurl').html() + method + '?millsec=' + time;
        }
        else {
            return $('#clientdataurl').html() + method + '&millsec=' + time;
        }
    }
    else {
        return $('#clientdataurl').html() + method;
    }


};

var ajaxGetJson = function (url, method, resultCallBack, faultCallBack) {


    if (allAjaxServiceRequests[method]) {
        var request = allAjaxServiceRequests[method];
        if (request && request.readyState != 4) {
            request.abort();
        }
    }


    log.info("Calling Service " + url);
    log.profile(method + "Service Call Start ");
    var ajaxRequest = $.ajax({
        url: url,
        type: "GET",
        dataType: "jsonp",
        timeout: 15000,
        success: function (json) {


            log.debug(method + " Service Call Result " + logFormatText(json));
            resultCallBack(json);

        },
        error: function (errorResponse) {
            log.debug(method + " Service Call Error " + logFormatText(errorResponse));
            faultCallBack(errorResponse);
        },
        complete: function (jqXHR, textStatus) {

            log.profile(method + "Service Call Start ");


        }
    });

    allAjaxServiceRequests[method] = ajaxRequest;


};

function getTextForObject(rel) {
    return JSON.stringify(serviceResultTextArray[rel]);
}

function logFormatText(object) {
    //TODO: CLEAR LOGGING AFTER N MESSAGES TO FREE UP MEMORY
    //    if (logMessageList.length > 100) {
    //         
    //         serviceResultTextArray = [];
    //         serviceResultCount = 0;
    //         log.clear();
    //         logMessageList = [];
    //   }


    serviceResultTextArray.push(object);
    //to string json here...
    var showDetailsText = '<a class="logText" rel="' + serviceResultCount + '">Click to see Object</a>';
    //'<a class="logText" rel="' + + '">Click to see Result</a>';
    serviceResultCount++;

    return showDetailsText;
}

function logToolTipRegister() {

    $('.logText').each(function () {

        $(this).qtip(
		{
		    content: {
		        text: getTextForObject($(this).attr('rel'))
		    },

		    position: {
		        at: 'bottom center', // Position the tooltip above the link
		        my: 'top center',
		        viewport: $(window), // Keep the tooltip on-screen at all times
		        effect: false // Disable positioning animation
		    },
		    show: {
		        event: 'click',
		        solo: false // Only show one tooltip at a time
		    },
		    hide: 'unfocus'
		});


    });
}

function openDocument(id) {


    $.fancybox({
        'width': '75%',
        'height': '75%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe',
        'href': 'https://' + window.location.host + '/Connect/Modules/Campaigns/Download.ashx?CampaignPdfID=' + id + '&millsec=' + new Date().getMilliseconds()

    });
    //Sample Url : 'href': 'http://localhost:51724/Connect/Modules/Campaigns/Download.ashx?CampaignPdfID=' + id + '&millsec=' + time.getMilliseconds()
}

function openClientDoc(url) {
    window.open(url, 'Document', 'height=600,width=1000,status=yes,toolbar=no,menubar=no,location=no');
}

var serviceResultTextArray = [];
var serviceResultCount = 0;


var GetCampaignGroupResult = {
    "Data": {
        "CampaignGroupList": [
        {
            "CampaignGroupId": 51,
            "CampaignGroupName": "Make an Appointment",
            "ClientCount": 175,
            "OfficeId": 0,
            "PsftId": null
        },
        {
            "CampaignGroupId": 52,
            "CampaignGroupName": "Appointment Reminder",
            "ClientCount": 41,
            "OfficeId": 0,
            "PsftId": null
        },
        {
            "CampaignGroupId": 54,
            "CampaignGroupName": "Thank You",
            "ClientCount": 7,
            "OfficeId": 0,
            "PsftId": null
        }
        ]
    },
    "DurationMillis": "2424",
    "ErrorCode": null,
    "Status": null
};


