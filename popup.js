// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

window.onload = function () {
  chrome.storage.sync.get(['urls'], function (result) {
    let urls;
    if (result.urls == undefined) {
      urls = [];
    } else {
      urls = JSON.parse(result.urls);
    }

    const table = document.getElementById("content");

    urls.reverse().forEach(urlItem => {
      const str = `<tr><td><a href=\"${urlItem.url}\" target=\"_blank\">${urlItem.url}</a></td><td style =\"text-align:right; min-width:190px;\">${urlItem.date}</td></tr>`;
      table.insertAdjacentHTML('beforeend', str);
    });

  });
}
