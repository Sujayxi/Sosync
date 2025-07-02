document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const splashScreen = document.querySelector('.splash-screen');
  const mainContent = document.querySelector('.main-content');
  const navLinks = document.querySelector('.nav-links');
  const hamburger = document.querySelector('.hamburger');
  const serviceSection = document.querySelector(".service-cards-horizontal");

  // Splash screen handling
  setTimeout(() => {
    splashScreen.classList.add('fade-out');
    mainContent.classList.add('show');
    body.classList.remove('loading');

    setTimeout(() => {
      splashScreen.remove();
    }, 1000);
  }, 5000);
  function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('open');
  }
  

  // Smooth scroll function
  function smoothScroll(target, duration) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  // Add smooth scroll to all navigation links
  document.querySelectorAll("nav a, .cta-button").forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const targetSection = document.querySelector(this.getAttribute("href"));
      const duration = this.classList.contains('cta-button') ? 2000 : 1000;
      smoothScroll(targetSection, duration);

      // Close the menu if a link is clicked (for mobile)
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
      }
    });
  });

  // Toggle mobile navbar
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Gallery image hover effect
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * 20;
      const rotateY = (x - centerX) / centerX * 20;
      item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });

  // Smooth horizontal scroll in services section
  let scrollInterval;
  const scrollSpeed = 5; // Adjust speed for smoothness
  const scrollBoundary = 50; // Pixels from edge to trigger scrolling

  if (serviceSection) {
    serviceSection.addEventListener("mousemove", (e) => {
      const rect = serviceSection.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;

      clearInterval(scrollInterval); // Stop any existing scroll

      // Smooth scroll left if near the left edge
      if (mouseX < scrollBoundary) {
        scrollInterval = setInterval(() => {
          serviceSection.scrollLeft -= scrollSpeed;
          if (serviceSection.scrollLeft <= 0) clearInterval(scrollInterval); // Stop at beginning
        }, 10);
      }

      // Smooth scroll right if near the right edge
      else if (mouseX > rect.width - scrollBoundary) {
        scrollInterval = setInterval(() => {
          serviceSection.scrollLeft += scrollSpeed;
          if (serviceSection.scrollLeft + rect.width >= serviceSection.scrollWidth) {
            clearInterval(scrollInterval); // Stop at end
          }
        }, 10);
      }
    });

    // Stop scrolling when mouse leaves the section
    serviceSection.addEventListener("mouseleave", () => {
      clearInterval(scrollInterval);
    });
  }
});

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  var formData = new FormData(this);
  fetch(this.action, {
    method: "POST",
    body: formData,
    mode: "no-cors"
  }).then(() => {
    alert("Message sent successfully!");
    this.reset();
  }).catch(() => {
    alert("Error sending message.");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const marqueeContainer = document.getElementById("marquee-container");
  const imageFolder = "images/";
  const imageFiles = [
      "analytics.png", "android.png", "aws.png",  
      "ios.png", "kotlin.png",   "mern.png", "power.png"
  ];

  function populateMarquee() {
      marqueeContainer.innerHTML = "";

      for (let i = 0; i < 10; i++) {
          imageFiles.forEach((image) => {
              let imgElement = document.createElement("img");
              imgElement.src = `${imageFolder}${image}`;
              imgElement.alt = image;
              imgElement.classList.add("tech-icon");
              marqueeContainer.appendChild(imgElement);
          });
      }
  }
  populateMarquee();
});

const carousel = document.getElementById("carousel");
  const quantity = 6;
  let angle = 0;
  let currentIndex = 0;
  let autoRotate;

  const rotateCarousel = () => {
    angle = currentIndex * -(360 / quantity);
    carousel.style.transform = `rotateY(${angle}deg)`;
  };

  const startAutoRotate = () => {
    autoRotate = setInterval(() => {
      currentIndex = (currentIndex + 1) % quantity;
      rotateCarousel();
    }, 3000);
  };

  const stopAutoRotate = () => clearInterval(autoRotate);

  // Mouse/Touch swipe handling
  let startX = 0;
  let isDragging = false;

  const onStart = (x) => {
    startX = x;
    isDragging = true;
    stopAutoRotate();
  };

  const onMove = (x) => {
    if (!isDragging) return;
    const deltaX = x - startX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        currentIndex = (currentIndex - 1 + quantity) % quantity;
      } else {
        currentIndex = (currentIndex + 1) % quantity;
      }
      rotateCarousel();
      isDragging = false;
    }
  };

  const onEnd = () => {
    isDragging = false;
    startAutoRotate();
  };

  // Mouse events
  carousel.addEventListener("mousedown", (e) => onStart(e.clientX));
  carousel.addEventListener("mousemove", (e) => onMove(e.clientX));
  carousel.addEventListener("mouseup", onEnd);
  carousel.addEventListener("mouseleave", onEnd);

  // Touch events
  carousel.addEventListener("touchstart", (e) => onStart(e.touches[0].clientX));
  carousel.addEventListener("touchmove", (e) => onMove(e.touches[0].clientX));
  carousel.addEventListener("touchend", onEnd);

  // Pause on hover
  carousel.addEventListener("mouseenter", stopAutoRotate);
  carousel.addEventListener("mouseleave", startAutoRotate);

  startAutoRotate();