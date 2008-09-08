// Ubiquity Google calculator script
// by Zach Carter http://zaa.ch
// MPL, MIT licensed 2008

(function(){

function scrapeResult(data) {
    if(data.match(/<img src=\/images\/calc_img.gif width=40 height=30 alt="">/)){
      return data.match(/<h2 class=r><font size=\+1><b>(.+)<\/b><\/h2>/)[1];
    }else {
      return 'Unrecognized expression.'}
}

CmdUtils.CreateCommand({
  name: "gcalc",

  icon: 'http://www.google.com/images/calc_img.gif',
  homepage: "http://www.google.com/help/calculator.html",
  description: "Use Google Search's calculator capibilities.",
  author: { name: "Zach Carter", email: "zack.carter@gmail.com", homepage: "http://zaa.ch/"},
  
  takes: {status: noun_arb_text},

  preview: function(pblock, statusText) {
    var pb = pblock;
    pblock.innerHTML = 'Enter an expression to evaluate.';
    if(statusText.text.length > 1){
      jQuery.get("http://www.google.com/search",{q: statusText.text}, function(data){pb.innerHTML = scrapeResult(data);});
      pblock.innerHTML = 'Loading result...';
    }
  },
  
  execute: function(statusText) {
    if(statusText.text.length < 1) {
      displayMessage("Please enter an expression to evaulate.");
      return;
    }
    Utils.openUrlInBrowser('http://www.google.com/search?q=' + encodeURIComponent(statusText.text));  
  }
});

})();
