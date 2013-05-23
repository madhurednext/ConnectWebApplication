/*Function called on Center panel icons clicked */
function imgbtnclick(url1) {
    window.location.href = url1;
};
var temppsid;
var btnurls = [{ src: "Images/CreateReturn.png", url: "", linktext: "TPA" }, { src: "Images/iconConnect.png", url: "/connect/default.aspx", linktext: "Connect" }, { src: "Images/Contacts.png", url: "", linktext: "Compass" }, { src: "Images/AnotherFunction.png", url: "", linktext: "Email" }, { src: "Images/AnotherFunction.png", url: "", linktext: "Error"}];
var btnclass = function (btnurl) {
    this.url = btnurl.url;
    this.src = btnurl.src;
    this.linktext = btnurl.linktext
};
var page = 1;
var pageSize = 10;
var totallists;
/*To generate call list on pageload */
function clientlist() {
    temppsid = null;  
    CallService($('#clientdataurl').html(),page,pageSize, $('#psid').html()); 
};
/*function just needed to save when the taxpro is in officeview and on a particular person*/
function clientlistsave() {
  if(temppsid != null)
  {     
    CallServicewithPsid($('#clientdataurl').html(),temppsid, $('#Officeid').html());
  }
};
function clientlistOnExpClick(PsftId) {    
  //  CallService($('#clientdataurl').html(), page, pageSize, PsftId); 
    CallServicewithPsid($('#clientdataurl').html(), PsftId, $('#Officeid').html());   
};
function clientlistoffSave() {   
    CallServicewithPsid($('#clientdataurl').html(), temppsid, $('#Officeid').html());
};
function officelist() {           
    Officeservice($('#clientdataurl').html(), $('#Officeid').html());      
};
function Officeservice(url, value) {
    var time = new Date();
    $.ajax({ url: url + 'GetExpCustomerListForOffice',
        data: { 'officeId': value, 'millisec': time.getMilliseconds() },
        type: "GET",
        dataType: "jsonp",
        timeout: 10000,
        success: function (Tplist) {
            if (Tplist.d != null)
            { officebind(Tplist.d); }
            else {
                //totallists = Tplist.length;
                viewModel.count(Tplist.TotalCount);
                if (Tplist.OfficeAddress != null)
                { viewModel.officeadd('<p>' + Tplist.OfficeAddress.GlDeptId + '&nbsp;&ndash;' + Tplist.OfficeAddress.Address1 + '<br />' + Tplist.OfficeAddress.City + '&nbsp;' + Tplist.OfficeAddress.State + '&nbsp;' + Tplist.OfficeAddress.ZipCode + '</p>'); }
                officebind(Tplist.OfficeData);
            }
        },
        error: function (xhr) {
        }
    });              
};
/*Service Call to get list of clients*/
function CallService(url, page, pageSize, value) {      
    var time = new Date();
    $.ajax({ url: url + 'GetNCPClientData',
        data: { 'psid': value, 'page': page, 'pageSize': pageSize, 'millisec': time.getMilliseconds() },
        type: "GET",
        dataType: "jsonp",
        timeout: 10000,
        success: function (customers) {
            if (customers.d != null) {
                if (customers.d.ClientList != null) {
                    totallists = customers.d.TotalCount;
                    clientbind(customers.d.ClientList);
                }
            } else {
                if (customers.ClientList != null) {                  
                    totallists = customers.TotalCount;
                    clientbind(customers.ClientList);
                }
            }
        },
        error: function (xhr) {          
        }
    });            
};
function CallServicewithPsid(url, value, officeid) {   
    var time = new Date();
    $.ajax({ url: url + 'GetPagedNCPClientData',
        data: { 'psid': value, 'officeID': officeid, 'page': page, 'pageSize': pageSize, 'millisec': time.getMilliseconds() },
        type: "GET",
        dataType: "jsonp",
        timeout: 10000,
        success: function (customers) {
            if (customers.d != null) {
                if (customers.d.ClientList != null) {
                    totallists = customers.d.TotalCount;
                    clientbind(customers.d.ClientList);
                }
            } else {
                if (customers.ClientList != null) {
                    totallists = customers.TotalCount;
                    clientbind(customers.ClientList);
                }
            }
        },
        error: function (xhr) {
          //  alert(xhr.responseText);
        }
    });             
};
/*Service Call to save the Result for my view */
function SaveService(url, cntqid, result) {
    var time = new Date();
    $.ajax({ url: url + 'SaveCallAction',
        data: { 'cntQueueSeqId': cntqid, 'ssoid': $('#ssoid').html(), 'callResult': result, 'officeId': $('#Officeid').html(), 'millisec': time.getMilliseconds() },
        type: "GET",
        dataType: "jsonp",
        timeout: 10000,
        success: function () {
            closed();
             $("#mycarousel").removeData();
            if (temppsid == null) {
                window.setTimeout(clientlist, 100);
            }
            else {
                window.setTimeout(clientlistsave, 100);
            }
        },
        error: function (xhr) {
            // alert(xhr.responseText);
        }
    });
};
/*Service Call to save the Result for office view */
function SaveServiceoffice(url, cntqid, result, psid) {
    var time = new Date();
    $.ajax({ url: url + 'SaveCallAction',
        data: { 'cntQueueSeqId': cntqid, 'ssoid': $('#ssoid').html(), 'callResult': result, 'officeId': $('#Officeid').html(), 'millisec': time.getMilliseconds() },
        type: "GET",
        dataType: "jsonp",
        timeout: 10000,
        success: function () {
            closed();
            $("#mycarousel").removeData();
            viewModel.officelistobj([]);
            viewModel.c1([]);
            window.setTimeout(officelist, 100);
            temppsid = psid;
            window.setTimeout(clientlistoffSave, 100);
        },
        error: function (xhr) {
            // alert(xhr.responseText);
        }
    }); 
};
/*Service Call to get Talking points*/
function Talkinptsoverlay(url, prodcell) {
    $.ajax({ url: url + 'GetCampaignTalkingPts',
        data: { 'prodCellId': prodcell },
        type: "GET",
        dataType: "jsonp",
        timeout: 10000,
        success: function (d) {
           // alert(d);
             talkingpts(d);
        },
        error: function (xhr) {
            // alert(xhr.responseText);
        }
    });    
};
/*To show Talking points in Fancybox*/
function talkingpts(htmlstring) {    
    $.fancybox({
        'width': '40%',
        'height': '50%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'html',
        'content': '<div id="testing" >'
                    + '<div class="close" style="text-align:right">' +
                    '<a href="javascript:;" onclick="parent.$.fancybox.close();">'
                    + '<img  border="0" height="20" src="/Connect/Images/ctrlClosed.png" width="20" />' +
                    '</a></div>' + htmlstring +
                    '</div>',
        'modal': true
    });
};
/*Service Call to Get campaign pdf*/
function modelCarousel_initCallback(carousel) {
    theModelCarousel = carousel;    
};
/*To Call save service for my view*/
function save(id) {
    var val = checkselection(id);
    if (val != null) {
        SaveService($('#clientdataurl').html(), id, val);
    }
    else {
        alert("Select Call Result");
    }
}; 
/*To Call save service for office view*/
function saveoffice(id,psid) {
    var val = checkselection(id);
    if (val != null) {     
        SaveServiceoffice($('#clientdataurl').html(), id, val,psid);
    }
    else {
        alert("Select Call Result");
    }
};
/*To verify selected Result*/
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
/*On Close button clicked*/
function closebtn(id) {
    var val = checkselection(id);
    if (val != null) { if (confirm('Do you want to close without saving?')) { closed(); } }
    else { closed(); }
};
/*add/remove class to show and hide the center panel*/
function closed() {
    $('.licall-clicked').removeClass('licall-clicked');
    $("#panel").addClass("panehide");
    $('#buttonpanel').removeClass("panehide");
};
/*To bind the data to the center panel when client is clicked*/
function clientclick() {
    $("#datapanel").html('');
    $('#buttonpanel').addClass("panehide");
    $("#panel").removeClass("panehide");
    $("#datapanel").append($(this).html());
    $('.licall-clicked').removeClass('licall-clicked');
    $(this).parent().addClass('licall-clicked');
};
/*Bind the OfficeClient List data*/
var pp;
var itmcnt = 0;
var excol;
function officebind(offlist) {   
    totcountoffview = 0;
    if (offlist.length > 0) {       
        viewModel.officelistobj(offlist);      
    }
    $('#mycarousel').jcarousel({
        vertical: true,
        scroll: 10,
        itemFallbackDimension: 241
       // initCallback: carousel_callbackoffview,
        //--Added for removing autogenerated buttons
       // buttonNextHTML: null,
       // buttonPrevHTML: null           
    });
    $("#mycarousel").removeData();
    //$("#spanofficeid").html($(".office").html());  
    $('#panel').addClass("panehide");
    $('#buttonpanel').removeClass("panehide");
    $('.licall').click(function () {
        $("#datapanel").html('');
        $('#buttonpanel').addClass("panehide");
        $("#panel").removeClass("panehide");
        $("#datapanel").append($(this).children('.divcall').html());
        $('.licall-clicked').removeClass('licall-clicked');
        $(this).addClass('licall-clicked');
    });   
};
function carousel_callback(carousel, state) {
    carousel.remove();
};
/*Expand Collapse functionality*/
function expcol(id) {
   // alert($("#" + id).children().find(".spanNameBottom").html());
    $("#Ofidshowhide").html("For " + $("#" + id).children().find(".spanNameBottom").html() + "<br />Office " + $('#Officeid').html());
    $("#Ofidshowhide").show();
    viewModel.officelistobj();  
    $(".switch").removeClass('Myview');
    $(".switch").addClass('officeview');
    $(".switch").attr('src', 'Styles/images/ctrlListBack.png');
    //$("#Ofidshowhide").hide();
    viewModel.c([]);
    page = 1;
    temppsid = id;
    $("#mycarousel").animate({ height: 'hide' }, 1000).removeData();
    clientlistOnExpClick(id);    
    viewModel.chosenView.remove("OfficeView");
    viewModel.chosenView.push("TaxproView");
    $("#mycarousel").animate({ height: 'show' }, 1000); 
};
/*Bind client list on expand collapse button click for Office view*/
function clientbindExpClick(clients) {   
    viewModel.c1(); 
    viewModel.c1(clients);
    officelist();
};
//var finalt = page - 1;
function carousel_callback(carousel, state) { 
        $('#mycarousel-prev').remove();   
        $('#mycarousel-next').remove();  
        $(".jcarousel-container").append("<DIV id='mycarousel-prev' style='DISPLAY: block' class='jcarousel-prev jcarousel-prev-vertical  jcarousel-prev-disabled-vertical' ></DIV>");
        $(".jcarousel-container").append("<DIV id='mycarousel-next' style='DISPLAY: block' class='jcarousel-next jcarousel-next-vertical  jcarousel-next-disabled-vertical' ></DIV>");
        btnshowhide();
        $('#mycarousel-next').stop();
        $('#mycarousel-prev').stop();
        $('#mycarousel-next').click(function () {
            if ((totallists - page * pageSize) > 0) {
                page = page + 1;
               // $("#mycarousel").removeData();
                $("#mycarousel").animate({ height: 'hide'},1000).removeData();
                $('#mycarousel-next').unbind('click');
                $('#mycarousel-prev').unbind('click');
                if (temppsid == null) {                   
                    clientlist();
                    //remove the next line to remove animation                  
                    $("#mycarousel").animate({ height: 'show' }, 1000);
                }
                else {
                    clientlistOnExpClick(temppsid);
                    //remove the next line to remove animation                  
                    $("#mycarousel").animate({ height: 'show' }, 1000);
                }
                btnshowhide();
                $('#mycarousel-next').bind('click');
                $('#mycarousel-prev').bind('click');
            }
        });
        $('#mycarousel-prev').click(function () {        
                if (page > 1) {
                    page = page - 1;
                  //  $("#mycarousel").removeData();
                    $("#mycarousel").animate({ height: 'hide' }, 1000).removeData();
                    $('#mycarousel-next').unbind('click');
                    $('#mycarousel-prev').unbind('click');
                    if (temppsid == null) {
                        //remove the next line to remove animation
                        $("#mycarousel").animate({ height: 'show' }, 1000);
                        clientlist();
                    }
                    else {
                        clientlistOnExpClick(temppsid);
                        //remove the next line to remove animation                  
                        $("#mycarousel").animate({ height: 'show' }, 1000);
                    }
                    btnshowhide();
                    $('#mycarousel-next').bind('click');
                    $('#mycarousel-prev').bind('click');                  
                }          
        });
        }       
