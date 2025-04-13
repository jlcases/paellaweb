---
layout: docs-sidebar
title: Getting started with PAELLADOC
permalink: /docs/getting-started/
---

# Getting Started with PAELLADOC

Welcome to PAELLADOC! This guide will walk you through the initial setup and basic usage of this powerful development exoskeleton.

## Requirements

- **Cursor IDE 0.47+** - PAELLADOC is designed to work with Cursor IDE
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

## First Steps

1. **Initialize a new project:**
   ```bash
   PAELLA your-project-name
   ```
   This will start an interactive conversation to create your project documentation.

2. **Continue working on an existing project:**
   ```bash
   CONTINUE your-project-name
   ```
   This will pick up where you left off with your documentation.

3. **Generate code from documentation:**
   ```bash
   GENERATE_CODE your-project-name
   ```
   This will create code based on your completed documentation.

## Core Concepts

### MECE Documentation Structure

PAELLADOC is built on the MECE principle (Mutually Exclusive, Collectively Exhaustive):
- **Mutually Exclusive:** Each piece of context has its specific place
- **Collectively Exhaustive:** Nothing important is left out
- **Context Preservation:** All documentation maintains critical context

### Command System

PAELLADOC uses intuitive commands to manage your development process:

| Command | Description | Example |
|---------|-------------|---------|
| `PAELLA` | Start new documentation project | `PAELLA new-product` |
| `CONTINUE` | Continue existing documentation | `CONTINUE new-product` |
| `GENERATE_CODE` | Generate code from documentation | `GENERATE_CODE new-product` |
| `STORY` | Manage user stories | `STORY operation="create" title="User login"` |
| `SPRINT` | Manage sprints | `SPRINT operation="plan" name="Sprint 1"` |
| `MEETING` | Manage meeting notes | `MEETING operation="create" title="Planning"` |

### Modular Architecture

PAELLADOC's architecture is organized into:
- **Core Commands:** Basic functionality for documentation
- **Feature Modules:** Specialized capabilities for different aspects
- **Templates:** Pre-defined structures for various document types
- **Project Memory:** Persistent storage of project context

## Next Steps

- Learn more about [PAELLADOC's Philosophy](/blog/ai-first-development-principles/)
- Explore [Templates and Workflows](/docs/templates/)
- Understand [Context Preservation](/blog/paelladoc-revolution-ai-first-development/)

For detailed information, visit the [PAELLADOC GitHub repository](https://github.com/jlcases/paelladoc).