document.addEventListener('DOMContentLoaded', () => {
    const footerPlaceholder = document.createElement('div');
    footerPlaceholder.id = 'footer-placeholder';
    document.body.appendChild(footerPlaceholder);

    fetch('/html/components/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            footerPlaceholder.innerHTML = data;

            // Dynamically add the footer CSS
            const footerCss = document.createElement('link');
            footerCss.rel = 'stylesheet';
            footerCss.href = '/css/components/footer.css'; // Adjust the path as needed
            document.head.appendChild(footerCss);
        })
        .catch(error => {
            console.error('Error fetching footer:', error);
        });
}); 