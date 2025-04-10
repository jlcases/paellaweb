/**
 * GitHub Stats Direct - Versión para prueba social
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log("Cargando contadores de GitHub para prueba social");
  
  const repo = 'jlcases/paelladoc';
  
  // Intenta reemplazar directamente en el HTML - soporta múltiples selectores
  const starsElements = document.querySelectorAll('#github-stars, .github-stars');
  const forksElements = document.querySelectorAll('#github-forks, .github-forks');
  
  // Valores por defecto en caso de error - más visibles
  const defaultStars = "42";
  const defaultForks = "13";
  
  // Función para actualizar todos los elementos encontrados
  function updateElements(elements, value) {
    elements.forEach(el => {
      if (el) {
        console.log(`Actualizando elemento: ${el.id || el.className} con valor: ${value}`);
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
  
  // Establecer valores por defecto primero
  updateElements(starsElements, defaultStars);
  updateElements(forksElements, defaultForks);
  
  // Intentar obtener datos reales
  try {
    fetch(`https://api.github.com/repos/${repo}`)
      .then(response => {
        if (!response.ok) throw new Error("Error de API");
        return response.json();
      })
      .then(data => {
        console.log("Datos recibidos de GitHub API:", data);
        if (data && data.stargazers_count !== undefined) {
          updateElements(starsElements, data.stargazers_count);
        }
        if (data && data.forks_count !== undefined) {
          updateElements(forksElements, data.forks_count);
        }
      })
      .catch(error => {
        console.error("Error al obtener estadísticas de GitHub:", error);
      });
  } catch (error) {
    console.error("Error al intentar hacer fetch:", error);
  }
  
  // Efectos adicionales para las badges
  const statBadges = document.querySelectorAll('.github-stat-badge');
  statBadges.forEach(badge => {
    badge.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.05)';
      
      // Efecto de brillo al pasar el ratón
      const numberElement = this.querySelector('#github-stars, #github-forks, .github-stars, .github-forks');
      if (numberElement) {
        numberElement.style.color = '#FFFFFF';
        numberElement.style.textShadow = '0 0 15px rgba(255,255,255,0.9)';
        numberElement.style.transform = 'scale(1.2)';
      }
    });
    
    badge.addEventListener('mouseleave', function() {
      this.style.transform = '';
      
      const numberElement = this.querySelector('#github-stars, #github-forks, .github-stars, .github-forks');
      if (numberElement) {
        numberElement.style.color = '';
        numberElement.style.textShadow = '';
        numberElement.style.transform = '';
      }
    });
  });
}); 