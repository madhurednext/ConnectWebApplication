
assignmentProgramViewModel = programInfoViewModel("assignments");

AssignmentViewModel = function () {
   
    modelName = "assignments",
    name = "AssignmentViewModel",
    programInfoViewModel = programInfoViewModel(modelName),
    clientInfoViewModel = clientInfoViewModel(modelName),

    isHalosAuthorized = ($('#leftContentplaceholder___EVENTVARS').val() && 16 == 16),
    currentTemplate = ko.computed(function () {
        return connect.navigators.assignmentNavigation.getTemplate();

    }, this);

    
    
   
   
     
    return {
        modelName: modelName,
        programInfoViewModel: programInfoViewModel,
        clientInfoViewModel : clientInfoViewModel,
        
        isHalosAuthorized : isHalosAuthorized,
        currentTemplate: currentTemplate,
        name: name
      
       
      
       // 
};
    

}()


connect.viewModelUtil = connect.viewModelUtil || {};

connect.viewModelUtil.calculateViewModelList = function (modelName,isList) {

    var tempNav = connect.navigators.assignmentNavigation;
    if (tempNav) {
        var index = tempNav.TemplateIndex();

        if (isList) {
            return connect.myAssignmentFlowArray[index].data;
        }

        return connect.myAssignmentFlowArray[index].viewModel;
      
    } else {
        return "";
    }

};







