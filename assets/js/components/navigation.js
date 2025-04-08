/**
 * Navigation Component (Improved Accessibility)
 * Maneja el comportamiento de la navegación móvil y su accesibilidad
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('[NAV] DOM Cargado. Inicializando...');
  
  // Obtener elementos del DOM
  const menuToggle = document.querySelector('#menu-toggle-button');
  const navLinks = document.querySelector('#main-navigation');
  const menuOverlay = document.querySelector('.menu-overlay');
  const body = document.body;

  // Verificar que los elementos existen
  if (!menuToggle) {
    console.error('[NAV] Error: No se encontró #menu-toggle-button');
    return;
  }
  if (!navLinks) {
    console.error('[NAV] Error: No se encontró #main-navigation');
    return;
  }
  
  // Crear overlay si no existe
  let createdOverlay = false;
  if (!menuOverlay) {
    console.warn('[NAV] Warning: No se encontró .menu-overlay, creando uno...');
    const newOverlay = document.createElement('div');
    newOverlay.className = 'menu-overlay';
    newOverlay.setAttribute('aria-hidden', 'true');
    document.querySelector('.site-nav').appendChild(newOverlay);
    createdOverlay = true;
  }

  // Obtener una referencia actualizada
  const overlay = createdOverlay ? document.querySelector('.menu-overlay') : menuOverlay;

  // Obtener todos los elementos navegables del menú
  const menuItems = navLinks.querySelectorAll('a');
  const firstMenuItem = menuItems[0];
  const lastMenuItem = menuItems[menuItems.length - 1];

  let isMenuOpen = false;

  // Crear anuncio para lectores de pantalla
  const createA11yAnnouncement = (message) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('sr-only');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    // Eliminar el anuncio después de que sea leído
    setTimeout(() => {
      if (announcement.parentNode) {
        announcement.parentNode.removeChild(announcement);
      }
    }, 3000);
  };

  const openMenu = () => {
    if (isMenuOpen) return;
    console.log('[NAV] Abriendo menú...');
    isMenuOpen = true;
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.classList.add('active');
    navLinks.classList.add('active');
    if (overlay) {
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
    }
    body.classList.add('no-scroll');
    
    // Anunciar para lectores de pantalla
    createA11yAnnouncement('Menú de navegación abierto');
    
    // Establecer foco en el primer elemento del menú para accesibilidad
    setTimeout(() => {
      if (firstMenuItem) firstMenuItem.focus();
    }, 100);
  };

  const closeMenu = () => {
    if (!isMenuOpen) return;
    console.log('[NAV] Cerrando menú...');
    isMenuOpen = false;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    if (overlay) {
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
    }
    body.classList.remove('no-scroll');
    
    // Anunciar para lectores de pantalla
    createA11yAnnouncement('Menú de navegación cerrado');
    
    // Devolver foco al botón de menú
    menuToggle.focus();
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

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('[NAV] Click en menu-overlay');
      closeMenu();
    });
  }

  // Manejo de teclado para trampa de foco (focus trap)
  // Mantiene el foco dentro del menú cuando está abierto
  lastMenuItem.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !e.shiftKey && isMenuOpen) {
      e.preventDefault();
      menuToggle.focus();
    }
  });
  
  menuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && e.shiftKey && isMenuOpen) {
      e.preventDefault();
      lastMenuItem.focus();
    }
  });

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
      e.preventDefault();
      closeMenu();
    }
  });

  console.log('[NAV] Script de navegación accesible inicializado correctamente.');
}); 