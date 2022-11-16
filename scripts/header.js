const html = document.querySelector('html');

const [buttonOpenMenu, buttonCloseMenu] = document.querySelector('.toggle-menu').children;
const header = document.querySelector('.header');
const list = document.querySelector('.menu');

function openMenu() {
    buttonOpenMenu.classList.add('toggle-menu__open--display-none');
    buttonCloseMenu.classList.remove('toggle-menu__close--display-none');

    header.classList.add('header--take-all-height-screen');
    list.classList.add('menu--show-list');
    html.style.overflowY = 'hidden';

    window.addEventListener('resize', closeMenuWhenResizeforDesktop);
}

function closeMenu() {
    buttonOpenMenu.classList.remove('toggle-menu__open--display-none');
    buttonCloseMenu.classList.add('toggle-menu__close--display-none');

    header.classList.remove('header--take-all-height-screen');
    list.classList.remove('menu--show-list');
    html.style.overflowY = 'none';

    window.removeEventListener('resize', closeMenuWhenResizeforDesktop);
}

function closeMenuWhenResizeforDesktop () {
    if (window.innerWidth >= 768) {
        closeMenu();
    };
}

buttonOpenMenu.addEventListener('click', openMenu);
buttonCloseMenu.addEventListener('click', closeMenu);
