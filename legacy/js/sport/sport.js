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
                // Get the base URL without any existing parameters
                const detailPageUrl = clickedLink.getAttribute('href').split('?')[0];
                window.location.href = `${detailPageUrl}?id=${articleId}`;
            }
        }
    });

    // --- Live Pulse Animation (Example) ---
    // This is just a placeholder for more complex live updates.
    // For a real "Live Pulse", you'd fetch data periodically.
    const pulseItemsContainer = document.querySelector('.live-pulse .pulse-items');
    if (pulseItemsContainer) {
        setInterval(() => {
            const firstItem = pulseItemsContainer.firstElementChild;
            if (firstItem) {
                pulseItemsContainer.appendChild(firstItem.cloneNode(true));
                firstItem.remove();
            }
        }, 5000);
    }

});