/**
 * PAELLADOC Main JavaScript
 * Funcionalidades principales del sitio
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('PAELLADOC SCRIPTS: DOM cargado, inicializando...');
  
  // Inicializar todos los componentes
  try {
    initSmoothScroll();
    initIntersectionObserver();
    initMobileMenu();
    initThemeToggle();
    initSkipToContent(); 
    console.log('PAELLADOC SCRIPTS: Componentes inicializados.');
  } catch (error) {
    console.error('PAELLADOC SCRIPTS: Error inicializando componentes:', error);
  }
});

/**
 * Inicializa el smooth scroll para enlaces internos
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.pushState(null, null, href);
        }
      }
    });
  });
}

/**
 * Inicializa el Intersection Observer para animaciones
 */
function initIntersectionObserver() {
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/**
 * Inicializa el menú móvil
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const menuOverlay = document.querySelector('.menu-overlay');
  const body = document.body;

  if (!menuToggle || !navLinks || !menuOverlay) {
    console.log('Elementos del menú móvil no encontrados.');
    return;
  }
  
  console.log('Inicializando menú móvil...');

  const openMenu = () => {
    console.log('Abriendo menú...');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.classList.add('active');
    navLinks.classList.add('active');
    menuOverlay.classList.add('active');
    body.classList.add('no-scroll');
  };

  const closeMenu = () => {
    console.log('Cerrando menú...');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    menuOverlay.classList.remove('active');
    body.classList.remove('no-scroll');
  };
  
  // Asegurar que empieza cerrado
  closeMenu(); 

  menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Botón de menú clickeado');
    if (navLinks.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menuOverlay.addEventListener('click', (e) => {
    e.preventDefault();
    closeMenu();
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      // Permitir navegación normal, solo cerrar el menú
      if (navLinks.classList.contains('active')) {
         setTimeout(closeMenu, 100); // Pequeño delay para permitir navegación
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      closeMenu();
    }
  });
}

/**
 * Inicializa el toggle de tema
 */
function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;

  if (!themeToggle) {
    console.log('Botón de cambio de tema no encontrado.');
    return;
  }
  
  console.log('Inicializando toggle de tema...');

  // Función para aplicar el tema basado en la preferencia o lo guardado
  const applyTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let currentTheme;

    if (savedTheme) {
      currentTheme = savedTheme;
    } else if (prefersDarkMode) {
      currentTheme = 'dark';
    } else {
      currentTheme = 'light';
    }

    body.setAttribute('data-theme', currentTheme);
    console.log(`Tema aplicado: ${currentTheme}`);
  };

  // Aplicar tema al cargar
  applyTheme();

  // Evento para el botón
  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    console.log(`Tema cambiado a: ${newTheme}`);
  });

  // Escuchar cambios en preferencias del sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    // Solo cambiar si no hay preferencia guardada
    if (!localStorage.getItem('theme')) {
      applyTheme();
    }
  });
}

/**
 * Inicializa el skip-to-content
 */
function initSkipToContent() {
  const skipLink = document.querySelector('.skip-to-content');
  if (skipLink) {
    skipLink.addEventListener('click', function (e) {
      e.preventDefault();
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.setAttribute('tabindex', '-1');
        mainContent.focus();
      }
    });
  }
} 