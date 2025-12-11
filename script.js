// =========================================================
// DARK MODE TOGGLE
// =========================================================

// PAGE LOADER: fade out the loader overlay once the page has loaded
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (!loader) return;

    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }, 300);
});


function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    // Save preference to localStorage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// Apply saved preference on page load
window.onload = function() {
    let savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
};

// =========================================================
// SKILLS PROGRESS BAR ANIMATION
// =========================================================

function animateSkills() {
    const htmlBar = document.getElementById("htmlBar");
    const jsBar = document.getElementById("jsBar");

    // Only animate once
    if (!htmlBar.classList.contains("animated")) {
        htmlBar.style.width = "90%";
        jsBar.style.width = "75%";

        htmlBar.classList.add("animated");
        jsBar.classList.add("animated");
    }
}

// Detect when the skills section is in view
function isElementInView(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

window.addEventListener("scroll", function () {
    const skillsSection = document.getElementById("skills");
    if (isElementInView(skillsSection)) {
        animateSkills();
    }
});

// =========================================================
// PROJECT FILTERING
// =========================================================

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const year = button.getAttribute("data-year");

        projectCards.forEach(card => {
            if (year === "all") {
                card.style.display = "block";
            } else if (card.getAttribute("data-year") === year) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });

        // Highlight active button
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    });
});


// =========================================================
// GPA inputs: load/save per year to localStorage
// =========================================================

// Populate GPA display spans from localStorage and allow quick edit
function initGPADisplays() {
    try {
        for (let year = 1; year <= 4; year++) {
            const display = document.getElementById(`gpa-year-${year}-display`);
            if (!display) continue;

            const key = `gpa-year-${year}`;
            const saved = localStorage.getItem(key);

            if (saved !== null && !isNaN(Number(saved))) {
                display.textContent = Number(saved).toFixed(2);
                display.classList.remove('placeholder');
            } else {
                display.textContent = '-';
                display.classList.add('placeholder');
            }

            // allow quick edit: click the value to set a new GPA (0.00 - 4.00)
            display.addEventListener('click', () => {
                const current = display.textContent === '-' ? '' : display.textContent;
                const entry = prompt(`Enter GPA for year ${year} (0.00 - 4.00):`, current);
                if (entry === null) return; // cancelled
                const v = parseFloat(entry);
                if (isNaN(v) || v < 0 || v > 4) {
                    alert('Please enter a number between 0.00 and 4.00');
                    return;
                }
                const normalized = v.toFixed(2);
                localStorage.setItem(key, normalized);
                display.textContent = normalized;
                display.classList.remove('placeholder');
            });
        }
    } catch (e) {
        console.warn('initGPADisplays failed', e);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    initGPADisplays();
});

// =========================================================
// Contact email chooser (Gmail/Outlook/Yahoo)
// =========================================================
document.addEventListener('DOMContentLoaded', function () {
    const emailBtn = document.getElementById('emailChooserBtn');
    const chooserModalEl = document.getElementById('emailChooserModal');
    if (!emailBtn || !chooserModalEl) return;

    const chooserModal = new bootstrap.Modal(chooserModalEl);
    emailBtn.addEventListener('click', () => {
        chooserModal.show();
    });

    const recipient = 'x00183868@mytudublin.ie';

    // Buttons
    const btnGmail = document.getElementById('btn-gmail');
    const btnOutlook = document.getElementById('btn-outlook');
    const btnYahoo = document.getElementById('btn-yahoo');
    const btnMailto = document.getElementById('btn-mailto');

    function openInNewTab(url) {
        window.open(url, '_blank', 'noopener');
        chooserModal.hide();
    }

    if (btnGmail) {
        btnGmail.addEventListener('click', () => {
            const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}`;
            openInNewTab(url);
        });
    }

    if (btnOutlook) {
        btnOutlook.addEventListener('click', () => {
            const url = `https://outlook.live.com/owa/?path=/mail/action/compose&to=${encodeURIComponent(recipient)}`;
            openInNewTab(url);
        });
    }

    if (btnYahoo) {
        btnYahoo.addEventListener('click', () => {
            const url = `https://compose.mail.yahoo.com/?to=${encodeURIComponent(recipient)}`;
            openInNewTab(url);
        });
    }

    if (btnMailto) {
        btnMailto.addEventListener('click', () => {
            const mailto = `mailto:${recipient}`;
            window.location.href = mailto;
            chooserModal.hide();
        });
    }
});


