# CLAUDE.md - Project Instructions

## Project Overview

This is a personal portfolio website (paulhume.co.uk) built with React, TypeScript, Material-UI, and Contentful CMS. It uses React Query for data fetching, CSS Modules for styling, and path aliases for clean imports.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI)
- **CMS**: Contentful
- **Data Fetching**: @tanstack/react-query
- **Styling**: CSS Modules (`.module.css`) + MUI theming
- **Build Tool**: Check package.json (likely Vite or CRA)

## Path Aliases

Always use these path aliases instead of relative paths:
- `Components` -> `src/Components`
- `Context` -> `src/Context`
- `Hooks` -> `src/Hooks`
- `Utils` -> `src/Utils`

## Component Architecture Agent

When creating, modifying, or reviewing components in this project, follow these architectural guidelines:

### Component Structure

Every component lives in `src/Components/{ComponentName}/` with:
- `{ComponentName}.tsx` - Main component (PascalCase, matches folder name)
- `{ComponentName}.module.css` - CSS Module (only when styling is needed)
- `index.ts` - Barrel export: `export * from './{ComponentName}';`

All components are re-exported from `src/Components/index.ts` in alphabetical order.

### Code Conventions

- **Named exports only** (never `export default`)
- **Arrow function components**: `export const MyComponent = (props) => { ... }`
- **Props interface**: Always define `{ComponentName}Props` interface
- **Import order**: External libs -> Internal components (path aliases) -> Local files -> Context/Hooks
- **Styling**: CSS Modules with kebab-case class names, MUI components for design consistency
- **State management**: Context API via custom hooks (`useUi`, `useTags`, etc.)
- **Server state**: React Query with `useQuery`
- **Optional className**: Most components accept `className?: string` for composition
- **Conditional rendering**: `{condition && <Element />}` pattern
- **Default props**: Use `ComponentName.defaultProps = { ... }` when needed

### Component Categories

- **Atoms**: Icon, Link, TagChip, ErrorAlert, NoDataAlert, LoadingSpinner
- **Layout**: Grid, Title, PageContentItem
- **Composite**: Card, JobCard, TagBlock, SkillsTable, RenderRichText
- **Feature**: ThemeToggleSwitch, CvDownloadButton, AvailableFrom, NavLink

### Custom Slash Commands

- `/project:create-component {Name}` - Scaffold a new component following all project conventions
