/**
 * Handles the action that takes place when the extension icon is clicked. Sends a message to the content
 * script which will initiate the main function of the extension.
 * @param {string} tab - The current chrome tab.
 */
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var current = tabs[0];
    chrome.tabs.sendMessage(current.id, {"message": "clicked_browser_action"});
  });
});


/**
 * Creates a new tab and goes to the link that is specified by the content script.
 * @param {string} request - The request that is sent from the content script.
 * @param {string} author - The author of the book.
 */
chrome.runtime.onMessage.addListener(
	function(request) {
		if (request.message === "open_tab") {
			chrome.tabs.create({"url": request.url});
		}
	}
);


/**
 * Creates a new tab and lists out all of the URLs as specified by the content script.
 * @param {string} request - The request that is sent from the content script.
 * @param {string} author - The author of the book.
 */
chrome.runtime.onMessage.addListener(
	function(request) {
		if (request.message === "open_note") {
			chrome.tabs.create({url: "http://www.editpad.org"}, function(tab) {
				var allUrls = request.urls;
				var vals = JSON.stringify("I have opened up the first 5 links on the page in new tabs, and every link is listed here! All " + allUrls.length + " of them!\n\n");
				chrome.tabs.executeScript(tab.id, {
						code: 'document.getElementById("text").value = ' + vals,
				})
				for (var i = 0; i < allUrls.length; i++) {
					var currVal = JSON.stringify("\n " + allUrls[i]);
					chrome.tabs.executeScript(tab.id, {
						code: 'document.getElementById("text").value = document.getElementById("text").value + ' + currVal,
					}, function(result) {
						if (!result) {
			            	alert('Content script did not work.\n' +
                    			chrome.runtime.lastError.message);
                			return;
            			}
					});
				};
			})
		}
	}
);
