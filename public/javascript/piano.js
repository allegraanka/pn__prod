(function () {
    tp = window["tp"] || [];

    tp.push(["setAid", 'zRp4JFA6pu']);
    tp.push(["setEndpoint", 'https://buy.tinypass.com/api/v3']);
    tp.push(["setUseTinypassAccounts", false ]);
    tp.push(["setUsePianoIdUserProvider", true ]);

    function onLoginSuccess() {
        // Get list of all access data
        tp.api.callApi('/access/list', {}, function (data) {
            if (typeof data.data != "undefined") {
                // Loop through all possible access objects
                for (var i in data.data) {
                    // Was access granted?
                    if (data.data[i].granted) {
                        // All good, user just logged in, we can close the offer
                        tp.offer.close();
                        // Additionally we can refresh the page
                        location.reload();
                    }
                }
            }
        });
    }
    
    tp.push(["addHandler", "loginSuccess", onLoginSuccess]);

    tp.push(["addHandler", "customEvent", function(e) {
        switch (e.eventName) {
            case 'micro-survey':
                var params = JSON.parse(e.params.params);

                var userResponseData = {
                    selectedRating: e.params.selectedrating,
                    openEndedResponse: e.params.openendedresponse,
                    aid: params.aid,
                    displayMode: params.displayMode,
                    iframeId: params.iframeId,
                    templateId: params.templateId
                }
                console.log(`user response data: ${JSON.stringify(userResponseData)}`);
        }
    }]);

    tp.push(["init", function () {
        tp.experience.init()
    }]);
})();

(function(src){var a=document.createElement("script");a.type="text/javascript";a.async=true;a.src=src;var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)})("//cdn.tinypass.com/api/tinypass.min.js");