const footer = document.querySelector('.footer');
const navFooter = document.querySelector('.footer__nav');
const navListNetworkLinks = document.querySelector('.footer__list');
const bottomDistanceToShowCredits = 780;
const tabletWidth = 450;
const desktopWidth = 1200;

const main = document.querySelector('main');
const credits = document.querySelector('.footer__credits');

function showCredits() {
    const position = main.getBoundingClientRect();
    const end = position.bottom;

    if (end <= bottomDistanceToShowCredits) {
        credits.classList.add('footer__credits--show');
        const width = window.innerWidth;
        if (width >= tabletWidth) {
           navFooter.classList.add('footer__nav--tablet');
           navListNetworkLinks.classList.add('footer__list--half-width');
        } 
        if (width >= desktopWidth) {
           navListNetworkLinks.classList.add('footer__list--min-width');
        }

        window.onscroll = hiddenCredits;
    }
}

function hiddenCredits () {
    const position = main.getBoundingClientRect();
    const end = position.bottom;

    if (end >= bottomDistanceToShowCredits) {
        credits.classList.remove('footer__credits--show');

        if (window.innerWidth >= tabletWidth) {
            navFooter.classList.remove('footer__nav--tablet');
            navListNetworkLinks.classList.remove('footer__list--half-width');
        } 
        if (window.innerWidth >= desktopWidth) {
            navListNetworkLinks.classList.remove('footer__list--min-width');
        }

        window.onscroll = showCredits;
    }
}

window.onscroll = showCredits;
