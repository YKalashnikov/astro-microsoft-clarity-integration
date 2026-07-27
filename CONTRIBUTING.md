# Contributing

Thanks for helping improve Astro Clarity. Keep changes focused, backwards-compatible where practical, and easy to review.

## Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- pnpm 9

## Local setup

1. Fork the repository and clone your fork.
2. Create a branch from the latest default branch:

   ```bash
   git switch -c fix/short-description
   ```

3. Install the locked dependencies:

   ```bash
   pnpm install --frozen-lockfile
   ```

4. Make your change.
5. Run the project checks:

   ```bash
   pnpm check
   pnpm build
   npm pack --dry-run
   ```

The generated `dist/` files are tracked and published. Commit them when the source output changes.

## Change guidelines

- Keep the public API typed and avoid breaking existing option defaults.
- Never interpolate unescaped user input into the injected browser script. Use serialization such as `JSON.stringify`.
- Preserve the disabled behavior: `enabled: false` must not inject a script or require a project ID.
- Update `README.md` when options, supported Astro versions, defaults, or behavior change.
- Add or update tests when a test suite covers the changed behavior. If the repository has no applicable automated test yet, describe manual verification in the PR.
- Do not include unrelated formatting, generated files, editor settings, or dependency changes.

## Commits

Use a short, imperative subject. Conventional Commit prefixes are encouraged:

- `fix:` for bug fixes
- `feat:` for backwards-compatible features
- `docs:` for documentation
- `chore:` for maintenance
- `ci:` for workflow changes

Examples: `fix: validate whitespace-only project IDs` or `docs: clarify production setup`.

## Creating a pull request

1. Rebase or merge the latest default branch into your branch and resolve conflicts locally.
2. Review `git diff` and remove unrelated changes.
3. Run all validation commands listed above.
4. Push the branch to your fork.
5. Open a PR against the repository's default branch.
6. Complete the PR template with the problem, solution, test evidence, compatibility impact, and documentation changes.
7. Keep one concern per PR. Link an issue when one exists and respond to review comments with follow-up commits.

Do not manually change the package version for ordinary PRs unless a maintainer requests it. Releases are published from GitHub releases.

## Reporting security issues

Do not open a public issue for a suspected vulnerability involving secret exposure or unsafe script generation. Contact the repository owner privately through their GitHub profile instead.
