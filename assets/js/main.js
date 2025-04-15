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
    initThemeToggle();
    initSkipToContent();
    initDeferredImages();
    initTrackingPreferences();
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

/**
 * Optimiza las imágenes de contenido crítico para evitar CLS
 */
function initDeferredImages() {
  // Preparar contenedor para evitar cambios de diseño
  const lcp = document.getElementById('lcp-container');
  if (lcp) {
    // Establece dimensiones específicas para evitar cambios de diseño
    lcp.style.containIntrinsicSize = 'auto 600px';
    lcp.style.contain = 'layout paint';
  }
  
  // Optimización de imágenes para los temas (carga solo lo necesario)
  const loadDeferredThemeImages = () => {
    // Cargar cualquier imagen diferida solo cuando se necesite
    const deferredImages = document.querySelectorAll('[data-src]');
    if (deferredImages.length > 0) {
      deferredImages.forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
      });
    }
  };

  // Llamar después de eventos de interacción del usuario
  window.addEventListener('scroll', loadDeferredThemeImages, {once: true});
  window.addEventListener('mousemove', loadDeferredThemeImages, {once: true});
}

/**
 * Gestiona las preferencias de tracking del usuario
 */
function initTrackingPreferences() {
  // Crear un atajo de teclado para toggle tracking (Alt+T)
  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 't') {
      const currentState = localStorage.getItem('paellaNoTrack') === 'true';
      localStorage.setItem('paellaNoTrack', (!currentState).toString());
      
      // Mostrar mensaje de confirmación
      const message = !currentState ? 
        'Tracking desactivado para esta sesión' : 
        'Tracking activado para esta sesión';
      
      // Crear y mostrar notificación
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #000;
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;
      notification.textContent = message;
      document.body.appendChild(notification);
      
      // Mostrar y ocultar notificación
      setTimeout(() => notification.style.opacity = '1', 100);
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
      
      // Recargar para aplicar cambios
      if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        window.location.reload();
      }
    }
  });
} 