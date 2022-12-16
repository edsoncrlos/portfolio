const html = document.querySelector('html');
const maxWidthWhereToggleMenuIsActive = 1000;
const topDistanceToHighlightPageLink = 200;

// toggle Menu

const toggleButton = document.querySelector('.toggle-menu');
const [IconOpenMenu, IconCloseMenu] = toggleButton.children;

const topHeader = document.querySelector('.header');
const websitePageList = document.querySelector('.menu');
let menuIsOpen = false;

function toggeMenu() {
    IconOpenMenu.classList.toggle('toggle-menu__open--display-none');
    IconCloseMenu.classList.toggle('toggle-menu__close--display-none');

    topHeader.classList.toggle('header--take-all-height-screen');
    websitePageList.classList.toggle('menu--show-list');
    if (!menuIsOpen) {
        html.style.overflowY = 'hidden';
        window.addEventListener('resize', closeMenuWhenResizeforDesktop);
    } else {
        html.style.overflowY = 'auto';
        window.removeEventListener('resize', closeMenuWhenResizeforDesktop);
    }

    menuIsOpen = !menuIsOpen;
}
toggleButton.addEventListener('click', toggeMenu);

function closeMenuWhenResizeforDesktop () {
    if (window.innerWidth >= maxWidthWhereToggleMenuIsActive) {
        toggeMenu();
    };
}

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

    if (window.innerWidth < maxWidthWhereToggleMenuIsActive) {
        toggeMenu();
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
    if (start <= topDistanceToHighlightPageLink) {
        const link = document.querySelector(`a[href="${selector}"]`);
        changeColorPageLink(link);
    }
}

idArrayHeaderLinksAndSections.forEach((selector) => {
    window.addEventListener('scroll', () => checkPagePosition(`#${selector.id}`));
})
