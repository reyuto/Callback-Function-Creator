Callback-Function-Creator
=========================

Create function calls before and after a function definition

Code Example: 
<pre>
    var test = createCallback(function(a,b) { return a+b; });
    test(1, 2, function() { 
            return {
                'before': function() { console.log('Initiating Callback!'); }, 
                'after' : function(result) { console.log('result : ' + result); }
            };
        }()
    );
</pre>
