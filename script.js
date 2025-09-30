document.addEventListener("DOMContentLoaded", function() {
  // ===============================
  // Lightbox avansat
  // ===============================
  const galleryImages = document.querySelectorAll('.gallery-img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('close');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  let currentIndex = 0;

  function showLightbox(index) {
    currentIndex = index;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightbox.style.display = "flex";
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => showLightbox(index));
  });

  function closeLightbox() { lightbox.style.display = "none"; }
  function showNext() { currentIndex = (currentIndex+1) % galleryImages.length; lightboxImg.src = galleryImages[currentIndex].src; }
  function showPrev() { currentIndex = (currentIndex-1+galleryImages.length) % galleryImages.length; lightboxImg.src = galleryImages[currentIndex].src; }

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if(lightbox.style.display === "flex") {
      if(e.key === "Escape") closeLightbox();
      if(e.key === "ArrowRight") showNext();
      if(e.key === "ArrowLeft") showPrev();
    }
  });

  // ===============================
  // Animare fade-in la scroll
  // ===============================
  const faders = document.querySelectorAll('.fade-in');

  const appearOptions = { threshold: 0.2 };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => appearOnScroll.observe(fader));

  // ===============================
  // Smooth highlight aurii pentru butoane la hover
  // ===============================
  const buttons = document.querySelectorAll('a, button');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => btn.style.boxShadow = '0 0 15px #d4af37');
    btn.addEventListener('mouseleave', () => btn.style.boxShadow = 'none');
  });

});
