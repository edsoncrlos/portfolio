const html = document.querySelector('html');

// toggle Menu

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
    if (window.innerWidth >= 840) {
        closeMenu();
    };
}

buttonOpenMenu.addEventListener('click', openMenu);
buttonCloseMenu.addEventListener('click', closeMenu);

// change link color according to scroll

let currentPageLink = document.querySelector('.list__link:first-child');
currentPageLink.style.color = '#0DFFD5';

function changeColorPageLink (element) {
    currentPageLink.style = '#fffff';
    currentPageLink = element;  

    element.style.color = '#0DFFD5';
}

function currentPage(e) {
    changeColorPageLink(e.target);

    if (window.innerWidth < 768) {
        closeMenu();
    }
}

const linksPages = document.querySelectorAll('.list__link');
linksPages.forEach((linkPage) => {
    linkPage.addEventListener('click', (event) => currentPage(event));
})


const mainSections = document.querySelectorAll('main > section');
const idArrayHeaderLinksAndSections = Array.from(mainSections).filter((section) => {
    if (section.id != '') {
        return section.id;
    }
})

function checkPagePosition (selector) {
    const element = document.querySelector(selector);
    const position = element.getBoundingClientRect();
    const start = position.top;

    if (start <= 200) {
        const link = document.querySelector(`a[href="${selector}"]`);
        changeColorPageLink(link);
    }
}

idArrayHeaderLinksAndSections.forEach((selector) => {
    window.addEventListener('scroll', () => checkPagePosition(`#${selector.id}`));
})
