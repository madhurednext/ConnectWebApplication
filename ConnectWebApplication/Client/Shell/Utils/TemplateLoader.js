// This Js File Loads All External Templates listed in the allTemplates Array,
// and calls onAllTemplatesLoaded function on AppStart.js
var templateAppend = [];
var i = 0;

function loadTemplate(templateList) {
    var loadedTemplates = [];
    $.ajaxSetup({
        cache: false
    });

    $.each(allTemplates, function (index, value) {


        $.ajax({
            url: "Client/Shell/Views/templates/" + value + ".tmpl.htm",
            async: false,
            success: function (template) {
                templateAppend[i++] = template;
                loadedTemplates.push(template);
                if (templateList.length == loadedTemplates.length) {
                    appendAllTemplates();
                }
            }

        });

    });


}


function appendAllTemplates() {

    $('head').append(templateAppend.join(' \n '));
    afterTemplatesLoaded();
}

function afterTemplatesLoaded() {
    $.each(allTemplates, function (index, value) {
        var templateNode = document.getElementById(value);
        if (!templateNode) {
            // alert('template not loaded : ' + value);
        }

    });
    onAllTemplatesLoaded();
}


var allTemplates = ["ProgramContainer", "ProgramListTemplate", "ClientListTemplate", "ClientDetailCentralView", "PersonDetailTabContent", "ContactProfileTemplate"];


loadTemplate(allTemplates);
