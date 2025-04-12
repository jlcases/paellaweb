/**
 * Blog Responsive Layout Fix
 * Este script asegura que el layout del blog sea correcto en dispositivos móviles
 */

(function() {
  // Función principal para arreglar el layout
  function fixBlogLayout() {
    const mediaQuery = window.matchMedia('(max-width: 991.98px)');
    const blogLayout = document.querySelector('.blog-layout');
    const sidebar = document.querySelector('.blog-sidebar');
    const mainContent = document.querySelector('.posts-container');
    
    if (!blogLayout || !sidebar || !mainContent) return;
    
    // Función para aplicar estilos según el breakpoint
    function applyStyles(event) {
      if (event.matches) {
        // Móvil: Forzar layout vertical
        blogLayout.style.display = 'block';
        blogLayout.style.width = '100%';
        
        mainContent.style.width = '100%';
        mainContent.style.maxWidth = '100%';
        mainContent.style.display = 'block';
        
        sidebar.style.width = '100%';
        sidebar.style.maxWidth = '100%';
        sidebar.style.display = 'block';
        sidebar.style.marginTop = '40px';
        sidebar.style.position = 'static';
        sidebar.style.height = 'auto';
      } else {
        // Desktop: Restaurar layout horizontal
        blogLayout.style.display = 'flex';
        blogLayout.style.flexDirection = 'row';
        
        mainContent.style.width = '';
        mainContent.style.maxWidth = '';
        mainContent.style.flex = '1';
        
        sidebar.style.width = '300px';
        sidebar.style.maxWidth = '300px';
        sidebar.style.marginTop = '0';
        sidebar.style.position = 'sticky';
      }
    }
    
    // Aplicar inmediatamente
    applyStyles(mediaQuery);
    
    // Escuchar cambios en el viewport
    mediaQuery.addEventListener('change', applyStyles);
  }
  
  // Ejecutar después del DOM cargado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixBlogLayout);
  } else {
    fixBlogLayout();
  }
  
  // También ejecutar después de cargar completamente
  window.addEventListener('load', fixBlogLayout);
  
  // Y ejecutar después de 1 segundo por si hay scripts asíncronos
  setTimeout(fixBlogLayout, 1000);
})(); 