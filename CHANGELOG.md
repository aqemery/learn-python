# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2025-01-07

### Added
- GitHub Actions workflow for automated deployment to GitHub Pages
- Exercise folder structure for easier content editing (34 exercises migrated)
- `Exercise` component to load exercises from separate files
- Contributing guidelines (CONTRIBUTING.md)
- Deployment documentation (DEPLOYMENT.md)
- Exercise migration guide (EXERCISE_MIGRATION_GUIDE.md)
- `.nojekyll` file for GitHub Pages compatibility
- Raw-loader for importing Python and JavaScript files as text

### Changed
- Updated Next.js from 13.0.2 to 15.1.8
- Updated React from 18.2.0 to 18.3.1
- Updated MDX from v2 to v3
- Updated Shiki from 0.11.1 to 3.21.0
- Updated Tailwind CSS from 3.2.4 to 3.4.19
- Updated Pyodide from 0.22.1 to 0.29.0 (Python 3.13.2)
- Migrated all 34 exercises from inline PyEditor to folder-based Exercise structure
- Exercises now stored in separate `.py` and `.js` files for easier editing
- Improved Pyodide initialization with proper browser-only loading
- Enhanced error handling in Python code execution
- Fixed code block styling with proper `pre` and `code` component mapping

### Fixed
- Shiki v3 API compatibility issues
- MDX v3 component mapping issues
- Pyodide bundling issues (now loaded from CDN)
- Validation code indentation issues from JSX templates
- Status object property access (changed from `.get()` to direct access)
- Unhandled promise rejection in code execution
- Server-side rendering issues with Pyodide initialization
- Output display in exercises

### Removed
- Pyodide npm package dependency (now loaded from CDN)
- Inline exercise code from MDX files

## Architecture Changes

### Exercise System Refactor
Exercises are now organized in a folder structure:
```
exercises/
├── lesson_name/
│   ├── exercise-name/
│   │   ├── config.json       # Exercise title and configuration
│   │   ├── default.py         # Starting code for students
│   │   ├── prerun.py          # Setup code (optional)
│   │   ├── validation.py      # Python validation (optional)
│   │   └── check.js           # JavaScript instant feedback (optional)
```

### Benefits
- Easier to edit exercises without dealing with JSX escaping
- Better syntax highlighting and linting in editors
- Cleaner version control diffs
- More maintainable codebase
- Simpler contribution process

## Dependencies Updated

### Major Updates
- Next.js 13 → 15 (static site generation improvements)
- React 18.2 → 18.3 (latest stable)
- MDX v2 → v3 (new JSX runtime)
- Shiki 0.11 → 3.21 (new highlighting API)
- Pyodide 0.22 → 0.29 (Python 3.12 → 3.13.2)

### Minor Updates
- Tailwind CSS 3.2 → 3.4
- @headlessui/react 1.7 → 2.2
- Monaco Editor (maintained at latest)

## Migration Notes

See EXERCISE_MIGRATION_GUIDE.md for details on how exercises were migrated.
