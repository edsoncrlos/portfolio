const html = document.querySelector('html');

const [buttonOpenMenu, buttonCloseMenu] = document.querySelector('.toggle-menu').children;
const topHeader = document.querySelector('.header');
const websitePageList = document.querySelector('.menu');

function openMenu() {
    buttonOpenMenu.classList.add('toggle-menu__open--display-none');
    buttonCloseMenu.classList.remove('toggle-menu__close--display-none');

    topHeader.classList.add('header--take-all-height-screen');
    websitePageList.classList.add('menu--show-list');
    html.style.overflowY = 'hidden';

    window.addEventListener('resize', closeMenuWhenResizeforDesktop);
}

function closeMenu() {
    buttonOpenMenu.classList.remove('toggle-menu__open--display-none');
    buttonCloseMenu.classList.add('toggle-menu__close--display-none');

    topHeader.classList.remove('header--take-all-height-screen');
    websitePageList.classList.remove('menu--show-list');
    html.style.overflowY = 'auto';

    window.removeEventListener('resize', closeMenuWhenResizeforDesktop);
}

function closeMenuWhenResizeforDesktop () {
    if (window.innerWidth >= 768) {
        closeMenu();
    };
}

buttonOpenMenu.addEventListener('click', openMenu);
buttonCloseMenu.addEventListener('click', closeMenu);
