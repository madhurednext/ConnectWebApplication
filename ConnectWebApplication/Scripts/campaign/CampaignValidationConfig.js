var CDValidationRules = CDValidationRules || {};

CDValidationRules.Rules = [

 {
     elementName: '.ContactSource',
     validators: ['DropDownListValidator'],
     errorMessage: ["Please select a contact source."],
     params: [true]
 },
 {
     elementName: '.ContactType',
     validators: ['DropDownListValidator'],
     errorMessage: ["Pleae select a contact type."],
     params: [true]
 },
 {
     elementName: '.Program',
     validators: ['DropDownListValidator'],
     errorMessage: ["Please select a program."],
     params: [true]
 },
 {
     elementName: '.campaignID',
     validators: ['required'],
     errorMessage: ["Please enter a campaign ID that is unique for this season."],
     params: [true]
 },
 {
     elementName: '.Title',
     validators: ['required'],
     errorMessage: ["Please enter a title."],
     params: [true]
 },
 {
     elementName: '.Description',
     validators: ['required'],
     errorMessage: ["Please enter a description."],
     params: [true]
 },
 {
     elementName: 'input[id ^= MainContent_checkBoxListKeyMessage]',
     validators: ['KeyMessageValidator'],
     errorMessage: ["Please select atleast one key message."],
     params: [{ maxLimit: 3 }]
 },
{
    elementName: '.campaignStartDate',
    validators: ['required', 'DateValidator'],
    errorMessage: ["Please enter a valid campaign start date.", "Please enter a valid date."],
    params: [true,true]
},
{ 
    elementName: '.campaignEndDate',
    validators: ['required', 'DateValidator', 'DateCompareValidator'],
    errorMessage: ["Please enter a valid campaign end date.", "Please enter a valid date." , "Please enter a campaign end date that is greater than the start date."],
    params: [true, true, { startDateSelector: '.campaignStartDate', compare: ">=" }]

},
{
    elementName: '.sentDate',
    validators: ['required', 'DateValidator', 'DateCompareValidator'],
    errorMessage: ["Please enter a valid date sent.", "Please enter a valid date.", "Please enter a date sent that is before the campaign in-home start date."],
    params: [true, true, { startDateSelector: '.campaignInHomeStartDate', compare: "<" }]

},
{
    elementName: '.campaignInHomeStartDate',
    validators: ['required', 'DateValidator'],
    errorMessage: ["Please enter a valid in-home start date.", "Please enter a valid date."],
    params: [true, true]

},
{
    elementName: '.campaignInHomeEndDate',
    validators: ['required', 'DateValidator', 'DateCompareValidator'],
    errorMessage: ["Please enter a valid in-home end date.", "Please enter a valid date.", "Please enter a campaign in-home end date that is greater than the start date."],
    params: [true, true, { startDateSelector: '.campaignInHomeStartDate', compare: ">=" }]

}, 
{
    elementName: '.PdfFileUpload',
    validators: ['required', 'accept'],
    errorMessage: ["Please attach a sample file in PDF format.", "Invalid file format.  Please select an Adobe PDF-formatted file."],
    params: [true, "pdf"]

}, 
{
    elementName: '.PdfFileUploadNotRequired',
    validators: [ 'accept'],
    errorMessage: ["Invalid file format.  Please select an Adobe PDF-formatted file."],
    params: ["pdf"]

}, 
{
    elementName: '.campaignPdfStartDate',
    validators: ['required', 'DateValidator', 'DateCompareValidator', 'DateCompareValidator'],
    errorMessage: ["Please enter a valid campaign example start date.", "Please enter a valid date.", "Please enter a campaign example start date that is equal to or greater than today.",
    "Please enter a campaign example start date that is less than the campaign end date."],
    params: [true, true, { startDateSelector: 'today', compare: ">=" },
   { startDateSelector: '.campaignEndDate', compare: "<=" }]

}



];