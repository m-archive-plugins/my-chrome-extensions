
function loadContentScriptInAllTabs() {
    chrome.windows.getAll({ 'populate': true }, function (windows) {
        for (var i = 0; i < windows.length; i++) {
            var tabs = windows[i].tabs;
            for (var j = 0; j < tabs.length; j++) {
                chrome.tabs.executeScript(
                    tabs[j].id,
                    { file: 'content_script.js', allFrames: true });
            }
        }
    });
}



function initBackground() {
    console.log("initializing background...")
    loadContentScriptInAllTabs()

    chrome.browserAction.onClicked.addListener((tab) => {
        chrome.tabs.sendRequest(
            tab.id,
            {
                "copy": true
            }
        )
    })
    console.log("initialized")
}



initBackground()