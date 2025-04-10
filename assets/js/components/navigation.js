/**
 * Navigation Component (Refactored)
 * Handles mobile navigation behavior and accessibility from scratch.
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('[NAV Refactored] DOM Loaded. Initializing...');

  // Get DOM elements using IDs defined in HTML
  const menuToggleBtn = document.getElementById('menu-toggle-button');
  const mobileNavPanel = document.getElementById('mobile-nav-panel');
  const closeMenuBtn = document.getElementById('close-menu-button');
  const menuOverlay = document.getElementById('menu-overlay');
  const body = document.body;

  // Verify essential elements exist
  if (!menuToggleBtn) {
    console.error('[NAV Refactored] Error: #menu-toggle-button not found.');
    return;
  }
  if (!mobileNavPanel) {
    console.error('[NAV Refactored] Error: #mobile-nav-panel not found.');
    return;
  }
  if (!closeMenuBtn) {
    console.error('[NAV Refactored] Error: #close-menu-button not found.');
    return;
  }
  if (!menuOverlay) {
    console.error('[NAV Refactored] Error: #menu-overlay not found.');
    return;
  }

  // Get focusable elements within the mobile panel
  const focusableElementsSelector = 'a[href], button:not([disabled])';
  let focusableElements = [];
  let firstFocusableElement;
  let lastFocusableElement;

  const updateFocusableElements = () => {
    focusableElements = Array.from(mobileNavPanel.querySelectorAll(focusableElementsSelector));
    firstFocusableElement = focusableElements[0];
    lastFocusableElement = focusableElements[focusableElements.length - 1];
  };

  let isMenuOpen = false;

  // Function to open the menu
  const openMenu = () => {
    if (isMenuOpen) return;
    console.log('[NAV Refactored] Opening menu...');
    isMenuOpen = true;

    menuToggleBtn.setAttribute('aria-expanded', 'true');
    menuToggleBtn.classList.add('active');

    mobileNavPanel.hidden = false;
    mobileNavPanel.classList.add('active');
    
    menuOverlay.hidden = false;
    menuOverlay.classList.add('active');

    body.classList.add('no-scroll');

    // Update focusable elements and set focus
    updateFocusableElements();
    setTimeout(() => {
      if (closeMenuBtn) {
         closeMenuBtn.focus(); // Focus the close button first
      } else if (firstFocusableElement) {
        firstFocusableElement.focus();
      }
    }, 100); // Delay ensures transition completes

    console.log('[NAV Refactored] Menu opened.');
  };

  // Function to close the menu
  const closeMenu = () => {
    if (!isMenuOpen) return;
    console.log('[NAV Refactored] Closing menu...');
    isMenuOpen = false;

    menuToggleBtn.setAttribute('aria-expanded', 'false');
    menuToggleBtn.classList.remove('active');

    mobileNavPanel.classList.remove('active');
    menuOverlay.classList.remove('active');

    // Use transitionend event for smoother hiding
    const onTransitionEnd = (event) => {
      if (event.target === mobileNavPanel && event.propertyName === 'transform') {
        mobileNavPanel.hidden = true;
        menuOverlay.hidden = true;
        body.classList.remove('no-scroll');
        mobileNavPanel.removeEventListener('transitionend', onTransitionEnd);
        console.log('[NAV Refactored] Menu fully closed and hidden.');
      }
    };
    mobileNavPanel.addEventListener('transitionend', onTransitionEnd);

    // Fallback if transitionend doesn't fire (e.g., reduced motion)
    setTimeout(() => {
      if (!mobileNavPanel.hidden) { // Check if already hidden by event
        mobileNavPanel.hidden = true;
        menuOverlay.hidden = true;
        body.classList.remove('no-scroll');
         console.log('[NAV Refactored] Menu hidden via fallback timeout.');
      }
    }, 400); // Slightly longer than transition duration

    // Return focus to the toggle button
    menuToggleBtn.focus();
  };

  // --- Event Listeners ---

  // Toggle button click
  menuToggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close button click
  closeMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeMenu();
  });

  // Overlay click
  menuOverlay.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeMenu();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      e.preventDefault();
      closeMenu();
    }
  });

  // Focus trap logic
  mobileNavPanel.addEventListener('keydown', (e) => {
    if (!isMenuOpen || e.key !== 'Tab') return;

    if (e.shiftKey) { // Shift + Tab
      if (document.activeElement === firstFocusableElement || document.activeElement === closeMenuBtn) {
        e.preventDefault();
        lastFocusableElement.focus();
      }
    } else { // Tab
      if (document.activeElement === lastFocusableElement) {
        e.preventDefault();
        closeMenuBtn.focus(); // Trap focus back to the close button or first element
      }
    }
  });

  // Close menu if window resizes to desktop view
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isMenuOpen) {
      console.log('[NAV Refactored] Resized to desktop, closing menu.');
      closeMenu();
    }
  });
  
  // Ensure initial state is correct (menu closed)
  mobileNavPanel.hidden = true;
  menuOverlay.hidden = true;

  console.log('[NAV Refactored] Navigation script initialized successfully.');
}); 