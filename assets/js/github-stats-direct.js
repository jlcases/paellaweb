/**
 * GitHub Stats Direct - Versión simplificada que garantiza funcionamiento
 */
document.addEventListener('DOMContentLoaded', function() {
  const repo = 'jlcases/paelladoc';
  
  // Intenta reemplazar directamente en el HTML
  const starsElements = document.querySelectorAll('#github-stars, .github-stars');
  const forksElements = document.querySelectorAll('#github-forks, .github-forks');
  
  // Valores por defecto en caso de error
  const defaultStars = "5";
  const defaultForks = "2";
  
  // Función para actualizar todos los elementos encontrados
  function updateElements(elements, value) {
    elements.forEach(el => {
      if (el) el.textContent = value;
    });
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
}); 