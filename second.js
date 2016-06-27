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


chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.message === "open_note") {
			chrome.tabs.create({url: "http://www.editpad.org"}, function(tab) {
				var serVal = JSON.stringify('Rohan Sharan')
				chrome.tabs.executeScript(tab.id, {
					code: 'document.getElementById("text").value = ' + serVal,
				}, function(result) {
					if (!result) {
			            alert('Failed to run content script.\n' +
                    		chrome.runtime.lastError.message);
                		return;
            		}
            		alert('You just typed: "' + result[0] + '"');
				});
			});
		}
	}
);