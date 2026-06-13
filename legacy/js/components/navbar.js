document.addEventListener('DOMContentLoaded', () => {
    const navbarPlaceholder = document.createElement('div');
    navbarPlaceholder.id = 'navbar-placeholder';
    document.body.prepend(navbarPlaceholder);

    fetch('/html/components/navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            navbarPlaceholder.innerHTML = data;

            // --- Active Nav Link ---
            const currentPage = window.location.pathname;
            const navLinks = navbarPlaceholder.querySelectorAll('nav a');
            navLinks.forEach(link => {
                const linkPath = new URL(link.href).pathname;
                if (linkPath === currentPage) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });

            // --- Theme Toggle Logic ---
            const themeToggleButton = document.getElementById('theme-toggle');
            if (themeToggleButton) {
                const body = document.body;
                const themeIcon = themeToggleButton.querySelector('i');

                // Function to set theme
                function setTheme(theme) {
                    if (theme === 'dark') {
                        body.classList.add('dark-mode');
                        if (themeIcon) {
                            themeIcon.classList.remove('fa-moon');
                            themeIcon.classList.add('fa-sun'); // Show sun icon
                        }
                        localStorage.setItem('sportsFeedTheme', 'dark');
                    } else {
                        body.classList.remove('dark-mode');
                        if (themeIcon) {
                            themeIcon.classList.remove('fa-sun');
                            themeIcon.classList.add('fa-moon'); // Show moon icon
                        }
                        localStorage.setItem('sportsFeedTheme', 'light');
                    }
                }

                // Initial theme setup
                const savedTheme = localStorage.getItem('sportsFeedTheme');
                if (savedTheme) {
                    setTheme(savedTheme);
                } else {
                    // Optional: Detect system preference
                    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                        setTheme('dark');
                    } else {
                        setTheme('light'); // Default to light
                    }
                }

                themeToggleButton.addEventListener('click', () => {
                    if (body.classList.contains('dark-mode')) {
                        setTheme('light');
                    } else {
                        setTheme('dark');
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error fetching navbar:', error);
        });
}); 