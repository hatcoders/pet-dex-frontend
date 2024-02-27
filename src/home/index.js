import { extractElements } from 'pet-dex-utilities';
import Navigation from './components/Navigation';
import NoPetRegirestedPage from './components/NoPetRegirestedPage';
import SideMenu from './components/SideMenu';
import './index.scss';

document.addEventListener('DOMContentLoaded', () => {
  const selected = extractElements([document.body]);

  const $home = selected.get('home');

  const $sidemenu = selected.get('sidemenu');
  const sideMenu = new SideMenu();
  sideMenu.mount($sidemenu);

  const $navigation = selected.get('navigation');
  const navigation = new Navigation();
  navigation.mount($navigation);

  const $content = selected.get('content');
  const noPetRegirestedPage = new NoPetRegirestedPage();
  noPetRegirestedPage.mount($content);
  
  const $hamburgerMenu = navigation.selected.get('hamburger-menu');
  const $exitMenu = sideMenu.selected.get('exitMenu');
  const $itemsMenu = sideMenu.selected.get('menuitens').querySelectorAll("li");
  // TODO: susbtistituir pelo módulo de breakpoints do js
  const breakpointDesktop = 1024;

  function openMenu(hamburger, home) {
    if (window.innerWidth < breakpointDesktop) {
      hamburger.addEventListener('click', () => {
        home.classList.remove('home--exit-menu');
        home.classList.add('home--open-menu');
      });
    }
  }

  function exitMenu(exitMenu, home) {
    if (window.innerWidth < breakpointDesktop) {
      exitMenu.addEventListener('click', () => {
        home.classList.remove('home--open-menu');
        home.classList.add('home--exit-menu');
      });
    }
  }

  function activeClassMenu(selectedItem, menuItems, home) {
    menuItems.forEach((li) => {
      li.classList.remove('side-menu-content__menuitens--active');
    });

    selectedItem.classList.add('side-menu-content__menuitens--active');

    if (window.innerWidth < breakpointDesktop) {
      home.classList.remove('home--open-menu');
      home.classList.add('home--exit-menu');
    }
  }
  
    openMenu($hamburgerMenu, $home);
    exitMenu($exitMenu, $home);

    $itemsMenu.forEach((li) => {
      li.addEventListener('click', () => {
        activeClassMenu(li, $itemsMenu, $home);
      });
    });
});
