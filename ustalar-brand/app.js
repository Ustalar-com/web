// ----------------------------------------------------
// Ustalar Brand - Core JS Interactivity & Firebase
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Set Current Year in Footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Redirect URLs
  const DEFAULT_CTA_URL = 'https://wa.me/905324666068?text=Merhaba,%20Ustalar%20Brand%20hizmetleri%20ve%20kurumsal%20iş%20birlikleri%20hakkında%20bilgi%20almak%20istiyorum.';
  
  // Bind Header & Footer WhatsApp CTA buttons
  const headerBtn = document.getElementById('cta-header-btn');
  if (headerBtn) {
    headerBtn.addEventListener('click', () => {
      window.open(DEFAULT_CTA_URL, '_blank', 'noopener,noreferrer');
    });
  }

  const footerBtn = document.getElementById('cta-footer-btn');
  if (footerBtn) {
    footerBtn.addEventListener('click', () => {
      window.open(DEFAULT_CTA_URL, '_blank', 'noopener,noreferrer');
    });
  }

  // Parse Youtube Video URL to Embed Link
  function getYoutubeEmbedUrl(url) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
    }
    return null;
  }

  // Setup Video Player Modals
  const videoModal = document.getElementById('video-player-modal');
  const videoIframe = document.getElementById('video-player-iframe');
  const videoCloseBtn = document.getElementById('video-close-btn');

  function openVideoPlayer(videoUrl) {
    const embedUrl = getYoutubeEmbedUrl(videoUrl);
    if (embedUrl && videoModal && videoIframe) {
      videoIframe.src = embedUrl;
      videoModal.style.display = 'flex';
    } else if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  }

  function closeVideoPlayer() {
    if (videoModal && videoIframe) {
      videoIframe.src = '';
      videoModal.style.display = 'none';
    }
  }

  if (videoCloseBtn) {
    videoCloseBtn.addEventListener('click', closeVideoPlayer);
  }
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoPlayer();
    });
  }

  // Render services grid
  function renderServicesGrid(services) {
    const grid = document.getElementById('services-grid');
    if (!grid) return;

    grid.innerHTML = '';

    if (!services || services.length === 0) {
      grid.innerHTML = `
        <div class="no-data-box">
          <i data-lucide="info"></i>
          <p class="no-data-text">Aktif marka hizmeti bulunamadı.</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    services.forEach(srv => {
      // Create clickable box card (role=button for compliance)
      const card = document.createElement('div');
      card.className = 'service-btn';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', srv.name);

      // Set redirect click action
      const handleRedirect = () => {
        const url = srv.redirectUrl || DEFAULT_CTA_URL;
        window.open(url, '_blank', 'noopener,noreferrer');
      };
      
      card.addEventListener('click', handleRedirect);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleRedirect();
        }
      });

      // Construct Inner HTML
      let playBtnHTML = '';
      if (srv.mediaUrl) {
        playBtnHTML = `
          <button class="service-play-btn" title="Tanıtım Videosunu İzle" aria-label="Videoyu İzle">
            <i data-lucide="play"></i>
          </button>
        `;
      }

      card.innerHTML = `
        <div class="service-btn-bg" style="background-image: url('${srv.imageUrl}');"></div>
        <div class="service-btn-overlay"></div>
        <div class="service-btn-content">
          <h3 class="service-btn-title">${srv.name}</h3>
          ${srv.description ? `<p class="service-btn-desc">${srv.description}</p>` : ''}
          <div class="service-btn-action">
            <span>DETAYLARI GÖR</span>
            <i data-lucide="arrow-up-right"></i>
          </div>
        </div>
        ${playBtnHTML}
      `;

      // Bind play button click action
      if (srv.mediaUrl) {
        const playBtn = card.querySelector('.service-play-btn');
        if (playBtn) {
          playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            openVideoPlayer(srv.mediaUrl);
          });
        }
      }

      grid.appendChild(card);
    });

    // Refresh lucide icons inside dynamic nodes
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Load Banner Configurations from Firestore
  async function loadHeroBanner() {
    if (!window.db || !window.firestoreHelpers) return;
    const { doc, getDoc } = window.firestoreHelpers;

    try {
      const bannerDocRef = doc(window.db, "banners", "brand_top");
      const dSnap = await getDoc(bannerDocRef);
      if (dSnap.exists()) {
        const data = dSnap.data();
        if (data.isActive && data.imageUrl) {
          const heroImg = document.getElementById('hero-bg-image');
          if (heroImg) {
            heroImg.src = data.imageUrl;
          }
          if (data.title) {
            const heroTitle = document.getElementById('hero-title-text');
            if (heroTitle) {
              heroTitle.textContent = data.title;
            }
          }
        }
      }
    } catch (e) {
      console.warn("Could not load brand banner configurators: ", e);
    }
  }

  // Load Firestore Data Main Flow
  async function loadFirestoreData() {
    if (!window.db || !window.firestoreHelpers) {
      console.log("Firebase not loaded, using fallback data source.");
      renderServicesGrid(generateFallbackBrandServices());
      if (typeof window.hidePreloader === 'function') window.hidePreloader();
      return;
    }

    const { collection, getDocs, query, orderBy } = window.firestoreHelpers;

    try {
      // 1. Load Banners Setup
      await loadHeroBanner();

      // 2. Load Brand Services
      const q = query(collection(window.db, "brand_services"), orderBy("orderIndex"));
      const qs = await getDocs(q);
      const services = [];

      qs.forEach(docSnap => {
        services.push({ id: docSnap.id, ...docSnap.data() });
      });

      if (services.length > 0) {
        renderServicesGrid(services);
      } else {
        // Fallback to local data if collection is empty
        renderServicesGrid(generateFallbackBrandServices());
      }
    } catch (e) {
      console.error("Firestore loading error in Brand services page: ", e);
      // Fallback
      renderServicesGrid(generateFallbackBrandServices());
    } finally {
      if (typeof window.hidePreloader === 'function') {
        window.hidePreloader();
      }
    }
  }

  // Start data loading
  loadFirestoreData();
});
