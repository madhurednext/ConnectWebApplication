CurrentViewNavigation = function () {
    modelName = "CurrentViewNavigation",
    name = "CurrentViewNavigation",
    currentMenuTabIndex = ko.observable(0),
    currentTemplate = ko.observable('ClientDetailCentralView'),
    viewModelName = ko.computed(function () {

        if (currentMenuTabIndex() == 0) {
            return "assignmentViewModel";
        }
    }, this);
    return {
        currentMenuTabIndex: currentMenuTabIndex,
        currentTemplate : currentTemplate,
        viewModelName: viewModelName,
        modelName: modelName,
        name : name 
    };

}();