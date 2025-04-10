/**
 * Mobile Navigation - PAELLADOC
 * Script simplificado y optimizado para el menú móvil
 */
document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const closeBtn = document.getElementById('mobile-nav-close');
  const body = document.body;
  
  // Verificar que los elementos existen
  if (!menuToggle || !mobileNav || !mobileNavOverlay || !closeBtn) {
    console.error('[PAELLADOC] Error: Elementos del menú móvil no encontrados');
    return;
  }
  
  // Abrir menú
  function openMenu() {
    console.log('[PAELLADOC] Abriendo menú móvil');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.classList.add('active');
    mobileNav.classList.add('open');
    mobileNavOverlay.classList.add('open');
    body.classList.add('menu-open');
    closeBtn.focus();
  }
  
  // Cerrar menú
  function closeMenu() {
    console.log('[PAELLADOC] Cerrando menú móvil');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.classList.remove('active');
    mobileNav.classList.remove('open');
    mobileNavOverlay.classList.remove('open');
    body.classList.remove('menu-open');
    menuToggle.focus();
  }
  
  // Eventos
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
  
  mobileNavOverlay.addEventListener('click', function() {
    closeMenu();
  });
  
  // Cerrar con tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMenu();
    }
  });
  
  // Cerrar menú si la ventana se redimensiona a un ancho mayor
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && mobileNav.classList.contains('open')) {
      closeMenu();
    }
  });
  
  console.log('[PAELLADOC] Script de navegación móvil inicializado');
}); 