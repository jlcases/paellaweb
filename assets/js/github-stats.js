/**
 * GitHub Stats Script - Versión mejorada con depuración
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log("Iniciando carga de estadísticas GitHub");
  
  // Elementos DOM
  const starsElement = document.getElementById('github-stars');
  const forksElement = document.getElementById('github-forks');
  
  // Verificar si existen los elementos
  if (!starsElement) {
    console.error("Elemento #github-stars no encontrado en la página");
  }
  
  if (!forksElement) {
    console.error("Elemento #github-forks no encontrado en la página");
  }
  
  // Si no existen los elementos, no hacer nada
  if (!starsElement || !forksElement) {
    return;
  }
  
  // Mostrar estado de carga
  starsElement.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
  forksElement.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
  
  // Repositorio a consultar
  const repo = 'jlcases/paelladoc';
  console.log(`Consultando repositorio: ${repo}`);
  
  // Función para cargar datos de GitHub con caché
  function loadGitHubStats() {
    // Comprobar si podemos usar localStorage
    let localStorageAvailable = false;
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      localStorageAvailable = true;
    } catch (e) {
      console.warn('localStorage no disponible:', e);
    }
    
    // Variables para caché
    let cachedData = null;
    let cacheTimestamp = null;
    
    if (localStorageAvailable) {
      // Comprobar si tenemos datos en caché y si son recientes (menos de 24 horas)
      cachedData = localStorage.getItem('github_stats_cache');
      cacheTimestamp = localStorage.getItem('github_stats_timestamp');
      console.log(`Caché encontrada: ${cachedData ? 'Sí' : 'No'}`);
    }
    
    const now = new Date().getTime();
    
    // Caché válida por 24 horas (86400000 ms)
    const cacheValidityPeriod = 86400000;
    
    // Si hay datos en caché y son recientes, usarlos
    if (localStorageAvailable && cachedData && cacheTimestamp && (now - parseInt(cacheTimestamp) < cacheValidityPeriod)) {
      try {
        const data = JSON.parse(cachedData);
        updateUIWithData(data);
        console.log('Usando datos de GitHub en caché:', data);
        return;
      } catch (e) {
        console.error('Error al parsear caché:', e);
        // Si hay error con la caché, continuamos con la petición a la API
      }
    }
    
    // Si no hay caché válida, hacer petición a la API
    console.log(`Consultando API de GitHub: https://api.github.com/repos/${repo}`);
    
    fetch(`https://api.github.com/repos/${repo}`)
      .then(response => {
        console.log(`Respuesta API: ${response.status} ${response.statusText}`);
        if (!response.ok) {
          throw new Error(`Error en la API de GitHub: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Datos recibidos de la API:', data);
        
        // Guardar en caché si está disponible
        if (localStorageAvailable) {
          try {
            localStorage.setItem('github_stats_cache', JSON.stringify(data));
            localStorage.setItem('github_stats_timestamp', now.toString());
            console.log('Datos guardados en caché');
          } catch (e) {
            console.warn('Error al guardar en caché:', e);
          }
        }
        
        // Actualizar UI
        updateUIWithData(data);
        console.log('Datos de GitHub actualizados desde la API');
      })
      .catch(error => {
        console.error("Error al obtener datos de GitHub:", error);
        // En caso de error, mostrar un mensaje o usar caché antigua si existe
        if (localStorageAvailable && cachedData) {
          try {
            const data = JSON.parse(cachedData);
            updateUIWithData(data);
            console.log('Usando caché antigua tras error en la API');
          } catch (e) {
            console.error('Error al usar caché antigua:', e);
            setDefaultValues();
          }
        } else {
          setDefaultValues();
        }
      });
  }
  
  // Función para actualizar la UI con los datos obtenidos
  function updateUIWithData(data) {
    console.log('Actualizando UI con datos:', data);
    
    if (data && data.stargazers_count !== undefined) {
      starsElement.textContent = data.stargazers_count;
      console.log(`Estrellas establecidas: ${data.stargazers_count}`);
    } else {
      starsElement.textContent = '0';
      console.log('Estrellas no encontradas en los datos, estableciendo a 0');
    }
    
    if (data && data.forks_count !== undefined) {
      forksElement.textContent = data.forks_count;
      console.log(`Forks establecidos: ${data.forks_count}`);
    } else {
      forksElement.textContent = '0';
      console.log('Forks no encontrados en los datos, estableciendo a 0');
    }
  }
  
  // Función para establecer valores por defecto en caso de error
  function setDefaultValues() {
    console.log('Estableciendo valores por defecto');
    starsElement.textContent = '?';
    forksElement.textContent = '?';
  }
  
  // Establecer un valor inicial mientras carga
  starsElement.textContent = '...';
  forksElement.textContent = '...';
  
  // Cargar stats inmediatamente
  console.log('Iniciando carga de estadísticas');
  loadGitHubStats();
  
  // Por si algo falla, establecer un timeout para mostrar valores por defecto
  setTimeout(function() {
    if (starsElement.textContent === '...' || starsElement.innerHTML.includes('fa-spinner')) {
      console.warn('Timeout alcanzado, estableciendo valores por defecto');
      setDefaultValues();
    }
  }, 5000);
}); 