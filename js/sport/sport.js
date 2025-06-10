document.addEventListener('DOMContentLoaded', () => {
    const articles = document.querySelectorAll('.news-card');

    // --- Article Navigation (with Event Delegation) ---
    document.body.addEventListener('click', function(event) {
        const clickedLink = event.target.closest('.article-link');
        
        if (clickedLink) {
            event.preventDefault();
            const articleElement = clickedLink.closest('[data-id]');
            if (articleElement) {
                const articleId = articleElement.getAttribute('data-id');
                // Navigate to the detail page with the ID as a URL parameter
                const detailPageUrl = clickedLink.getAttribute('href');
                window.location.href = `${detailPageUrl}?id=${articleId}`;
            }
        }
    });

    // --- Live Pulse Animation (Example) ---
    // This is just a placeholder for more complex live updates.
    // For a real "Live Pulse", you'd fetch data periodically.
    const pulseItemsContainer = document.querySelector('.live-pulse .pulse-items');
    if (pulseItemsContainer) {
        // Example: Cycle through items or highlight them
        // This is a very simple simulation.
        let currentPulseIndex = 0;
        const pulseItemElements = pulseItemsContainer.querySelectorAll('.pulse-item');
        
        if (pulseItemElements.length > 1) {
            setInterval(() => {
                pulseItemElements.forEach(item => item.style.opacity = '0.7');
                pulseItemElements[currentPulseIndex].style.opacity = '1';
                pulseItemElements[currentPulseIndex].style.fontWeight = 'bold';

                // Briefly make previous bold item normal weight
                if(currentPulseIndex > 0) pulseItemElements[currentPulseIndex-1].style.fontWeight = 'normal';
                else if(pulseItemElements.length > 1) pulseItemElements[pulseItemElements.length-1].style.fontWeight = 'normal';


                currentPulseIndex = (currentPulseIndex + 1) % pulseItemElements.length;
            }, 3000); // Change highlight every 3 seconds
        }
    }

});