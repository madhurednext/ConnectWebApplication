var connect = connect || {};

connect.appUtil = connect.appUtil || {};



connect.EVENT_KEYS = {
    EVENT_NAME: 'event/name',
    VIEW_LOAD: 'view/load'
};

connect.appUtil = {
    loadExternalfile: function loadExternalfile(filename, filetype) {
        if (filetype == "js") { //if filename is a external JavaScript file
            var fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", filename);
        }
        else if (filetype == "css") { //if filename is an external CSS file
            var fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
        }
        if (typeof fileref != "undefined") {
            document.getElementsByTagName("head")[0].appendChild(fileref);
        }
    },

    eventAggregator: function () {
        //// Source: https://github.com/markhaskamp/jquery-event-aggregator

        // aggregator is hash
        // k/v = 'eventID/[{'fn_id': function_id, 'fn': function}, ...]
        this.aggregator = {};

        this.subscribe = function (evt, fn_id, fn) {
            // console.log('subscribe.enter.');
            if (this.aggregator[evt] == undefined) {
                this.aggregator[evt] = [];
            }
            this.aggregator[evt].push({ 'fn_id': fn_id, 'fn': fn });
        };

        this.publish = function () {
            eventID = arguments[0];
            argArray = [];
            for (i = 1; i < arguments.length; i++) {
                argArray.push(arguments[i]);
            }
            // console.log('publish.enter.');
            jQuery.each(this.aggregator[eventID], function () {
                this.fn(argArray);
            });
        }

        this.unsubscribe = function (eventID, functionID) {
            var ndxToRemove = -1;
            $.each(this.aggregator[eventID], function (i, val) {
                if (this.fn_id == functionID) {
                    ndxToRemove = i;
                }
            });

            var N = this.aggregator[eventID].length;

            if (ndxToRemove == 0) {
                this.aggregator[eventID].shift();
            }
            else if (ndxToRemove == N) {
                this.aggregator[eventID].pop();
            }
            else if (ndxToRemove != -1) {
                preArray = this.aggregator[eventID].slice(0, ndxToRemove);
                postArray = this.aggregator[eventID].slice(ndxToRemove + 1, this.aggregator[eventID].length);
                this.aggregator[eventID] = concat(preArray, postArray);
            }
        }

    }



}

Function.prototype.getModelName = function () {
    if (this.modelName) {
        return this.modelName;
    }
    else { return ""; }
}

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};



ko.bindingHandlers.templateWithOptions = {
    init: ko.bindingHandlers.template.init,
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, context) {
        var options = ko.utils.unwrapObservable(valueAccessor());
        //if options were passed attach them to $data
        if (options.templateOptions) {
            context.$data.$item = ko.utils.unwrapObservable(options.templateOptions);
        }
        //call actual template binding
        ko.bindingHandlers.template.update(element, valueAccessor, allBindingsAccessor, viewModel, context);
        //clean up
        delete context.$data.$item;
    }
}
