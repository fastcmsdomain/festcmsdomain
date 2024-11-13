const STARS_CONFIG = {
  STAR_COUNT: 200,
  STAR_COLORS: ['#ffffff', '#ffe9c4', '#d4fbff'],
  STAR_MIN_SIZE: 1,
  STAR_MAX_SIZE: 3,
  ANIMATION_SPEED: 0.2,
  Z_LAYERS: 3,
  CONTENT: {
    TITLE: 'title',
    DESCRIPTION: 'description',
    BUTTONS: 'buttons'
  }
};

/**
 * Creates a single star element
 * @param {number} index - Star index for z-index calculation
 * @returns {HTMLElement} Star element
 */
function createStar(index) {
  const star = document.createElement('div');
  star.className = 'star';
  
  // Random position
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  
  // Random size
  const size = Math.random() * (STARS_CONFIG.STAR_MAX_SIZE - STARS_CONFIG.STAR_MIN_SIZE) 
    + STARS_CONFIG.STAR_MIN_SIZE;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  
  // Random color
  star.style.backgroundColor = STARS_CONFIG.STAR_COLORS[
    Math.floor(Math.random() * STARS_CONFIG.STAR_COLORS.length)
  ];
  
  // Z-layer for parallax effect
  const zLayer = Math.floor(index % STARS_CONFIG.Z_LAYERS) + 1;
  star.style.zIndex = zLayer;
  star.dataset.zlayer = zLayer;
  
  return star;
}

/**
 * Animates stars with parallax effect
 * @param {HTMLElement} wrapper - Stars wrapper element
 */
function animateStars(wrapper) {
  let previousScrollY = window.scrollY;
  
  function updateStarPositions() {
    const scrollDelta = window.scrollY - previousScrollY;
    const stars = wrapper.querySelectorAll('.star');
    
    stars.forEach((star) => {
      const zLayer = parseInt(star.dataset.zlayer, 10);
      const currentTop = parseFloat(star.style.top);
      const speed = STARS_CONFIG.ANIMATION_SPEED * zLayer;
      
      star.style.top = `${currentTop + (scrollDelta * speed * 0.1)}%`;
      
      // Wrap stars vertically
      if (currentTop > 100) {
        star.style.top = '-5%';
      } else if (currentTop < -5) {
        star.style.top = '100%';
      }
    });
    
    previousScrollY = window.scrollY;
    requestAnimationFrame(updateStarPositions);
  }
  
  requestAnimationFrame(updateStarPositions);
}

/**
 * Creates content overlay with golden styling
 * @param {HTMLElement} block - The block element
 * @returns {HTMLElement} Content wrapper element
 */
function createContentOverlay(block) {
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'stars-content';
  
  // Extract content from block rows
  const rows = block.querySelectorAll(':scope > div');
  const content = {
    title: '',
    description: '',
    buttons: []
  };
  
  rows.forEach((row) => {
    const cells = row.querySelectorAll('div');
    if (cells[0]) {
      const key = cells[0].textContent.toLowerCase();
      if (key === STARS_CONFIG.CONTENT.TITLE && cells[1]) {
        content.title = cells[1].textContent;
      } else if (key === STARS_CONFIG.CONTENT.DESCRIPTION && cells[1]) {
        content.description = cells[1].textContent;
      } else if (key === STARS_CONFIG.CONTENT.BUTTONS && cells[1]) {
        const links = cells[1].querySelectorAll('a');
        links.forEach((link) => {
          content.buttons.push(link.cloneNode(true));
        });
      }
    }
  });
  
  // Create and add title
  if (content.title) {
    const title = document.createElement('h1');
    title.className = 'stars-title';
    title.textContent = content.title;
    contentWrapper.appendChild(title);
  }
  
  // Create and add description
  if (content.description) {
    const description = document.createElement('p');
    description.className = 'stars-description';
    description.textContent = content.description;
    contentWrapper.appendChild(description);
  }
  
  // Create and add buttons
  if (content.buttons.length > 0) {
    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'stars-buttons';
    content.buttons.forEach((button) => {
      button.className = 'stars-button';
      buttonWrapper.appendChild(button);
    });
    contentWrapper.appendChild(buttonWrapper);
  }
  
  return contentWrapper;
}

/**
 * Decorates the stars block
 * @param {HTMLElement} block - The block element to decorate
 */
export default async function decorate(block) {
  // Create stars wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'stars-wrapper';
  
  // Create stars
  for (let i = 0; i < STARS_CONFIG.STAR_COUNT; i += 1) {
    wrapper.appendChild(createStar(i));
  }
  
  // Create content overlay
  const contentOverlay = createContentOverlay(block);
  
  // Clear original content and add elements
  block.textContent = '';
  block.appendChild(wrapper);
  block.appendChild(contentOverlay);
  
  // Start animation
  animateStars(wrapper);
} 