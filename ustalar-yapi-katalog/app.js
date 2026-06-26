// ----------------------------------------------------
// Ustalar Yapı Katalog - Core JS Interactivity
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  // Set Current Year in Footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Database State
  const catalogs = generateInitialCatalogs();
  let activeCategories = typeof CATEGORIES !== 'undefined' ? CATEGORIES : [];
  let activeCatalogs = catalogs;
  let selectedCatalog = null;
  let currentSpread = 0;
  let isFlipping = false;
  let isMobile = window.innerWidth < 768;

  // Window Resize Event
  window.addEventListener('resize', () => {
    const wasMobile = isMobile;
    isMobile = window.innerWidth < 768;
    if (wasMobile !== isMobile && selectedCatalog) {
      // Re-render reader spread to adjust single/double pages
      currentSpread = 0;
      renderSpread();
    }
  });

  // Redirect URLs
  const HOMEPAGE_FORM = 'https://forms.gle/YV44Li7MypqBNcPV9';
  const CATALOG_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSfg-p9ieSxxnS7oiybZV127evNldWv2XNNNywSUy5qZa2lhnw/viewform';

  function handleRedirectToHomepageForm() {
    window.open(HOMEPAGE_FORM, '_blank', 'noopener,noreferrer');
  }

  function handleRedirectToCatalogForm(categoryName, catalogTitle) {
    // Optional: add pre-fill parameters if wanted. Opening form directly
    window.open(CATALOG_FORM, '_blank', 'noopener,noreferrer');
  }

  // Bind static page buttons
  const headerBtn = document.getElementById('talep-formu-header-btn');
  if (headerBtn) headerBtn.addEventListener('click', handleRedirectToHomepageForm);

  const footerBtn = document.getElementById('talep-formu-footer-btn');
  if (footerBtn) footerBtn.addEventListener('click', handleRedirectToHomepageForm);

  // ----------------------------------------------------
  // HERO SLIDER LOGIC
  // ----------------------------------------------------
  const slides = document.querySelectorAll('.slide-item');
  const dots = document.querySelectorAll('.dot');
  let currentSlideIndex = 0;
  let slideTimer = null;

  function showSlide(index) {
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex = (index + slides.length) % slides.length;
    
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
  }

  function startSlideShow() {
    stopSlideShow();
    slideTimer = setInterval(() => {
      showSlide(currentSlideIndex + 1);
    }, 6000);
  }

  function stopSlideShow() {
    if (slideTimer) clearInterval(slideTimer);
  }

  // Prev / Next controls
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentSlideIndex - 1);
      startSlideShow();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentSlideIndex + 1);
      startSlideShow();
    });
  }

  // Dots controls
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      startSlideShow();
    });
  });

  // Slider actions binding (Kataloğu İncele / Hızlı Teklif Al)
  slides.forEach((slide) => {
    const openBtn = slide.querySelector('.btn-slider-open');
    const offerBtn = slide.querySelector('.btn-slider-offer');
    const categoryId = slide.getAttribute('data-category-id');
    const catalogId = slide.getAttribute('data-catalog-id');

    if (openBtn) {
      openBtn.addEventListener('click', () => {
        openBookReader(catalogId);
      });
    }

    if (offerBtn) {
      offerBtn.addEventListener('click', handleRedirectToHomepageForm);
    }
  });

  startSlideShow();

  // ----------------------------------------------------
  // CATEGORIES ACCORDION & SEARCH
  // ----------------------------------------------------
  const categoriesGrid = document.getElementById('categories-grid');
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');
  const searchNoResults = document.getElementById('search-no-results');
  const searchClearBtn = document.getElementById('search-clear-btn');

  function renderCategoryGrid() {
    if (!categoriesGrid) return;
    categoriesGrid.innerHTML = '';

    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let visibleCount = 0;

    activeCategories.forEach((cat) => {
      // Find catalogs for this category
      const categoryCatalogs = activeCatalogs.filter(c => c.categoryId === cat.id);
      
      // Filter condition: query matches category name or any catalog title
      const matchesCategoryName = cat.name.toLowerCase().includes(query);
      const matchesCatalogTitle = categoryCatalogs.some(c => c.title.toLowerCase().includes(query));

      if (query !== '' && !matchesCategoryName && !matchesCatalogTitle) {
        return; // hide card
      }

      visibleCount++;

      // Create card wrapper
      const card = document.createElement('div');
      card.className = 'cat-card';
      card.id = `cat-card-${cat.id}`;

      // Create card header button
      const headerBtn = document.createElement('button');
      headerBtn.className = 'cat-header-btn';
      headerBtn.setAttribute('aria-expanded', 'false');

      // Populate header content
      let iconHTML = `<i data-lucide="${cat.icon || 'book-open'}"></i>`;
      if (cat.icon && (cat.icon.startsWith('http://') || cat.icon.startsWith('https://'))) {
        iconHTML = `<img src="${cat.icon}" class="cat-icon-img" alt="">`;
      }

      headerBtn.innerHTML = `
        <div class="cat-header-left">
          <div class="cat-icon-wrapper">
            ${iconHTML}
          </div>
          <div class="cat-info-wrapper">
            <h3 class="cat-title">${cat.name}</h3>
          </div>
        </div>
        <div class="cat-chevron">
          <i data-lucide="chevron-down"></i>
        </div>
      `;

      // Create panel
      const panel = document.createElement('div');
      panel.className = 'cat-panel';
      
      const panelInner = document.createElement('div');
      panelInner.className = 'cat-panel-inner';
      panelInner.innerHTML = `<p class="cat-panel-title">MEVCUT SEÇENEKLER:</p>`;

      const catalogsList = document.createElement('div');
      catalogsList.className = 'catalogs-list';

      categoryCatalogs.forEach((catalog) => {
        const item = document.createElement('div');
        item.className = 'catalog-item';
        
        item.innerHTML = `
          <h4 class="catalog-name">${catalog.title}</h4>
          <div class="catalog-actions">
            <button class="btn-action-open" title="Kataloğu Dergi Görünümünde Aç">
              <i data-lucide="book-open"></i>
              <span>AÇ</span>
            </button>
            <button class="btn-action-offer" title="Fiyat Teklifi Talep Et">
              <i data-lucide="send"></i>
              <span>TEKLİF</span>
            </button>
          </div>
        `;

        // Bind action buttons
        const actionOpen = item.querySelector('.btn-action-open');
        const actionOffer = item.querySelector('.btn-action-offer');

        if (actionOpen) {
          actionOpen.addEventListener('click', (e) => {
            e.stopPropagation();
            if (catalog.pdfUrl) {
              window.open(catalog.pdfUrl, '_blank');
            } else {
              openBookReader(catalog.id);
            }
          });
        }

        if (actionOffer) {
          actionOffer.addEventListener('click', (e) => {
            e.stopPropagation();
            handleRedirectToCatalogForm(cat.name, catalog.title);
          });
        }

        catalogsList.appendChild(item);
      });

      panelInner.appendChild(catalogsList);
      panel.appendChild(panelInner);
      card.appendChild(headerBtn);
      card.appendChild(panel);

      // Accordion click handler
      headerBtn.addEventListener('click', () => {
        const isExpanded = card.classList.contains('expanded');
        
        // Close all other accordions first
        document.querySelectorAll('.cat-card.expanded').forEach((otherCard) => {
          if (otherCard !== card) {
            otherCard.classList.remove('expanded');
            otherCard.querySelector('.cat-header-btn').setAttribute('aria-expanded', 'false');
            otherCard.querySelector('.cat-panel').style.maxHeight = '0px';
          }
        });

        // Toggle current card
        if (isExpanded) {
          card.classList.remove('expanded');
          headerBtn.setAttribute('aria-expanded', 'false');
          panel.style.maxHeight = '0px';
        } else {
          card.classList.add('expanded');
          headerBtn.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });

      categoriesGrid.appendChild(card);
    });

    // Handle no results visibility
    if (searchNoResults) {
      searchNoResults.style.display = (visibleCount === 0) ? 'block' : 'none';
    }

    // Refresh lucide icons for newly appended nodes
    lucide.createIcons();
  }

  // Bind Search events
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const val = searchInput.value;
      if (searchClear) {
        searchClear.style.display = val ? 'block' : 'none';
      }
      renderCategoryGrid();
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchClear.style.display = 'none';
      renderCategoryGrid();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (searchClear) searchClear.style.display = 'none';
      renderCategoryGrid();
    });
  }

  // Initial populate grid
  renderCategoryGrid();


  // ----------------------------------------------------
  // 3D BOOK READER LOGIC
  // ----------------------------------------------------
  const overlay = document.getElementById('book-reader-overlay');
  const closeBtn = document.getElementById('reader-close-btn');
  const readerPrevBtn = document.getElementById('reader-prev-btn');
  const readerNextBtn = document.getElementById('reader-next-btn');
  const readerTitle = document.getElementById('reader-title');
  const pageIndicator = document.getElementById('reader-page-indicator');
  const progressBar = document.getElementById('reader-progress-bar');
  const bookContainer = document.getElementById('book-3d-container');
  const readerOfferBtn = document.getElementById('reader-offer-btn');

  const leftPageDiv = document.getElementById('book-left-page');
  const rightPageDiv = document.getElementById('book-right-page');

  function openBookReader(catalogId) {
    const targetCatalog = activeCatalogs.find(c => c.id === catalogId);
    if (!targetCatalog) return;

    selectedCatalog = targetCatalog;
    currentSpread = 0;
    isFlipping = false;

    if (readerTitle) readerTitle.textContent = selectedCatalog.title.toUpperCase();

    // Show overlay
    if (overlay) overlay.classList.add('active');
    
    // Stop hero slideshow while reading
    stopSlideShow();

    renderSpread();
  }

  function closeBookReader() {
    selectedCatalog = null;
    if (overlay) overlay.classList.remove('active');
    
    // Resume slideshow
    startSlideShow();
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeBookReader);
  }

  // Offer request inside reader
  if (readerOfferBtn) {
    readerOfferBtn.addEventListener('click', () => {
      if (selectedCatalog) {
        handleRedirectToCatalogForm(selectedCatalog.categoryName, selectedCatalog.title);
      }
    });
  }

  function getTotalSpreads() {
    if (!selectedCatalog) return 0;
    const totalPages = selectedCatalog.pages.length;
    return isMobile ? totalPages : Math.ceil((totalPages + 1) / 2);
  }

  function renderSpread() {
    if (!selectedCatalog) return;

    const totalPages = selectedCatalog.pages.length;
    const totalSpreads = getTotalSpreads();

    // Left Page & Right Page Data Resolving
    let leftPageData = null;
    let rightPageData = null;

    if (isMobile) {
      rightPageData = selectedCatalog.pages[currentSpread];
      if (pageIndicator) {
        pageIndicator.textContent = `SAYFA ${currentSpread + 1} / ${totalPages}`;
      }
    } else {
      if (currentSpread === 0) {
        // Cover spread - right side shows Page 1, left side is closed backing
        rightPageData = selectedCatalog.pages[0];
      } else {
        const leftIndex = (currentSpread - 1) * 2 + 1;
        const rightIndex = leftIndex + 1;
        leftPageData = selectedCatalog.pages[leftIndex] || null;
        rightPageData = selectedCatalog.pages[rightIndex] || null;
      }

      if (pageIndicator) {
        pageIndicator.textContent = `YAPRAK ${currentSpread + 1} / ${totalSpreads}`;
      }
    }

    // Update Progress bar
    if (progressBar) {
      const percentage = ((currentSpread + 1) / totalSpreads) * 100;
      progressBar.style.width = `${percentage}%`;
    }

    // Disable navigation controls if boundary
    if (readerPrevBtn) readerPrevBtn.disabled = (currentSpread <= 0);
    if (readerNextBtn) readerNextBtn.disabled = (currentSpread >= totalSpreads - 1);

    // RENDER LEFT PAGE
    if (!isMobile && leftPageDiv) {
      if (leftPageData) {
        leftPageDiv.innerHTML = `
          <div class="book-page-content">
            <div class="book-page-bg-soft">
              <img src="${leftPageData.imageUrl}" alt="" referrerpolicy="no-referrer">
            </div>
            <div class="book-page-header">
              <span class="book-page-meta-tag">${selectedCatalog.title}</span>
              <span class="book-page-num">S. ${leftPageData.pageNumber}</span>
            </div>
            <div class="book-page-showcase">
              <img src="${leftPageData.imageUrl}" alt="Catalog Sayfası" referrerpolicy="no-referrer">
              <div class="book-page-gradient-mask"></div>
            </div>
          </div>
        `;
      } else {
        // Cover backing
        leftPageDiv.innerHTML = `
          <div class="book-page-closed-backing book-page-closed-backing-left">
            <div class="book-page-closed-spine"></div>
          </div>
        `;
      }
    }

    // RENDER RIGHT PAGE
    if (rightPageDiv) {
      if (rightPageData) {
        rightPageDiv.innerHTML = `
          <div class="book-page-content">
            <div class="book-page-bg-soft">
              <img src="${rightPageData.imageUrl}" alt="" referrerpolicy="no-referrer">
            </div>
            <div class="book-page-header">
              <span class="book-page-meta-tag">${selectedCatalog.title}</span>
              <span class="book-page-num">S. ${rightPageData.pageNumber}</span>
            </div>
            <div class="book-page-showcase">
              <img src="${rightPageData.imageUrl}" alt="Catalog Sayfası" referrerpolicy="no-referrer">
              <div class="book-page-gradient-mask"></div>
            </div>
          </div>
        `;
      } else {
        // Back cover backing
        rightPageDiv.innerHTML = `
          <div class="book-page-closed-backing book-page-closed-backing-right">
            <div class="book-page-closed-spine"></div>
          </div>
        `;
      }
    }
  }

  function handleNextSpread() {
    const totalSpreads = getTotalSpreads();
    if (currentSpread >= totalSpreads - 1 || isFlipping) return;

    isFlipping = true;
    
    // Create and append flipping paper overlay element
    const flipOverlay = document.createElement('div');
    flipOverlay.className = 'flipping-page-overlay flip-next';
    flipOverlay.innerHTML = `
      <div class="flipping-inner-loading">
        <i data-lucide="sparkles"></i>
        <span class="flipping-text">SAYFA ÇEVRİLİYOR...</span>
      </div>
      <div class="glare-overlay"></div>
    `;
    bookContainer.appendChild(flipOverlay);
    lucide.createIcons();

    setTimeout(() => {
      currentSpread++;
      renderSpread();
      flipOverlay.remove();
      isFlipping = false;
    }, 450); // matches 3d rotate animation duration
  }

  function handlePrevSpread() {
    if (currentSpread <= 0 || isFlipping) return;

    isFlipping = true;

    // Create and append flipping paper overlay element
    const flipOverlay = document.createElement('div');
    flipOverlay.className = 'flipping-page-overlay flip-prev';
    flipOverlay.innerHTML = `
      <div class="flipping-inner-loading">
        <i data-lucide="sparkles"></i>
        <span class="flipping-text">SAYFA ÇEVRİLİYOR...</span>
      </div>
      <div class="glare-overlay"></div>
    `;
    bookContainer.appendChild(flipOverlay);
    lucide.createIcons();

    setTimeout(() => {
      currentSpread--;
      renderSpread();
      flipOverlay.remove();
      isFlipping = false;
    }, 450);
  }

  // Reader Button Listeners
  if (readerPrevBtn) readerPrevBtn.addEventListener('click', handlePrevSpread);
  if (readerNextBtn) readerNextBtn.addEventListener('click', handleNextSpread);

  // Keyboard navigation listener
  window.addEventListener('keydown', (e) => {
    if (!selectedCatalog) return; // ignore if reader closed

    if (e.key === 'ArrowLeft') {
      handlePrevSpread();
    } else if (e.key === 'ArrowRight') {
      handleNextSpread();
    } else if (e.key === 'Escape') {
      closeBookReader();
    }
  });

  // ----------------------------------------------------
  // DYNAMIC DATA FROM FIRESTORE
  // ----------------------------------------------------
  function initDynamicSlider(dynamicSlides) {
    const slidesContainer = document.getElementById('slides-container');
    const dotsContainer = document.getElementById('slider-dots');
    if (!slidesContainer || !dotsContainer || dynamicSlides.length === 0) return;

    slidesContainer.innerHTML = '';
    dotsContainer.innerHTML = '';

    dynamicSlides.forEach((slide, idx) => {
      // Create slide item
      const slideDiv = document.createElement('div');
      slideDiv.className = `slide-item ${idx === 0 ? 'active' : ''}`;
      slideDiv.setAttribute('data-slide-index', idx);
      
      slideDiv.innerHTML = `
        <div class="slide-image-mask"></div>
        <img src="${slide.imageUrl}" alt="${slide.title}" class="slide-image">
        <div class="slide-content-overlay">
          <div class="container">
            <div class="slide-content-box">
              <h1 class="slide-title">${slide.title}</h1>
              <p class="slide-desc">${slide.description || ''}</p>
              <div class="slide-actions">
                ${slide.redirectUrl ? `
                <a href="${slide.redirectUrl}" target="_blank" class="btn-primary btn-slider-open" style="text-decoration:none;">
                  <i data-lucide="book-open"></i>
                  <span>Kataloğu İncele</span>
                </a>` : ''}
                <button class="btn-secondary btn-slider-offer">
                  <span>Hızlı Teklif Al</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      slidesContainer.appendChild(slideDiv);

      // Create dot
      const dotBtn = document.createElement('button');
      dotBtn.className = `dot ${idx === 0 ? 'active' : ''}`;
      dotBtn.setAttribute('data-slide-dot', idx);
      dotBtn.setAttribute('aria-label', `Slayt ${idx + 1}`);
      dotsContainer.appendChild(dotBtn);
    });

    // Re-initialize slider variables and events
    const newSlides = document.querySelectorAll('.slide-item');
    const newDots = document.querySelectorAll('.dot');
    let dynamicSlideIndex = 0;
    let dynamicTimer = null;

    function showDynamicSlide(index) {
      if (newSlides.length === 0) return;
      newSlides[dynamicSlideIndex].classList.remove('active');
      newDots[dynamicSlideIndex].classList.remove('active');
      
      dynamicSlideIndex = (index + newSlides.length) % newSlides.length;
      
      newSlides[dynamicSlideIndex].classList.add('active');
      newDots[dynamicSlideIndex].classList.add('active');
    }

    function startDynamicSlideShow() {
      stopDynamicSlideShow();
      dynamicTimer = setInterval(() => {
        showDynamicSlide(dynamicSlideIndex + 1);
      }, 6000);
    }

    function stopDynamicSlideShow() {
      if (dynamicTimer) clearInterval(dynamicTimer);
    }

    // Bind prev/next
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');

    if (prevBtn) {
      const parent = prevBtn.parentNode;
      const prevClone = prevBtn.cloneNode(true);
      parent.replaceChild(prevClone, prevBtn);
      prevClone.addEventListener('click', () => {
        showDynamicSlide(dynamicSlideIndex - 1);
        startDynamicSlideShow();
      });
    }
    if (nextBtn) {
      const parent = nextBtn.parentNode;
      const nextClone = nextBtn.cloneNode(true);
      parent.replaceChild(nextClone, nextBtn);
      nextClone.addEventListener('click', () => {
        showDynamicSlide(dynamicSlideIndex + 1);
        startDynamicSlideShow();
      });
    }

    // Bind dots
    newDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        showDynamicSlide(idx);
        startDynamicSlideShow();
      });
    });

    // Bind offer buttons
    newSlides.forEach(slide => {
      const offerBtn = slide.querySelector('.btn-slider-offer');
      if (offerBtn) {
        offerBtn.addEventListener('click', handleRedirectToHomepageForm);
      }
    });

    // Initialize Lucide icons inside dynamic slides
    if (window.lucide) {
      window.lucide.createIcons();
    }

    startDynamicSlideShow();
  }

  async function loadFirestoreData() {
    if (!window.db) return;
    const { collection, getDocs, query, orderBy } = window.firestoreHelpers;

    try {
      // 1. Load Slider Slides
      const slideSnap = await getDocs(query(collection(window.db, "yapi_katalog_slides"), orderBy("orderIndex")));
      const dynamicSlides = [];
      slideSnap.forEach(docSnap => dynamicSlides.push({ id: docSnap.id, ...docSnap.data() }));
      if (dynamicSlides.length > 0) {
        initDynamicSlider(dynamicSlides);
      }

      // 2. Load Categories
      const catSnap = await getDocs(query(collection(window.db, "yapi_katalog_categories"), orderBy("orderIndex")));
      const dynamicCategories = [];
      catSnap.forEach(docSnap => dynamicCategories.push({ id: docSnap.id, ...docSnap.data() }));

      // 3. Load Catalog Items
      const itemSnap = await getDocs(query(collection(window.db, "yapi_katalog_items"), orderBy("orderIndex")));
      const dynamicItems = [];
      itemSnap.forEach(docSnap => dynamicItems.push({ id: docSnap.id, ...docSnap.data() }));

      if (dynamicCategories.length > 0) {
        // Map dynamic categories to the format expected
        activeCategories = dynamicCategories.map(cat => ({
          id: cat.id,
          name: cat.name,
          icon: cat.icon || 'book-open',
          description: cat.description || ''
        }));

        // Map dynamic items/catalogs
        const catMap = {};
        dynamicCategories.forEach(c => catMap[c.id] = c.name);

        activeCatalogs = dynamicItems.map(item => ({
          id: item.id,
          categoryId: item.categoryId,
          categoryName: catMap[item.categoryId] || '',
          title: item.title,
          pdfUrl: item.pdfUrl
        }));

        // Re-render categories accordion grid with dynamic data
        renderCategoryGrid();
        
        // Re-run lucide icons to refresh icons on dynamic html
        if (window.lucide) {
          window.lucide.createIcons();
        }
      }
    } catch (e) {
      console.error("Firestore loading error in Yapı Katalog: ", e);
    }
  }

  // Load dynamic data from Firestore
  loadFirestoreData();

});
