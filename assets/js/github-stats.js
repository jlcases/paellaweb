/**
 * GitHub Stats Script - Actualiza dinámicamente estrellas y forks
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Iniciando GitHub Stats...');
  
  // Elementos DOM
  const starsElement = document.getElementById('github-stars');
  const forksElement = document.getElementById('github-forks');
  
  // Si no existen los elementos, no hacer nada
  if (!starsElement && !forksElement) {
    console.log('No se encontraron elementos de estadísticas de GitHub');
    return;
  }
  
  // Repositorio a consultar
  const repo = 'jlcases/paelladoc';
  
  // Función para obtener y mostrar datos
  async function fetchGitHubStats() {
    try {
      console.log(`Consultando estadísticas para ${repo}...`);
      
      // Hacer la petición a la API
      const response = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Cache-Control': 'no-cache'
        },
        cache: 'no-store'
      });
      
      // Verificar si la respuesta es válida
      if (!response.ok) {
        throw new Error(`Error de GitHub API: ${response.status}`);
      }
      
      // Extraer datos
      const data = await response.json();
      console.log('Datos obtenidos:', data.stargazers_count, data.forks_count);
      
      // Actualizar DOM
      if (starsElement) {
        starsElement.textContent = data.stargazers_count.toLocaleString();
        starsElement.classList.add('loaded');
      }
      
      if (forksElement) {
        forksElement.textContent = data.forks_count.toLocaleString();
        forksElement.classList.add('loaded');
      }
    } catch (error) {
      console.error('Error en GitHub Stats:', error);
      
      // Poner valores por defecto en caso de error
      if (starsElement) starsElement.textContent = '0';
      if (forksElement) forksElement.textContent = '0';
    }
  }
  
  // Intentar inicialmente
  fetchGitHubStats();
  
  // Volver a intentar si falló la primera vez
  setTimeout(fetchGitHubStats, 3000);
}); 