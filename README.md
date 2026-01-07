# Learn Python - Interactive Course

An open-source, interactive Python programming course with in-browser code execution. This course covers Python fundamentals from basics to advanced topics, featuring an integrated code editor powered by Pyodide.

## Features

- **Interactive Code Editor**: Run Python code directly in your browser using Pyodide
- **Comprehensive Content**: Covers basics, control flow, data structures, functions, classes, and more
- **Modern UI**: Built with Next.js, Tailwind CSS, and MDX for easy content editing
- **Progressive Learning**: Structured lessons that build on each other

## Course Contents

1. **Basics** - Data types, variables, and printing
2. **Operators & Expressions** - Working with data
3. **Control Flow** - if/else, loops, and logic
4. **Functions** - Defining and using functions
5. **Data Structures** - Lists, tuples, dictionaries, and sets
6. **Modules** - Organizing and importing code
7. **Built-in Functions** - Common Python utilities
8. **Classes** - Object-oriented programming
9. **Exceptions** - Error handling
10. **Wrap Up** - Practice exercises and next steps

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/aqemery/learn-python.git
cd learn-python
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

The site will auto-reload as you edit files.

## Contributing

Contributions are welcome! This is an open-source educational project. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to:

- Edit course content
- Add new lessons
- Fix bugs or improve the UI
- Submit pull requests

## Content Editing

All course content is written in MDX (Markdown + JSX) and located in `src/pages/`. To edit a lesson:

1. Open the corresponding `.mdx` file (e.g., `src/pages/basics.mdx`)
2. Edit the content using Markdown syntax
3. Save and see changes instantly in dev mode

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed editing guidelines.

## Deployment

This site is configured for deployment on GitHub Pages. On every push to the `main` branch, GitHub Actions automatically builds and deploys the site.

To deploy manually:
```bash
npm run build
```

The static site will be exported to the `out/` directory.

## Technology Stack

- [Next.js](https://nextjs.org) - React framework with static site generation
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [MDX](https://mdxjs.com/) - Markdown with JSX components
- [Pyodide](https://pyodide.org/) - Python runtime for the browser
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor (VS Code engine)
- [Framer Motion](https://www.framer.com/motion/) - Animation library

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Python runtime powered by [Pyodide](https://pyodide.org/)
- Code editor powered by [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- Syntax highlighting by [Shiki](https://shiki.style/)
