/**
 * This is an extended version of the Creating Function Callback library
 * Well is its first attempt at a library.
 *
 * @author Sumitro Chatterjee
 *
 * Disclaimer 
 * The code has be improvised from sources on the web. Although
 * there is no one place which could claim to be the owner of the work.
 * Please email me if you know the original source of this code.
 */

(function() {

    /**
     * @inner
     */
    var isDeffered = false;
    var useStaticBefore = useStaticAfter = false;
    var staticBefore = statisAfter = "";
    
    var cfc = function(fn) {
        return createCallBothLink(fn);
    }
    cfc.generate = cfc;
    cfc.after = function(fn, deferred) {
        if (deferred) {
            return createCallAfterLinkDeferred(fn);
        } else {
            return createCallAfterLink(fn);
        }
    }; 
    cfc.before = function(fn) {
        return createCallBeforeLink(fn);
    };


    cfc.setStaticCalls = function(config) {
        useStaticBefore = !!config.statisBefore;
        useStaticAfter = !!config.staticAfter;
        staticBefore = config.statisBefore;
        staticAfter = config.statisAfter;
    };

    function getCallback(ArgsArr, type) {
        var callback = ArgsArr[ArgsArr.length - 1];
        if (useStaticBefore || useStaticAfter) {
            switch (type) {
                case 'after':
                    callback = useStaticAfter ? cfc.statisAfter : callback;
                break;
                case 'before':
                    callback = useStaticBefore ? cfc.staticBefore : callback;
                break;
                case 'both':
                    callback = {
                        'before': useStaticBefore ? cfc.staticBefore : callback.before,
                        'after': useStaticAfter ? cfc.statisAfter : callback.after
                    };
                break;
            }
        }

        return callback;
    }

    /**
     *  @private
     *
     *
     */
    function createCallAfterLink(fn) {
        return function() {
            var callback = getCallback(arguments, 'after');
            var args = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
            
            var result = fn.apply(this, args);

            callOriginalFunction(callback, this, result);
            return result;
        };
    }

    /**
     *  @private
     *
     *
     */
    function createCallAfterLinkDeferred(fn) {
        isDeffered = true;
        return createCallAfterLink(fn);
    }

    /**
     *  @private
     *
     *
     */
    function createCallBeforeLink(fn) {
        return function() {
            var callback = getCallback(arguments, 'before');
            var args = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
            
            callback();
            
            return fn.apply(this, args);
        };    
    }

    /**
     *  @private
     *
     *
     */
    function createCallBothLink(fn) {
        return function() {
            var callback = getCallback(arguments, 'both');
            var args = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
            
            if (typeof callback.before === 'function') {
                callback.before();
            }
            
            var result = fn.apply(this, args);

            if (typeof callback.after === 'function') {
                callOriginalFunction(callback.after, this, result);
            }
            
            return result;
        };    
    }

    /**
     *  @private
     *
     *
     */
    function callOriginalFunction(fn, scope, arg) {
        if (isDeffered) {
            setTimeout(function() {
                fn.call(scope, arg);
            }, 0);
        } else {
            return fn.call(scope, arg);
        }
    }

    window.CFC_LIB = cfc;

    /* 
     * UTILITY FUNCTIONS
     */
    function set(obj, extensions) {
        for (var extension in extensions) {
            if (extensions.hasOwnProperty(extension)) {
                obj[extension] = extensions;
            }
        }
    }

})();
