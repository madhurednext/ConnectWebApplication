programInfoViewModel = function (objectName,parent) {
    modelName = objectName,
    parentViewModel = parent,
    name = "programInfoViewModel",
    programList = ko.observable(''),
    title = ko.observable('My Assignments'),
    dataList =ko.observable(programList()),
    selectedItem = null,
    onProgramClick = function () {

        selectedItem = this;

        if (selectedItem) {
            var campaignGroupId = selectedItem.CampaignGroupId;
            var viewData = connect.viewData;
            CallOmnitureWS(pageTitle, "MyAssignmentsView>" + connect.program.GetCampaignGroupName(campaignGroupId));
            ajaxService.getClientList(0, campaignGroupId, viewData.officeId, viewData.psId, viewData.roleId, false, onGetClientListResult, onGetClientListFault);

        }     
     };

    return {
        modelName: modelName,
        programList: programList,
        dataList : dataList,
        title: title,
        onProgramClick: onProgramClick,
        selectedItem: selectedItem,
        name: name
        
    };
}


connect.program = connect.program || {};

connect.program.GetCampaignGroupName = function GetCampaignGroupName(CampaignGroupId) {

    switch (CampaignGroupId) {
        case 51:
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

//click: onProgramClick.bind(  $data.$item ),





