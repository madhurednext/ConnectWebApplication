<%@ Page Title="" Language="C#" MasterPageFile="~/MainPage.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="ConnectWebApplication.Default" %>

<asp:Content ID="HeadContentArea" ContentPlaceHolderID="HeadContent" runat="server">
   
   <link href="Styles/jquery.treeTable.css" rel="stylesheet" type="text/css" />
   <link href="Styles/fancybox/jquery.fancybox-1.3.4.css" rel="stylesheet"  type="text/css" />
   <link href="Styles/BootStrapTabs.css" rel="stylesheet" type="text/css" />
   <link href="Styles/style.css" rel="stylesheet" type="text/css" />
   <link type="text/css" rel="Stylesheet" href="Client/Log/blackbird.css" />
   <link rel="stylesheet" type="text/css" href="Client/Log/jquery.qtip.min.css" />
   <link rel="Stylesheet" type="text/css" href="Client/Shell/Content/template.css"  />
      
    
     
</asp:Content>
<asp:Content ID="leftContentplaceholderArea" ContentPlaceHolderID="leftContentplaceholder"
    runat="server"> 
    <asp:HiddenField ID="__EVENTVARS" runat="server" Value ="0"  ClientIDMode ="Predictable"/>
    <div id="leftColumnNew" class="expanded" style="min-height: 450px;">  </div>
</asp:Content>

<asp:Content ID="centerContentplaceholderArea" ContentPlaceHolderID="centerContentplaceholder"
    runat="server">
   
   <div id="TopColumn"></div> 
   <div id="CenterColumn"></div>
   
 
   <div id="MessageSaved" style=" background-color:white; width:410px; height:151px; display: none; " >
  <!--  <span class="buttonXPopUp popClose"><span>X</span></span> -->
   <div id="popHeader" style="border-bottom: 1px solid green; height:30px;">
   <h1 style="text-align: center;"> Contact Profile Result </h1>
</div>
      <p style="padding-top: 20px;text-align:center; margin:0" > Contact Profile Result Successfully Saved !!!</p>
     <!--  <input type="button" value="close" style="margin-left: 150px; margin-top: 25px; border: 1px solid green;"  onclick="onMessageSavePopupClose();" /> --> 

   </div>


  
       
    
    <div id="temp" class="hide">
        <span id="tempcontactresult"></span><span id="tempnotes"></span>
    </div>
</asp:Content>

<asp:Content ID="rightContentplaceholderArea" ContentPlaceHolderID="rightContentplaceholder"
    runat="server">
</asp:Content>

<asp:Content ID="bottomleftcontentArea" ContentPlaceHolderID="bottomleftcontent"
    runat="server">
    <div id="Newsfeed">
    </div>
</asp:Content>

<asp:Content ID="bottomrightcontentArea" ContentPlaceHolderID="bottomrightcontent"
    runat="server">
    <div id="mywallet">
    </div>

    
    <script type="text/javascript" src="Scripts/jquery.tablesorter.min.js"></script>
    <script src="Scripts/bootstrap-tab.js" type="text/javascript"></script>
    <script type="text/javascript" src="Scripts/jquery.fancybox-1.3.4.pack.js"></script>  

    <script type="text/javascript" src="Scripts/knockout-2.2.1.debug.js"></script>
     <%--<script type="text/javascript" src="Scripts/jquery-tmpl.js"></script>--%>
    <!-- Begin Document Tree Structure  -->  
     <script type="text/javascript" src="Scripts/jquery.ui.js"></script>
    <script type="text/javascript" src="Scripts/jquery.treeTable.js"></script>
    <!--  End of Document Tree Structure  -->
     <script type="text/javascript" src="Scripts/s_code.js"></script>
     <script type="text/javascript" src="Client/Log/json2.js"></script>
      <script type="text/javascript" src="Client/Log/jquery.qtip.min.js"></script>
      <script type="text/javascript" src="Client/Log/blackbird.js"></script>
      <script type="text/javascript" src="Client/Shell/Utils/AppUtil.js"></script>
    
        <script type="text/javascript" src="Client/Shell/Model/ServiceProxy/MockData.js"></script>
    <script type="text/javascript" src="Client/Shell/Model/ViewModels/Navigation.js"></script>
    <script type="text/javascript" src="Client/Shell/Model/ViewModels/NavigationViewModel.js"></script>
    <script type="text/javascript" src="Client/Shell/Model/ViewModels/CurrentViewNavigation.js"></script>
    <script type="text/javascript" src="Client/Shell/Model/ViewModels/ProgramInfoViewModel.js"> </script>
    <script type="text/javascript" src="Client/Shell/Model/ViewModels/ContactProfileViewModel.js"></script>
   <script type="text/javascript" src="Client/Shell/Model/ViewModels/PersonPageViewModel.js"></script>
        <script type="text/javascript" src="Client/Shell/Model/ViewModels/PersonViewModel.js"></script>
        <script type="text/javascript" src="Client/Shell/Model/ViewModels/ClientListViewModel.js"></script>
    <script  type="text/javascript" src="Client/Shell/Model/ViewModels/AssignmentViewModel.js"></script>

    <script type="text/javascript" src="Client/Shell/Model/ViewModels/AppViewModel.js"></script>

    <script type="text/javascript" >

        
    </script>
      
       <%-- ADD Correct View Models <script type="text/javascript" src="Modules/Shell/Model/ViewModels/MainViewModel.js"></script>--%>

    <script type="text/javascript" src="Client/Shell/Model/ServiceProxy/MockServiceDelegate.js"></script>
<%-- This is the Real Service, Comment the Above two they are Mock Service
         <script type="text/javascript" src="Client/Shell/Model/ServiceProxy/ServiceDelegate.js"></script>--%>

    <script type="text/javascript" src="Client/Shell/Controller/ServiceResultController.js"></script>
    <script type="text/javascript" src="Scripts/jquery.bpopup-0.8.0.min.js"></script>

    <script type="text/javascript" src="Client/Shell/Controller/AppStart.js"></script>


</asp:Content>