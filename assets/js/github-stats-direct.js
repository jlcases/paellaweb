/**
 * GitHub Stats Direct - Versión con caché de 1 hora
 * Reduce las llamadas a la API de GitHub para evitar errores 403
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log("Inicializando contadores de GitHub con caché horaria");
  
  const repo = 'jlcases/paelladoc';
  const cacheKey = 'github-stats-cache';
  const cacheExpiration = 60 * 60 * 1000; // 1 hora en milisegundos
  
  // Valores de respaldo en caso de error
  const defaultStats = {
    stars: "277",
    forks: "47", 
    timestamp: Date.now()
  };
  
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
  
  // Función para verificar si la caché es válida
  function isCacheValid(cachedData) {
    if (!cachedData) return false;
    
    const now = Date.now();
    const timestamp = cachedData.timestamp || 0;
    
    return (now - timestamp) < cacheExpiration;
  }
  
  // Función para obtener los datos (de caché o de la API)
  function getGitHubStats() {
    // Intentar recuperar de la caché
    try {
      const cachedData = JSON.parse(localStorage.getItem(cacheKey)) || null;
      
      // Si la caché es válida, usar esos datos
      if (isCacheValid(cachedData)) {
        console.log("Usando datos de GitHub en caché", cachedData);
        return Promise.resolve(cachedData);
      }
      
      // Si la caché no es válida, obtener datos nuevos
      return fetchGitHubStats();
    } catch (error) {
      console.error("Error al leer la caché:", error);
      return fetchGitHubStats();
    }
  }
  
  // Función para obtener datos frescos de GitHub
  function fetchGitHubStats() {
    console.log("Obteniendo datos frescos de GitHub API");
    
    return fetch(`https://api.github.com/repos/${repo}`)
      .then(response => {
        if (!response.ok) throw new Error("Error de API: " + response.status);
        return response.json();
      })
      .then(data => {
        const stats = {
          stars: data.stargazers_count.toString(),
          forks: data.forks_count.toString(),
          timestamp: Date.now()
        };
        
        // Guardar en caché
        localStorage.setItem(cacheKey, JSON.stringify(stats));
        
        return stats;
      })
      .catch(error => {
        console.error("Error al obtener estadísticas de GitHub:", error);
        
        // Intentar usar caché expirada como respaldo
        try {
          const expiredCache = JSON.parse(localStorage.getItem(cacheKey));
          if (expiredCache) {
            console.log("Usando caché expirada como respaldo");
            return expiredCache;
          }
        } catch (e) {
          console.error("Error al leer caché expirada:", e);
        }
        
        // En último caso, usar valores por defecto
        return defaultStats;
      });
  }
  
  // Iniciar proceso
  getGitHubStats()
    .then(stats => {
      updateElements(starsElements, stats.stars);
      updateElements(forksElements, stats.forks);
    });
}); 