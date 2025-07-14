// Background script for Hello World Extension

// Listen for messages from popup
browser.runtime.onMessage.addListener(async function(message, sender, sendResponse) {

  switch (message.action) {
    case 'setProxy':
      setProxy(message.host, message.port, "manual");
      break;
    case "clearProxy":
      setProxy("127.0.0.1", "8080", "system");
      break;
    default:
      console.error("Unknown action");
  }

  sendResponse({
    success: true,
    message: "Action completed"
  });

});

// Extension installation event
browser.runtime.onInstalled.addListener(function(details) {
  if (details.reason === 'install') {
    console.log('Hello World Extension installed!');
    
    // Set default badge text
    browser.browserAction.setBadgeText({
      text: '1'
    });
    
    browser.browserAction.setBadgeBackgroundColor({
      color: '#4CAF50'
    });
  }
});

// Extension startup event
browser.runtime.onStartup.addListener(function() {
  console.log('Hello World Extension started!');
});

// Optional: Add a context menu item
browser.contextMenus.create({
  id: 'hello-world-menu',
  title: 'Hello World!',
  contexts: ['page']
});

browser.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === 'hello-world-menu') {
    browser.tabs.sendMessage(tab.id, {
      action: 'showHelloWorld'
    }).catch(function(error) {
      // If content script is not loaded, inject it
      browser.tabs.executeScript(tab.id, {
        code: 'alert("Hello World from context menu! 🌍");'
      });
    });
  }
}); 

function setProxy(host, port, mode) {
  console.log(":thinking_face:", mode);

  browser.proxy.settings.set({
    value: {
      proxyType: mode,
      ssl: `${host}:${port}`,
      http: `${host}:${port}`,
      httpProxyAll: true,
      passthrough: "localhost,127.0.0.1",
    }
  }).then(() => {
    console.log("Proxy set");
  }).catch((error) => {
    console.error("Error setting proxy", error);
  });

  console.log("Yayy");
}