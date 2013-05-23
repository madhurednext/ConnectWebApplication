function BaseWCFServiceCall(serviceUrl, method, data, callback, error, bare) {
    var dataServiceURL = $("input[id$=dataServiceUrlCampaign]").val();
    alert(dataServiceURL);
    var Proxy = new serviceProxyCampaign(dataServiceURL);
}

function serviceProxyCampaign(serviceUrl) {
    var _I = this;
    this.serviceUrl = serviceUrl;
    // *** Call a wrapped object
    this.invoke = function (method, data, callback, error, bare) {
        // *** Convert input data into JSON - REQUIRES Json2.js       
        //var json = JSON2.stringify(data);
        // *** The service endpoint URL            	
        var url = _I.serviceUrl + "/" + method;
        $.ajax(
			    {
			        url: url,
			        data: data,
			        type: "GET",
			        processData: false,
			        contentType: "jsonp",
			        timeout: 25000,
			        async: true,
			        dataType: "text",  // not "json" we'll parse   
			        success: function (res) {
			            if (!callback) return;
			            // *** Use json library so we can fix up MS AJAX dates                        
			            var result = JSON.parse(res);
			            //var result = res;
			            // *** Bare message IS result                        
			            if (bare)
			            { callback(result); return; }
			            // *** Wrapped message contains top level object node                        
			            // *** strip it off                        
			            for (var property in result) {
			                callback(result[property]);
			                break;
			            }
			        },
			        error: function (xhr) {
			            if (!error) return;
			            if (xhr.responseText) {
			                //var err = JSON2.parse(xhr.responseText);
			                var err = xhr.responseText;
			                //alert(err);
			                if (err)
			                    error(err);
			                else
			                    error({ Message: "Unknown server error." })
			            }
			            return;
			        }
			    });
    }
}

function showLoading() {
    $("#loading").show();
}

function hideLoading() {
    $("#loading").hide();
}

GetCampaignDetails = function (element) {
    var nextTableRow = $(element).parent().next();
    var parentRow = $(element).parent();
    var childDataId = $(parentRow).find('td').find('input:hidden').val();
    //alert(childDataId);
    var childDiv = jQuery(nextTableRow).find('td').find(".expandedViewDetails");
    //if ((childDiv.text().length) == 0) {
    $(childDiv).append('<div style="font-weight: bold; font-size: large;">Loading...</div>');
    var dataServiceURL = $("input[id$=dataServiceUrlCampaign]").val();
    //alert(dataServiceURL);
    //var data = '{"connectCampaignId"' + ' : "' + childDataId + '"}';
    var data = 'connectCampaignId=' + childDataId;
    //alert(data);
    var Proxy = new serviceProxyCampaign(dataServiceURL);
    //Set currentdate variable
    var currentTime = new Date();

    //alert('This is a Click');
    $.ajax({ url: dataServiceURL + 'GetCampaignInformation?campaignID=' + childDataId,
        type: "GET",
        dataType: "jsonp",
        timeout: 10000,
        success: function (response) {
            $(childDiv).empty();
            $(childDiv).append(response);
        },
        error: function () {
            $(childDiv).empty();
            $(childDiv).append('Cannot retrieve data. please try after sometime.');
        }
    });
}

function WCFCampaignAjaxSubmit(element) {
    var nextTableRow = $(element).parent().next();
    var parentRow = $(element).parent();
    var childDataId = $(parentRow).find('td').find('input:hidden').val();
    var childDiv = jQuery(nextTableRow).find('td').find(".expandedViewDetails");
    if ((childDiv.text().length) == 0) {
        var dataServiceURL = $("input[id$=dataServiceUrlCampaign]").val();
        //alert(dataServiceURL);
        var Proxy = new serviceProxyCampaign(dataServiceURL);
        //alert('This is a Click');
        Proxy.invoke("GetAllForCampaign"
    , '{"Name" : "Anu" }'
    , function (response) {
        $(childDiv).append(response.d);
    }
         , function () {
             $(childDiv).append('Cannot retrieve data. please try after sometime.');
             //alert('done');
         }
           , true);
    }
};
