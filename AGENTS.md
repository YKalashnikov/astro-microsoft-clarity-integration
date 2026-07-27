# AI Agent Guide

## Project purpose

This repository publishes `astro-microsoft-clarity-integration`, a small TypeScript Astro integration that injects the Microsoft Clarity browser snippet at Astro config time.

## Repository map

- `index.ts`: complete public API and integration implementation
- `dist/`: generated JavaScript and TypeScript declarations; tracked and included in the npm package
- `README.md`: package usage and option reference
- `CONTRIBUTING.md`: contributor workflow and PR standards
- `package.json`: package exports, compatibility, scripts, and dependencies
- `.github/workflows/ci.yml`: pull-request validation
- `.github/workflows/npm-publish.yml`: npm publishing after a GitHub release is published

## Technical constraints

- The package is ESM and exports a default integration function plus the `ClarityOptions` type.
- Astro `^4`, `^5`, `^6`, and `^7` are supported through a peer dependency.
- Node.js `^20.19.0` or `>=22.12.0` and pnpm 9 are the development baseline.
- `enabled: false` must skip injection and must not reject an empty project ID.
- Defaults are part of the public behavior: `head-inline`, `async: true`, `defer: false`, and no custom attributes.
- Values placed in the generated browser script must be safely serialized. Do not concatenate raw user-controlled values.
- `customAttrs` keys become `data-*` attributes; an existing `data-` prefix is normalized.
- Keep the implementation dependency-free unless a dependency has a clear package-size and maintenance justification.

## Working instructions

1. Read `README.md`, `CONTRIBUTING.md`, `package.json`, and `index.ts` before changing behavior.
2. Preserve unrelated user changes and keep the patch narrowly scoped.
3. Update documentation for any public option, default, compatibility, or behavioral change.
4. Run:

   ```bash
   pnpm install --frozen-lockfile
   pnpm check
   pnpm build
   npm pack --dry-run
   ```

5. Inspect the generated `dist/` diff and commit it when source output changes.
6. Do not bump the package version or publish a release unless explicitly asked.

## Review priorities

Review script generation as security-sensitive. Check escaping, HTML/script termination risks, project ID validation, attribute normalization, disabled behavior, Astro hook compatibility, npm package contents, and source/generated-file consistency.

The repository currently has no automated behavioral test suite. For behavior changes, recommend or add focused tests around generated script content and hook calls rather than relying only on TypeScript compilation.
