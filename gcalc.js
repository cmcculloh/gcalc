// Chrome Google calculator script
// by Zach Carter http://zaa.ch
// forked by cmcculloh for Status-bar Calculator http://statusbarcalculator.com
// MPL, MIT licensed 2009
//     This can be used in a Google Chrome extension (or on any web page running jQuery) 
//     to calculate an expression using Google's calculator

(function($){
    $.fn.gcalc = function(expression) {
        if(expression.length > 1){
            $.get("http://www.google.com/search",
                {
                    q: expression
                }, 
                function(data){
                    console.log($().scrapeResult(data));
                }
            );
        }
    }

    $.fn.scrapeResult = function(data) {
        if(data.match(/<img src=\/images\/calc_img.gif width=40 height=30 alt="">/)){
            return data.match(/<h2 class=r><font size=\+1><b>(.+)<\/b><\/h2>/)[1];
        }else{
            return 'ERROR';
        }
    }
})(jQuery);

//$().gcalc("1+1');