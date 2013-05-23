
var CDValidationHelper = CDValidationHelper || {};

CDValidationHelper.highlight = function (element, errorClass){
    var parentDiv = $(element).parents('div.formGroup');
    parentDiv.addClass('error');
}
CDValidationHelper.unhighlight = function (element, errorClass) {
    var parentDiv = $(element).parents('div.formGroup');
    parentDiv.removeClass('error');
}

CDValidationHelper.errorPlacement = function (error, element) {


  


    var parentDiv = $(element).parents('div.formGroup');
   
    if (parentDiv.hasClass('disabled')) {
        parentDiv.removeClass('disabled');
    }
   
    var errorParagraph = $('<p class=errorMessage />');
    error.addClass('keyMessageLblError');
    error.appendTo(errorParagraph);
    

    var elementId = $(element).attr("id");
    if (elementId.indexOf("MainContent_checkBoxListKeyMessage") >= 0) {
       // errorParagraph.insertBefore(element.parent());
        errorParagraph.appendTo($('.KeyMessageErrorLabel'));
        return;
    }

    //added this logic because of if multiple elements are on same row
    //then if one element is valid then it removed the validation from 
    //second element too.
    errorParagraph.addClass(element.attr('id'));
    var next = element.next().attr('class');
    if (next == 'ui-datepicker-trigger')
        errorParagraph.appendTo(element.parent());
        //errorParagraph.insertAfter(element.parent());

    else
        errorParagraph.insertAfter(element);

}

CDValidationHelper.success = function (element) {

    var parentDiv = $(element).parents('div.formGroup');
    var elementParentDiv = $(element).parents('p');
    //alert(elementParentDiv.attr('class'));
    var classList = elementParentDiv.attr('class').split(/\s+/);
    var removeItem = false;
    $.each(classList, function (index, item) {
        //alert(item);
        //alert(elementParentDiv.attr('class'));
        if (elementParentDiv.hasClass(item)) {
            removeItem = true;
        }
    });

    //only remove the element which has error associated with the ID
    if (removeItem) {
        elementParentDiv.remove();
    }
}
