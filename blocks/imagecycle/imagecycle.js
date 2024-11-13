// Configuration object for the imagecycle block
const IMAGECYCLE_CONFIG = {
  ROTATION_INTERVAL: 5000, // 5 seconds between rotations
  ROTATION_ANGLE: -60, // Angle for side images
  KEYS: {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight'
  },
  CLASSES: {
    ACTIVE: 'active',
    PREV: 'prev',
    NEXT: 'next'
  }
};

/**
 * Creates navigation arrows for the carousel
 * @returns {Object} Object containing left and right arrow elements
 */
function createArrows() {
  const leftArrow = document.createElement('button');
  leftArrow.className = 'imagecycle-arrow imagecycle-arrow-left';
  leftArrow.setAttribute('aria-label', 'Previous image');
  leftArrow.innerHTML = '←';

  const rightArrow = document.createElement('button');
  rightArrow.className = 'imagecycle-arrow imagecycle-arrow-right';
  rightArrow.setAttribute('aria-label', 'Next image');
  rightArrow.innerHTML = '→';

  return { leftArrow, rightArrow };
}

/**
 * Updates the carousel state
 * @param {HTMLElement} wrapper - Carousel wrapper element
 * @param {number} currentIndex - Current active image index
 * @param {number} totalImages - Total number of images
 */
function updateCarousel(wrapper, currentIndex, totalImages) {
  const images = wrapper.querySelectorAll('.imagecycle-image');
  const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
  const nextIndex = (currentIndex + 1) % totalImages;

  images.forEach((img, index) => {
    img.classList.remove(
      IMAGECYCLE_CONFIG.CLASSES.ACTIVE,
      IMAGECYCLE_CONFIG.CLASSES.PREV,
      IMAGECYCLE_CONFIG.CLASSES.NEXT
    );

    if (index === currentIndex) {
      img.classList.add(IMAGECYCLE_CONFIG.CLASSES.ACTIVE);
    } else if (index === prevIndex) {
      img.classList.add(IMAGECYCLE_CONFIG.CLASSES.PREV);
    } else if (index === nextIndex) {
      img.classList.add(IMAGECYCLE_CONFIG.CLASSES.NEXT);
    }
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
  
  // Add images to wrapper
  images.forEach((img) => {
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'imagecycle-image';
    imgWrapper.appendChild(img);
    wrapper.appendChild(imgWrapper);
  });
  
  // Create and add navigation arrows
  const { leftArrow, rightArrow } = createArrows();
  
  // Add elements to block
  block.appendChild(leftArrow);
  block.appendChild(wrapper);
  block.appendChild(rightArrow);
  
  let currentIndex = 0;
  
  // Initialize carousel state
  updateCarousel(wrapper, currentIndex, images.length);
  
  /**
   * Rotates to the specified index
   * @param {number} newIndex - Target index to rotate to
   */
  function rotateTo(newIndex) {
    currentIndex = newIndex;
    updateCarousel(wrapper, currentIndex, images.length);
  }
  
  // Event listeners for arrows
  leftArrow.addEventListener('click', () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    rotateTo(newIndex);
  });
  
  rightArrow.addEventListener('click', () => {
    const newIndex = (currentIndex + 1) % images.length;
    rotateTo(newIndex);
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (block.contains(document.activeElement)) {
      if (e.key === IMAGECYCLE_CONFIG.KEYS.LEFT) {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        rotateTo(newIndex);
      } else if (e.key === IMAGECYCLE_CONFIG.KEYS.RIGHT) {
        const newIndex = (currentIndex + 1) % images.length;
        rotateTo(newIndex);
      }
    }
  });
} 