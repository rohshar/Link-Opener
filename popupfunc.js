function test() {
	chrome.tabs.executeScript(null, {file: 'content.js'});
	console.log('hopefully');
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