export default function decorate(block) {s
    const wrapper = block.closest('.accordion-slider-wrapper');
    const items = [...block.children];
    const slider = document.createElement('div');
    slider.className = 'accordion-slider-container';

    items.forEach((item, index) => {
        const [title, content] = item.children;
        const slide = document.createElement('div');
        slide.className = 'accordion-slide';
        slide.dataset.index = index;

        const titleElement = document.createElement('div');
        titleElement.className = 'accordion-title';
        titleElement.innerHTML = title.innerHTML;

        const contentElement = document.createElement('div');
        contentElement.className = 'accordion-content';
        contentElement.innerHTML = content.innerHTML;

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
    slider.querySelector('.accordion-slide').classList.add('active');
    updateSliderPosition();
}
