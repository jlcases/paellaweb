/**
 * Fetches star count from GitHub API for paelladoc repository
 */
document.addEventListener('DOMContentLoaded', function() {
  const starCountElement = document.querySelector('.github-stars');
  
  if (starCountElement) {
    fetch('https://api.github.com/repos/jlcases/paelladoc')
      .then(response => response.json())
      .then(data => {
        if (data.stargazers_count !== undefined) {
          starCountElement.textContent = `${data.stargazers_count} ⭐ on GitHub`;
        }
      })
      .catch(error => {
        console.error('Error fetching GitHub stars:', error);
      });
  }
}); 