# Create Component

Create a new React component for the paulhume.co.uk project following the established codebase patterns.

## Input

The user will provide:
- **Component name** (in PascalCase, e.g. `StatusBadge`)
- **Description** of what the component should do
- **Props** the component should accept (optional - infer sensible props from the description)

If the user provides the component name as `$ARGUMENTS`, use that as the component name and ask for a description.

## File Structure

Every component MUST create exactly these files:

```
src/Components/{ComponentName}/
├── {ComponentName}.tsx          # Main component file
├── {ComponentName}.module.css   # CSS Module (only if styling is needed)
└── index.ts                     # Barrel export
```

Then update the root barrel export at `src/Components/index.ts` by adding:
```typescript
export * from './{ComponentName}';
```
Insert it in alphabetical order among the existing exports.

## Component Template (.tsx)

Follow this exact pattern:

```tsx
// 1. External library imports (React, MUI, etc.)
import { Typography } from '@mui/material';

// 2. Internal component imports (use 'Components' path alias)
import { TagBlock } from 'Components/TagBlock';

// 3. Local imports (CSS modules, local files)
import styles from './{ComponentName}.module.css';

// 4. Context/Hook imports (use path aliases: 'Context/', 'Hooks/', 'Utils/')
import { useUi } from 'Context/uiContext';

// 5. Props interface (always named {ComponentName}Props)
interface {ComponentName}Props {
  // Required props first, then optional
  title: string;
  className?: string;
}

// 6. Named export (NEVER default export)
export const {ComponentName} = ({ title, className }: {ComponentName}Props) => {
  return (
    <section className={`${styles.container} ${className || ''}`}>
      <Typography variant="body1">{title}</Typography>
    </section>
  );
};

// 7. Default props (only if needed)
{ComponentName}.defaultProps = {
  className: '',
};
```

## Index File Template (index.ts)

Always exactly:
```typescript
export * from './{ComponentName}';
```

## CSS Module Template (.module.css)

```css
.container {
  /* Main container styles */
}
```

Use kebab-case for CSS class names (e.g. `.action-area`, `.outer-container`).

## Key Rules

1. **Named exports only** - never use `export default`
2. **Functional components only** - use arrow function syntax
3. **TypeScript interfaces** - always define a `{ComponentName}Props` interface
4. **Path aliases** - use `Components`, `Context`, `Hooks`, `Utils` aliases for imports (not relative `../../` paths)
5. **CSS Modules** - use `.module.css` for scoped styles; use `styles['kebab-case']` for hyphenated class names
6. **Material-UI** - use MUI components (`Typography`, `Button`, etc.) for consistency with the design system
7. **Conditional rendering** - use `{condition && <Element />}` or ternary patterns
8. **Optional className prop** - most components should accept an optional `className` prop for composition
9. **No over-engineering** - keep components focused and minimal; only add what's described

## Styling Approach

- Use CSS Modules (`.module.css`) for component-specific styles
- Use MUI's `sx` prop sparingly for one-off style overrides
- Use MUI `Typography`, `Button`, and other MUI components for consistent theming
- Access the theme via `useUi()` context hook from `Context/uiContext` when needed
- Concatenate classNames with template literals: `` className={`${styles.container} ${className || ''}`} ``

## After Creating

1. Create all files for the component
2. Add the export to `src/Components/index.ts` in alphabetical order
3. Show the user the created files and explain how to use the component
