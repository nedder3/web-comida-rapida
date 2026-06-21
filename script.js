document.addEventListener('DOMContentLoaded', () => {

  // ================= DOM ELEMENTS =================
  const pageItems = document.querySelectorAll('.page-item');
  const canvasPages = document.querySelectorAll('.canvas-page');
  const layersLists = document.querySelectorAll('.layers-list');
  const layerItems = document.querySelectorAll('.layer-item');
  const figmaFrames = document.querySelectorAll('.figma-frame');
  
  // Right sidebar details panes
  const propDefault = document.getElementById('prop-default');
  const propColorDetails = document.getElementById('prop-color-details');
  const propTypoDetails = document.getElementById('prop-typo-details');
  const propButtonDetails = document.getElementById('prop-button-details');
  const propPersonaDetails = document.getElementById('prop-persona-details');

  // Presentation overlay elements
  const presentModeBtn = document.getElementById('present-mode-btn');
  const presentOverlay = document.getElementById('present-overlay');
  const exitPresentBtn = document.getElementById('btn-exit-present');
  const restartPrototypeBtn = document.getElementById('btn-restart-prototype');
  const presentCanvas = document.getElementById('present-canvas');
  const prototypeScaleWrapper = document.querySelector('.prototype-scale-wrapper');
  const liveLandingPage = document.getElementById('live-landing-page');
  const prototypeFrame = document.getElementById('frame-prototype-landing');

  // Form elements
  const contactForm = document.getElementById('restaurant-contact-form');
  const successOverlay = document.getElementById('form-success');
  const successCloseBtn = document.getElementById('btn-success-close');
  const formDataJson = document.getElementById('form-data-json');


  // ================= FIGMA PAGE NAVIGATION =================
  pageItems.forEach(item => {
    item.addEventListener('click', () => {
      const pageId = item.getAttribute('data-page');
      
      // Update sidebar page items
      pageItems.forEach(pi => pi.classList.remove('active'));
      item.classList.add('active');

      // Update active canvas pages
      canvasPages.forEach(cp => cp.classList.remove('active'));
      document.getElementById(`canvas-page-${pageId}`).classList.add('active');

      // Update active layers tree
      layersLists.forEach(ll => ll.classList.remove('active'));
      const activeLayers = document.getElementById(`layers-page-${pageId}`);
      if (activeLayers) activeLayers.classList.add('active');

      // Reset properties panel to default Canvas settings
      showPropertyPane(propDefault);
      clearFigmaSelection();
    });
  });

  // Helper to remove active selection from all frames
  function clearFigmaSelection() {
    figmaFrames.forEach(f => f.classList.remove('selected'));
  }


  // ================= LAYER ITEM CLICKS =================
  layerItems.forEach(layer => {
    layer.addEventListener('click', (e) => {
      e.stopPropagation(); // Avoid triggering background click handlers
      const targetId = layer.getAttribute('data-target');
      const targetFrame = document.getElementById(targetId);

      if (targetFrame) {
        clearFigmaSelection();
        targetFrame.classList.add('selected');
        targetFrame.focus();
        targetFrame.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Update properties panel
        triggerFrameInspector(targetId);
      }
    });
  });

  // Clicking directly on canvas page backgrounds resets inspector panel
  canvasPages.forEach(page => {
    page.addEventListener('click', (e) => {
      if (e.target === page) {
        showPropertyPane(propDefault);
        clearFigmaSelection();
      }
    });
  });

  // General frames focusing highlight
  figmaFrames.forEach(frame => {
    frame.addEventListener('click', (e) => {
      e.stopPropagation();
      clearFigmaSelection();
      frame.classList.add('selected');
      triggerFrameInspector(frame.id);
    });
  });


  // ================= RIGHT INSPECTOR SYSTEM =================

  // Helper to switch property panes
  function showPropertyPane(pane) {
    [propDefault, propColorDetails, propTypoDetails, propButtonDetails, propPersonaDetails].forEach(p => {
      if (p) p.classList.add('hidden');
    });
    if (pane) pane.classList.remove('hidden');
  }

  // Update properties panel based on selected frame type
  function triggerFrameInspector(frameId) {
    if (frameId === 'frame-colors') {
      const activeColor = document.querySelector('.color-item-wrap');
      if (activeColor) activeColor.click();
    } else if (frameId === 'frame-typography') {
      const activeTypo = document.querySelector('.typo-item');
      if (activeTypo) activeTypo.click();
    } else if (frameId === 'frame-buttons') {
      const activeButton = document.querySelector('.select-btn-state');
      if (activeButton) activeButton.click();
    } else if (frameId === 'frame-target') {
      const activePersona = document.querySelector('.persona-card');
      if (activePersona) activePersona.click();
    } else {
      showPropertyPane(propDefault);
    }
  }

  // 1. Color Selections
  const colorItems = document.querySelectorAll('.select-color');
  colorItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Select wrapper frame
      clearFigmaSelection();
      document.getElementById('frame-colors').classList.add('selected');

      const name = item.getAttribute('data-color-name');
      const hex = item.getAttribute('data-color-hex');
      const use = item.getAttribute('data-color-use');

      document.getElementById('prop-color-name').innerText = name;
      document.getElementById('prop-color-hex').innerText = hex;
      document.getElementById('prop-color-use').innerText = use;

      showPropertyPane(propColorDetails);
    });
  });

  // 2. Typography Selections
  const typoItems = document.querySelectorAll('.select-typo');
  typoItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();

      // Select wrapper frame
      clearFigmaSelection();
      document.getElementById('frame-typography').classList.add('selected');

      const font = item.getAttribute('data-font');
      const weight = item.getAttribute('data-weight');
      const size = item.getAttribute('data-size');
      const lh = item.getAttribute('data-lineheight');
      const use = item.getAttribute('data-use');

      document.getElementById('prop-typo-font').innerText = font;
      document.getElementById('prop-typo-weight').innerText = weight;
      document.getElementById('prop-typo-size').innerText = size;
      document.getElementById('prop-typo-lh').innerText = lh;
      document.getElementById('prop-typo-use').innerText = use;

      showPropertyPane(propTypoDetails);
    });
  });

  // 3. Button State Selections
  const buttonStateRows = document.querySelectorAll('.select-btn-state');
  buttonStateRows.forEach(row => {
    row.addEventListener('click', (e) => {
      e.stopPropagation();

      // Select wrapper frame
      clearFigmaSelection();
      document.getElementById('frame-buttons').classList.add('selected');

      const state = row.getAttribute('data-state');
      const bg = row.getAttribute('data-bg');
      const color = row.getAttribute('data-color');
      const shadow = row.getAttribute('data-shadow');

      document.getElementById('prop-btn-state').innerText = state;
      document.getElementById('prop-btn-bg').innerText = bg;
      document.getElementById('prop-btn-color').innerText = color;
      document.getElementById('prop-btn-shadow').innerText = shadow;

      showPropertyPane(propButtonDetails);
    });
  });

  // 4. Buyer Persona Selections (Investigación)
  const personaCards = document.querySelectorAll('.persona-card');
  personaCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.stopPropagation();

      // Select wrapper frame
      clearFigmaSelection();
      document.getElementById('frame-target').classList.add('selected');

      // Highlight card visually
      personaCards.forEach(c => c.classList.remove('active-selected'));
      card.classList.add('active-selected');

      const name = card.getAttribute('data-persona-name');
      const role = card.getAttribute('data-persona-role');
      const behavior = card.getAttribute('data-persona-behavior');
      const pain = card.getAttribute('data-persona-pain');
      const target = card.getAttribute('data-persona-target');

      document.getElementById('prop-persona-name').innerText = name;
      document.getElementById('prop-persona-role').innerText = role;
      document.getElementById('prop-persona-behavior').innerText = behavior;
      document.getElementById('prop-persona-pain').innerText = pain;
      document.getElementById('prop-persona-target').innerText = target;

      showPropertyPane(propPersonaDetails);
    });
  });


  // ================= FIGMA PROTOTYPE PRESENT MODE =================
  let isPresentMode = false;

  if (presentModeBtn) {
    presentModeBtn.addEventListener('click', () => {
      enterPresentMode();
    });
  }

  if (exitPresentBtn) {
    exitPresentBtn.addEventListener('click', () => {
      exitPresentMode();
    });
  }

  if (restartPrototypeBtn) {
    restartPrototypeBtn.addEventListener('click', () => {
      presentCanvas.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Esc key exits presentation mode
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isPresentMode) {
      exitPresentMode();
    }
  });

  function enterPresentMode() {
    isPresentMode = true;
    presentOverlay.classList.remove('hidden');
    
    // Reparent the landing page element to the presentation frame
    presentCanvas.appendChild(liveLandingPage);
    
    // Auto scroll to top of prototype
    presentCanvas.scrollTop = 0;
  }

  function exitPresentMode() {
    isPresentMode = false;
    presentOverlay.classList.add('hidden');
    
    // Restore landing page element to the canvas frame
    if (prototypeScaleWrapper) {
      prototypeScaleWrapper.appendChild(liveLandingPage);
    }
  }


  // ================= PROTOTYPE LANDING PAGE INTERACTIONS =================

  // 1. Menu Filter Chips
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active filter button state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards
      menuCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 2. Reservation / Order Form Validation & Submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Inputs
      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const subjectSelect = document.getElementById('form-subject');
      const messageText = document.getElementById('form-message');

      // Errors
      const errName = document.getElementById('error-name');
      const errEmail = document.getElementById('error-email');
      const errSubject = document.getElementById('error-subject');
      const errMessage = document.getElementById('error-message');

      // Reset
      [errName, errEmail, errSubject, errMessage].forEach(err => {
        if (err) err.style.display = 'none';
      });

      // Name Validation (min 3 characters)
      if (nameInput.value.trim().length < 3) {
        if (errName) errName.style.display = 'block';
        isValid = false;
      }

      // Email Validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        if (errEmail) errEmail.style.display = 'block';
        isValid = false;
      }

      // Subject Validation
      if (!subjectSelect.value) {
        if (errSubject) errSubject.style.display = 'block';
        isValid = false;
      }

      // Message Validation (min 10 characters)
      if (messageText.value.trim().length < 10) {
        if (errMessage) errMessage.style.display = 'block';
        isValid = false;
      }

      // If valid, show success screen
      if (isValid) {
        const data = {
          clientName: nameInput.value.trim(),
          clientEmail: emailInput.value.trim(),
          orderCombo: subjectSelect.value,
          specialNotes: messageText.value.trim(),
          submittedAt: new Date().toISOString()
        };

        // Render JSON preview
        if (formDataJson) {
          formDataJson.innerText = JSON.stringify(data, null, 2);
        }

        // Show Overlay
        if (successOverlay) {
          successOverlay.classList.add('show');
        }
      }
    });
  }

  // Close success overlay and reset form
  if (successCloseBtn) {
    successCloseBtn.addEventListener('click', () => {
      if (successOverlay) successOverlay.classList.remove('show');
      if (contactForm) contactForm.reset();
    });
  }

});
