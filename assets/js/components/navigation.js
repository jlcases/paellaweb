/**
 * Navigation Component (Simplified & Debugged)
 * Maneja el comportamiento de la navegación móvil
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('[NAV] DOM Cargado. Inicializando...');
  
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const menuOverlay = document.querySelector('.menu-overlay');
  const body = document.body;

  if (!menuToggle) {
    console.error('[NAV] Error: No se encontró .menu-toggle');
    return;
  }
  if (!navLinks) {
    console.error('[NAV] Error: No se encontró .nav-links');
    return;
  }
  if (!menuOverlay) {
    console.warn('[NAV] Warning: No se encontró .menu-overlay');
  }
  if (!body) {
    console.error('[NAV] Error: No se encontró body');
    return;
  }

  let isMenuOpen = false;

  const openMenu = () => {
    if (isMenuOpen) return;
    console.log('[NAV] Abriendo menú...');
    isMenuOpen = true;
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.classList.add('active');
    navLinks.classList.add('active');
    if (menuOverlay) menuOverlay.classList.add('active');
    body.classList.add('no-scroll');
  };

  const closeMenu = () => {
    if (!isMenuOpen) return;
    console.log('[NAV] Cerrando menú...');
    isMenuOpen = false;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    if (menuOverlay) menuOverlay.classList.remove('active');
    body.classList.remove('no-scroll');
  };

  // Asegurar estado inicial cerrado
  console.log('[NAV] Estableciendo estado inicial cerrado.');
  closeMenu();

  menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('[NAV] Click en menu-toggle');
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (menuOverlay) {
    menuOverlay.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('[NAV] Click en menu-overlay');
      closeMenu();
    });
  }

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      console.log('[NAV] Click en enlace de navegación');
      // Cerrar el menú después de un pequeño delay para permitir la navegación
      if (isMenuOpen) {
        setTimeout(closeMenu, 100);
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isMenuOpen) {
      console.log('[NAV] Redimensión a escritorio, cerrando menú.');
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      console.log('[NAV] Tecla Escape presionada, cerrando menú.');
      closeMenu();
    }
  });

  console.log('[NAV] Script de navegación inicializado correctamente.');
}); 