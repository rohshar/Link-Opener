function test() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		//chrome.tabs.executeScript(tabs[0].id, {code: "var "} {file: 'content.js'});
		console.log('hopefully');
		work(tabs[0])
	});
}

function work(tab) {
	var count = 0;

	while (count < 5) {
		//var link1 = $("a[href^='http']").eq(count).attr("href");
		var link1 = tab.links[0].href
		console.log(link1);
		if (typeof link1 == "undefined") {
			break;
		}
		count++;
		chrome.tabs.create({"url": link1});
	}
}


document.getElementById('buttonOpen').addEventListener('click', test);

/*console.log('freeee');
$(document).ready(function(){
    $("button").click(function() {
    	console.log('foo');
    	chrome.tabs.onUpdated.addListener(function(tab) {
    		chrome.tabs.executeScript(null, {file: "content.js"});
		});
	    //chrome.tabs.query({active: true}, function(tabs) {
	    //})
	});
});*/ 