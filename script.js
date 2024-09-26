const draggables = document.getElementsByClassName("directory");

Array.from(draggables).forEach(draggable => {
    let isDragging = false;
    let hasMoved = false; // Track whether the div has been moved
    let startX, startY, initialMouseX, initialMouseY;

    // Store the original position of the div
    const originalX = draggable.offsetLeft;
    const originalY = draggable.offsetTop;

    // `mousedown` event to start dragging
    draggable.addEventListener('mousedown', function (e) {
        // Only start drag if the clicked element is not an anchor tag
        if (e.target.tagName !== 'DIV') {
            e.preventDefault(); // Prevent text selection or other defaults

            isDragging = true; // Set the dragging flag to true
            hasMoved = false; // Reset the moved flag

            // Record initial mouse and element positions
            startX = draggable.offsetLeft;
            startY = draggable.offsetTop;
            initialMouseX = e.clientX;
            initialMouseY = e.clientY;

            // Add event listeners for `mousemove` and `mouseup` events
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
    });

    // applied for mobile
    draggable.addEventListener('touchstart', function (e) {
        // Only start drag if the clicked element is not an anchor tag
        if (e.target.tagName !== 'DIV') {
            e.preventDefault(); // Prevent text selection or other defaults

            isDragging = true; // Set the dragging flag to true
            hasMoved = false; // Reset the moved flag

            const touch = e.touches[0];

            // Record initial mouse and element positions
            startX = draggable.offsetLeft;
            startY = draggable.offsetTop;
            initialMouseX = touch.clientX;
            initialMouseY = touch.clientY;

            // Add event listeners for `touchmove` and `touchend` events
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', handleTouchEnd);
        }
    });

    // `mousemove` event to handle dragging
    function handleMouseMove(e) {
        if (!isDragging) return;

        // Calculate new positions based on the mouse movement
        const dx = e.clientX - initialMouseX;
        const dy = e.clientY - initialMouseY;

        // Move the draggable element
        draggable.style.left = `${startX + dx}px`;
        draggable.style.top = `${startY + dy}px`;

        // Check if the div has moved from its original position
        if (Math.abs(dx) > 0 || Math.abs(dy) > 0) {
            hasMoved = true; // Set the moved flag to true if it has moved
        }
    }

    // `touchmove` event handle dragging
    function handleTouchMove(e) {
        if (!isDragging) return;

        // Calculate new positions based on the mouse movement
        const dx = e.clientX - initialMouseX;
        const dy = e.clientY - initialMouseY;

        // Move the draggable element
        draggable.style.left = `${startX + dx}px`;
        draggable.style.top = `${startY + dy}px`;

        // Check if the div has moved from its original position
        if (Math.abs(dx) > 0 || Math.abs(dy) > 0) {
            hasMoved = true; // Set the moved flag to true if it has moved
        }
    }

    // `mouseup` event to stop dragging
    function handleMouseUp(e) {
        if (isDragging) {
            // Remove event listeners when drag ends
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);

            isDragging = false; // Reset the dragging flag
        }
    }

    // `touchend` event to stop dragging
    function handleTouchEnd(e) {
        if (isDragging) {
            // Remove event listeners when drag ends
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);

            isDragging = false; // Reset the dragging flag
        }
    }

    // Handle click event on the draggable element
    draggable.addEventListener('click', function (e) {
        // Check if the element has moved from its original position
        const currentX = draggable.offsetLeft;
        const currentY = draggable.offsetTop;

        if (hasMoved && (currentX !== originalX || currentY !== originalY)) {
            e.preventDefault(); // Prevent link click if the div has been dragged
            e.stopImmediatePropagation();
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