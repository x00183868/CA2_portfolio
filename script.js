// =========================================================// =========================================================

// DARK MODE TOGGLE// DARK MODE TOGGLE

// =========================================================// =========================================================



// PAGE LOADER: fade out the loader overlay once the page has loaded// PAGE LOADER: fade out the loader overlay once the page has loaded

window.addEventListener("load", () => {window.addEventListener("load", () => {

    const loader = document.getElementById("loader");    const loader = document.getElementById("loader");

    if (!loader) return;    if (!loader) return;



    setTimeout(() => {    setTimeout(() => {

        loader.style.opacity = "0";        loader.style.opacity = "0";

        setTimeout(() => {        setTimeout(() => {

            loader.style.display = "none";            loader.style.display = "none";

        }, 500);        }, 500);

    }, 300);    }, 300);

});});





function toggleDarkMode() {function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");    document.body.classList.toggle("dark-mode");



    // Save preference to localStorage    // Save preference to localStorage

    if (document.body.classList.contains("dark-mode")) {    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("theme", "dark");        localStorage.setItem("theme", "dark");

    } else {    } else {

        localStorage.setItem("theme", "light");        localStorage.setItem("theme", "light");

    }    }

}}



// Apply saved preference on page load// Apply saved preference on page load

window.onload = function() {window.onload = function() {

    let savedTheme = localStorage.getItem("theme");    let savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");        document.body.classList.add("dark-mode");

    }    }

};};



// =========================================================// =========================================================

// SKILLS PROGRESS BAR ANIMATION// SKILLS PROGRESS BAR ANIMATION

// =========================================================// =========================================================



function animateSkills() {function animateSkills() {

    const htmlBar = document.getElementById("htmlBar");    const htmlBar = document.getElementById("htmlBar");

    const jsBar = document.getElementById("jsBar");    const jsBar = document.getElementById("jsBar");



    // Only animate once    // Only animate once

    if (!htmlBar.classList.contains("animated")) {    if (!htmlBar.classList.contains("animated")) {

        htmlBar.style.width = "90%";        htmlBar.style.width = "90%";

        jsBar.style.width = "75%";        jsBar.style.width = "75%";



        htmlBar.classList.add("animated");        htmlBar.classList.add("animated");

        jsBar.classList.add("animated");        jsBar.classList.add("animated");

    }    }

}}



// Detect when the skills section is in view// Detect when the skills section is in view

function isElementInView(el) {function isElementInView(el) {

    const rect = el.getBoundingClientRect();    const rect = el.getBoundingClientRect();

    return (    return (

        rect.top >= 0 &&        rect.top >= 0 &&

        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)

    );    );

}}



window.addEventListener("scroll", function () {window.addEventListener("scroll", function () {

    const skillsSection = document.getElementById("skills");    const skillsSection = document.getElementById("skills");

    if (isElementInView(skillsSection)) {    if (isElementInView(skillsSection)) {

        animateSkills();        animateSkills();

    }    }

});});



// =========================================================// =========================================================

// PROJECT FILTERING// PROJECT FILTERING

// =========================================================// =========================================================



const filterButtons = document.querySelectorAll(".filter-btn");const filterButtons = document.querySelectorAll(".filter-btn");

const projectCards = document.querySelectorAll(".project-card");const projectCards = document.querySelectorAll(".project-card");



filterButtons.forEach(button => {filterButtons.forEach(button => {

    button.addEventListener("click", () => {    button.addEventListener("click", () => {

        const year = button.getAttribute("data-year");        const year = button.getAttribute("data-year");



        projectCards.forEach(card => {        projectCards.forEach(card => {

            if (year === "all") {            if (year === "all") {

                card.style.display = "block";                card.style.display = "block";

            } else if (card.getAttribute("data-year") === year) {            } else if (card.getAttribute("data-year") === year) {

                card.style.display = "block";                card.style.display = "block";

            } else {            } else {

                card.style.display = "none";                card.style.display = "none";

            }            }

        });        });



        // Highlight active button        // Highlight active button

        filterButtons.forEach(btn => btn.classList.remove("active"));        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");        button.classList.add("active");

    });    });

});});





// =========================================================// =========================================================

// GPA inputs: load/save per year to localStorage// GPA inputs: load/save per year to localStorage

// =========================================================// =========================================================



// Populate GPA display spans from localStorage and allow quick edit// Populate GPA display spans from localStorage and allow quick edit