function btnshowhide() {
    if ((totallists - page * pageSize) > 0) {
        $('#mycarousel-next').removeClass('jcarousel-next-disabled-vertical');     
    }
    if (page > 1) {
        $('#mycarousel-prev').removeClass('jcarousel-prev-disabled-vertical');     
    }
} 
/*Bind client list for taxpro view*/
function clientbind(clients) {              
       viewModel.c([]);
       viewModel.c(clients);
       viewModel.count(totallists);       
       if (clients.length > 0) {                         
                $('#mycarousel').jcarousel({
                    vertical: true,
                    scroll: 1,
                    itemFallbackDimension: 241,
                    initCallback: carousel_callback ,
                    //--Added for removing autogenerated buttons
                    buttonNextHTML: null,
                    buttonPrevHTML: null
                });               
        $('#panel').addClass("panehide");
        $('#buttonpanel').removeClass("panehide");
        $('.licall').stop();
        $('.licall').click(function () {
            $("#datapanel").html('');
            $('#buttonpanel').addClass("panehide");
            $("#panel").removeClass("panehide");
            $("#datapanel").append($(this).children('.divcall').html());
            $('.licall-clicked').removeClass('licall-clicked');
            $(this).addClass('licall-clicked');
        });       
    }
    else {
        viewModel.count(0);      
    }
};
/*Back button officeview to my view*/
function officeview() {
   // if ($(".switch").hasClass('Myview')) {
        officelist();
       viewModel.chosenView.remove("TaxproView");
        viewModel.chosenView.push("OfficeView");
 //   }
}
/* expansion collapsion function not used */
function expandcollapse(t) {
    $('.licalloffice').click(function () {        
        if ($(this).hasClass('collapse')) {
            $(this).nextUntil('.licalloffice').removeClass('hide');
            $(this).removeClass('collapse');
            $(this).children().find('img').attr('src', 'Images/ctrlCollapse.png');
        }
        else {
            $(this).nextUntil('.licalloffice').addClass('hide');
            $(this).addClass('collapse');
            $(this).children().find('img').attr('src', 'Images/ctrlExpand.png');
        }
    });
};
/*Function called on load and call the appropriate function myview or officeview based on user selection*/
function bindingdata() {
    $(document).ready(function () {
        // future to add templates dynamically 
        // $(function () { ensureTemplates(["TaxproTmpl"]); });          
        $("#Ofidshowhide").text("My Clients (all offices)");
        $("#Ofidshowhide").show();
        clientlist();
        $(".switch").click(function () {           
            if ($(".switch").hasClass('officeview')) {
                $(".switch").removeClass('officeview');
                $(".switch").addClass('Myview');
                $(this).attr('src', 'Styles/images/ctrlMyView.png');
                $("#Ofidshowhide").text("For Office " + $('#Officeid').html());
                $("#Ofidshowhide").show();
                page = 1;
                //use for animation effects
                //$("#wrap").animate({ width: 'hide' }, 1000);
                viewModel.c([]);
                viewModel.officelistobj([]);
                officelist();
                //use for animation effects
                //$("#wrap").animate({ width: 'show' }, 1000);
                viewModel.chosenView.remove("TaxproView");
                viewModel.chosenView.push("OfficeView");
            }
            else {
                if ($(".switch").hasClass('Myview')) {
                    $(".switch").removeClass('Myview');
                    $(".switch").addClass('officeview');
                    $(this).attr('src', 'Styles/images/ctrlListBack.png');
                    $("#Ofidshowhide").text("My Clients (all offices)");
                    $("#Ofidshowhide").show();
                    page = 1;
                    //use for animation effects
                    //$("#wrap").animate({ width: 'hide' }, 1000);
                    viewModel.c([]);
                    viewModel.officelistobj([]);
                    clientlist();
                    //use for animation effects
                    //$("#wrap").animate({ width: 'show' }, 1000);
                    viewModel.chosenView.remove("OfficeView");
                    viewModel.chosenView.push("TaxproView");
                }
            }           
        });
    });
};
/*(Not used)Function to add templates dynamically*/
function ensureTemplates(list) {
    var loadedTemplates = [];
    ko.utils.arrayForEach(list,
                  function (name) {
                      $.get("Templates/" + name + ".html",
                    function (template) {
                        $("body").append("<script id=\"" + name + "\" type=\"text/html\">" + template + "<\/script>"); loadedTemplates.push(name);
                        if (list.length === loadedTemplates.length)
                        { ko.applyBindings(viewModel); }
                    });
                  });
}
/*(Not used)Function to find Browser*/
function browserName() {
    var browser = "";
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("opera") != -1) {
        browser = "opera";
    } else if (ua.indexOf("msie") != -1) {
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
            var ieversion = new Number(RegExp.$1);
            if (ieversion >= 9)
                browser = "IE9";
            else if (ieversion >= 8)
                browser = "IE8";
            else if (ieversion >= 7)
                browser = "IE7";
            else if (ieversion >= 6)
                browser = "IE6";
            else if (ieversion >= 5)
                browser = "IE5";
        } else { browser = "msie"; }
    } else if (ua.indexOf("safari") != -1) {
        browser = "safari";
    } else if (ua.indexOf("mozilla") != -1) {
        if (ua.indexOf("firefox") != -1) {
            browser = "firefox";
        } else { browser = "mozilla"; }
    } document.write('<link type=\"text/css\" href=\"/Styles/' + browser + '.css\" rel=\"stylesheet\">');
};
