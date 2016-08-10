var openCounter = 0;
var trackCounter = 0;
var allUrls = [];


/**
 * Sends two main messages to the background script, one that contains the urls of the first five links
 * on the current page, and another that sends all of the links as a list (caps the length of list at 100)
 * @param {string} request - The request that is sent from the content script
 */
chrome.runtime.onMessage.addListener(
	function(request) {
		if (request.message === "clicked_browser_action") {
			while (openCounter < 5) {
				var link = $("a[href^='http']").eq(openCounter).attr("href");
				if (typeof link == "undefined") {
					break;
				}
				chrome.runtime.sendMessage({"message": "open_tab", "url": link});
				openCounter++;
			}
			while (trackCounter < 100) {
				var link = $("a[href^='http']").eq(trackCounter).attr("href");
				if (typeof link == "undefined") {
					break;
				}
				allUrls.push(link)
				trackCounter++;
			}
			chrome.runtime.sendMessage({"message": "open_note", "urls": allUrls});
		}
	}
)
