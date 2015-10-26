(function() {
    'use strict';

    window.onload = function() {
        chrome.tabs.onUpdated.addListener(tabUpdated_);
    };

    function tabUpdated_(tabId, changeInfo, tab) {
        var newUrl = changeInfo.url;

        if (!!newUrl) {
            chrome.tabs.sendMessage(tab.id, { url: newUrl });
        }
    }
})();
