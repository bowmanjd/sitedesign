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

registerServiceWorker();

const closeMenus = (exclude = false) => {
  const menus = document.querySelectorAll('.menu ul');
  menus.forEach(m => {
    if (exclude !== m) {
      m.classList.add('hidden');
      m.closest('.menu').querySelector('button.topmenu').setAttribute('aria-expanded', 'false');
    }
  });
};

const switchTheme = theme => {
  const bodyClasses = document.body.classList;
  bodyClasses.remove('darktheme');
  bodyClasses.remove('lighttheme');
  if (theme !== 'system') {
    bodyClasses.add(`${theme}theme`);
  }

  window.localStorage.setItem('theme', theme);
};

window.addEventListener('click', e => {
  const menuButton = e.target.closest('.menu button.topmenu');
  if (menuButton) {
    const menu = menuButton.parentElement.querySelector('ul');
    closeMenus(menu);
    menu.classList.toggle('hidden');
    menuButton.setAttribute('aria-expanded', (!(menuButton.getAttribute('aria-expanded') === 'true')).toString());
  } else {
    closeMenus();
    if (e.target.dataset.theme) {
      switchTheme(e.target.dataset.theme);
    }
  }
});
window.addEventListener('keyup', e => {
  if (e.keyCode === 27) {
    closeMenus();
  }
});
window.addEventListener('DOMContentLoaded', () => {
  const theme = window.localStorage.getItem('theme');
  if (theme) {
    switchTheme(theme);
  }
});
