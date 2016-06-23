chrome.browserAction.onClicked.addListener(function(tab) {

  chrome.tabs.query({active: true}, function(tabs) {
  	console.log("YES IT GOT HERE")
    var current = tabs[0];
    chrome.tabs.sendMessage(current.id, {"message": "clicked_browser_action"});
  });
});


function test2() {
	count = 0;
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if ((request.message === "open_tab") && (count < 5)) {
				chrome.tabs.create({"url": request.URL});
			}
			count += 1;
		}
	);
}



document.getElementById('buttonOpen').addEventListener('click', test2);
