import {softSkills, personalSkills, projects} from "../data/personalData.mjs";

    (function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ===
                this.pathname.replace(/^\//, "") &&
            location.hostname ===this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 72,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 74,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict

    $("#arrow").click(function() {
        doBounce($(this), 3, '10px', 300);
    });
    function doBounce(element, times, distance, speed) {
        for(var i = 0; i < times; i++) {
            element.animate({marginTop: '-='+distance}, speed)
                .animate({marginTop: '+='+distance}, speed);
        }
    }

const templateProject = project => {
    const parser = new DOMParser();

    return parser.parseFromString(`
        <div class="col-lg-6 col-sm-6 mb-6">
            <div class="portfolio-item" >
                <a class="portfolio-link" data-toggle="modal" href=#portfolioModal${project.id}>
                    <div class="portfolio-hover">
                        <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                    </div>
                    <img class="img-fluid" src="${project.imagePath}" alt="image ${project.title}" />
                </a>
                <div class="portfolio-caption" >
                    <div class="portfolio-caption-heading">${project.title}</div>
                </div>
            </div>
        </div>`, "text/html");
}

const templateProjectModal = project => {
    const parser = new DOMParser();

    return parser.parseFromString(`
        <div class="portfolio-modal modal fade" id="portfolioModal${project.id}" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="close-modal" data-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <div class="modal-body">
                                    <h2 class="text-uppercase">${project.title}</h2>
                                    <img class="img-fluid d-block mx-auto" src="${project.imagePath}" alt="Image ${project.title}" />
                                    <p>${project.description}</p>
                                    <ul class="list-inline" >
                                        <li>Date: ${project.date}</li>
                                        <li>Client: ${project.client}</li>
                                        <li>Category: ${project.category}</li>
                                    </ul>
                                    <a target="_blank" href="${project.linkToLive}"><i class="btn btn-primary" >Live</i></a>
                                    <a target="_blank" href="${project.linkToCode ? project.linkToCode : project.linkToStore}"><i class="btn btn-primary" >${project.linkToCode ? 'Code' : 'Store'}</i></a>
                                    <button class="btn btn-primary" data-dismiss="modal" type="button" >Close Project</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`, "text/html");
}

const listSoftSkills = document.getElementById('list-soft-skills');
const listPersonalSkills = document.getElementById('list-personal-skills');
const rowPortfolio = document.getElementById('row-portfolio');
const portfolioModals = document.getElementById('portfolio-modals');

softSkills.forEach(skill => {
    const li = document.createElement('li');
    li.classList.add('list-group-item')
    li.innerHTML = skill
    listSoftSkills.appendChild(li)
})

personalSkills.forEach(skill => {
    const li = document.createElement('li');
    li.classList.add('list-group-item')
    li.innerHTML = skill
    listPersonalSkills.appendChild(li)
})

projects.forEach(project => {
    const newNode = templateProject(project);
    const [readyHtml] = newNode.getElementsByClassName('col-lg-6');
    rowPortfolio.appendChild(readyHtml);
})

projects.forEach(project => {
    const newNode = templateProjectModal(project);
    const [readyHtml] = newNode.getElementsByClassName('portfolio-modal');
    portfolioModals.appendChild(readyHtml);
})

