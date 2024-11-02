async function clear() {
  const bookmarks = await getBookmarks();
  await Promise.all([
    clearBrowsingDataFromSpecificOrigins(bookmarks),
    clearGeneralBrowsingData(),
  ]);
}

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: "options.html" });
});

chrome.runtime.onMessage.addListener(
  async function (request, sender, sendResponse) {
    if (request.command == "clear") {
      sendResponse({ result: "clearing" });
      await clear();
      chrome.runtime.sendMessage({ result: "cleared" });
    }
  },
);

async function clearBrowsingDataFromSpecificOrigins(excludedOrigins) {
  return new Promise(function (resolve) {
    chrome.browsingData.remove(
      {
        excludeOrigins: excludedOrigins,
      },
      {
        cacheStorage: true,
        cookies: true,
        fileSystems: true,
        indexedDB: true,
        localStorage: true,
        pluginData: true,
        serviceWorkers: true,
        webSQL: true,
      },
      resolve,
    );
  });
}

async function clearGeneralBrowsingData() {
  return new Promise(function (resolve) {
    chrome.browsingData.remove(
      {},
      {
        appcache: true,
        cache: true,
        downloads: true,
        formData: true,
        history: true,
        passwords: true,
        webSQL: true,
      },
      resolve,
    );
  });
}

async function getBookmarks() {
  return new Promise(function (resolve) {
    chrome.bookmarks.getTree(function (tree) {
      const bookmarksSet = listBookmarks(tree)
        .map(function (bookmark) {
          return bookmark.url;
        })
        .reduce(function function_name(result, hostname) {
          result.add(hostname);
          return result;
        }, new Set());
      const bookmarksArray = Array.from(bookmarksSet).filter(Boolean);
      resolve(bookmarksArray);
    });
  });
}

function listBookmarks(tree) {
  let bookmarks = [];
  for (const branch of tree) {
    if (branch.children) {
      bookmarks = bookmarks.concat(listBookmarks(branch.children));
    } else {
      bookmarks.push(branch);
    }
  }
  return bookmarks;
}
