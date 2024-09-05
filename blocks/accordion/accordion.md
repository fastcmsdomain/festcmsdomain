
// Create README.md file in the accordion folder
const fs = require('fs');
const path = require('path');

const readmeContent = `# Accordion Block

## How to Use the Accordion Block

The Accordion block allows you to create collapsible content sections on your AEM page. Each accordion item consists of a title and content that can be expanded or collapsed.

### Usage in Google Drive

1. Open your content document in Google Drive.
2. Create a two-column table for each accordion item:
   - First column: Accordion item title
   - Second column: Accordion item content
3. Repeat step 2 for each accordion item you want to create.
4. Add the following metadata at the end of your document:

   Style: accordion

### Example

| Accordion Item 1 Title | Accordion Item 1 Content |
|------------------------|--------------------------|
| Accordion Item 2 Title | Accordion Item 2 Content |
| Accordion Item 3 Title | Accordion Item 3 Content |

Style: accordion

## Implementation Details

The accordion functionality is implemented in \`accordion.js\` and styled in \`accordion.css\`. The JavaScript file handles the creation of the accordion structure and manages the expand/collapse behavior.

For more information on creating and customizing blocks in AEM, refer to the official AEM documentation.`;

const readmePath = path.join(__dirname, 'README.md');
fs.writeFileSync(readmePath, readmeContent);

console.log('README.md file created in the accordion folder.');