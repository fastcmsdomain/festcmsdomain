export default function decorate(block) {
  const accordionItems = block.querySelectorAll('.accordion-item');

  accordionItems.forEach((item) => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    const icon = item.querySelector('.accordion-icon');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all accordion items
      accordionItems.forEach((otherItem) => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.accordion-icon').textContent = '+';
      });

      // Toggle the clicked item
      if (!isActive) {
        item.classList.add('active');
        icon.textContent = '×';
      }
    });
  });
}