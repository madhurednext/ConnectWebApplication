
navigationVM = function (object) {
    modelName = object.name,
    name = "navigationVM",
    TemplateList = object.flowList;
    TemplateIndex = ko.observable(0),
    getTemplate = ko.computed(function () {
        if (TemplateIndex() > 0) {
            return TemplateList[TemplateIndex()];
        }
        return TemplateList[0];
    },this),
    IncrementTemplateIndex = function () {
        var index = TemplateIndex();
        if (index < TemplateList.length) {
            index++;
            TemplateIndex(index);
        }
    },

     DecrementTemplateIndex = function () {
         var index = TemplateIndex();
         if (index > 0) {
             index--;
             TemplateIndex(index);
         }
     };


    return {
        modelName: modelName,
        name : name,
        TemplateList: TemplateList,
        TemplateIndex: TemplateIndex,
        getTemplate: getTemplate,
        IncrementTemplateIndex: IncrementTemplateIndex,
        DecrementTemplateIndex: DecrementTemplateIndex
    }

};


connect.navigators = function () {

   
   

    assignmentNavigation = Object.create(navigationVM(connect.NavigationElement("assignments"))),
    assignmentNavigationIncrement = function () {
        assignmentNavigation.IncrementTemplateIndex();
        //assignmentNav.getTemplate();

    };


    return {

       assignmentNavigation: assignmentNavigation,
        assignmentNavigationIncrement: assignmentNavigationIncrement
    };


}();

var appNavigator = appNavigator || {};

appNavigator = function (objectName) {

  //  return connect.navigators(objectName).appNav();

};






