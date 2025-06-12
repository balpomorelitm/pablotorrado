document.addEventListener('DOMContentLoaded', function() {
    const timelineDots = document.querySelectorAll('.timeline-dot');
    const cvCards = document.querySelectorAll('.cv-card[data-timeline-id]');
    const timelineContainer = document.querySelector('.timeline-container');

    // Function to remove active class from all cards
    function resetActiveCards() {
        cvCards.forEach(card => {
            card.classList.remove('active');
        });
    }

    // Add mouseover event to each dot
    timelineDots.forEach(dot => {
        dot.addEventListener('mouseover', function() {
            resetActiveCards(); // First, reset all cards
            const targetId = this.dataset.timelineId;
            const targetCard = document.querySelector(`.cv-card[data-timeline-id="${targetId}"]`);
            if (targetCard) {
                targetCard.classList.add('active');
            }
        });
    });

    // Add mouseleave event to the container to reset all when mouse exits
    if (timelineContainer) {
        timelineContainer.addEventListener('mouseleave', function() {
            resetActiveCards();
        });
    }
});
