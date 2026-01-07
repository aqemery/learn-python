# Contributing to Learn Python

Thank you for your interest in contributing to this interactive Python course! This guide will help you understand how to edit content, add new lessons, and contribute effectively.

## Table of Contents

- [Getting Started](#getting-started)
- [Editing Course Content](#editing-course-content)
- [Adding a New Lesson](#adding-a-new-lesson)
- [Using Interactive Components](#using-interactive-components)
- [Code Style Guidelines](#code-style-guidelines)
- [Submitting Changes](#submitting-changes)

## Getting Started

1. Fork this repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/learn-python.git
   cd learn-python
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a new branch for your changes:
   ```bash
   git checkout -b improve-basics-lesson
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open http://localhost:3000 to see your changes live

## Editing Course Content

All course content is located in `src/pages/` as `.mdx` files. MDX is Markdown with the ability to include React components.

### File Structure

Each lesson file follows this structure:

```mdx
import { HeroPattern } from '@/components/HeroPattern'
import { Heading } from '@/components/Heading'
import { PyEditor } from '@/components/Editor'

export const description = 'Brief lesson description'

export const sections = [
  { title: 'Section Name', id: 'section-id' },
  // ... more sections
]

<HeroPattern />

# Lesson Title

Lesson introduction goes here...

<Heading level={2} id="section-id" />
## Section Name {{ anchor: false }}

Section content...
```

### Basic Markdown Syntax

- **Headings**: Use `#` for main title, `##` for sections
- **Bold**: `**bold text**`
- **Italic**: `*italic text*`
- **Code inline**: `` `print("hello")` ``
- **Code blocks**: Use triple backticks with language:
  ````markdown
  ```python
  def hello():
      print("Hello, World!")
  ```
  ````
- **Lists**: Use `-` or `1.` for bullets/numbers
- **Links**: `[link text](https://example.com)`

### Code Examples with Tabs

Use `<CodeGroup>` to show multiple related examples:

```mdx
<CodeGroup>

```python {{ title: 'Example 1'}}
x = 5
print(x)
```

```python {{ title: 'Example 2'}}
y = 10
print(y)
```

</CodeGroup>
```

### Adding Notes and Callouts

Use `<Note>` for important information:

```mdx
<Note>
This is an important note that learners should pay attention to.
</Note>
```

## Adding a New Lesson

To add a completely new lesson to the course:

1. **Create a new MDX file** in `src/pages/`:
   ```bash
   touch src/pages/your_lesson.mdx
   ```

2. **Copy the template structure** from an existing lesson like `basics.mdx`

3. **Update the navigation** in `src/components/Navigation.jsx`:
   ```jsx
   {
     title: 'Your Lesson Title',
     links: [
       { title: 'Introduction', href: '/your_lesson' },
       { title: 'Section 1', href: '/your_lesson#section-1' },
       // ... more sections
     ],
   }
   ```

4. **Write your content** following the existing patterns

5. **Test thoroughly** - make sure all links work and code runs correctly

## Using Interactive Components

### PyEditor - Interactive Python Code Editor

The `<PyEditor>` component lets learners run Python code in their browser:

```mdx
<PyEditor>
{`def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`}
</PyEditor>
```

**Best practices:**
- Keep examples focused and simple
- Include helpful starter code
- Test that code runs without errors
- Consider edge cases learners might try

### Properties Component

Use `<Properties>` to document parameters, attributes, etc.:

```mdx
<Properties>
  <Property name="parameter_name" type="string">
    Description of the parameter
  </Property>
  <Property name="another_param" type="int">
    Another description
  </Property>
</Properties>
```

## Code Style Guidelines

### Content Writing

- **Clear and concise**: Use simple language
- **Progressive difficulty**: Build on previous concepts
- **Examples first**: Show before explaining
- **Practical focus**: Real-world examples when possible
- **Consistent terminology**: Use the same terms throughout

### Python Code Examples

- Follow PEP 8 style guide
- Use meaningful variable names
- Include comments for complex logic
- Keep examples short (5-15 lines ideal)
- Test all code examples

### Formatting

- Use consistent heading levels
- One blank line between paragraphs
- Two blank lines before major sections
- Indent code blocks properly
- Use backticks for inline code

## Submitting Changes

1. **Test your changes**:
   ```bash
   npm run dev
   # Check that everything looks correct
   npm run build
   # Ensure the build succeeds
   ```

2. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Improve basics lesson with more examples"
   ```

3. **Push to your fork**:
   ```bash
   git push origin improve-basics-lesson
   ```

4. **Open a Pull Request** on GitHub:
   - Describe what you changed and why
   - Reference any related issues
   - Include screenshots if you changed UI/layout

### Pull Request Guidelines

- **One topic per PR**: Don't mix unrelated changes
- **Clear description**: Explain what and why
- **Test builds**: Ensure `npm run build` succeeds
- **Check formatting**: Run `npm run lint` if available
- **Be responsive**: Address review feedback promptly

## Questions or Issues?

- **Found a bug?** Open an issue on GitHub
- **Have a question?** Start a discussion or comment on an issue
- **Unsure about something?** Ask in your pull request

## Thank You!

Your contributions help make programming education more accessible. Every improvement, no matter how small, makes a difference!
