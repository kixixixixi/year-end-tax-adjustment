# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application built with TypeScript and React 19, configured for static export. The project appears to be a year-end tax adjustment tool based on the repository name. It uses pnpm as the package manager.

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm typecheck` - Run TypeScript type checking

## Architecture

The project follows Next.js 15 App Router structure:
- `app/` directory contains the main application code
- `app/layout.tsx` - Root layout component with Japanese locale
- `app/page.tsx` - Main page component (currently empty)
- Static export configuration in `next.config.js` with conditional basePath for production

## Key Configuration

- **Static Export**: Configured for static site generation with `output: "export"`
- **Production BasePath**: Uses `/package-name` in production environment
- **TypeScript**: Configured with strict mode disabled
- **ESLint**: Comprehensive setup with React, TypeScript, and accessibility plugins
- **Package Manager**: Uses pnpm (version 10.18.2)

## Development Notes

- The application is set up for Japanese locale (`lang="ja"`)
- Images are configured as unoptimized for static export
- ESLint ignores Next.js generated files and includes accessibility checks
- TypeScript strict mode is disabled in current configuration