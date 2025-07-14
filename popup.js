document.addEventListener('DOMContentLoaded', function () {

  console.log("setting up proxy");

  document.getElementById('set-proxy').addEventListener('click', function () {
    console.log("setting proxy");
    browser.runtime.sendMessage({
      action: 'setProxy',
      host: '127.0.0.1',
      port: 8080,
    });
  });

  document.getElementById('clear-proxy').addEventListener('click', function () {
    console.log("clearing proxy");
    browser.runtime.sendMessage({
      action: 'clearProxy',
    });
  });
}); 