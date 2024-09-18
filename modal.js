function openModal(contentId) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    // Load the content dynamically based on the clicked item
    switch(contentId) {
        case 'my-special-day':
            modalBody.innerHTML = '<h2>My Special Day</h2><p>Details about my special day...</p>';
            break;
        case 'birthday':
            modalBody.innerHTML = '<h2>Birthday</h2><p>Details about the birthday...</p>';
            break;
        case 'long-text':
            modalBody.innerHTML = '<h2>Long Text</h2><p>Looooooooooooooong text content...</p>';
            break;
        default:
            modalBody.innerHTML = '<p>Content not found.</p>';
    }

    modal.style.display = 'block'; // Show the modal
}

function closeModal() {
    document.getElementById('modal').style.display = 'none'; // Hide the modal
}