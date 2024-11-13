# Imagecycle Block

A Franklin block that creates an auto-rotating image carousel with manual navigation controls.

## Features

- Automatic image rotation every 5 seconds
- Pause on hover
- Keyboard navigation (left/right arrow keys)
- Navigation dots
- Randomized initial image order
- Accessible controls
- Responsive design

## Usage

| Imagecycle |
|------------|
| ![Image 1](path/to/image1.jpg) |
| ![Image 2](path/to/image2.jpg) |
| ![Image 3](path/to/image3.jpg) |

## Configuration

### CSS Variables

- `--dot-size`: Size of navigation dots (default: 12px)
- `--dot-spacing`: Spacing between dots (default: 8px)
- `--dot-color`: Color of inactive dots (default: #666)
- `--dot-color-active`: Color of active dot (default: #000)

### JavaScript Configuration

- Rotation interval: 5 seconds
- Background color: Light blue (#e6f3ff)

## Accessibility

- Keyboard navigation support
- ARIA labels on navigation controls
- Focus indicators for interactive elements
- Screen reader friendly structure

## Performance

- Lazy loading of images
- Minimal DOM manipulation
- Efficient event handling
- Optimized animation performance 