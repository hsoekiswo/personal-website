const draggables = document.getElementsByClassName("directory");

Array.from(draggables).forEach(draggable => {
    let isDragging = false;
    let hasDragged = false; // Flag to track dragging
    let startX, startY, initialX, initialY;

    // Function to start dragging
    function startDrag(x, y) {
        isDragging = true;
        hasDragged = false; // Reset drag flag
        startX = draggable.offsetLeft;
        startY = draggable.offsetTop;
        initialX = x;
        initialY = y;
    }

    // Function to move the draggable
    function moveDrag(x, y) {
        if (!isDragging) return;

        const dx = x - initialX;
        const dy = y - initialY;

        // If movement is significant, set hasDragged to true
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            hasDragged = true;
        }

        draggable.style.left = `${startX + dx}px`;
        draggable.style.top = `${startY + dy}px`;
    }

    // Function to stop dragging
    function stopDrag() {
        if (isDragging) {
            isDragging = false;
        }
    }

    // Mouse events
    draggable.addEventListener('mousedown', function (e) {
        e.preventDefault(); // Prevent selection or other defaults
        startDrag(e.clientX, e.clientY);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    });

    // Mouse move handler
    function handleMouseMove(e) {
        moveDrag(e.clientX, e.clientY);
    }

    // Mouse up handler
    function handleMouseUp(e) {
        stopDrag();
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    // Touch events
    draggable.addEventListener('touchstart', function (e) {
        e.stopImmediatePropagation();
        const touch = e.touches[0];
        startDrag(touch.clientX, touch.clientY);

        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
    });

    // Touch move handler
    function handleTouchMove(e) {
        const touch = e.touches[0];

        // Check if the user has started dragging
        if (isDragging) {
            moveDrag(touch.clientX, touch.clientY);
            e.preventDefault(); // Prevent scrolling only during dragging
        }
    }

    // Touch end handler
    function handleTouchEnd(e) {
        stopDrag();
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    }

    // Handle click event on the draggable element
    draggable.addEventListener('click', function (e) {
        const currentX = draggable.offsetLeft;
        const currentY = draggable.offsetTop;

        // Prevent modal from opening if the draggable was moved (dragged)
        if (hasDragged || (currentX !== startX || currentY !== startY)) {
            e.preventDefault(); // Prevent default action (like opening the modal)
            e.stopImmediatePropagation(); // Stop the event from propagating further
        }
    });
});

//----------------------//

// Directory position
document.addEventListener("DOMContentLoaded", function() { // window.onload() = execute after 
    const elements = ['portfolio', 'journal', 'bookshelf', 'music'];

    // Define two sets of positions
    const positions = [
        {
            portfolio: { top: '22%', left: '24%' },
            journal: { top: '34%', left: '36%' },
            bookshelf: { top: '42%', left: '54%' },
            music: { top: '63%', left: '43%' }
        },
        {
            portfolio: { top: '44%', left: '43%' },
            journal: { top: '45%', left: '42%' },
            bookshelf: { top: '45%', left: '41%' },
            music: { top: '44%', left: '42%' }
        }
    ];

    // Randomly choose a set of positions
    const randomPositions = positions[Math.floor(Math.random() * positions.length)];

    // Apply the selected positions to each element
    elements.forEach(id => {
        const element = document.getElementById(id);
        const position = randomPositions[id];
        if (element && position) {
            element.style.top = position.top;
            element.style.left = position.left;
        }
    });
});

//----------------------//

// Create sidebar to be hidden
const listItems = document.querySelectorAll('#sidebar-text li'); // Select all <li> elements inside #sidebar-text

listItems.forEach((item) => {
  const maxWidth = item.clientWidth; // Get the width of each <li> element

  // Check if text content overflows the container
  while (item.scrollWidth > maxWidth) {
    // Remove last two characters and add ellipsis
    item.textContent = item.textContent.slice(0, -3) + '..';
  }
});


//----------------------//

// Window pop up or modal opening
const menuHeaders = document.getElementsByClassName("menu-header");
const directories = document.getElementsByClassName("directory");

async function getData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Data couldn't be loaded \nResponse status: ${response.status}`);
        }
        const data = await response.text();

        return data;
    } catch (error) {
        console.error(error.message);
    }
}

function setupJournalClick(contentElement) {
    const journalTitle = contentElement.querySelectorAll('.journal-title');

    journalTitle.forEach(item => {
        item.addEventListener('click', function() {
            let journalID = item.getAttribute('id');
            let journalURL = `./journal/${journalID}.html`;
            const modal = document.querySelector(`.modal[data-modal="journal"]`);

            item.classList.add('selected-journal');
            loadContent(modal, journalURL, '#journal-modal-text');
        });
    })
}

async function loadContent(modalElement, url, contentSelector) {
    try {
        const data = await getData(url);
        const contentElement = document.querySelector(contentSelector);
        contentElement.innerHTML = data;

        modalElement.classList.remove("hidden");

        setupJournalClick(contentElement, contentSelector);
    } catch (error) {
        console.error("Error loading content:", error);
    }
}

