document.addEventListener('DOMContentLoaded', function() {
  // Función para obtener datos de la API de GitHub
  async function fetchGitHubStats() {
    try {
      const repo = 'jlcases/paelladoc';
      const response = await fetch(`https://api.github.com/repos/${repo}`);
      
      if (!response.ok) {
        throw new Error('Error al obtener datos de GitHub');
      }
      
      const data = await response.json();
      
      // Actualizar contadores
      document.getElementById('github-stars').textContent = data.stargazers_count.toLocaleString();
      document.getElementById('github-forks').textContent = data.forks_count.toLocaleString();
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Llamar a la función
  fetchGitHubStats();
}); 