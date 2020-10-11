/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/* Define Global Variables */

const navBar = document.getElementById("navbar__list");
const secElements = document.querySelectorAll("section");

/* End Global Variables */

/* build the nav, Build menu */

secElements.forEach(sec => {
    const navBarElement = `<li class="menu__link" data-link="${sec.id}" ><a href = "#${sec.id}">${sec.dataset.nav}</a></li> `;
    navBar.insertAdjacentHTML("beforeend",navBarElement);
});

/* Scroll to anchor ID using scrollTO event, Scroll to section on link click */

navBar.addEventListener("click", evt =>{
    evt.preventDefault();
    const ancestor = evt.target.hasAttribute("data-link") ? evt.target : evt.target.parentElement;
    const elScroll = document.getElementById(ancestor.dataset.link);
    let firstX = window.scrollX;
    let firstY = window.scrollY;
    let nowX = elScroll.getBoundingClientRect().x;
    let nowY = elScroll.getBoundingClientRect().y;
    let goX = nowX + firstX;
    let goY = nowY + firstY;
    window.scrollTo({
        left : goX,
        top : goY,
        behavior : "smooth"
    });
});

/* Add class 'active' to section when near top of viewport, Set sections as active */


const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const navBarElement = document.querySelector(
        `.menu__link[data-link='${entry.target.id}']`
        );
        const secActive = document.getElementById(entry.target.id);
        if (entry.isIntersecting) {
        navBarElement.classList.add('active')
        secActive.classList.add('active')
        } else {
        if (navBarElement.classList.contains('active')) {
            navBarElement.classList.remove('active')
        }
        if (secActive.classList.contains('active')) {
            secActive.classList.remove('active')
        }
        }
    })
},
    {
        root: null,
        rootMargin: '0px',
        threshold: 0.6,
    }
    )
    secElements.forEach(el => {
        observer.observe(document.getElementById(el.id))
    })