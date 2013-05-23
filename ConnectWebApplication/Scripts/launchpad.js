var ToggleStyleType = { addCss: 1, removeCss: 2 }
//var personseqid;

var ind;
var prevclientselected;
//var changeclient = false;

var mypopup;

/// common file for jquery styling and validation for forms elements on the page
//var ajaxRequest;

//var contactProfileResult;

function bindingprogramlist() {
    var time = new Date();
    var t = time.getMilliseconds();
    if ($('#psid').html() == "") {
        return;
    }
    $.ajax({ url: $('#clientdataurl').html() + 'GetCampaignGroup/' + $('#psid').html() + '?millsec=' + t,
        type: "GET",
        dataType: "jsonp",
        timeout: 10000,
        success: function (s) {
           
            viewModel.Assignmentlist(s.Data.CampaignGroupList);
            changeclient = true;
        },
        error: function () {
            return "Error";
        }
    });
}

//Remove This 
function computeTaxProName(value) {
    var camelCaseName = ' ';

    if (value && value.TpFirstName != '') {
        camelCaseName = toTitleCase(value.TpFirstName) + ' ' +toTitleCase((value.TpLastName != '') ? (value.TpLastName) : (''));
    }

    return camelCaseName;
}
//Remove This 
function toTitleCase(str) {

    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });

}

//Remove This 
function parseOfficeAddress(value) {
  var officeAddress = ' ';
  if (value && value.OfficeId != "" && value.OfficeAddress != "" && value.OfficeCity != "") {
      officeAddress = value.OfficeId + "-" + value.OfficeAddress + "," + "\n"  + ((value.OfficeState != "") ? (value.OfficeCity + "," + value.OfficeState) : (value.OfficeCity)) + "\n" + value.OfficeZipCode ;
  }
 
  return officeAddress;
}


//Remove This 
function parseSearchListResult(s) {

    viewModel.clientSearchListLength(s.Data.length);
    $.each(s.Data, function (index, value) {
        this.ComputedOfficeAddress = '';
        this.ComputedOfficeAddress = parseOfficeAddress(value);
        this.ComputedTPName = computeTaxProName(value);
    });
    viewModel.clientSearchList(s.Data);
    if (s.Data.length == 0) {
        viewModel.searchResultText("There were no clients found, please refine your search.");

    }
    $("#ClientSearchGrid").tablesorter();
    $("#loadingBar").hide();
    $("#noSearchResult").show();

}

//Remove This 
function GetClientSearchList(fName, lName, ssn, dob) {
    HideCenterPanel();
    viewModel.isClientSearchTemplate = true;
    $("#noSearchResult").hide();
    $("#loadingBar").show();

    //var data = '[{ "DateOfBirthStr": "May 10", "EnterpriseTenure": null, "FirstName": "Block", "GIID": 0, "Id": 685307, "Last4SSN": "0002", "LastName": "Abner", "OfficeAddress": "", "OfficeCity": "", "OfficeId": "", "OfficePhone": "", "OfficeState": "", "OfficeZipCode": "", "RetailTenure": null, "SpouseDateOfBirthStr": "", "SpouseFirstName": "", "SpouseId": 0, "SpouseLast4SSN": null, "SpouseLastName": "", "TpFirstName": "", "TpLastName": "" }]';
    //var m_data = '[{"CampaignDetail": null, "CampaignNm": "new title", "Comment": null, "ContactDate": null, "ContactDateStr": "09\/30\/2011", "ContactInitiator": 0, "ContactInitiatorId": null, "ContactMadeBy": "Linda Madill", "ContactResultType": null, "ContactSource": null, "ContactTime": null, "ContactType": "Mail", "ContactTypeId": 0, "ContactTypeSourceId": null, "CreateTime": null, "DiscountAmount": null, "Id": 1001221, "LocationSeqId": null, "Person": null, "PersonContactId": 0, "PersonSeqId": 0, "ProcessTypeId": 0, "isCampaignPdfAvailable": 109"}]';
    //viewModel.clientSearchList(m_data);

    var time = new Date();
    $.ajax({ url: $('#clientdataurl').html() + 'Search?firstName=' + fName + '&lastName=' + lName + '&ssn4=' + ssn + '&birthDate=' + dob + '&maxRows=10',

        type: "GET",
        dataType: "jsonp",
        timeout: 10000,
        success: function (s) {

            parseSearchListResult(s);
        },
        error: function () {
            $("#loadingBar").hide();
            $("#noSearchResult").show();
            viewModel.searchResultText("Error in Client Search.");
        }
    });

}
//Remove This 
function Clientlist(index, Id) {
    var time = new Date();
    programid = Id;
    ind = index;
    $.ajax({ url: $('#clientdataurl').html() + 'GetList/?programTypeId=' + Id + '&peopleSoftId=' + $('#psid').html() + '&sortBy=abc&asc=true&index=' + index + '&pagesize=10' + '&millsec=' + time.getMilliseconds(),
        type: "GET",
        dataType: "jsonp",
        timeout: 10000,
        success: function (s) {
            viewModel.clientlist(s.Data.Clients);
            viewModel.count(s.Data.TotalClients);

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
        },
        error: function (xhr) {
            if (!xhr) return;
            if (xhr.responseText) {
                var err = JSON2.parse(xhr.responseText);
                var err = xhr.responseText;
                if (err)
                    alert(err);
                else
                    error({ Message: "Unknown server error." })
            }
        }
    });
}

