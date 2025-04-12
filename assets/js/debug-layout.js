document.addEventListener('DOMContentLoaded', function() {
  // Function to create and show debug info
  function showDebugInfo() {
    // Get viewport width
    const viewportWidth = window.innerWidth;
    
    // Get elements
    const blogLayout = document.querySelector('.blog-layout');
    const postsContainer = document.querySelector('.posts-container');
    const sidebar = document.querySelector('.blog-sidebar');
    
    // Create debug panel
    const debugPanel = document.createElement('div');
    debugPanel.style.position = 'fixed';
    debugPanel.style.top = '0';
    debugPanel.style.right = '0';
    debugPanel.style.backgroundColor = 'rgba(0,0,0,0.8)';
    debugPanel.style.color = 'white';
    debugPanel.style.padding = '10px';
    debugPanel.style.zIndex = '10000';
    debugPanel.style.maxWidth = '400px';
    debugPanel.style.maxHeight = '80vh';
    debugPanel.style.overflow = 'auto';
    debugPanel.style.fontSize = '12px';
    debugPanel.style.fontFamily = 'monospace';
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerText = 'Close';
    closeBtn.onclick = function() { debugPanel.remove(); };
    debugPanel.appendChild(closeBtn);
    
    // Add viewport info
    const viewportInfo = document.createElement('div');
    viewportInfo.innerHTML = `<strong>Viewport Width:</strong> ${viewportWidth}px`;
    debugPanel.appendChild(viewportInfo);
    
    // Function to add element debug info
    function addElementInfo(element, name) {
      if (!element) return;
      
      const elementInfo = document.createElement('div');
      elementInfo.style.marginTop = '15px';
      elementInfo.style.borderTop = '1px solid #666';
      elementInfo.style.paddingTop = '10px';
      
      const styles = window.getComputedStyle(element);
      
      elementInfo.innerHTML = `
        <h3 style="margin:0 0 10px;color:#ff9800">${name}</h3>
        <p><strong>Display:</strong> ${styles.display}</p>
        <p><strong>Position:</strong> ${styles.position}</p>
        <p><strong>Flex Direction:</strong> ${styles.flexDirection}</p>
        <p><strong>Width:</strong> ${styles.width}</p>
        <p><strong>Max Width:</strong> ${styles.maxWidth}</p>
        <p><strong>Float:</strong> ${styles.float}</p>
        <p><strong>Margin:</strong> ${styles.margin}</p>
        <p><strong>Padding:</strong> ${styles.padding}</p>
        <p><strong>Computed Dimensions:</strong> ${element.offsetWidth}px × ${element.offsetHeight}px</p>
      `;
      
      debugPanel.appendChild(elementInfo);
    }
    
    // Add info for each element
    addElementInfo(blogLayout, '.blog-layout');
    addElementInfo(postsContainer, '.posts-container');
    addElementInfo(sidebar, '.blog-sidebar');
    
    // Add to document
    document.body.appendChild(debugPanel);
  }
  
  // Create toggle button
  const toggleButton = document.createElement('button');
  toggleButton.innerText = 'Debug Layout';
  toggleButton.style.position = 'fixed';
  toggleButton.style.bottom = '10px';
  toggleButton.style.right = '10px';
  toggleButton.style.zIndex = '9999';
  toggleButton.style.padding = '8px 12px';
  toggleButton.style.backgroundColor = '#f00';
  toggleButton.style.color = 'white';
  toggleButton.style.border = 'none';
  toggleButton.style.borderRadius = '4px';
  toggleButton.onclick = showDebugInfo;
  
  document.body.appendChild(toggleButton);
});
