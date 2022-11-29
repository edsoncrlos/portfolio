// add technologies 
const technologies = document.querySelectorAll('main > .technologies > ul > li');

technologies.forEach((tech) => {

    const projectsTechnologies = document.querySelectorAll(`.${tech.id}`);
    if (projectsTechnologies.length > 0) {
        projectsTechnologies.forEach((project) => {
            project.innerHTML = tech.innerHTML;
        })
    }
})

// see more
const buttonsSeeMore = document.querySelectorAll('.technologies__see-more');
const hiddenText = document.querySelectorAll('.technologies__wrap-text-see-more');

function toggleText (e, text, show = true) {
    if (show) {
        e.target.innerText = "Ver menos";
        text.classList.remove('sr-only');
        
        e.target.onclick = (e) => toggleText(e, text, false);
    } else {
        e.target.innerText = 'Ver mais';
        text.classList.add('sr-only');
        
        e.target.onclick = (e) => toggleText(e, text, true);
    }
}

buttonsSeeMore.forEach((button, index) => {
    button.onclick = (e) => toggleText(e, hiddenText[index]);
})
