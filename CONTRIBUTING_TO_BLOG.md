# How to Contribute Blog Content to PAELLADOC

We welcome contributions to the PAELLADOC blog! Here's a step-by-step guide on how to submit your content through a Pull Request.

## Content Requirements

- Contributors should be members of the PAELLADOC community with a GitHub profile
- Content should be relevant to product development and software engineering in the AI era
- Articles should be well-structured, informative, and engaging
- Community members with experience in AI-driven development are particularly encouraged to share their insights

## Technical Process

1. **Fork the repository** at [https://github.com/jlcases/paellaweb](https://github.com/jlcases/paellaweb)

2. **Create a new markdown file** in the `_posts` directory with the following naming convention:
   ```
   YYYY-MM-DD-title-with-hyphens.md
   ```
   Example: `2023-09-15-integrating-ai-into-legacy-systems.md`

3. **Add proper frontmatter** at the top of your markdown file:
   ```yaml
   ---
   layout: post
   title: "Your Post Title"
   subtitle: "An optional subtitle for your post"
   date: YYYY-MM-DD
   author: "Your Name"
   avatar: "/assets/images/default-avatar.png"  # We can update this later
   github: "https://github.com/yourusername"  # Required for community verification
   twitter: "https://twitter.com/yourusername"  # Optional
   image: "/assets/images/your-image.jpg"  # Optional featured image
   image_alt: "Description of your image for accessibility"
   categories: 
     - Category1
     - Category2
   tags:
     - tag1
     - tag2
     - tag3
   excerpt: "A brief summary of your post (1-2 sentences). This will appear in previews."
   ---
   ```

4. **Write your content** using Markdown formatting:
   - Use `##` for main headings (H2)
   - Use `###` for subheadings (H3)
   - Use standard Markdown for links, lists, emphasis, code blocks, etc.
   - For code examples, specify the language for proper syntax highlighting:
     ````
     ```javascript
     // Your code here
     ```
     ````

5. **Submit a Pull Request** with your changes
   - Provide a brief description of your post in the PR
   - We'll review your submission and may suggest edits before merging

## Post Categories

Please choose from these categories (you can select 1-2):
- Framework
- Integrations
- Tutorial
- Best Practices
- Case Studies
- Product Development
- AI Engineering

## Example Post Structure

```markdown
---
layout: post
title: "Using AI to Improve Code Quality"
subtitle: "Practical strategies for better code reviews with AI"
date: 2023-10-01
author: "Jane Developer"
categories: 
  - Best Practices
  - AI Engineering
tags:
  - code quality
  - AI reviews
  - static analysis
excerpt: "Learn how AI can enhance your code review process while keeping humans in the loop for critical decisions."
---

## Introduction

Brief overview of the topic and why it matters...

## Main Section 1

Content for your first main point...

### Subsection

More detailed information...

## Main Section 2

Content for your second main point...

## Conclusion

Summary and key takeaways...
```

## Review Process

Once submitted, our team will review your post for:
1. Relevance to our audience
2. Technical accuracy
3. Writing quality and clarity
4. Formatting correctness

We may suggest edits or improvements before publishing.

Thank you for contributing to the PAELLADOC community!
