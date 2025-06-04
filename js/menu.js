export function renderMenuBar(activePage) {
  // Determine if we're in the html directory
  const isInHtmlDir = window.location.pathname.includes('/html/');
  
  const menuItems = [
    { key: 'home', label: 'Home', href: isInHtmlDir ? '../index.html' : 'index.html' },
    { key: 'world', label: 'World', href: isInHtmlDir ? 'world.html' : 'html/world.html' },
    { key: 'local', label: 'Local', href: '#' },
    { key: 'sports', label: 'Sports', href: '#' },
    { key: 'tech', label: 'Tech', href: '#' },
    { key: 'business', label: 'Business', href: '#' },
    { key: 'entertainment', label: 'Entertainment', href: '#' },
    { key: 'health', label: 'Health', href: '#' },
    { key: 'contact', label: 'Contact', href: '#' }
  ];
  return `
    <nav class="navbar">
      <a href="${isInHtmlDir ? '../index.html' : 'index.html'}" class="logo">25News</a>
      <ul class="nav-list">
        ${menuItems.map(item => `
          <li>
            <a href="${item.href}" class="nav-link${activePage === item.key ? ' active' : ''}">${item.label}</a>
          </li>
        `).join('')}
      </ul>
      <button id="menu-toggle" class="menu-toggle">&#9776;</button>
    </nav>
  `;
} 