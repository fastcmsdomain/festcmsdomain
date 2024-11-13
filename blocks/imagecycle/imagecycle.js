// Configuration object for the imagecycle block
const IMAGECYCLE_CONFIG = {
  ROTATION_INTERVAL: 5000, // 5 seconds between rotations
  BACKGROUND_COLOR: '#e6f3ff', // Light blue background
  KEYS: {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight'
  }
};

/**
 * Creates navigation dots for the image carousel
 * @param {number} count - Number of images
 * @param {number} active - Active image index
 * @returns {HTMLElement} Navigation container
 */
function createNavigation(count, active) {
  const nav = document.createElement('div');
  nav.className = 'imagecycle-nav';
  
  for (let i = 0; i < count; i += 1) {
    const dot = document.createElement('button');
    dot.className = 'imagecycle-dot';
    dot.setAttribute('aria-label', `Go to image ${i + 1}`);
    if (i === active) {
      dot.classList.add('active');
    }
    nav.appendChild(dot);
  }
  
  return nav;
}

/**
 * Updates the active state of navigation dots
 * @param {HTMLElement} nav - Navigation container
 * @param {number} activeIndex - Current active image index
 */
function updateNavigation(nav, activeIndex) {
  const dots = nav.querySelectorAll('.imagecycle-dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === activeIndex);
  });
}

/**
 * Decorates the imagecycle block
 * @param {HTMLElement} block - The block element to decorate
 */
export default async function decorate(block) {
  // Create wrapper for images
  const wrapper = document.createElement('div');
  wrapper.className = 'imagecycle-wrapper';
  
  // Extract images from table rows
  const images = [];
  block.querySelectorAll(':scope > div').forEach((row) => {
    const img = row.querySelector('img');
    if (img) {
      images.push(img.cloneNode(true));
    }
  });
  
  // Clear original content
  block.textContent = '';
  
  // Randomize image order
  images.sort(() => Math.random() - 0.5);
  
  // Add images to wrapper
  images.forEach((img, index) => {
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'imagecycle-image';
    imgWrapper.style.display = index === 0 ? 'block' : 'none';
    imgWrapper.appendChild(img);
    wrapper.appendChild(imgWrapper);
  });
  
  // Add navigation
  const nav = createNavigation(images.length, 0);
  
  // Add elements to block
  block.appendChild(wrapper);
  block.appendChild(nav);
  
  let currentIndex = 0;
  let rotationInterval;
  
  /**
   * Shows the image at the specified index
   * @param {number} index - Index of image to show
   */
  function showImage(index) {
    const imageWrappers = wrapper.querySelectorAll('.imagecycle-image');
    imageWrappers.forEach((img, i) => {
      img.style.display = i === index ? 'block' : 'none';
    });
    updateNavigation(nav, index);
    currentIndex = index;
  }
  
  /**
   * Starts the rotation interval
   */
  function startRotation() {
    rotationInterval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      showImage(nextIndex);
    }, IMAGECYCLE_CONFIG.ROTATION_INTERVAL);
  }
  
  /**
   * Stops the rotation interval
   */
  function stopRotation() {
    clearInterval(rotationInterval);
  }
  
  // Event listeners
  wrapper.addEventListener('mouseenter', stopRotation);
  wrapper.addEventListener('mouseleave', () => {
    showImage((currentIndex + 1) % images.length);
    startRotation();
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (block.contains(document.activeElement)) {
      if (e.key === IMAGECYCLE_CONFIG.KEYS.LEFT) {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(prevIndex);
        stopRotation();
      } else if (e.key === IMAGECYCLE_CONFIG.KEYS.RIGHT) {
        const nextIndex = (currentIndex + 1) % images.length;
        showImage(nextIndex);
        stopRotation();
      }
    }
  });
  
  // Navigation dot clicks
  nav.addEventListener('click', (e) => {
    if (e.target.classList.contains('imagecycle-dot')) {
      const index = Array.from(nav.children).indexOf(e.target);
      showImage(index);
      stopRotation();
    }
  });
  
  // Start rotation
  startRotation();
} 