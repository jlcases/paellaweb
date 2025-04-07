// theme-system.js - Sistema de gestión de temas oscuro/claro

document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Función para aplicar el tema (oscuro o claro)
  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      console.log("Tema aplicado: claro");
    } else { // 'dark' or default
      document.documentElement.removeAttribute('data-theme');
      console.log("Tema aplicado: oscuro");
    }
    // Update button state (optional, if you add specific styles for button)
    updateToggleButton(theme);
  }

  // Función para actualizar el estado visual del botón (opcional)
  function updateToggleButton(theme) {
    if (themeToggle) {
      // Aquí puedes añadir lógica para cambiar el icono o estilo del botón
      // Ejemplo: themeToggle.classList.toggle('active', theme === 'light');
    }
  }

  // Obtener el tema guardado o usar la preferencia del sistema
  function getInitialTheme() {
    const savedTheme = localStorage.getItem('paellaTheme');
    if (savedTheme) {
      return savedTheme;
    } else {
      return prefersDarkScheme.matches ? 'dark' : 'light';
    }
  }

  // Aplicar el tema inicial al cargar la página
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  // Manejar el clic en el botón de cambio de tema
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.hasAttribute('data-theme') ? 'light' : 'dark';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('paellaTheme', newTheme);
      applyTheme(newTheme);
      console.log(`Cambiando a tema ${newTheme}`);
    });
  }

  // Escuchar cambios en la preferencia del sistema
  prefersDarkScheme.addEventListener('change', function(e) {
    // Solo actualiza si no hay una preferencia guardada manualmente
    if (!localStorage.getItem('paellaTheme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      applyTheme(newTheme);
      console.log(`Preferencia del sistema cambió a ${newTheme}`);
    }
  });

  // Asegurar que el tema se aplique correctamente al usar el historial del navegador
  window.addEventListener('pageshow', function(event) {
    // event.persisted es true si la página se carga desde el bfcache
    if (event.persisted) {
      const currentStoredTheme = localStorage.getItem('paellaTheme') || (prefersDarkScheme.matches ? 'dark' : 'light');
      applyTheme(currentStoredTheme);
      console.log("Tema reaplicado desde bfcache");
    }
  });
}); 