function initGPADisplays() {function initGPADisplays() {

    try {    try {

        for (let year = 1; year <= 4; year++) {        for (let year = 1; year <= 4; year++) {

            const display = document.getElementById(`gpa-year-${year}-display`);            const display = document.getElementById(`gpa-year-${year}-display`);

            if (!display) continue;            if (!display) continue;



            const key = `gpa-year-${year}`;            const key = `gpa-year-${year}`;

            const saved = localStorage.getItem(key);            const saved = localStorage.getItem(key);



            if (saved !== null && !isNaN(Number(saved))) {            if (saved !== null && !isNaN(Number(saved))) {

                display.textContent = Number(saved).toFixed(2);                display.textContent = Number(saved).toFixed(2);

                display.classList.remove('placeholder');                display.classList.remove('placeholder');

            } else {            } else {

                display.textContent = '-';                display.textContent = '-';

                display.classList.add('placeholder');                display.classList.add('placeholder');

            }            }



            // allow quick edit: click the value to set a new GPA (0.00 - 4.00)            // allow quick edit: click the value to set a new GPA (0.00 - 4.00)

            display.addEventListener('click', () => {            display.addEventListener('click', () => {

                const current = display.textContent === '-' ? '' : display.textContent;                const current = display.textContent === '-' ? '' : display.textContent;

                const entry = prompt(`Enter GPA for year ${year} (0.00 - 4.00):`, current);                const entry = prompt(`Enter GPA for year ${year} (0.00 - 4.00):`, current);

                if (entry === null) return; // cancelled                if (entry === null) return; // cancelled

                const v = parseFloat(entry);                const v = parseFloat(entry);

                if (isNaN(v) || v < 0 || v > 4) {                if (isNaN(v) || v < 0 || v > 4) {

                    alert('Please enter a number between 0.00 and 4.00');                    alert('Please enter a number between 0.00 and 4.00');

                    return;                    return;

                }                }

                const normalized = v.toFixed(2);                const normalized = v.toFixed(2);

                localStorage.setItem(key, normalized);                localStorage.setItem(key, normalized);

                display.textContent = normalized;                display.textContent = normalized;

                display.classList.remove('placeholder');                display.classList.remove('placeholder');

            });            });

        }        }

    } catch (e) {    } catch (e) {

        console.warn('initGPADisplays failed', e);        console.warn('initGPADisplays failed', e);

    }    }

}}



document.addEventListener('DOMContentLoaded', function () {document.addEventListener('DOMContentLoaded', function () {

    initGPADisplays();    initGPADisplays();

});});



// =========================================================// =========================================================

// Contact email chooser (Gmail/Outlook/Yahoo)// Contact email chooser (Gmail/Outlook/Yahoo)

// =========================================================// =========================================================

document.addEventListener('DOMContentLoaded', function () {document.addEventListener('DOMContentLoaded', function () {

    const emailBtn = document.getElementById('emailChooserBtn');    const emailBtn = document.getElementById('emailChooserBtn');

    const chooserModalEl = document.getElementById('emailChooserModal');    const chooserModalEl = document.getElementById('emailChooserModal');

    if (!emailBtn || !chooserModalEl) return;    if (!emailBtn || !chooserModalEl) return;



    const chooserModal = new bootstrap.Modal(chooserModalEl);    const chooserModal = new bootstrap.Modal(chooserModalEl);

    emailBtn.addEventListener('click', () => {    emailBtn.addEventListener('click', () => {

        chooserModal.show();        chooserModal.show();

    });    });



    const recipient = 'x00183868@mytudublin.ie';    const recipient = 'x00183868@mytudublin.ie';



    // Buttons    // Buttons

    const btnGmail = document.getElementById('btn-gmail');    const btnGmail = document.getElementById('btn-gmail');

    const btnOutlook = document.getElementById('btn-outlook');    const btnOutlook = document.getElementById('btn-outlook');

    const btnYahoo = document.getElementById('btn-yahoo');    const btnYahoo = document.getElementById('btn-yahoo');

    const btnMailto = document.getElementById('btn-mailto');    const btnMailto = document.getElementById('btn-mailto');



    function openInNewTab(url) {    function openInNewTab(url) {

        window.open(url, '_blank', 'noopener');        window.open(url, '_blank', 'noopener');

        chooserModal.hide();        chooserModal.hide();

    }    }



    if (btnGmail) {    if (btnGmail) {

        btnGmail.addEventListener('click', () => {        btnGmail.addEventListener('click', () => {

            const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}`;            const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}`;

            openInNewTab(url);            openInNewTab(url);

        });        });

    }    }



    if (btnOutlook) {    if (btnOutlook) {

        btnOutlook.addEventListener('click', () => {        btnOutlook.addEventListener('click', () => {

            const url = `https://outlook.live.com/owa/?path=/mail/action/compose&to=${encodeURIComponent(recipient)}`;            const url = `https://outlook.live.com/owa/?path=/mail/action/compose&to=${encodeURIComponent(recipient)}`;

            openInNewTab(url);            openInNewTab(url);

        });        });

    }    }



    if (btnYahoo) {    if (btnYahoo) {

        btnYahoo.addEventListener('click', () => {        btnYahoo.addEventListener('click', () => {

            const url = `https://compose.mail.yahoo.com/?to=${encodeURIComponent(recipient)}`;            const url = `https://compose.mail.yahoo.com/?to=${encodeURIComponent(recipient)}`;

            openInNewTab(url);            openInNewTab(url);

        });        });

    }    }



    if (btnMailto) {    if (btnMailto) {

        btnMailto.addEventListener('click', () => {        btnMailto.addEventListener('click', () => {

            const mailto = `mailto:${recipient}`;            const mailto = `mailto:${recipient}`;

            window.location.href = mailto;            window.location.href = mailto;

            chooserModal.hide();            chooserModal.hide();

        });        });

    }    }

});});



