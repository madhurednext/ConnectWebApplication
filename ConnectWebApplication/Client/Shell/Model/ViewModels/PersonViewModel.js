PersonViewModel = function (objectName) {
    modelName = objectName,
    name = "PersonViewModel",
     personPageViewModel = PersonPageViewModel(modelName),
    selectedPerson = null,
    PersonInfoDetails = ko.observable(''),
    personStatusImage = ko.computed(function () {

        if (PersonInfoDetails().IsDeceased && PersonInfoDetails().IsLatino) {
            return [{ imageSrc: "Styles/images/flagDeceased.png" },
                { imageSrc: "Styles/images/flagSpanishLanguage.png" }
            ];
        }
        else if (PersonInfoDetails().IsDeceased) {
            return [{ imageSrc: "Styles/images/flagDeceased.png" }];
        }
        else if (PersonInfoDetails().IsLatino) {
            return [{ imageSrc: "Styles/images/flagSpanishLanguage.png" }];
        }
    }, this),

    currentPersonPageTab = ko.computed(function () {
        return personPageViewModel.selectedTab();
    }, this),

    spouseStatusImage = ko.computed(function(){
        if (PersonInfoDetails().IsSpouseDeceased && PersonInfoDetails().IsSpouseLatino) {
            return [{ imageSrc: "Styles/images/flagDeceased.png" },
                { imageSrc: "Styles/images/flagSpanishLanguage.png" }
            ];
        }
        else if (PersonInfoDetails().IsSpouseDeceased) {
            return [{ imageSrc: "Styles/images/flagDeceased.png" }];
        }
        else if (PersonInfoDetails().IsSpouseLatino) {
            return [{ imageSrc: "Styles/images/flagSpanishLanguage.png" }];
        }
    },this),

    onClosePersonClick = function () {

    },
  
    contactProfileViewModel = ContactProfileViewModel(modelName),
    onGetPersonBasicInfoResult = function (result) {

        if (result && result.Data) {

            PersonInfoDetails(result.Data);
            //personPageViewModel.parentViewModel(Object.create(this));
            personPageViewModel.selectedTab("Contact Profile");
            
            //if (programid == "52") {

            //    ajaxService.getContactAppointments(selectedClientContactQueueId, programid, onGetContactAssignmentsResult, onGetContactAssignmentsFault);
            //}
            //if (isSearchFlow) {
            //    programid = 51;

            //}
            //if (viewModel.spouseTab() > 1) {
            //    viewModel.changetab(viewModel.spouseTab());
            //}
            //else {
            //    viewModel.changetab(1);
            //}
        }

    },
    onGetPersonBasicInfoFault = function (fault) {

    },
    getSelectedPersonDetails = function (item) {

        selectedPerson = item;
        contactProfileViewModel.selectedPerson(selectedPerson);

        if (contactProfileViewModel.displayMessageAlert()) {

            ajaxService.getBasicInfo(selectedPerson.Id, this.onGetPersonBasicInfoResult, this.onGetPersonBasicInfoFault);
        }

    };
    
 

    return {
        modelName: modelName,
        name : name,
        selectedPerson: selectedPerson,
        PersonInfoDetails : PersonInfoDetails,
        personStatusImage: personStatusImage,
        spouseStatusImage : spouseStatusImage,
        onClosePersonClick : onClosePersonClick,
        contactProfileViewModel : contactProfileViewModel,
        getSelectedPersonDetails: getSelectedPersonDetails,
        onGetPersonBasicInfoResult: onGetPersonBasicInfoResult,
        onGetPersonBasicInfoFault: onGetPersonBasicInfoFault,
        personPageViewModel: personPageViewModel,
        currentPersonPageTab: currentPersonPageTab
       

    };
}


//if ($("#notes1").val() == '' || $("#notes1").val() == undefined) {

//    if (unsavedchangesalert()) {
//        changeclient = true;
//        prevclientselected = index;
//        $("#tempcontactresult").html('');
//        viewModel.tempradioid([]);
//        $("#tempnotes").html('');
//        viewModel.temphtmlvalues([]);
       
//    }
//    else {
//        changeclient = false;
//    }
//}
//else {
//    var answer = confirm("There are unsaved changes. Do you want to continue?")
//    if (answer) {
//        changeclient = true;
//        $("#tempnotes").html('');
//        $("#tempcontactresult").html('');
//        //viewModel.datalist(null);
//        viewModel.tempradioid([]);
//        $("#tempnotes").html('');
//        viewModel.temphtmlvalues([]);
//        getBasicInfoPersonIndex = index;
//        ajaxService.getBasicInfo(index, onGetBasicInfoWithChangeResult, onGetBasicInfoFault);
//    }
//    else {
//        changeclient = false;
//    }
//}

//function () { viewModel.CloseBtnClicked()