var count = 0;
var count2 = 0;
var array = [];

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.message === "clicked_browser_action") {
			while (count < 1) {
				var link1 = $("a[href^='http']").eq(count).attr("href");
				console.log(link1);
				if (typeof link1 == "undefined") {
					break;
				}
				chrome.runtime.sendMessage({"message": "open_tab", "url": link1});
				count++;
			}
			while (count2 < 100) {
				var link1 = $("a[href^='http']").eq(count2).attr("href");
				console.log(link1);
				if (typeof link1 == "undefined") {
					break;
				}
				array.push(link1)
				count2++;
			}

			chrome.runtime.sendMessage({"message": "open_note", "urls": array});
		}
	}
)