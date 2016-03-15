(function(module){
/**
    DOM className manipulation
*/
    var parseElementClasses = function(el, className){
        var cn = el.className;
        var classes = cn.match(/[\S]+/gi);
        var classPosition = classes.indexOf(className);
        var result = {'classes': classes, 'hasClass': classPosition>-1, 'classPosition': classPosition};
        return result;
    };
    var applyElementClasses = function(el, classes){
        el.className = classes.join(' ');
    }

    var hasClass = function(el, className){
        var r = parseElementClasses(el, className);
        return r.hasClass;
    };
    module.hasClass = hasClass;

    var addClass = function(el, className){
        var r = parseElementClasses(el, className);
        if(!r.hasClass){
            r.classes.push(className);
            applyElementClasses(el, r.classes);
        }
    };
    module.addClass = addClass;

    var removeClass = function(el, className){
        var r = parseElementClasses(el, className);
        if(r.hasClass){
            r.classes.splice(r.classPosition, 1);
            applyElementClasses(el, r.classes);
        }
    };
    module.removeClass = removeClass;

    var toggleClass = function(el, className){
        var r = parseElementClasses(el, className);
        if(r.hasClass){
            r.classes.splice(r.classPosition, 1);
        }else{
            r.classes.push(className);
        }
        applyElementClasses(el, r.classes);
    };
    module.toggleClass = toggleClass;

/**
    DOM events
*/
    var ie_events = typeof document.attachEvent == 'function';
    var addEvent = function(el, evt, cb){
        if(ie_events){
            el.attachEvent('on'+evt, cb);
        }else{
            el.addEventListener(evt, cb, false);
        }
    };
    var removeEvent = function(){
        if(ie_events){
            el.detachEvent('on'+evt, cb);
        }else{
            el.removeEventListener(evt, cb, false);
        }
    };
})(typeof module == 'object'?module:window);