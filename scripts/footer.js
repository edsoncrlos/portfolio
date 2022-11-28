const footer = document.querySelector('.footer');
const navFooter = document.querySelector('.footer__nav');
const navListNetworkLinks = document.querySelector('.footer__list');

const main = document.querySelector('main');
const credits = document.querySelector('.footer__credits');

function showCredits() {
    const position = main.getBoundingClientRect();
    const end = position.bottom;

    if (end <= 780) {
        credits.classList.add('footer__credits--show');
        const width = window.innerWidth;
        if (width >= 450) {
           navFooter.classList.add('footer__nav--tablet');
           navListNetworkLinks.classList.add('footer__list--half-width');
        } 
        if (width >= 1200) {
           navListNetworkLinks.classList.add('footer__list--min-width');
        }

        window.onscroll = hiddenCredits;
    }
}

function hiddenCredits () {
    const position = main.getBoundingClientRect();
    const end = position.bottom;

    if (end >= 780) {
        credits.classList.remove('footer__credits--show');

        if (window.innerWidth >= 450) {
            navFooter.classList.remove('footer__nav--tablet');
            navListNetworkLinks.classList.remove('footer__list--half-width');
        } 
        if (window.innerWidth >= 1200) {
            navListNetworkLinks.classList.remove('footer__list--min-width');
        }

        window.onscroll = showCredits;
    }
}

window.onscroll = showCredits;
