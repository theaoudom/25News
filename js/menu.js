export function renderMenuBar(activePage) {
  const menuItems = [
    { key: 'home', label: 'Home', href: 'index.html' },
    { key: 'world', label: 'World', href: 'world.html' },
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
      <a href="index.html" class="logo">25News</a>
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