var ea;
function onAllTemplatesLoaded() {

     ea = new connect.appUtil.eventAggregator();

    ea.subscribe(connect.EVENT_KEYS.VIEW_LOAD, "viewLoad", onViewLoad);
   
    connect.appUtil.loadExternalfile("Client/Menu/Menu.js", "js");

    connect.appUtil.loadExternalfile("Client/CenterContent/CenterContent.js", "js");
    // connect.appUtil.loadExternalfile("Modules/CenterContent/CenterContentCommand.js", "js");
    //  connect.appUtil.loadExternalfile("Modules/TopContent/TopContentCommand.js", "js");
}


var allViews = ["left","center"];
var loadedViews = [];
function onViewLoad(viewName) {

    loadedViews.push(viewName);

    if (loadedViews.length == allViews.length) {
        ko.applyBindings(connect.appViewModel);
    }

}



connect.appUtil.loadExternalfile("Client/Shell/Utils/TemplateLoader.js", "js");
