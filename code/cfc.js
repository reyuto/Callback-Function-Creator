/**
 * @source : https://github.com/reyuto/Callback-Function-Creator.git
 * @author : Sumitro Chatterjee
 */

function createCallbackBeforeAndAfter(fn) {
    return function() {
        var callback = arguments[arguments.length - 1];
        var args = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
        
        callback.before();

        var result = fn.apply(this, args);

        callback.after(result);
        return result;
    };
}