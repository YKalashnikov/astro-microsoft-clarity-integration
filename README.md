# Astro Clarity

Astro Clarity is a lightweight wrapper that seamlessly integrates Clarity analytics with Astro, making it effortless to track user interactions and performance metrics on your Astro-powered websites.

Supports Astro `^4`, `^5`, `^6`, and `^7`.

## Installation

### npm
```bash
npm install astro-microsoft-clarity-integration
```

### Yarn
```bash
yarn add astro-microsoft-clarity-integration
```

### pnpm
```bash
pnpm add astro-microsoft-clarity-integration
```

## Usage

```ts
// astro.config.mjs (or .ts if you're using TypeScript)
import { defineConfig } from 'astro/config';
import clarityIntegration from 'astro-microsoft-clarity-integration';

export default defineConfig({
  integrations: [
    clarityIntegration({
      projectId: 'YOUR_TRACKING_ID',
      enabled: import.meta.env.PROD,
      scriptStage: 'head-inline',
      debug: false,
      async: true,
      defer: false,
      customAttrs: {
        region: 'us',
      },
    }),
  ],
});
```

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `projectId` | `string` | required | Your Microsoft Clarity project ID. The integration throws during config setup if this is missing. |
| `enabled` | `boolean` | `true` | Enables or disables script injection. Useful for disabling analytics in development or preview environments. |
| `scriptStage` | `InjectedScriptStage` | `'head-inline'` | Controls where Astro injects the script. |
| `debug` | `boolean` | `false` | Logs the Clarity project ID in the browser console when the script is injected. |
| `async` | `boolean` | `true` | Sets the script element's `async` attribute. |
| `defer` | `boolean` | `false` | Sets the script element's `defer` attribute. |
| `customAttrs` | `Record<string, string>` | `{}` | Adds `data-*` attributes to the injected Clarity script tag. |

## Notes

- `enabled: import.meta.env.PROD` is a good default if you only want analytics in production.
- `projectId` is required. The integration now fails fast during Astro config setup instead of injecting a broken script.
- Published releases are pushed to npm when a GitHub release is marked as published.
