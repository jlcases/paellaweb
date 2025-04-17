---
layout: docs-sidebar
title: Getting started with PAELLADOC
permalink: /docs/getting-started/
---

# Getting Started with PAELLADOC

PAELLADOC is a powerful documentation system that adapts to your workflow and language preferences. This guide will show you how to use the PAELLA command for different documentation scenarios.

## ⚠️ Important: Enable Auto-run Mode (YOLO)

Before starting, you MUST enable auto-run mode (also known as YOLO mode) in Cursor settings:

{% include responsive-image.html path="/assets/images/yolo-mode.png" alt="YOLO mode settings in Cursor IDE" class="screenshot" %}

1. Open Cursor Settings
2. Go to Chat section
3. Check "Enable auto-run mode"
4. This allows PAELLADOC to:
   - Run commands automatically without confirmation
   - Create and modify files instantly
   - Provide a seamless documentation experience
   - Execute all necessary operations without interruption

Without YOLO mode enabled, PAELLADOC cannot function properly as it needs to:
- Create directory structures automatically
- Initialize and update .memory.json files
- Generate documentation templates on the fly
- Update files in real-time
- Execute commands without manual confirmation

💡 **Pro Tip**: YOLO mode is essential for PAELLADOC's automated workflow. It allows the system to work efficiently without requiring constant user confirmation for each operation.

## Requirements

- **Cursor IDE 0.47+** - PAELLADOC is designed to work with Cursor IDE
- **Auto-run Mode Enabled** - Required for automatic file operations
- **Node.js 14+** - Required for running scripts
- **Internet connection** - For research capabilities
- **Git** - For repository management

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jlcases/paelladoc.git
   ```

2. **Open with Cursor IDE:**
   Ensure you're using Cursor 0.47 or higher.

3. **That's it!** No additional setup required.

## Command Structure

### Basic Syntax
```bash
PAELLA [--path="path"] [--name="name"] [--lang="[language_code]"] [--type="api|lib|app"] [--start="entry_point"]
```

### Core Parameters

1. `--lang="[language_code]"` (Required First)
   - Documentation language (ISO 639-1 code)
   - Must be selected first
   - Supported languages:
     - 🇪🇸 es - Spanish (Español)
     - 🇬🇧 en - English
     - 🇫🇷 fr - French (Français)
     - 🇩🇪 de - German (Deutsch)
     - 🇷🇺 ru - Russian (Русский)
     - 🇨🇳 zh - Chinese (中文)
     - 🇯🇵 ja - Japanese (日本語)

2. `--path="path"`
   - Documentation location
   - Optional (defaults to ./docs)
   - Examples:
     ```bash
     --path="./docs"              # Standard location
     --path="/custom/path/docs"   # Custom location
     ```

3. `--name="name"`
   - Project name
   - Optional
   - Example: `--name="MyProject"`

4. `--type="api|lib|app"`
   - Project type
   - Optional
   - Values: "api", "lib", "app"
   - Determines base templates

5. `--start="entry_point"`
   - Documentation approach
   - Optional
   - Values:
     - "product" - Start with product documentation
     - "engineering" - Start with technical documentation
     - "existing" - Import existing documentation
     - "code" - Generate from codebase

## Use Cases

### 1. Product Documentation (PRD First)

```bash
# Basic product documentation
PAELLA --lang="es" --start="product" --name="MiProducto"

# With custom path and type
PAELLA --lang="en" --start="product" --name="MyProduct" --path="/docs/product" --type="app"
```

Creates:
- Product Requirements Document (PRD)
- User Stories
- Market Research Template
- Product Roadmap
- Feature Specifications

### 2. Technical Documentation

```bash
# API documentation
PAELLA --lang="en" --start="engineering" --type="api" --name="MyAPI"

# Library documentation
PAELLA --lang="de" --start="engineering" --type="lib" --name="MeinePaket"
```

Generates:
- Technical Architecture
- API/Library Specifications
- Development Guidelines
- Component Documentation
- Testing Strategy

### 3. Code-First Documentation

```bash
# From existing codebase
PAELLA --lang="en" --start="code" --code-path="/path/to/source" --type="api"

# With custom output
PAELLA --lang="fr" --start="code" --code-path="/src" --type="lib" --path="/docs/api"
```

Produces:
- Code Structure Analysis
- API/Component Documentation
- Setup Instructions
- Development Guides
- Dependency Documentation

### 4. Documentation Import

```bash
# Import and enhance
PAELLA --lang="es" --start="existing" --docs-path="/old/docs" --path="/new/docs"

# Import and translate
PAELLA --lang="de" --start="existing" --docs-path="/en/docs" --path="/de/docs"
```

Performs:
- Documentation Import
- Structure Analysis
- Gap Identification
- Content Enhancement
- Translation (if needed)

## Memory Management

PAELLADOC maintains a `.memory.json` file that tracks:
- Selected language
- Project information
- Documentation progress
- Created documents
- Translation status

## Best Practices

1. **Language Selection**
   - Always select language first
   - All interactions will be in chosen language
   - Can be changed later but requires re-initialization

2. **Project Structure**
   - Use recommended /docs directory when possible
   - Keep documentation with code for better versioning
   - Use custom paths for separate documentation management

3. **Documentation Flow**
   - Start with clear project purpose
   - Define target audience
   - Set concrete objectives
   - Choose appropriate templates
   - Iterate and improve

4. **Version Control**
   - Commit documentation with code
   - Use meaningful commit messages
   - Track documentation versions
   - Maintain change history

## Error Handling

PAELLADOC provides:
- Clear error messages
- Recovery suggestions
- Automatic rollback on failures
- Path validation
- Permission checks

## Advanced Features

1. **Multi-language Support**
   - Documentation in multiple languages
   - Automatic translation tracking
   - Language-specific templates
   - Cross-reference management

2. **Template Customization**
   - Modify existing templates
   - Create custom templates
   - Import template sets
   - Share templates across projects

3. **Integration Capabilities**
   - Code analysis integration
   - Version control hooks
   - CI/CD pipeline integration
   - Automated updates

## Next Steps

After initializing your documentation with PAELLA, you can:
1. Review generated documentation structure
2. Fill in the templates
3. Customize the documentation to your needs
4. Use version control to track changes
5. Set up continuous documentation updates

For more detailed information, check out:
- [Documentation Templates](./templates.md)
- [Advanced Configuration](./configuration.md)
- [Command Reference](./commands.md)

For detailed information, visit the [PAELLADOC GitHub repository](https://github.com/jlcases/paelladoc).