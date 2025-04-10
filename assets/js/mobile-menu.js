/**
 * Script para el menú móvil de PAELLADOC
 * Implementación simple y directa
 */
document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('mobile-nav-overlay');
  const closeBtn = document.getElementById('mobile-nav-close');
  const body = document.body;
  
  // Función para abrir el menú
  function openMenu() {
    mobileNav.classList.add('open');
    overlay.classList.add('open');
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    body.classList.add('menu-open');
    
    // Enfoque en el primer botón (cerrar)
    setTimeout(() => {
      closeBtn.focus();
    }, 100);
    
    console.log('Menú móvil abierto');
  }
  
  // Función para cerrar el menú
  function closeMenu() {
    mobileNav.classList.remove('open');
    overlay.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');
    
    // Devolver el enfoque al botón de menú
    menuToggle.focus();
    
    console.log('Menú móvil cerrado');
  }
  
  // Event listeners
  menuToggle.addEventListener('click', function(e) {
    e.preventDefault();
    if (mobileNav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  
  closeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    closeMenu();
  });
  
  overlay.addEventListener('click', function() {
    closeMenu();
  });
  
  // Cerrar con Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMenu();
    }
  });
  
  // Cerrar al cambiar a pantalla grande
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && mobileNav.classList.contains('open')) {
      closeMenu();
    }
  });
  
  // Trampa de foco para accesibilidad
  mobileNav.addEventListener('keydown', function(e) {
    if (e.key !== 'Tab') return;
    
    const focusableElements = mobileNav.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Si presiona Shift+Tab en el primer elemento, ir al último
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    }
    
    // Si presiona Tab en el último elemento, ir al primero
    if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  });
  
  console.log('Script del menú móvil inicializado');
}); 