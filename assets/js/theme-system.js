// theme-system.js - Sistema de gestión de temas oscuro/claro

document.addEventListener('DOMContentLoaded', function() {
  // Forzar la aplicación del tema al cargar
  applyTheme();
  
  // Comprobar si hay una preferencia guardada
  function applyTheme() {
    const savedTheme = localStorage.getItem('paellaTheme');
    
    // Comprobar la preferencia del sistema
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Eliminar clases antiguas que puedan interferir
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    
    // Aplicar tema guardado o usar preferencia del sistema
    if (savedTheme === 'light') {
      document.body.setAttribute('data-theme', 'light');
      document.documentElement.classList.add('light-theme');
      console.log("Tema aplicado: claro");
    } else if (savedTheme === 'dark') {
      document.body.removeAttribute('data-theme');
      document.documentElement.classList.add('dark-theme');
      console.log("Tema aplicado: oscuro");
    } else if (prefersDarkScheme.matches) {
      document.body.removeAttribute('data-theme');
      document.documentElement.classList.add('dark-theme');
      console.log("Tema aplicado: oscuro (preferencia del sistema)");
    } else {
      document.body.setAttribute('data-theme', 'light');
      document.documentElement.classList.add('light-theme');
      console.log("Tema aplicado: claro (preferencia del sistema)");
    }
    
    // Forzar la aplicación de estilos con un pequeño retraso
    setTimeout(function() {
      if (document.body.getAttribute('data-theme') === 'light') {
        document.documentElement.style.backgroundColor = '#ffffff';
        document.body.style.backgroundColor = '#ffffff';
      } else {
        document.documentElement.style.backgroundColor = '#000000';
        document.body.style.backgroundColor = '#000000';
      }
    }, 50);
  }
  
  // Manejar el cambio de tema cuando se hace clic en el botón
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      if (document.body.getAttribute('data-theme') === 'light') {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('paellaTheme', 'dark');
        console.log("Cambiando a tema oscuro");
      } else {
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('paellaTheme', 'light');
        console.log("Cambiando a tema claro");
      }
      applyTheme(); // Asegurar que los estilos se aplican correctamente
    });
  }
  
  // Actualizar cuando cambie la preferencia del sistema
  prefersDarkScheme.addEventListener('change', function(e) {
    if (!localStorage.getItem('paellaTheme')) {
      if (e.matches) {
        document.body.removeAttribute('data-theme');
      } else {
        document.body.setAttribute('data-theme', 'light');
      }
      applyTheme(); // Asegurar que los estilos se aplican correctamente
    }
  });
  
  // Si el usuario navega entre páginas, asegurar que el tema se mantiene
  window.addEventListener('pageshow', function() {
    applyTheme();
  });
}); 