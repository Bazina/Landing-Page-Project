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

/* build the nav, Build menu, this snippet was built with the help of GitHub */

secElements.forEach(sec => {
    const navBarElement = `<li class="menu__link" data-link="${sec.id}" ><a href = "#${sec.id}">${sec.dataset.nav}</a></li> `;
    navBar.insertAdjacentHTML("beforeend",navBarElement);
});

/* Scroll to anchor ID using scrollTO event,
* Scroll to section on link click
*Using window.scrollTo
*/

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

/* Add class 'active' to section when near top of viewport,
    Set sections as active 
* Using Intersection Observer
* entries is a callback function
*/


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
        threshold: 0.7,
    }
    )
secElements.forEach(el => {
    observer.observe(document.getElementById(el.id))
});

/* Hide navBar while scrolling, src: jquery,
 was sended by my tutor at a discussion */

$(window).scroll(function() {
    $("#navbar__menu").slideDown(500);
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() {
        // after user scroll for the first time start the function if user didn't
     //do something if user not scrolled
    $("#navbar__menu").slideUp(500);
    }, 1000));
    
});

/* Add toTop Button */

const newBtn = document.createElement("button");
newBtn.innerHTML = "Top";
document.body.appendChild(newBtn);
newBtn.setAttribute("id", "toTop")

/* Scroll to Top */

/* When the user scrolls down 20px from the top of the document,
    show the button, this snippet built with the help of
  "https://www.w3schools.com/howto/howto_js_scroll_to_top.asp" */

window.onscroll = () =>{
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    newBtn.style.display = "block";
    } else {
    newBtn.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document

newBtn.onclick = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
}