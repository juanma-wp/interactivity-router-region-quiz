# Interactive Router Regions Quiz

An interactive quiz WordPress block demonstrating client-side routing using the WordPress Interactivity API router functionality with regions.

## Overview

This plugin creates an interactive quiz block that leverages WordPress's Interactivity API to provide seamless client-side navigation between quiz questions without full page reloads. It demonstrates advanced use of router regions to maintain state and provide a smooth user experience.

## Features

- **Client-Side Routing**: Navigate between quiz questions without page refresh using `@wordpress/interactivity-router`
- **State Management**: Tracks visited questions and maintains quiz state across navigation
- **Router Regions**: Uses `data-wp-router-region` to update specific content areas dynamically
- **Random Question Selection**: Automatically selects random questions from a pool for each quiz session
- **Time Limit Support**: Configurable time limits for quiz completion
- **Visual Feedback**: Shows visited questions with different styling

## Technical Implementation

### Block Structure

The quiz block uses the following key components:

- **PHP Rendering** (`render.php`):
  - Generates random question selection server-side
  - Sets up initial state with `wp_interactivity_state()`
  - Creates router region for dynamic content updates

- **JavaScript View** (`view.js`):
  - Manages client-side state for visited questions
  - Handles navigation events with `withSyncEvent`
  - Updates UI based on quiz progress

### Key Directives Used

- `data-wp-interactive`: Establishes the interactive namespace
- `data-wp-router-region`: Defines content area for client-side updates
- `data-wp-watch`: Watches for changes and triggers callbacks
- `data-wp-on--click`: Handles click events for navigation
- `data-wp-bind--href`: Dynamically binds href attributes
- `data-wp-class--is-visited`: Conditionally applies CSS classes
- `data-wp-text`: Updates text content dynamically

## Installation

1. Clone or download this repository into your WordPress plugins directory:
   ```bash
   cd wp-content/plugins/
   git clone [repository-url] interactivity-router-region-quiz
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the block:
   ```bash
   npm run build
   ```

4. Activate the plugin in your WordPress admin panel

## Usage

1. Create quiz question pages (e.g., `/question-1`, `/question-2`, etc.)
2. Add the "Interactivity Router Region Quiz" block to your quiz page and question pages
3. Configure the time limit in the block settings
4. The block will automatically:
   - Select random questions from the pool
   - Track visited questions
   - Enable smooth navigation between questions

## Development

### Prerequisites

- WordPress 6.1 or higher
- PHP 7.0 or higher
- Node.js and npm

### Development Commands

```bash
# Install dependencies
npm install

# Start development build with watch mode
npm run start

# Create production build
npm run build

# Run linting
npm run lint

# Format code
npm run format
```

### Project Structure

```
interactivity-router-region-quiz/
├── build/                  # Compiled assets
│   └── quiz/
│       ├── block.json     # Block metadata
│       ├── render.php     # Server-side rendering
│       ├── view.js        # Client-side interactivity
│       └── style-index.css # Block styles
├── src/                    # Source files
│   └── quiz/
│       ├── edit.js        # Block editor interface
│       ├── index.js       # Block registration
│       ├── style.scss     # Block styles (source)
│       └── view.js        # Client-side logic (source)
├── plugin.php             # Main plugin file
├── package.json           # Node dependencies
└── README.md              # This file
```

## How It Works

1. **Initial Load**: When the quiz page loads, the PHP renderer selects random questions and initializes the state
2. **Navigation**: Clicking on question links triggers the Interactivity Router's `navigate` action
3. **Content Update**: Only the router region content updates, maintaining the rest of the page structure
4. **State Persistence**: The JavaScript state tracks visited questions across navigation
5. **Visual Feedback**: Visited questions are marked with a CSS class for styling

## Related Resources

- [WordPress Interactivity API Documentation](https://github.com/WordPress/gutenberg/tree/trunk/packages/interactivity/docs)
- [Interactivity API Examples](https://wordpress.github.io/block-development-examples?tags=interactivity-api)
- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [WordPress Interactivity Router Package](https://www.npmjs.com/package/@wordpress/interactivity-router)

## License

GPL-2.0-or-later

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Credits

Created as an example for the WordPress block development community.
