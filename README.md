# Personal notes site

A small React + Vite personal website with three public areas: projects, thoughts, and things I've done.

## Run locally

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm preview
```

## GitHub Pages

The included GitHub Actions workflow builds the site and publishes the `dist` folder. Set the repository's Pages source to **GitHub Actions** once; pushes to `main` will then deploy automatically.