Array.from(menuHeaders).forEach(item => {
    item.addEventListener('mousedown', function (e) {
        const modalTarget = item.getAttribute('data-modal-target');
        const modal = document.querySelector(`.modal[data-modal="${modalTarget}"]`);

        if (modalTarget === "about") {
            loadContent(modal, './about/index.html', '#about-modal-content');
        } else if (modalTarget=== "contact") {
            loadContent(modal, './contact/index.html', '#contact-modal-content');
        }
    })
})

Array.from(directories).forEach(item => {
    item.addEventListener('mousedown', function (e) {
        const modalTarget = item.getAttribute('data-modal-target');
        const modal = document.querySelector(`.modal[data-modal="${modalTarget}"]`);

        if (modalTarget === "portfolio") {
            loadContent(modal, './portfolio/index.html', '#portfolio-modal-content');
        } else if (modalTarget=== "journal") {
            loadContent(modal, './journal/index.html', '#journal-modal-content');
        } else if (modalTarget=== "bookshelf") {
            loadContent(modal, './bookshelf/index.html', '#bookshelf-modal-content');
        } else if (modalTarget=== "music") {
            loadContent(modal, './music/index.html', '#music-modal-content');
        }
    })
});

// Window closing
const closeButtons = document.getElementsByClassName("btn-close");

Array.from(closeButtons).forEach(item => {
    item.addEventListener('mousedown', function (e) {
        const modal = e.target.closest('.modal')

        const closeModal = function () {
            modal.classList.add("hidden");
        }

        item.addEventListener("click", closeModal)
    })
})

//----------------------//

// Darkmode
const darkModeToggle = document.getElementsByClassName('dark-mode');

Array.from(darkModeToggle).forEach(item => {
    item.addEventListener('click', function () {
        const modal = this.closest('.modal')
        const mainContent = modal.querySelector('.main-content')

        mainContent.classList.toggle('dark-content');

        if (mainContent.classList.contains('dark-content')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled')
        }
    })
})

window.addEventListener('load', function () {
    const darkModeState = localStorage.getItem('darkMode');
    Array.from(darkModeToggle).forEach(item => {
        const modal = item.closest('.modal');

        const mainContent = modal.querySelector('.main-content');

        if (darkModeState === 'enabled') {
            mainContent.classList.add('dark-content');
        } else {
            mainContent.classList.remove('dark-content');
        }
    })
})

// Adjusting font size
localStorage.setItem('fontSize', 'medium');
const smallerFontToggle = document.getElementsByClassName('smaller-font');
const largerFontToggle = document.getElementsByClassName('larger-font');

function applyFontSize(mainContent, size) {
    mainContent.classList.remove('small-font', 'medium-font', 'large-font');
    if (size === 'small') {
        mainContent.classList.add('small-font');
    } else if (size === 'medium') {
        mainContent.classList.add('medium-font');
    } else if (size === 'large') {
        mainContent.classList.add('large-font');
    }
}

Array.from(smallerFontToggle).forEach(item => {
    item.addEventListener('click', function () {
        const fontSizeState = localStorage.getItem('fontSize');
        const modal = this.closest('.modal');
        const mainContent = modal.querySelector('.main-content');

        if (fontSizeState === 'medium') {
            localStorage.setItem('fontSize', 'small');
            applyFontSize(mainContent, 'small');
        } else if (fontSizeState === 'large') {
            localStorage.setItem('fontSize', 'medium');
            applyFontSize(mainContent, 'medium');
        }
    })
})

Array.from(largerFontToggle).forEach(item => {
    item.addEventListener('click', function () {
        const fontSizeState = localStorage.getItem('fontSize');
        const modal = this.closest('.modal');
        const mainContent = modal.querySelector('.main-content');

        if (fontSizeState === 'small') {
            localStorage.setItem('fontSize', 'medium');
            applyFontSize(mainContent, 'medium');
        } else if (fontSizeState === 'medium') {
            localStorage.setItem('fontSize', 'large');
            applyFontSize(mainContent, 'large');
        }
    })
})

// Change font style
localStorage.setItem('fontStyle', 'jetbrains');
const changeFontToggle = document.getElementsByClassName('font-style');

function applyFontStyle(mainContent, style) {
    mainContent.classList.remove('jetbrains', 'ibm-plex', 'courier-prime');
    if (style === 'jetbrains') {
        mainContent.classList.add('jetbrains');
    } else if (style === 'ibm-plex') {
        mainContent.classList.add('ibm-plex');
    } else if (style === 'courier-prime') {
        mainContent.classList.add('courier-prime');
    }
}

Array.from(changeFontToggle).forEach(item => {
    item.addEventListener('click', function () {
        const fontStyle = localStorage.getItem('fontStyle');
        const modal = this.closest('.modal');
        const mainContent = modal.querySelector('.main-content');
        
        if (fontStyle === 'jetbrains') {
            localStorage.setItem('fontStyle', 'ibm-plex');
            applyFontStyle(mainContent, 'ibm-plex');
        } else if (fontStyle === 'ibm-plex') {
            localStorage.setItem('fontStyle', 'courier-prime');
            applyFontStyle(mainContent, 'courier-prime');
        } else if (fontStyle === 'courier-prime') {
            localStorage.setItem('fontStyle', 'jetbrains');
            applyFontStyle(mainContent, 'jetbrains');
        }
    })
})