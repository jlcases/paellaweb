---
layout: docs
title: PAELLADOC command reference
permalink: /docs/commands/
---

# PAELLADOC Command Reference

This page provides a detailed reference for all available PAELLADOC commands, their arguments, and usage examples.

## Core Commands

### `PAELLA`

Initializes new documentation for a project.

**Syntax:**
```bash
PAELLA [project_name]
```

**Arguments:**
- `project_name`: Name of the project to document (required)

**Example:**
```bash
PAELLA my-new-project
```

**Returns:**
- Initiates an interactive conversation to set up project documentation
- Creates necessary folder structure for documentation
- Guides you through initial documentation setup

---

### `CONTINUE`

Continues working on an existing documentation project.

**Syntax:**
```bash
CONTINUE [project_name]
```

**Arguments:**
- `project_name`: Name of the existing project (required)

**Example:**
```bash
CONTINUE my-new-project
```

**Returns:**
- Resumes interactive documentation process
- Maintains previous context and memory
- Suggests next documentation steps

---

### `GENERATE_CODE`

Generates code based on your project documentation.

**Syntax:**
```bash
GENERATE_CODE [project_name]
```

**Arguments:**
- `project_name`: Name of the documented project (required)

**Example:**
```bash
GENERATE_CODE my-new-project
```

**Returns:**
- Code files generated from documentation
- Structure matching documented architecture
- Implementation of documented functionality

---

### `GENERATE_CONTEXT`

Extracts context from a repository.

**Syntax:**
```bash
GENERATE_CONTEXT repo_path=[path_to_repository] [options]
```

**Arguments:**
- `repo_path`: Path to the repository (required)
- `output`: Path where to save the extracted content (optional)
- `line_numbers`: Whether to include line numbers (optional)
- `style`: Output format - plain or xml (optional)
- `ignore`: Additional patterns to ignore (optional)

**Example:**
```bash
GENERATE_CONTEXT repo_path=/path/to/my-project
```

**Returns:**
- Extracted repository context suitable for documentation generation

---

### `GENERATE_DOC`

Generates documentation from repository context.

**Syntax:**
```bash
GENERATE_DOC repo_path=[path] language=[en|es] [options]
```

**Arguments:**
- `repo_path`: Path or GitHub URL to the repository (required)
- `language`: Language for documentation - "en" or "es" (required)
- `output`: Path for documentation output (optional)
- `template`: Documentation template to use (optional)
- `force_context_regeneration`: Force regeneration of context (optional)

**Example:**
```bash
GENERATE_DOC repo_path=https://github.com/username/repo language=en
```

**Returns:**
- Comprehensive documentation based on repo analysis
- Files saved to specified output directory
- Structured according to template preference

---

## Product Management Commands

### `STORY`

Manages user stories for your project.

**Syntax:**
```bash
STORY operation="[operation]" [arguments]
```

**Operations:**
- `create`: Creates a new user story
- `list`: Lists existing user stories
- `update`: Updates an existing user story
- `delete`: Deletes a user story
- `generate`: Generates user stories from requirements

**Arguments:**
- `title`: Title of the story (required for create/update)
- `description`: Description of the story (required for create/update)
- `priority`: Priority level (optional)
- `story_id`: ID of the story (required for update/delete)
- `from`: Source for generation (required for generate)
- `count`: Number of stories to generate (optional for generate)

**Example:**
```bash
STORY operation="create" title="User Authentication" description="As a user, I want to login with my credentials so that I can access my account."
```

**Returns:**
- Confirmation of the operation
- ID of the created/updated story
- List of stories for list operation

---

### `SPRINT`

Manages sprint planning and tracking.

**Syntax:**
```bash
SPRINT operation="[operation]" [arguments]
```

**Operations:**
- `plan`: Plans a new sprint
- `list`: Lists existing sprints
- `update`: Updates an existing sprint
- `close`: Closes a sprint
- `report`: Generates a sprint report

**Arguments:**
- `name`: Name of the sprint (required for plan/update)
- `start_date`: Start date of the sprint (required for plan)
- `end_date`: End date of the sprint (required for plan)
- `sprint_id`: ID of the sprint (required for update/close/report)
- `stories`: Story IDs to include (optional for plan/update)