//Remove THIS 
function checkSearchAndSpouseNavigation(s) {

    if (programClientId && spouseClientId && (programClientId != spouseClientId)) {
        if (s.Data) {
            s.Data.ContactProfileList = null;
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

        var keyMessages = '';
        $.each(s.Data.ContactProfileList, function () {
            if (this.KeyMessagesList) {

                $.each(this.KeyMessagesList, function () {
                    if (keyMessages != '') {
                        keyMessages += ', ';
                    }
                    keyMessages += this.m_key_message_desc_txt;
                });
            }
            this.m_key_message_desc_txt = keyMessages;
        });



        //s.Data.ContactProfileList.KeyMessagesList = keyMessages;

        viewModel.contactprofile(s.Data.ContactProfileList);

    }

}

//Remove THIS 
function GetContactProfile(id, programid) {
    personseqid = id;
    viewModel.contactprofile([]);
    var time = new Date();
    $.ajax({ url: $('#clientdataurl').html() + 'GetContactProfileInfo/' + id + '?millsec=' + time.getMilliseconds() + '&programTypeId=' + programid + '&OfficeID=' + OfficeID,
        type: "GET",
        dataType: "jsonp",
        timeout: 10000,
        success: function (s) {

            contactProfileResult = s;

         //   showOrHideAppointmentUrl(s);

            checkSearchAndSpouseNavigation(s);


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
        },
        error: function (xhr) {
            if (!xhr) return;
            if (xhr.responseText) {
                var err = JSON2.parse(xhr.responseText);
                var err = xhr.responseText;
                if (err)
                    alert(err);
                else
                    error({ Message: "Unknown server error." })
            }
        }
    });
}
function GetServiceActivity(id) {
    var time = new Date();
    $.ajax({ url: $('#clientdataurl').html() + 'GetServiceListByPersonId/' + id + '?millsec=' + time.getMilliseconds(),
        type: "GET",
        dataType: "jsonp",
        timeout: 10000,
        success: function (s) {
            viewModel.curYearService($.grep(s.Data, function (item, i) {
                if (item.isCurrentYear) {
                    if (item.RefundAmt < 0) {
                         item.RefundAmtStr = "<span>Bal Due</span><br /> $" +  (item.RefundAmt * -1) + ".00";
                    }
                   else
                    {
                        item.RefundAmtStr = "<span>Refund</span><br /> $" + item.RefundAmt + ".00";
                    }

                    return item;
                }
            }));
            viewModel.preYearService($.grep(s.Data, function (item, i) {
                if (!item.isCurrentYear) {

                    if (item.RefundAmt < 0) {
                        item.RefundAmtStr = "<span>Bal Due</span><br /> $" + (item.RefundAmt * -1) + ".00";
                    }
                    else {
                        item.RefundAmtStr = "<span>Refund</span><br /> $" + item.RefundAmt + ".00";
                    }
                   
                    return item;
                }
            }));
        },
        error: function (xhr) {
            if (!xhr) return;
            if (xhr.responseText) {
                var err = JSON2.parse(xhr.responseText);
                var err = xhr.responseText;
                if (err)
                    alert(err);
                else
                    error({ Message: "Unknown server error." })
            }
        }
    });
}
function GetUpComingApts(id) {
    var time = new Date();
    $.ajax({ url: $('#clientdataurl').html() + 'GetUpcomingAptsByPersonId/' + id + '?millsec=' + time.getMilliseconds() + '&OfficeId=' + OfficeID,
        type: "GET",
        dataType: "jsonp",
        timeout: 10000,
        success: function (s) {
            viewModel.upComingApts(s.Data.ApptInfoList);
            showOrHideServiceActivityAppointmentUrl(s.Data.AppointmentUrl);
        },
        error: function (xhr) {
            if (!xhr) return;
            if (xhr.responseText) {
                var err = JSON2.parse(xhr.responseText);
                var err = xhr.responseText;
                if (err)
                    alert(err);
                else
                    error({ Message: "Unknown server error." })
            }
        }
    });
}


function GetDocumentList(id) {
    var time = new Date();
    currentYear = 9999;
    $.ajax({ url: $('#clientdataurl').html() + 'GetDocumentList/' + id + '?millsec=' + time.getMilliseconds(),
        type: "GET",
        dataType: "jsonp",
        timeout: 10000,
        success: function (s) {

            if (s.Data != null && s.Data.userid != "-1") {
                viewModel.guaUserId = s.Data.userid;
                            
                viewModel.docList(parseDocumentListTreeStructure(s.Data.documentList));
                DocumentTreeLayout();
            }
            else {
                if (result.Data != null) {
                    viewModel.guaUserId = s.Data.userid;
                }
                else {
                    viewModel.guaUserId = null;
                }
            }
        },
        error: function (xhr) {
            if (!xhr) return;
            if (xhr.responseText) {
                var err = JSON2.parse(xhr.responseText);
                var err = xhr.responseText;
                if (err)
                    alert(err);
                else
                    error({ Message: "Unknown server error." })
            }
        }
    });
}
 
// Remove This
function parseDocumentListTreeStructure(docList) {
    var structuredDocumentList = [];

    //structuredDocumentList.push({ "fileName": "2012 Filing Year", "fileSize": "", "timeUploaded": "02/11/2013", "notes": "" });

    $.each(docList, function (index, value) {

        if ((docList[index].taxYear) && (docList[index].taxYear != 'null')) {

           
        }
        else
        {

            var curr_year = new Date().getFullYear();
            docList[index].taxYear = curr_year;
        }


        if (docList[index].taxYear < currentYear) {
            currentYear = docList[index].taxYear;

            structuredDocumentList.push({ "fileName": "  " + currentYear + " Filing Year", "fileSize": "",
                "notes": "", "rowNodeId": "node-" + currentYear, "rowClassName": "folder"
            });

        }

             
        docList[index].rowNodeId = "node-" + docList[index].taxYear + 'c1';
        docList[index].rowClassName = "child-of-node-" + docList[index].taxYear;
                
        structuredDocumentList.push(docList[index]);
    });

    return structuredDocumentList;
}

//Remove This 
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
      viewClientDoc($.tmplItem(this).data.fileId);
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
    $("table#documentTable tbody tr").mousedown(function() {
      $("tr.selected").removeClass("selected"); // Deselect currently selected rows
      $(this).addClass("selected");
    });

    // Make sure row is selected when span is clicked
    $("table#documentTable tbody tr span").mousedown(function() {
      $($(this).parents("tr")[0]).trigger("mousedown");
    });


  $("#documentTable").tablesorter();



}

