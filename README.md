# Animated Save Button

A simple Lit web component that renders a plain button with text. This project demonstrates how to create a TypeScript-based web component with proper compilation setup.

## Features

- Plain button with "Save" text
- No animations, event listeners, or icons
- Built with Lit and TypeScript
- Clean, minimal styling

## Prerequisites

- Node.js (version 14 or higher)
- npm

## Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

## Development

### Compile TypeScript to JavaScript

To compile the TypeScript source code to JavaScript:

```bash
npm run build
```

This will:
- Compile `animated-save-button.ts` to `dist/animated-save-button.js`
- Generate type declarations in `dist/`
- Create source maps for debugging

### Watch Mode

For development, you can use watch mode to automatically recompile when files change:

```bash
npm run watch
```

This will:
- Watch for changes in TypeScript files
- Automatically recompile when changes are detected
- Keep the `dist/` folder up to date

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript once
- `npm run watch` - Compile TypeScript to JavaScript and watch for changes

## Usage

### In HTML

Include the compiled JavaScript file and use the custom element:

```html
<!DOCTYPE html>
<html>
<head>
    <script type="module" src="./dist/animated-save-button.js"></script>
</head>
<body>
    <animated-save-button></animated-save-button>
</body>
</html>
```

### Demo

Open `demo.html` in your browser to see the component in action.

## Project Structure

```
├── animated-save-button.ts    # TypeScript source
├── demo.html                  # Demo page
├── dist/                      # Compiled output (generated)
│   ├── animated-save-button.js
│   ├── animated-save-button.d.ts
│   └── animated-save-button.js.map
├── package.json               # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## TypeScript Configuration

The project uses a `tsconfig.json` with the following key settings:

- **Target**: ES2020 for modern browser support
- **Module**: ES2020 for ES modules
- **Output**: Compiled files go to `dist/` folder
- **Source Maps**: Enabled for debugging
- **Type Declarations**: Generated for better IDE support

## Customization

To modify the button:

1. Edit `animated-save-button.ts`
2. Run `npm run build` (or `npm run watch` for development)
3. The changes will be reflected in the compiled JavaScript

## Browser Support

This component works in all modern browsers that support:
- ES modules
- Custom elements
- Shadow DOM

## License

This project is open source and available under the MIT License. 