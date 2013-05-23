clientInfoViewModel = function (objectName) {
    modelName = objectName,
    name = "clientInfoViewModel",
   personViewModel = PersonViewModel(modelName),
    clientList = ko.observable(''),
   totalClients = ko.observable(''),

    title = ko.observable('My Assignments > Client List'),

    selectedItem = null,
    currentClientListIndex = ko.observable(0),
    isMaxClientListIndex = ko.computed(function () {

        return (((parseInt(currentClientListIndex()) * 10) + parseInt(clientList().length)) == parseInt(totalClients()));

    }, this),
    displayClientNumber = ko.computed(function () {
        var initialIndex = ((parseInt(currentClientListIndex()) * 10) + 1);
        var secondaryIndex = ((parseInt(currentClientListIndex()) * 10) + parseInt(clientList().length));

        return message = initialIndex + " to " + secondaryIndex + " of " + totalClients();
    }, this),
    previousClientList = function () {

    },
    nextClientList = function () {

    },

    onClientClick = function () {
        selectedItem = this;
        //selectedItem = selectedItemData;
        //var campaignGroupId = selectedItemData.CampaignGroupId;
        //var viewData = connect.viewData;
        //CallOmnitureWS(pageTitle, "MyAssignmentsView>" + connect.program.GetCampaignGroupName(campaignGroupId));
        //ajaxService.getClientList(0, campaignGroupId, viewData.officeId, viewData.psId, viewData.roleId, false, onGetClientListResult, onGetClientListFault);

        personViewModel.getSelectedPersonDetails(selectedItem);

       // getSelectedClientDetails(index);
    },
 onBackClick = function () {
     connect.navigators.assignmentNavigation.DecrementTemplateIndex();
 };

     return {
        modelName: modelName,
        clientList: clientList,
        totalClients: totalClients,
        isMaxClientListIndex : isMaxClientListIndex,
        title: title,
        onClientClick: onClientClick,
        onBackClick : onBackClick,
        selectedItem: selectedItem,
        currentClientListIndex: currentClientListIndex,
        previousClientList: previousClientList,
        nextClientList : nextClientList,
        displayClientNumber: displayClientNumber,
        personViewModel: personViewModel,
         name : name

    };
}


