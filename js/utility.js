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
  event.preventDefault();
  // Stash the event so it can be triggered later.
  let deferredPrompt = event;

  const installButton = document.querySelector('#install_pwa');

  installButton.style.display = 'block';

  installButton.addEventListener('click', () => {
    installButton.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User decided to install');
      } else {
        console.log('User dismissed the installation prompt');
      }

      deferredPrompt = null;
    });
  });
});

registerServiceWorker();

const closeMenus = (exclude = false) => {
  const menus = document.querySelectorAll('.menu ul');
  menus.forEach(m => {
    if (exclude !== m) {
      m.classList.add('hidden');
    }
  });
};

const switchTheme = theme => {
  const bodyClasses = document.body.classList;
  switch (theme) {
    case 'dark':
      bodyClasses.add('darktheme');
      bodyClasses.remove('lighttheme');
      break;
    case 'light':
      bodyClasses.add('lighttheme');
      bodyClasses.remove('darktheme');
      break;
    case 'system':
      bodyClasses.remove('darktheme');
      bodyClasses.remove('lighttheme');
    default:
      break;
  }
};

window.addEventListener('click', e => {
  const menuButton = e.target.closest('.menu button.topmenu');
  if (menuButton) {
    const menu = menuButton.parentElement.querySelector('ul');
    closeMenus(menu);
    menu.classList.toggle('hidden');
  } else {
    closeMenus();
    if (e.target.matches('.theme-dark')) {
      switchTheme('dark');
    } else if (e.target.matches('.theme-light')) {
      switchTheme('light');
    } else if (e.target.matches('.theme-system')) {
      switchTheme('system');
    }
  }
});
window.addEventListener('keyup', e => {
  if (e.keyCode === 27) {
    closeMenus();
  }
});
