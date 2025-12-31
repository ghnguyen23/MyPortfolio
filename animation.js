window.addEventListener('load', () => {

    // --- DRAGGABLE SKILLS LOGIC REMOVED ---

    // --- SCROLL ANIMATION OBSERVER ---
    // Selects elements with .scroll-hidden (added in CSS)
    const animatedElements = document.querySelectorAll('.scroll-hidden');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to make visible and animate
                entry.target.classList.add('scroll-visible');
            }
        });
    }, {
        threshold: 0.25 // Animation triggers when 20% of the element is visible
    });

    animatedElements.forEach(el => observer.observe(el));
    // --- CAROUSEL DRAG & SCROLL LOGIC ---
    const slider = document.querySelector('.cards-grid');
    const dragThumb = document.getElementById('dragThumb');

    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        // Mouse Events for Dragging the Container
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        const stopDrag = () => {
            isDown = false;
            slider.classList.remove('active');
        };

        slider.addEventListener('mouseleave', stopDrag);
        slider.addEventListener('mouseup', stopDrag);

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast
            slider.scrollLeft = scrollLeft - walk;
        });

        // Sync Visual Dragbar
        const updateDragBar = () => {
            if (!dragThumb) return;

            // Container widths
            const containerWidth = slider.clientWidth;
            const scrollWidth = slider.scrollWidth;

            // If content fits, hide or full width
            if (scrollWidth <= containerWidth) {
                dragThumb.style.width = '100%';
                dragThumb.style.transform = 'translateX(0)';
                return;
            }

            // Track (visual area)
            const trackWidth = document.querySelector('.drag-bar-track').clientWidth || 200; // Fallback 200 matches CSS max-width

            // Calculate proportional thumb size
            // Ratio of visible area to total content
            const ratio = containerWidth / scrollWidth;
            let thumbWidth = trackWidth * ratio;

            // Min width for usability
            if (thumbWidth < 30) thumbWidth = 30;

            dragThumb.style.width = `${thumbWidth}px`;

            // Calculate Position
            // Max scrollable content
            const maxScrollLeft = scrollWidth - containerWidth;
            // Current scroll
            const scrolled = slider.scrollLeft;

            // Percentage scrolled (0 to 1)
            const percentage = scrolled / maxScrollLeft;

            // Available visual track space
            const availableSpace = trackWidth - thumbWidth;

            const leftPos = percentage * availableSpace;

            dragThumb.style.transform = `translateX(${leftPos}px)`;
        };

        slider.addEventListener('scroll', updateDragBar);
        window.addEventListener('resize', updateDragBar);

        // Initial setup
        updateDragBar();
    }

    // --- CASE STUDY LAYOUT FIX ---
    function adjustCaseStudyHeights() {
        const cards = document.querySelectorAll('.featured-overlap-card');
        cards.forEach(card => {
            const visualImg = card.querySelector('.visual-full-image');
            const textContent = card.querySelector('.overlap-text-content');

            if (visualImg && textContent) {
                const imgHeight = visualImg.offsetHeight;
                // Only apply if image is loaded and substantial
                if (imgHeight > 50) {
                    const maxAllowed = imgHeight * 0.7;
                    textContent.style.maxHeight = `${maxAllowed}px`;
                }
            }
        });
    }

    // Run initially
    adjustCaseStudyHeights();

    // Run on resize
    window.addEventListener('resize', adjustCaseStudyHeights);

    // --- APP SHOWCASE LOGIC ---
    const appsData = [
        {
            id: 1,
            title: "Reverse Audio: Voice Recorder",
            category: "Tools",
            icon: "images/Apps/ico_app_1.webp",
            banner: "images/Apps/banner_app_1.png",
            link: "https://play.google.com/store/apps/details?id=reversesingingchallenge.reverseaudio.reversevoicesoundrecorder.backwardvoiceaudio"
        },
        {
            id: 2,
            title: "Emoji Battery Status Widget",
            category: "Personalization",
            icon: "images/Apps/ico_app_2.webp",
            banner: "images/Apps/banner_app_2.png",
            link: "https://play.google.com/store/apps/details?id=emojibatteryicon.forbattery.androidstatusbar.batterywidget"
        },
        {
            id: 3,
            title: "Prank Call: Santa Video Call",
            category: "Entertainment",
            icon: "images/Apps/ico_app_3.webp",
            banner: "images/Apps/banner_app_3.png",
            link: "https://play.google.com/store/apps/details?id=com.fakecall.prankcall.santacall"
        },
        {
            id: 4,
            title: "Ghost Detector: Radar & Tracker",
            category: "Entertainment",
            icon: "images/Apps/ico_app_4.webp",
            banner: "images/Apps/banner_app_4.png",
            link: "https://play.google.com/store/apps/details?id=com.ghostdetector.radarfinder.tracker"
        },
        {
            id: 5,
            title: "LED Banner: Scrolling Text",
            category: "Tools",
            icon: "images/Apps/ico_app_5.webp",
            banner: "images/Apps/banner_app_5.png",
            link: "https://play.google.com/store/apps/details?id=ledbannerdisplayapp.ledrunningtext.ledscroller.scrollingtextmessage"
        },
        {
            id: 6,
            title: "Fake Video Call - Prank App",
            category: "Entertainment",
            icon: "images/Apps/ico_app_6.webp",
            banner: "images/Apps/banner_app_6.png",
            link: "https://play.google.com/store/apps/details?id=fakevideocallapp.fakevideo.prankcallapp.fakecallprankfriend.fakephonecall"
        },
        {
            id: 7,
            title: "Color Call Screen",
            category: "Personalization",
            icon: "images/Apps/ico_app_7.webp",
            banner: "images/Apps/banner_app_7.png",
            link: "https://play.google.com/store/apps/details?id=colorcallscreenapp.colourcallapp.lovelycallcolorscreen.coolphonecallscreen"
        },
        {
            id: 8,
            title: "Draw Sketch: Trace Drawing",
            category: "Tools",
            icon: "images/Apps/ico_app_8.webp",
            banner: "images/Apps/banner_app_8.png",
            link: "https://play.google.com/store/apps/details?id=drawsketch.tracedrawing.draw.trace.sketchpaint"
        }
    ];
    // --- Case Study Clickable Logic ---
    const caseCards = document.querySelectorAll('.case-study-card');
    caseCards.forEach(card => {
        const linkBtn = card.querySelector('.btn-case-study');
        if (linkBtn) {
            const url = linkBtn.getAttribute('href');
            card.style.cursor = 'pointer'; // Ensure cursor is set
            card.onclick = (e) => {
                // If user clicks the button explicitly, let default handle it?
                // Actually, often it's better to verify.
                // If the button is an <a> tag, clicking it fires the link naturally.
                // If clicking elsewhere, we fire window.open.
                if (!e.target.closest('.btn-case-study')) {
                    window.open(url, '_blank');
                }
            };
        }
    });

    // --- Carousel / App Showcase Logic ---
    // --- Sidebar Navigation Logic ---
    const sidebar = document.getElementById('sidebarNav');
    const toggleBtn = document.getElementById('navToggleBtn');

    if (sidebar && toggleBtn) {
        // Toggle Menu
        toggleBtn.onclick = () => {
            sidebar.classList.toggle('expanded');
        };

        // Close when clicking a link (especially mobile)
        const navLinks = sidebar.querySelectorAll('.nav-link, .sub-link');
        navLinks.forEach(link => {
            link.onclick = () => {
                if (window.innerWidth <= 1024) { // Only close on mobile
                    sidebar.classList.remove('expanded');
                }
            };
        });

        // Close when clicking outside (Mobile mainly)
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && sidebar.classList.contains('expanded')) {
                sidebar.classList.remove('expanded');
            }
        });
    }

    // --- Tab Scroll Logic ---
    const tabsTrack = document.getElementById('appTabsTrack');
    const detailCard = document.getElementById('appDetailCard');

    if (tabsTrack && detailCard) {
        let activeIndex = 0;

        function renderTabs() {
            tabsTrack.innerHTML = '';
            appsData.forEach((app, index) => {
                const tab = document.createElement('div');
                tab.className = `app-tab ${index === activeIndex ? 'active' : ''}`;
                tab.onclick = () => setActiveApp(index);

                const img = document.createElement('img');
                img.src = app.icon;
                img.alt = app.title;
                img.onload = () => checkScrollIndicator(); // Ensure arrows appear when content loads

                tab.appendChild(img);
                tabsTrack.appendChild(tab);
            });
        }

        function renderDetail(index) {
            const app = appsData[index];

            // Make the entire card clickable
            detailCard.onclick = () => {
                window.open(app.link, '_blank');
            };

            detailCard.innerHTML = `
                <div class="app-detail-visual" style="background-image: url('${app.banner}');"></div>
                <div class="app-detail-content animate-slide-up">
                    <div class="app-detail-header">
                        <img src="${app.icon}" class="app-detail-icon-sm" alt="icon">
                        <div class="app-detail-meta">
                            <span class="app-tag">${app.category}</span>
                            <h3 class="app-title">${app.title}</h3>
                        </div>
                    </div>
                    <div class="app-detail-actions">
                        <!-- Changed from <a> to <div> to avoid nested click issues, handled by parent -->
                        <div class="btn-play-store-lg">
                            <img src="images/bg_google_play_btn_1.png" alt="Get it on Google Play">
                        </div>
                    </div>
                </div>
            `;
        }

        function setActiveApp(index) {
            if (activeAppIndex === index) return;
            activeAppIndex = index;

            // Update Tab Styles
            const tabs = tabsTrack.querySelectorAll('.app-tab');
            tabs.forEach((tab, i) => {
                if (i === index) tab.classList.add('active');
                else tab.classList.remove('active');
            });

            // Scroll tab into view naturally without shifting the page
            const activeTab = tabs[index];
            const trackWidth = tabsTrack.clientWidth;
            const tabLeft = activeTab.offsetLeft;
            const tabWidth = activeTab.offsetWidth;

            // Calculate center position
            const scrollPos = tabLeft - (trackWidth / 2) + (tabWidth / 2);

            tabsTrack.scrollTo({
                left: scrollPos,
                behavior: 'smooth'
            });

            renderDetail(index);
        }

        let activeAppIndex = 0;
        renderTabs();
        renderDetail(0);

        // --- SCROLL INDICATOR LOGIC ---
        const tabsWrapper = document.querySelector('.app-tabs-wrapper');
        const prevBtn = document.getElementById('scrollPrevBtn');
        const nextBtn = document.getElementById('scrollNextBtn');

        function checkScrollIndicator() {
            if (!tabsWrapper) return;

            // Allow 5px buffer for float calculation differences
            // tabsTrack is defined in parent scope
            if (!tabsTrack) return;

            const maxScroll = tabsTrack.scrollWidth - tabsTrack.clientWidth - 5;
            const currentScroll = tabsTrack.scrollLeft;
            const isOverflowing = maxScroll > 0;

            if (prevBtn) {
                if (isOverflowing && currentScroll > 10) {
                    prevBtn.classList.add('visible');
                } else {
                    prevBtn.classList.remove('visible');
                }

                // Click Handler if not already attached (simple way to ensure one handler)
                prevBtn.onclick = () => {
                    tabsTrack.scrollBy({ left: -150, behavior: 'smooth' });
                };
            }

            if (nextBtn) {
                if (isOverflowing && currentScroll < maxScroll) {
                    nextBtn.classList.add('visible');
                } else {
                    nextBtn.classList.remove('visible');
                }

                // Click Handler
                nextBtn.onclick = () => {
                    tabsTrack.scrollBy({ left: 150, behavior: 'smooth' });
                };
            }
        }

        // Check on load, resize, and scroll
        tabsTrack.addEventListener('scroll', checkScrollIndicator);
        window.addEventListener('resize', checkScrollIndicator);

        // Initial check with delay
        setTimeout(checkScrollIndicator, 100);

        // Backup check
        setInterval(checkScrollIndicator, 1000);
    }
});


function copyEmail(tooltipId = 'copyTooltip') {
    const email = "nguyenvn12n@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        const tooltip = document.getElementById(tooltipId);
        if (!tooltip) return;

        const originalText = tooltip.textContent;
        tooltip.textContent = "Copied!";
        tooltip.classList.add("show");

        // Reset after 2 seconds
        setTimeout(() => {
            tooltip.classList.remove("show");
            setTimeout(() => tooltip.textContent = originalText, 200);
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}