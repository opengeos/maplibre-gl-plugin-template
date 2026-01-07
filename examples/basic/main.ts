import maplibregl from 'maplibre-gl';
import { PluginControl } from '../../src/index';
import '../../src/index.css';
import 'maplibre-gl/dist/maplibre-gl.css';

// Create map
const map = new maplibregl.Map({
  container: 'map',
  style: 'https://demotiles.maplibre.org/style.json',
  center: [0, 0],
  zoom: 2,
});

// Add plugin control when map loads
map.on('load', () => {
  // Create the plugin control with custom options
  const pluginControl = new PluginControl({
    title: 'My Plugin',
    collapsed: false,
    panelWidth: 300,
  });

  // Add control to the map
  map.addControl(pluginControl, 'top-right');

  // Listen for state changes
  pluginControl.on('statechange', (event) => {
    console.log('Plugin state changed:', event.state);
  });

  pluginControl.on('collapse', () => {
    console.log('Plugin panel collapsed');
  });

  pluginControl.on('expand', () => {
    console.log('Plugin panel expanded');
  });

  console.log('Plugin control added to map');
});
