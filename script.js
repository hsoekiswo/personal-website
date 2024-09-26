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

        if (!hasDragged) {
            // Open modal only if there was no dragging
            openModal();
        }
    }

    // Touch events
    draggable.addEventListener('touchstart', function (e) {
        const touch = e.touches[0];
        startDrag(touch.clientX, touch.clientY);

        document.addEventListener('touchmove', handleTouchMove);
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

        if (!hasDragged) {
            // Open modal only if there was no dragging
            openModal();
        }
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

    // Example modal opening function
    function openModal() {
        console.log("Modal opened");
        // Add your modal opening logic here
    }
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
const directories = document.getElementsByClassName("directory");

Array.from(directories).forEach(item => {
    item.addEventListener('mousedown', function (e) {
        const modalTarget = item.getAttribute('data-modal-target');
        const modal = document.querySelector(`.modal[data-modal="${modalTarget}"]`);

        const openModal = function () {
            modal.classList.remove("hidden");
        }

        item.addEventListener("click", openModal);
    })
});

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

const menuHeaders = document.getElementsByClassName("menu-header");

Array.from(menuHeaders).forEach(item => {
    item.addEventListener('mousedown', function (e) {
        const modalTarget = item.getAttribute('data-modal-target');
        const modal = document.querySelector(`.modal[data-modal="${modalTarget}"]`);

        const openModal = function () {
            modal.classList.remove("hidden");
        }

        item.addEventListener("click", openModal);
    })
})