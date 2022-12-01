// Toggle Modal
const portfolioImages = document.querySelectorAll('.portfolio__card > .portfolio__image');
const modals = document.querySelectorAll('.portfolio__card > .portfolio__modal');
const buttonsCloseModal = document.querySelectorAll('.portfolio__card .portfolio__close-modal');
const escKeyCode = 27;

for (let i = 0; i < portfolioImages.length; i++) {
    portfolioImages[i].addEventListener('click', () => {
        document.documentElement.style.overflowY = 'hidden';
        
        modals[i].showModal();
    });

    modals[i].addEventListener('keydown', (e) => {
        if (e.keyCode == escKeyCode) {
            document.documentElement.style.overflowY = 'auto';
        }        
    });
    
    buttonsCloseModal[i].addEventListener('click', () => {
        modals[i].close();
        document.documentElement.style.overflowY = 'auto';
    });
}
