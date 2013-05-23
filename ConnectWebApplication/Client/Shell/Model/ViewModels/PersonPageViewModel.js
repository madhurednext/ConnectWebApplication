PersonPageViewModel = function (objectName) {
    modelName = objectName,
    name = "PersonPageViewModel",
    PersonDetailTabs = [{ id: "tab-section1", index: 1, tabName: "Contact Profile" },
{ id: "tab-section2", index: 2, tabName: "Service Activity" },
{ id: "tab-section3", index: 3, tabName: "Contact History" },
{ id: "tab-section4", index: 4, tabName: "Documents" }],

    selectedTab = ko.observable("Contact Profile"),
    onTabClick = function () {
        selectedTab(this.tabName);

    },
    
    changeTab = function (index) {

        $('.currenttab').attr('id', 'section' + index);

        selectedTabItem = $.grep(PersonDetailTabs, function (item) {
            return item.index == index;
        });

        

        if (selectedTabItem.tabName == "ContactProfile") {
            parentViewModel().contactProfileViewModel
        }



    },
    currentTab = ko.observable(1);
    
    


    return {
        modelName: modelName,
        PersonDetailTabs: PersonDetailTabs,
        selectedTab: selectedTab,
        changeTab: changeTab,
        onTabClick: onTabClick,
        currentTab: currentTab,
        name: name


    };
}