**Example:**
```bash
SPRINT operation="plan" name="Sprint 1" start_date="2025-04-15" end_date="2025-04-29"
```

**Returns:**
- Confirmation of the operation
- Sprint details including assigned stories
- Sprint report for report operation

---

### `MEETING`

Records and manages meeting notes.

**Syntax:**
```bash
MEETING operation="[operation]" [arguments]
```

**Operations:**
- `create`: Creates new meeting notes
- `list`: Lists existing meeting notes
- `update`: Updates existing meeting notes
- `delete`: Deletes meeting notes

**Arguments:**
- `title`: Title of the meeting (required for create/update)
- `date`: Date of the meeting (required for create)
- `attendees`: List of attendees (optional)
- `meeting_id`: ID of the meeting (required for update/delete)

**Example:**
```bash
MEETING operation="create" title="Sprint Planning" date="2025-04-14"
```

**Returns:**
- Confirmation of the operation
- Meeting document with structured format
- Action items extracted from meeting notes

---

### `REPORT`

Generates various reports for project management.

**Syntax:**
```bash
REPORT report_type="[type]" [arguments]
```

**Report Types:**
- `sprint`: Sprint progress/completion report
- `project`: Overall project status report
- `velocity`: Team velocity report
- `burndown`: Sprint burndown chart

**Arguments:**
- `sprint_id`: ID of the sprint (required for sprint/burndown)
- `format`: Output format (optional, default: markdown)
- `detailed`: Whether to include details (optional)

**Example:**
```bash
REPORT report_type="sprint" sprint_id="SP-1" format="markdown" detailed=true
```

**Returns:**
- Formatted report according to specified type
- Data visualizations when appropriate
- Actionable insights based on project data

---

## Development Commands

### `CREATE_REPO`

Creates a new repository for generated code.

**Syntax:**
```bash
CREATE_REPO repo_name="[name]" [options]
```

**Arguments:**
- `repo_name`: Name of the repository (required)
- `repo_type`: Type of repository - "github", "gitlab", etc. (optional)
- `private`: Whether the repository should be private (optional)
- `description`: Repository description (optional)

**Example:**
```bash
CREATE_REPO repo_name="my-project" repo_type="github" private=true
```

**Returns:**
- Confirmation of repository creation
- URL to the created repository
- Setup instructions if applicable

---

### `VERIFY`

Validates documentation against standards and checks for completeness.

**Syntax:**
```bash
VERIFY scope="[scope]" [options]
```

**Arguments:**
- `scope`: Verification scope - "project", "document", etc. (required)
- `target`: Target document or project (required for document scope)
- `format`: Output format - "detailed", "summary" (optional)

**Example:**
```bash
VERIFY scope="project" format="detailed"
```

**Returns:**
- Verification results with any issues found
- Completeness percentage
- Suggestions for improvement

---

### `CODING_STYLE`

Applies coding style guidelines to projects.

**Syntax:**
```bash
CODING_STYLE operation="[operation]" [arguments]
```

**Operations:**
- `apply`: Applies a coding style
- `list`: Lists available coding styles
- `check`: Checks compliance with a coding style

**Arguments:**
- `style_name`: Name of the coding style (required for apply/check)
- `target`: Target directory or project (optional)

**Example:**
```bash
CODING_STYLE operation="apply" style_name="frontend"
```

**Returns:**
- Confirmation of style application
- List of styles for list operation
- Compliance report for check operation

---

### `WORKFLOW`

Applies Git workflow methodologies to projects.

**Syntax:**
```bash
WORKFLOW operation="[operation]" [arguments]
```

**Operations:**
- `apply`: Applies a Git workflow
- `list`: Lists available Git workflows
- `check`: Checks compliance with a workflow

**Arguments:**
- `workflow_name`: Name of the workflow (required for apply/check)
- `target`: Target repository or project (optional)

**Example:**
```bash
WORKFLOW operation="apply" workflow_name="github_flow"
```

**Returns:**
- Confirmation of workflow application
- List of workflows for list operation
- Compliance report for check operation

---

## Memory Management Commands

### `ACHIEVEMENT`

Records project achievements for context preservation.

**Syntax:**
```bash
ACHIEVEMENT "[description]" [category] [importance]
```

