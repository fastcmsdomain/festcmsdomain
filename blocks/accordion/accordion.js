export default function decorate(block) {
  // Create accordion container
  const accordionContainer = document.createElement('div');
  accordionContainer.className = 'accordion-container';

  // Process each row as an accordion item
  [...block.children].forEach((row, index) => {
    const [titleCell, contentCell] = row.children;
    
    // Create accordion item
    const item = document.createElement('div');
    item.className = 'accordion-item';
    
    // Create title button
    const titleButton = document.createElement('button');
    titleButton.className = 'accordion-title';
    titleButton.innerHTML = titleCell.innerHTML;
    titleButton.setAttribute('aria-expanded', 'false');
    titleButton.setAttribute('aria-controls', `accordion-content-${index}`);
    
    // Create content div
    const content = document.createElement('div');
    content.className = 'accordion-content';
    content.id = `accordion-content-${index}`;
    content.innerHTML = contentCell.innerHTML;
    content.hidden = true;
    
    // Add click event to toggle accordion
    titleButton.addEventListener('click', () => {
      const isExpanded = titleButton.getAttribute('aria-expanded') === 'true';
      titleButton.setAttribute('aria-expanded', !isExpanded);
      content.hidden = isExpanded;
    });
    
    // Append elements to accordion item
    item.appendChild(titleButton);
    item.appendChild(content);
    
    // Add item to container
    accordionContainer.appendChild(item);
  });

  // Replace block content with accordion
  block.textContent = '';
  block.appendChild(accordionContainer);
}