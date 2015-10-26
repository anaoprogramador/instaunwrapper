(function() {
    'use strict';

    var CONTAINER_SELECTOR = 'article.-cx-PRIVATE-Post__root';
    var CLASS_NAME = 'picture-src';

    onUrlChanged(window.location.href);

    chrome.extension.onMessage.addListener(function(request) {
        if (!!request.url) {
            onUrlChanged(request.url);
        }
    });

    function onUrlChanged(url) {
        // Remove all previous links
        $('.' + CLASS_NAME).remove();

        if (!url || url.indexOf('instagram.com/p/') < 0) {
            return;
        }

        var imageSource = $(CONTAINER_SELECTOR + ' img[id]').first().attr('src');
        if (!!imageSource && imageSource.length > 0) {
            var container = $('<div></div>');
            var anchor = $('<a></a>');

            container.addClass(CLASS_NAME);
            container.css('height', '2rem');
            container.css('width', '100%');
            container.css('line-height', '2em');
            container.css('text-align', 'center');
            container.css('background-color', '#125688');
            container.css('cursor', 'pointer');

            anchor.attr('href', imageSource);
            anchor.attr('target', '_blank');
            anchor.css('color', '#fff');
            anchor.text('Open image in new tab');

            container.append(anchor);
            $(CONTAINER_SELECTOR).first().prepend(container);
        }
    }
})();
