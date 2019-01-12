const absBlackList = ['https://cw.felk.cvut.cz/brute/student/'];
const startsWithBlackList = ['https://cw.felk.cvut.cz/brute/student/course/'];

chrome.webNavigation.onCommitted.addListener(function (e) {

  if (!e.url.startsWith("https://cw.felk.cvut.cz/brute/")) {
    return;
  }

  for (i = 0; i < absBlackList.length; i++) {
    if (absBlackList[i] == e.url) {
      return;
    }
  }

  for (i = 0; i < startsWithBlackList.length; i++) {
    if (e.url.startsWith(startsWithBlackList[i])) {
      return;
    }
  }

  chrome.storage.sync.get(['urls'], function (result) {
    if (result.urls == undefined) {
      urls = [];
    } else {
      urls = JSON.parse(result.urls);
    }

    if (!urls.some(urlItem => urlItem.url == e.url)) {
      urls.push({ url: e.url, date: new Date() });
      json = JSON.stringify(urls);
      console.log(json);
      chrome.storage.sync.set({ urls: json }, function () {
        //alert('Value is set to ' + urls);
      });
    }

  });
});
