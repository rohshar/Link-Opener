chrome.browserAction.onClicked.addListener(function(tab) {

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var current = tabs[0];
    chrome.tabs.sendMessage(current.id, {"message": "clicked_browser_action"});
  });
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.message === "open_tab") {
			chrome.tabs.create({"url": request.url});
		}
	}
);
