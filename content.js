var count = 0;

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.message === "clicked_browser_action") {
			while (count < 10) {
				var link1 = $("a[href^='http']").eq(count).attr("href");
				console.log(link1);
				if (typeof link1 == "undefined") {
					break;
				}
				chrome.runtime.sendMessage({"message": "open_tab", "URL": link1});
				count++;
			}
		}
	}
)