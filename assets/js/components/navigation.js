/**
 * Navigation Component
 * 
 * Maneja el comportamiento de la navegación móvil y del cambio de tema
 */

// Inicialización del componente al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  const Navigation = {
    // Elementos del DOM
    elements: {
      menuToggle: document.querySelector('.menu-toggle'),
      navLinks: document.querySelector('.nav-links'),
      menuOverlay: document.querySelector('.menu-overlay'),
      themeToggle: document.querySelector('.theme-toggle'),
      body: document.body
    },
    
    // Estado del componente
    state: {
      isMenuOpen: false
    },
    
    // Inicialización
    init() {
      this.bindEvents();
      this.initializeMenu();
      this.initializeTheme();
    },
    
    // Asociación de eventos
    bindEvents() {
      const { menuToggle, navLinks, menuOverlay, themeToggle } = this.elements;
      
      // Evento para el botón del menú
      if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.toggleMenu();
        });
      }
      
      // Evento para el overlay
      if (menuOverlay) {
        menuOverlay.addEventListener('click', () => this.closeMenu());
      }
      
      // Eventos para los enlaces de navegación
      if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => this.closeMenu());
        });
      }
      
      // Evento para cambio de tema
      if (themeToggle) {
        themeToggle.addEventListener('click', () => this.toggleTheme());
      }
      
      // Cerrar menú con Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.state.isMenuOpen) {
          this.closeMenu();
        }
      });
      
      // Cerrar menú al redimensionar ventana
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && this.state.isMenuOpen) {
          this.closeMenu();
        }
      });
    },
    
    // Inicializar menú
    initializeMenu() {
      const { menuToggle } = this.elements;
      if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
      }
      this.closeMenu();
    },
    
    // Inicializar tema
    initializeTheme() {
      // Detectar preferencia del usuario
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme) {
        // Aplicar tema guardado
        this.elements.body.setAttribute('data-theme', savedTheme);
      } else if (prefersDarkMode) {
        // Aplicar tema oscuro por defecto
        this.elements.body.setAttribute('data-theme', 'dark');
      } else {
        // Aplicar tema claro por defecto
        this.elements.body.setAttribute('data-theme', 'light');
      }
    },
    
    // Alternar apertura/cierre del menú
    toggleMenu() {
      if (this.state.isMenuOpen) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    },
    
    // Abrir menú
    openMenu() {
      const { menuToggle, navLinks, menuOverlay, body } = this.elements;
      
      this.state.isMenuOpen = true;
      
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
      if (menuToggle) menuToggle.classList.add('active');
      if (navLinks) navLinks.classList.add('active');
      if (menuOverlay) menuOverlay.classList.add('active');
      if (body) body.classList.add('no-scroll');
    },
    
    // Cerrar menú
    closeMenu() {
      const { menuToggle, navLinks, menuOverlay, body } = this.elements;
      
      this.state.isMenuOpen = false;
      
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      if (menuToggle) menuToggle.classList.remove('active');
      if (navLinks) navLinks.classList.remove('active');
      if (menuOverlay) menuOverlay.classList.remove('active');
      if (body) body.classList.remove('no-scroll');
    },
    
    // Alternar tema claro/oscuro
    toggleTheme() {
      const { body } = this.elements;
      const currentTheme = body.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // Cambiar el tema
      body.setAttribute('data-theme', newTheme);
      
      // Guardar preferencia
      localStorage.setItem('theme', newTheme);
    }
  };
  
  // Inicializar componente de navegación
  Navigation.init();
}); 