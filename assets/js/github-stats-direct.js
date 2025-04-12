/**
 * GitHub Stats Direct - Versión mejorada sin dependencia de API
 * Evita errores 403 y consultas a la API de GitHub
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log("Inicializando contadores de GitHub - versión estática");
  
  // Valores estáticos actualizados periódicamente
  // Estos valores pueden ser actualizados manualmente cuando se desee
  const starCount = "277";
  const forkCount = "47";
  
  // Intenta reemplazar directamente en el HTML - soporta múltiples selectores
  const starsElements = document.querySelectorAll('#github-stars, .github-stars');
  const forksElements = document.querySelectorAll('#github-forks, .github-forks');
  
  // Función para actualizar todos los elementos encontrados
  function updateElements(elements, value) {
    elements.forEach(el => {
      if (el) {
        el.textContent = value;
        
        // Añadir efecto de contador
        animateValue(el, 0, parseInt(value, 10), 1500);
      }
    });
  }
  
  // Función para animar el valor como un contador
  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  
  // Aplicar los valores estáticos con animación
  updateElements(starsElements, starCount);
  updateElements(forksElements, forkCount);
}); 