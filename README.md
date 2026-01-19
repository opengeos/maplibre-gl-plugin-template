# MapLibre GL Plugin Template

A template for creating MapLibre GL JS plugins with TypeScript and React support.

[![npm version](https://img.shields.io/npm/v/maplibre-gl-plugin-template.svg)](https://www.npmjs.com/package/maplibre-gl-plugin-template)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?logo=codesandbox)](https://codesandbox.io/p/github/opengeos/maplibre-gl-plugin-template)
[![Open in StackBlitz](https://img.shields.io/badge/Open%20in-StackBlitz-blue?logo=stackblitz)](https://stackblitz.com/github/opengeos/maplibre-gl-plugin-template)

## Features

- **TypeScript Support** - Full TypeScript support with type definitions
- **React Integration** - React wrapper component and custom hooks
- **IControl Implementation** - Implements MapLibre's IControl interface
- **Modern Build Setup** - Vite-based build with dual ESM/CJS output
- **Testing** - Vitest setup with React Testing Library
- **CI/CD Ready** - GitHub Actions for npm publishing and GitHub Pages

## Installation

```bash
npm install maplibre-gl-plugin-template
```

## Quick Start

### Vanilla JavaScript/TypeScript

```typescript
import maplibregl from 'maplibre-gl';
import { PluginControl } from 'maplibre-gl-plugin-template';
import 'maplibre-gl-plugin-template/style.css';

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://demotiles.maplibre.org/style.json',
  center: [0, 0],
  zoom: 2,
});

map.on('load', () => {
  const control = new PluginControl({
    title: 'My Plugin',
    collapsed: false,
    panelWidth: 300,
  });

  map.addControl(control, 'top-right');
});
```

### React

```tsx
import { useEffect, useRef, useState } from 'react';
import maplibregl, { Map } from 'maplibre-gl';
import { PluginControlReact, usePluginState } from 'maplibre-gl-plugin-template/react';
import 'maplibre-gl-plugin-template/style.css';

function App() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const { state, toggle } = usePluginState();

  useEffect(() => {
    if (!mapContainer.current) return;

    const mapInstance = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [0, 0],
      zoom: 2,
    });

    mapInstance.on('load', () => setMap(mapInstance));

    return () => mapInstance.remove();
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      {map && (
        <PluginControlReact
          map={map}
          title="My Plugin"
          collapsed={state.collapsed}
          onStateChange={(newState) => console.log(newState)}
        />
      )}
    </div>
  );
}
```

## API

### PluginControl

The main control class implementing MapLibre's `IControl` interface.

#### Constructor Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `collapsed` | `boolean` | `true` | Whether the panel starts collapsed (showing only the 29x29 toggle button) |
| `position` | `string` | `'top-right'` | Control position on the map |
| `title` | `string` | `'Plugin Control'` | Title displayed in the header |
| `panelWidth` | `number` | `300` | Width of the dropdown panel in pixels |
| `className` | `string` | `''` | Custom CSS class name |

#### Methods

- `toggle()` - Toggle the collapsed state
- `expand()` - Expand the panel
- `collapse()` - Collapse the panel
- `getState()` - Get the current state
- `setState(state)` - Update the state
- `on(event, handler)` - Register an event handler
- `off(event, handler)` - Remove an event handler
- `getMap()` - Get the map instance
- `getContainer()` - Get the container element

#### Events

- `collapse` - Fired when the panel is collapsed
- `expand` - Fired when the panel is expanded
- `statechange` - Fired when the state changes

### PluginControlReact

React wrapper component for `PluginControl`.

#### Props

All `PluginControl` options plus:

| Prop | Type | Description |
|------|------|-------------|
| `map` | `Map` | MapLibre GL map instance (required) |
| `onStateChange` | `function` | Callback fired when state changes |

### usePluginState

Custom React hook for managing plugin state.

```typescript
const {
  state,        // Current state
  setState,     // Update entire state
  setCollapsed, // Set collapsed state
  setPanelWidth,// Set panel width
  setData,      // Set custom data
  reset,        // Reset to initial state
  toggle,       // Toggle collapsed state
} = usePluginState(initialState);
```

## Utilities

The package exports several utility functions:

- `clamp(value, min, max)` - Clamp a value between min and max
- `formatNumericValue(value, step)` - Format a number with appropriate decimals
- `generateId(prefix?)` - Generate a unique ID
- `debounce(fn, delay)` - Debounce a function
- `throttle(fn, limit)` - Throttle a function
- `classNames(classes)` - Build a class string from an object

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/maplibre-gl-plugin-template.git
cd maplibre-gl-plugin-template

# Install dependencies
npm install

# Start development server
npm run dev
```

### Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build the library |
| `npm run build:examples` | Build examples for deployment |
| `npm run test` | Run tests |
| `npm run test:ui` | Run tests with UI |
| `npm run test:coverage` | Run tests with coverage |
| `npm run lint` | Lint the code |
| `npm run format` | Format the code |

### Project Structure

```
maplibre-gl-plugin-template/
├── src/
│   ├── index.ts              # Main entry point
│   ├── react.ts              # React entry point
│   ├── index.css             # Root styles
│   └── lib/
│       ├── core/             # Core classes and types
│       ├── hooks/            # React hooks
│       ├── utils/            # Utility functions
│       └── styles/           # Component styles
├── tests/                    # Test files
├── examples/                 # Example applications
│   ├── basic/               # Vanilla JS example
│   └── react/               # React example
└── .github/workflows/        # CI/CD workflows
```

## Docker

The examples can be run using Docker. The image is automatically built and published to GitHub Container Registry.

### Pull and Run

```bash
# Pull the latest image
docker pull ghcr.io/opengeos/maplibre-gl-plugin-template:latest

# Run the container
docker run -p 8080:80 ghcr.io/opengeos/maplibre-gl-plugin-template:latest
```

Then open http://localhost:8080/maplibre-gl-plugin-template/ in your browser to view the examples.

### Build Locally

```bash
# Build the image
docker build -t maplibre-gl-plugin-template .

# Run the container
docker run -p 8080:80 maplibre-gl-plugin-template
```

### Available Tags

| Tag | Description |
|-----|-------------|
| `latest` | Latest release |
| `x.y.z` | Specific version (e.g., `1.0.0`) |
| `x.y` | Minor version (e.g., `1.0`) |

## Customization

To use this template for your own plugin:

1. Clone or fork this repository
2. Update `package.json` with your plugin name and details
3. Modify `src/lib/core/PluginControl.ts` to implement your plugin logic
4. Update the styles in `src/lib/styles/plugin-control.css`
5. Add custom utilities, hooks, or components as needed
6. Update the README with your plugin's documentation

## License

MIT License - see [LICENSE](LICENSE) for details.
