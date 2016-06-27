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
				var allUrls = request.urls;
				var vals = JSON.stringify("I have opened up the first 5 links on the page in new tabs, and every link is listed here! All " + allUrls.length + " of them!\n\n");
				chrome.tabs.executeScript(tab.id, {
						code: 'document.getElementById("text").value = ' + vals,
				})
				for (var i = 0; i < allUrls.length; i++) {
					var serVal = JSON.stringify("\n " + allUrls[i]);
					chrome.tabs.executeScript(tab.id, {
						code: 'document.getElementById("text").value = document.getElementById("text").value + ' + serVal,
					}, function(result) {
						if (!result) {
			            	alert('Failed to run content script.\n' +
                    			chrome.runtime.lastError.message);
                			return;
            			}
					});
				};
			})
		}
	}
);
