'use strict';

window.onload = function () {
  const table = document.getElementById("content");
  const th = `<tr><th style="text-align:left;">Url</th><th style="text-align:right;">Datum</th></tr>`;

  chrome.storage.sync.get(['urls'], function (result) {
    let urls;
    if (result.urls == undefined) {
      urls = [];
    } else {
      urls = JSON.parse(result.urls);
    }

    table.innerHTML = th;
    urls.reverse().forEach(urlItem => {
      const str = `<tr><td><a href=\"${urlItem.url}\" target=\"_blank\">${urlItem.url}</a></td><td style =\"text-align:right; min-width:190px;\">${urlItem.date}</td></tr>`;
      table.insertAdjacentHTML('beforeend', str);
    });

  });

  document.getElementById("clear").addEventListener("click", function () {
    const r = confirm("Všechny BRUTE adresy budou smazány. Jsi si jistý/á?");
    if (r) {
      chrome.storage.sync.set({ urls: null }, function (res) {
        table.innerHTML = th;
      });
    };
  })
}
