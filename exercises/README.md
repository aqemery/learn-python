# Exercise Files

This directory contains exercise configurations for the Python course. Each exercise is a **folder** with separate files for code, making editing easy with proper syntax highlighting!

## Directory Structure

```
exercises/
├── basics/
│   ├── print-exercise/
│   │   ├── config.json       # Exercise configuration
│   │   ├── default.py         # Starting code in editor
│   │   ├── validation.py      # Python validation code
│   │   └── check.js          # JavaScript code checks
│   ├── comment-exercise/
│   │   ├── config.json
│   │   ├── default.py
│   │   ├── validation.py
│   │   └── check.js
│   └── variables-exercise/
│       ├── config.json
│       ├── default.py
│       ├── prerun.py         # Setup code
│       └── validation.py
├── control_flow/
├── functions/
└── ...
```

## Exercise Folder Structure

Each exercise folder can contain these files:

### 1. `config.json` (required)
Basic configuration for the exercise:
```json
{
  "title": "Exercise Title"
}
```

### 2. `default.py` (required)
The starting code shown in the editor. This is a **Python file** with proper syntax highlighting!
```python
# This is your starting code
print("Hello, World!")
```

### 3. `validation.py` (optional)
Python code that validates the student's solution. Must set a `status` dictionary.

**Important:** The special variable `_output` is automatically available and contains a list of all lines printed by the student's code.

```python
# _output is automatically available - it's a list of printed strings
status = {"done": True, "message": "Great job!"}
if "Hello" not in _output:
  status["done"] = False
  status["message"] = "Did you print Hello?"
status
```

### 4. `prerun.py` (optional)
Python code that runs **before** the student's code. Useful for setup:
```python
# Set up variables for the student
existing_variable = "original value"
_pre_globals = set(globals())
```

### 5. `check.js` (optional)
JavaScript function body for instant feedback (runs before execution):
```javascript
if (!code.includes('def')) {
  return 'Remember to define a function!'
}
```

## Using Exercises in MDX

In your lesson MDX file, use the `<Exercise>` component:

```mdx
### Exercise

Try to print "Hello, World!"

<Exercise src="basics/print-exercise" />
```

The `src` prop is the path relative to the `exercises/` directory.

## Validation Examples

### Basic Validation

Check if the output contains specific text:

```json
{
  "validation": "status = {\"done\": False, \"message\": \"Try again!\"}\nif \"Hello\" in _output:\n  status[\"done\"] = True\n  status[\"message\"] = \"Great job!\"\nstatus"
}
```

### Check Variable Creation

```json
{
  "preRunCode": "_pre_globals = set(globals())",
  "validation": "status = {\"done\": True, \"message\": \"Nice!\"}\n_post_globals = set(globals())\nnew_vars = _post_globals - _pre_globals\nif 'my_var' not in new_vars:\n  status[\"done\"] = False\n  status[\"message\"] = 'Did you create my_var?'\nstatus"
}
```

### JavaScript Code Checking

Provide hints before running the code:

```json
{
  "checkCode": "if (!code.includes('def')) {\n  return 'Remember to define a function!'\n}\nif (code.includes('print(123)')) {\n  return 'Try printing without quotes!'\n}"
}
```

## Tips for Writing Exercises

1. **Keep validation Python simple**: Students may see errors, so make it readable
2. **Escape quotes**: In JSON, use `\"` for quotes inside strings
3. **Use newlines**: Use `\n` in strings for multi-line code
4. **Test thoroughly**: Load the exercise and try various solutions
5. **Provide helpful messages**: Guide students when they make mistakes
6. **Use _output**: The special `_output` variable contains what the student printed (as a list of strings)

## Special Variables

### In `validation.py`:
- **`_output`**: List of strings printed by the student's code (automatically available)
  - Example: `["Hello\n", "World\n"]`
  - Each element includes the newline character (`\n`)
- Any variables set in `prerun.py` are also available

### In student's code:
- Any variables set in `prerun.py` are available
- The `print()` function is wrapped to capture output for validation

## Common Patterns

### Check Output Length
```python
# _output is automatically available
if len(_output) != 3:
  status["message"] = "You should print exactly 3 lines"
```

### Check Variable Types
```python
if type(my_var) != int:
  status["message"] = "my_var should be an integer"
```

### Check Function Exists
```python
if 'my_function' not in dir():
  status["message"] = "Did you define my_function?"
```

## Editing Workflow

1. Navigate to the exercise folder (e.g., `exercises/basics/print-exercise/`)
2. Edit the appropriate file:
   - `default.py` - Change the starting code (with Python syntax highlighting!)
   - `validation.py` - Modify validation logic (with Python syntax highlighting!)
   - `check.js` - Update instant feedback (with JavaScript syntax highlighting!)
   - `config.json` - Change title or other settings
3. Save the file
4. Reload the page - changes appear immediately in dev mode!

**No need to touch the MDX files or restart the server!**

### Why Folders?

- ✅ **Syntax highlighting** in your editor
- ✅ **Proper indentation** preserved
- ✅ **Easier to read** and edit
- ✅ **No escaping** quotes or newlines
- ✅ **Version control friendly** - see actual code diffs
