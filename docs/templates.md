---
layout: docs-sidebar
title: PAELLADOC template guide
permalink: /docs/templates/
---

# PAELLADOC Template Guide

This guide explains the structure and usage of PAELLADOC templates based on the [official repository](https://github.com/jlcases/paelladoc/tree/main/.cursor/rules/templates).

## Template Organization

PAELLADOC templates follow MECE principles (Mutually Exclusive, Collectively Exhaustive) and are organized into specific directories:

| Directory | Purpose | Types of Templates |
|-----------|---------|-------------------|
| `Product/` | Main product documentation templates | Project definition, market research, etc. |
| `simplified_templates/` | Simplified documentation | Quick tasks, bug reports, etc. |
| `conversation_flows/` | Conversation flow definitions | JSON files defining conversation structures |
| `coding_styles/` | Coding style guidelines | Frontend, backend, etc. |
| `github-workflows/` | Git workflow guidelines | GitHub Flow, GitFlow, etc. |
| `code_generation/` | Code generation templates | Component templates, etc. |
| `methodologies/` | Development methodologies | TDD, BDD, etc. |
| `product_management/` | Product management templates | User stories, etc. |
| `scripts/` | Template-related scripts | Utility scripts |
| `selectors/` | Template selection automation | Workflow and style selectors |

## Standard Template Structure

Most PAELLADOC templates follow a consistent structure to ensure all important information is captured in an organized manner:

### 1. CONTEXT Section

Defines the environment, purpose, and scope of the document:

```markdown
## CONTEXT

**Purpose:** [Description of the document's purpose]
**Scope:** [Boundaries and application scope]
**Target audience:** [Who will use this document]
```

### 2. DEPENDENCIES Section

Establishes relationships with other documents or system components:

```markdown
## DEPENDENCIES

**Related documents:**
- [Link to document 1]
- [Link to document 2]

**Related components:**
- [Component 1]
- [Component 2]
```

### 3. MAIN CONTENT Section

This section varies according to template type, but is always structured to capture specific information.

### 4. PROJECT MEMORY Section

Records decisions, issues, and achievements:

```markdown
## PROJECT MEMORY

**Decisions:**
- [Decision-ID] [Description]

**Identified issues:**
- [Issue-ID] [Description]

**Achievements:**
- [Achievement-ID] [Description]
```

## Key Template Categories

### Product Documentation Templates

Located in the `Product/` directory, these templates focus on high-level product documentation:

- **Market Research**: For analyzing competitors and market trends
- **User Needs Analysis**: For capturing user requirements
- **Product Vision**: For documenting the overall product vision and goals
- **Technical Architecture**: For documenting high-level architecture

### Technical Templates

Spread across several directories, these templates focus on technical documentation:

- **Architecture Decision Record (ADR)**: For documenting important architectural decisions
- **API Documentation**: For documenting programming interfaces
- **Component Design**: For specifying individual components
- **Technical Specification**: For detailed description of technical components

### Product Management Templates

Located in the `product_management/` directory:

- **User Stories**: For capturing user requirements in an agile format
- **Sprint Planning**: For planning specific development iterations
- **Product Roadmap**: For planning releases and features over time
- **Meeting Minutes**: For documenting meeting decisions and actions

### Code Generation Templates

Located in the `code_generation/` directory:

- **Component Template**: For generating code components
- **Service Template**: For generating service layers
- **Model Template**: For generating data models
- **Controller Template**: For generating controller code

## Template Variables

Templates use variables that are automatically replaced during document generation:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{project_name}}` | Project name | "PAELLADOC" |
| `{{date}}` | Current date | "2025-04-15" |
| `{{author}}` | Document author | "José Luis Cases" |
| `{{version}}` | Document version | "1.0" |
| `{{status}}` | Document status | "Draft" |
| `{{last_updated}}` | Last update | "2025-04-15" |

## Usage Example: Architecture Decision Record (ADR)

```markdown
# ADR-{{adr_number}}: {{title}}

## CONTEXT

**Date:** {{date}}
**Status:** {{status}}
**Decision makers:** {{decision_makers}}

### Problem

{{problem_description}}

### Options Considered

{{options}}

## DECISION

**Chosen option:** {{selected_option}}

**Justification:** {{justification}}

## CONSEQUENCES

**Positive:**
{{positive_consequences}}

**Negative:**
{{negative_consequences}}

## PROJECT MEMORY

**Related decisions:**
{{related_decisions}}

**References:**
{{references}}
```

## Naming Conventions

1. Directory names: lowercase with hyphens for multi-word names
2. Template files: descriptive snake_case with appropriate extension
3. Supporting files: follow the convention of their respective type

## Best Practices

1. **Consistency**: Use the same structure for similar documents
2. **Atomicity**: Each document should have a single, well-defined purpose
3. **Traceability**: Maintain clear references between related documents
4. **Context**: Always include sufficient context to understand the document
5. **Updates**: Maintain a change log in each document

## Integration with PAELLADOC Commands

Templates integrate directly with PAELLADOC commands such as `PAELLA`, `DOCUMENT`, and `DESIGN`. When using these commands, the appropriate template is automatically selected based on the context and parameters.

For example, the `DOCUMENT ADR` command will use the Architecture Decision Record template from the appropriate template directory.