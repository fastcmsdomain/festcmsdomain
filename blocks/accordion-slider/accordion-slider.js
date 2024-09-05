export default function decorate(block) {
    const wrapper = block.closest('.accordion-slider-wrapper');
    const items = [...block.children];
    const slider = document.createElement('div');
    slider.className = 'accordion-slider-container';

    items.forEach((item, index) => {
        const slide = document.createElement('div');
        slide.className = 'accordion-slide';
        slide.dataset.index = index;

        const titleElement = document.createElement('div');
        titleElement.className = 'accordion-title';
        const contentElement = document.createElement('div');
        contentElement.className = 'accordion-content';

        // Check if item has children before accessing them
        if (item.children.length > 0) {
            titleElement.textContent = item.children[0].textContent || `Slide ${index + 1}`;
            
            if (item.children.length > 1) {
                contentElement.innerHTML = item.children[1].innerHTML || '';
            }
        } else {
            titleElement.textContent = `Slide ${index + 1}`;
        }

        const imagePlaceholder = document.createElement('div');
        imagePlaceholder.className = 'accordion-image-placeholder';

        slide.appendChild(titleElement);
        slide.appendChild(contentElement);
        slide.appendChild(imagePlaceholder);
        slider.appendChild(slide);

        titleElement.addEventListener('click', () => {
            const activeSlide = slider.querySelector('.accordion-slide.active');
            if (activeSlide && activeSlide !== slide) {
                activeSlide.classList.remove('active');
            }
            slide.classList.toggle('active');
            updateSliderPosition();
        });
    });

    // Clear the wrapper and append the new slider
    wrapper.innerHTML = '';
    wrapper.appendChild(slider);

    function updateSliderPosition() {
        const activeSlide = slider.querySelector('.accordion-slide.active');
        if (activeSlide) {
            const slideIndex = parseInt(activeSlide.dataset.index, 10);
            slider.style.transform = `translateX(-${slideIndex * 100}%)`;
        }
    }

    // Open the first slide by default
    const firstSlide = slider.querySelector('.accordion-slide');
    if (firstSlide) {
        firstSlide.classList.add('active');
        updateSliderPosition();
    }
}
