document.addEventListener('DOMContentLoaded', function () {

  console.log("popup loaded");


  const greetButton = document.getElementById('greetButton');
  const message = document.getElementById('message');
  const messageText = document.getElementById('messageText');

  let clickCount = 0;
  const greetings = [
    "Hello World! 🌍",
    "Bonjour le monde! 🇫🇷",
    "¡Hola mundo! 🇪🇸",
    "Ciao mondo! 🇮🇹",
    "Hallo Welt! 🇩🇪",
    "こんにちは世界! 🇯🇵",
    "你好世界! 🇨🇳",
    "Привет мир! 🇷🇺"
  ];

  greetButton.addEventListener('click', function () {
    clickCount++;

    // Get a random greeting
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

    // Update message
    messageText.textContent = `${randomGreeting} (Click #${clickCount})`;
    message.style.display = 'block';

    // Add some animation
    message.style.animation = 'none';
    message.offsetHeight; // Trigger reflow
    message.style.animation = 'fadeIn 0.5s ease-in-out';

    // Change button text
    greetButton.textContent = `Clicked ${clickCount} time${clickCount > 1 ? 's' : ''}`;

    // Send message to background script
    browser.runtime.sendMessage({
      action: 'buttonClicked',
      count: clickCount,
      greeting: randomGreeting
    });
  });

  // Add CSS animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);


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