**Arguments:**
- `description`: Description of the achievement (required)
- `category`: Category of the achievement (optional)
- `importance`: Importance level - "high", "medium", "low" (optional)

**Example:**
```bash
ACHIEVEMENT "Completed market analysis" research high
```

**Returns:**
- Confirmation of recorded achievement
- Assigned achievement ID

---

### `ISSUE`

Documents project issues for context preservation.

**Syntax:**
```bash
ISSUE "[description]" [severity] [category]
```

**Arguments:**
- `description`: Description of the issue (required)
- `severity`: Severity level - "high", "medium", "low" (optional)
- `category`: Category of the issue (optional)

**Example:**
```bash
ISSUE "Incomplete competitor data" medium research
```

**Returns:**
- Confirmation of recorded issue
- Assigned issue ID

---

### `DECISION`

Records technical decisions for architecture decision records.

**Syntax:**
```bash
DECISION "[title]" impact=[impacted_areas]
```

**Arguments:**
- `title`: Title of the decision (required)
- `impact`: List of areas impacted by the decision (optional)

**Example:**
```bash
DECISION "Use React for frontend" impact=["architecture", "development"]
```

**Returns:**
- Confirmation of recorded decision
- Assigned decision ID
- Structured ADR document draft

---

### `MEMORY`

Views and manages project memory.

**Syntax:**
```bash
MEMORY filter=[filter] format=[format]
```

**Arguments:**
- `filter`: Memory filter - "all", "decisions", "issues", etc. (optional)
- `format`: Output format - "detailed", "summary", "json" (optional)

**Example:**
```bash
MEMORY filter=decisions format=detailed
```

**Returns:**
- Filtered memory items according to specified format
- Chronological listing of events
- Related context connections

---

## Advanced Commands

### `FORCE_RESEARCH`

Forces in-depth research on a specific document.

**Syntax:**
```bash
FORCE_RESEARCH [project_name] [document] [depth]
```

**Arguments:**
- `project_name`: Name of the project (required)
- `document`: Path to the document (required)
- `depth`: Research depth - "normal", "deep", "maximum" (optional)

**Example:**
```bash
FORCE_RESEARCH my-project 01_market_research.md maximum
```

**Returns:**
- Enhanced document with researched content
- Sources and references
- Confidence scores for research findings

---

### `UPDATE_ADR`

Updates architecture decision records based on project changes.

**Syntax:**
```bash
UPDATE_ADR [project_name]
```

**Arguments:**
- `project_name`: Name of the project (required)

**Example:**
```bash
UPDATE_ADR my-project
```

**Returns:**
- Updated ADR documents
- Change summary
- Impact assessment

---

### `DOCUMENT`

Generates or manages specific documentation types.

**Syntax:**
```bash
DOCUMENT [doc_type] [arguments]
```

**Document Types:**
- `ADR`: Architecture Decision Record
- `REQUIREMENTS`: Requirements document
- `ARCHITECTURE`: Architecture document
- `API`: API documentation

**Example:**
```bash
DOCUMENT ADR --title="OAuth Provider Selection" --req-refs="SSO-*"
```

**Returns:**
- Generated document of specified type
- Links to related documentation
- Contextual references

---

### `DESIGN`

Creates design documentation for components.

**Syntax:**
```bash
DESIGN COMPONENT --name="[name]" [options]
```

**Arguments:**
- `name`: Name of the component (required)
- `adr-refs`: References to related ADRs (optional)
- `req-refs`: References to requirements (optional)

**Example:**
```bash
DESIGN COMPONENT --name="AuthService" --adr-refs="ADR-12"
```

**Returns:**
- Component design documentation
- Contextual references to related decisions
- Implementation guidelines

---

### `CODE DECISION`

Documents implementation decisions within code.

**Syntax:**
```bash
CODE DECISION --file="[file]" --line=[line_number] --context="[description]"
```

**Arguments:**
- `file`: Path to the file (required)
- `line`: Line number (required)
- `context`: Decision context description (required)

**Example:**
```bash
CODE DECISION --file="auth.service.ts" --line=56 --context="JWT for stateless scaling"
```

**Returns:**
- Confirmation of recorded decision
- Code decision ID
- Link to the affected code