//Copied Donot Copy this is result
function onGetBasicInfoDetails(index,data) {

    
    viewModel.datalist(data);
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

//Remove this 
function clientselectedbind(index) {
    if ($("#notes1").val() == '' || $("#notes1").val() == undefined) {

        if (ajaxRequest && ajaxRequest.readyState != 4) {
            ajaxRequest.abort();
        }
        if (unsavedchangesalert()) {
            changeclient = true;
            prevclientselected = index;
            $("#tempcontactresult").html('');
            viewModel.tempradioid([]);
            $("#tempnotes").html('');
            viewModel.temphtmlvalues([]);
            var time = new Date();
        ajaxRequest=    $.ajax({ url: $('#clientdataurl').html() + 'GetBasicInfo/' + index + '?millsec=' + time.getMilliseconds(),
                type: "GET",
                dataType: "jsonp",
                timeout: 10000,
                success: function (s) {
                     onGetBasicInfoDetails(index, s.Data);
                },
                error: function (xhr) {
                    if (!xhr) return;
                    if (xhr.responseText) {
                        var err = JSON2.parse(xhr.responseText);
                        var err = xhr.responseText;
                        if (err)
                            alert(err);
                        else
                            error({ Message: "Unknown server error." })
                    }
                }
            });
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
            var time = new Date();
          ajaxRequest =  $.ajax({ url: $('#clientdataurl').html() + 'GetBasicInfo/' + index + '?millsec=' + time.getMilliseconds(),
                type: "GET",
                dataType: "jsonp",
                timeout: 10000,
                success: function (s) {
                    viewModel.datalist(s.Data);
                    GetContactProfile(index,programid);
                },
                error: function (xhr) {
                    if (!xhr) return;
                    if (xhr.responseText) {
                        var err = JSON2.parse(xhr.responseText);
                        var err = xhr.responseText;
                        if (err)
                            alert(err);
                        else
                            error({ Message: "Unknown server error." })
                    }
                }
            });
        }
        else {
            changeclient = false;
        }
    }
}
function GetContactActivity(id) {
    var time = new Date();
    $.ajax({ url: $('#clientdataurl').html() + 'GetContactHistory/' + id + '?startIndex=0&maxRows=100&sortExpression=' + '&millsec=' + time.getMilliseconds(),
        type: "GET",
        dataType: "jsonp",
        timeout: 10000,
        success: function (s) {
            viewModel.contactactivitylength(s.Data.length);
            viewModel.contactactivity(s.Data);
            $("#example").tablesorter();
        },
        error: function () {
            alert("error");
        }
    });
}
//function GetContactActivitydetails(contactactivityid) { }

//Already Copied
function pdfopen(id) {
    var time = new Date();
    $.fancybox({
        'width': '75%',
        'height': '75%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe',
        'href': 'https://' + window.location.host + '/Connect/Modules/Campaigns/Download.ashx?CampaignPdfID=' + id + '&millsec=' + time.getMilliseconds()
        // 'href': 'http://localhost:51724/Connect/Modules/Campaigns/Download.ashx?CampaignPdfID=' + id + '&millsec=' + time.getMilliseconds()
    });
}

//Remove This 
function callcontactexpand(contactactivityid) {
    var time = new Date();
    var m_imagePath = $("#img" + contactactivityid).attr("src");
    var m_serviceURL = $('#lblContactDetailsServiceURL').html() + 'GetContactActivityDetails/' + contactactivityid + '?millsec=' + time.getMilliseconds();

    if (m_imagePath.indexOf("Styles/images/ctrlExpand.png") >= 0) {
        $(".icon").attr("src", "Styles/images/ctrlExpand.png");
        $(".expandedactivity").remove();
        // $.ajax({ url:'http://localhost:51724/Connect/Services/ContactDetails.svc/GetContactActivityDetails/' + contactactivityid + '&millsec=' + time.getMilliseconds(),
        $.ajax({ url: m_serviceURL,
            type: "GET",
            dataType: "jsonp",
            timeout: 10000,
            success: function (s) {
                if (s != null) {
                    $("#tr" + contactactivityid).after("<tr class='expandedactivity'><td class='expanded rightBorder' colspan='6'>" + s.Data + "</td></tr>");
                    $("#img" + contactactivityid).attr("src", "Styles/images/ctrlCollapse.png");
                }
                else {
                    $("#tr" + contactactivityid).after("<tr class='expandedactivity'><td class='expanded rightBorder'  colspan='6'>Cannot retrieve Data.</td></tr>");
                    $("#img" + contactactivityid).attr("src", "Styles/images/ctrlCollapse.png");
                }
            },
            error: function (s) {
                alert("error");
            }
        });
    }
    else {
        $("#img" + contactactivityid).attr("src", "Styles/images/ctrlExpand.png");
        $(".expandedactivity").remove();
    }

}
//Remove This 
function saveclicked(ContactQueueId) {
    var result = checkselection(ContactQueueId);
    var time = new Date();
    if (result != null) {
        var notetext = $("#notes1").val();
        notetext = notetext.replace(/\'/g, "%26apos;");
        notetext = notetext.replace(/\&/g, "%26");
        notetext = notetext.replace(/\#/g, "%23");
        notetext = notetext.replace(/\+/g, "%2B");
        notetext = notetext.replace(/\</g, "%26lt;");
        notetext = notetext.replace(/\>/g, "%26gt;");
        notetext = notetext.replace(/\_/g, "%5F");
        //perform a save action
        //call the save service
        // $.ajax({ url: 'http://localhost:50000/Connect/Services/ContactDetails.svc/SaveContactResult/' + ContactQueueId + '?ssoid=' + '123456' + '&callResult=' + result + '&officeID=' + '99999' + '&comment=' + notetext + '&millsec=' + time.getMilliseconds(),

        // $.ajax({ url: 'https://' + window.location.host + '/Connect/Services/ContactDetails.svc/SaveContactResult/' + ContactQueueId + '?ssoid=' + $("#ssoid").html() + '&callResult=' + result + '&officeID=' + $("#Officeid").html() + '&comment=' + notetext + '&millsec=' + time.getMilliseconds(),
        $.ajax({ url: $('#lblContactDetailsServiceURL').html() + 'SaveContactResult/' + ContactQueueId + '?ssoid=' + $("#ssoid").html() + '&callResult=' + result + '&officeID=' + $("#Officeid").html() + '&comment=' + notetext + '&millsec=' + time.getMilliseconds(),
            type: "GET",
            dataType: "jsonp",
            timeout: 10000,
            success: function (s) {
                window.setTimeout(reloadclientlist, 100);
                window.setTimeout(reloadcontactprofiletab, 100);
            },
            error: function () {
                alert("error");
            }
        });

    }
    else {
        alert('Contact Profile: You must choose a contact result in order to save.');
    }
}
// Check Until Here 
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
    GetContactProfile(personseqid,programid);
};
function reloadclientlist() {
    Clientlist(ind, programid);
    $(".fade").remove();
    $("#header").prepend('<div class="fade" style="background-color:orange;width:100%;height:30px;">successfully saved!!!</div>');
    $(".fade").fadeOut(6000);
    //alert("saved successfully");
    $("#tempcontactresult").html('');
    viewModel.tempradioid([]);
    $("#tempnotes").html('');
    viewModel.temphtmlvalues([]);
};
function checkpreviousvalue() {
    if ($("#tempnotes").html() == '') {
        viewModel.temphtmlvalues($("#tempnotes").html());

    }
    else {
        viewModel.temphtmlvalues($("#tempnotes").html());
    }
    if ($("#tempcontactresult").html() == '') {
    }
    else {
        viewModel.tempradioid($("#tempcontactresult").html());
    }
};
function savetempradioselection(radiobtnid) {
    $("#tempcontactresult").html(radiobtnid);
};
function unsavedchangesalert() {
    if ($("#tempnotes").html() == '' && $("#tempcontactresult").html() == '') {
        return true;
    }
    else {
        var answer = confirm("Contact Profile: There are unsaved changes. Do you want to continue?")
        if (answer) {
            $("#tempnotes").html('');
            $("#tempcontactresult").html('');
            return true;
        }
        else {
            return false;
        }
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

function viewClientDoc(fileId) {
    
    var time = new Date();
    var getDocumentUrl = $('#clientdocurl').html() + '?docPath=' + viewModel.guaUserId + '/document/' + fileId + '&millsec=' + time.getMilliseconds();

    var id = 4;
    //$.fancybox({
    //    'width': '90%',
    //    'height': '100%',
    //    'autoScale': true,
    //    'transitionIn': 'none',
    //    'transitionOut': 'none',
    //    'type': 'iframe',
    //    //'href': 'http://localhost:50000/Connect/Services/GetDocument.aspx?docPath=' + getDocumentUrl + '&millsec=' + time.getMilliseconds()
    //    'href': getDocumentUrl
    //  });
    window.open(getDocumentUrl,'_blank' ,'height=600,width=1000,status=yes,toolbar=no,menubar=no,location=no');
}




