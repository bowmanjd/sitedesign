const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        '/serviceworker.js',
        {
          scope: '/',
        },
      );
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

window.addEventListener('beforeinstallprompt', event => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  // event.preventDefault();
  // Stash the event so it can be triggered later.

  const installButton = document.querySelector('#install_pwa');

  installButton.style.display = 'block';

  installButton.addEventListener('click', () => {
    installButton.style.display = 'none';
    // Show the prompt
    event.prompt();
    // Wait for the user to respond to the prompt
    event.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User decided to install');
      } else {
        console.log('User dismissed the installation prompt');
      }
    });
  });
});

registerServiceWorker();
