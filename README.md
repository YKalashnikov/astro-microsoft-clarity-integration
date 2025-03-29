# Astro Clarity

Astro Clarity is a lightweight wrapper that seamlessly integrates Clarity analytics with Astro, making it effortless to track user interactions and performance metrics on your Astro-powered websites.

## Installation

### npm
```bash
npm install astro-microsoft-clarity
```

### Yarn
```bash
yarn add astro-microsoft-clarity
```

### pnpm
```bash
pnpm add astro-microsoft-clarity
```

## Usage

```js
// astro.config.mjs (or .ts if you're using TypeScript)
import { defineConfig } from 'astro/config';
import clarityIntegration from 'astro-microsoft-clarity'; // Imported from an npm package

export default defineConfig({
  integrations: [
    clarityIntegration({
      projectId: 'YOUR_TRACKING_ID',  // Required: Replace with your Clarity project ID
      enabled: true,                  // Optional: Enable the integration (defaults to true)
      scriptStage: 'head-inline',     // Optional: Set scriptStage to 'head-inline', 'body-inline'
      debug: false,                   // Optional: Enable debug (set to true if you want to log script injections)
      async: true,                    // Optional: Enable async loading
      defer: true,                    // Optional: Enable defer for script loading
    }),
  ],
});

```