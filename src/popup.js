document.getElementById('btn').addEventListener('click', async () => {

    (async () => {
        const sleep = (second) => new Promise(resolve => setTimeout(resolve, second * 1000))

        chrome.tabs.query({ active: true }, function (tabs) {
            let tab = tabs[0];
            chrome.scripting.insertCSS(
                {
                    target: { tabId: tab.id },
                    files: ["inject.css"]
                }
            );
        });
        await sleep(0.1)
        chrome.tabs.captureVisibleTab((url) => {
            ImgB64Resize(url, 710, 399.375,
                function (imgB64) {
                    chrome.downloads.download({ url: imgB64, filename: 'capture.jpg' });
                }
            );
        });
    })()
});

function ImgB64Resize(imgB64_src, width, height, callback) {
    var img_type = imgB64_src.substring(5, imgB64_src.indexOf(";"));
    var img = new Image();
    img.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        // Draw (Resize)
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // Destination Image
        var imgB64_dst = canvas.toDataURL(img_type);
        callback(imgB64_dst);
    };
    img.src = imgB64_src;
}




