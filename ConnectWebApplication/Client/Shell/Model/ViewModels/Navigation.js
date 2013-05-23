connect.myAssignmentFlowArray = [
   { name: 'ProgramListTemplate', viewModel: 'programInfoViewModel', data: 'programList' },
   { name: 'ClientListTemplate', viewModel: 'clientInfoViewModel', data: 'clientList' },
   ];

connect.NavigationElement = function (objectName) {
    var appNav = {};
    switch (objectName) {

        case "assignments":
            appNav.name = objectName;
            appNav.flowList = connect.myAssignmentFlowArray;
            return appNav;
            break;
    }

}