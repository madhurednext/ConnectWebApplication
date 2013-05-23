ContactProfileViewModel = function (objectName) {
    modelName = objectName,
    name = "ContactProfileViewModel",
    selectedPerson = ko.observable(''),

   authUserComments = ko.observable(''),

   contactProfileResult = ko.observable(''),

 getContactProfile = function (selectedPersonItem) {
    // ajaxService.getContactProfile(, programid, onGetContactProfileResult, onGetContactProfileFault);
 },
    onGetContactProfileResult = function (result) {

    },
    onGetContactProfileFault = function (fault) {

    },
  isContactProfileDataSet = ko.computed(function () {

      return (contactProfileResult() != '');

  }, this),

  isClientStrikeThrough = ko.computed(function(){

      return ((selectedPerson() != '') && (parseInt(selectedPerson().StrikeThrough) == 1));
  },this),

   isSavePending = ko.computed(function () {


       return (authUserComments() != '') && (contactProfileResult() != '');


   }, this),

    displayMessageAlert = function () {

        if (isSavePending()) {

            var answer = confirm("Contact Profile: There are unsaved changes. Do you want to continue?");

            if (answer) {
                authUserComments('');
                contactProfileResult('');
                return true;
            }
            else {
                return false;
            }

        }

        return true;

    };


    return {
        modelName: modelName,
        selectedPerson: selectedPerson,
        authUserComments : authUserComments,
        isSavePending: isSavePending,
        displayMessageAlert: displayMessageAlert,
        contactProfileResult: contactProfileResult,
        getContactProfile: getContactProfile,
        onGetContactProfileResult: onGetContactProfileResult,
        onGetContactProfileFault : onGetContactProfileFault,
        name : name
    


    };
}