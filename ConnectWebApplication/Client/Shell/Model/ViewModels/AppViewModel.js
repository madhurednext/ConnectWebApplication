connect.appGlobal = {
    isSearchTabFlow: true
}





connect.appViewModel = {
    assignmentViewModel: AssignmentViewModel,
    currentViewNavigation: CurrentViewNavigation
}








connect.viewData = {


    psId: $('#psid').html(),
    officeId: $('#Officeid').html(),
    roleId : $('#RoleIds').html()
}


    



















var isSearchFlow = false;
var navigateOtherTabs = false;
var isSearchTabFlow = false;
var programClientId;




var spouseClientId;
var changeclient = false;
var officeChangeclient = false;
var personseqid;
var contactProfileResult;

var programid;
var currentYear = 9999;
var allAjaxServiceRequests = {};
var getBasicInfoPersonIndex;
var mypopup;
var ind;
var prevclientselected;
var ToggleStyleType = { addCss: 1, removeCss: 2 };

var contactHistoryContactActivityId;
// The isOfficeView is used for determining the client is selected from 
// Office View or My Assignments View
var isOfficeView = false;


var OfficeID;
var virtualOfficeId;
var roleId;
var selectedClientContactQueueId;

var pageTitle = GetPageTitle();
