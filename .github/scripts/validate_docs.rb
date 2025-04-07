#!/usr/bin/env ruby

require 'yaml'
require 'json'

def validate_frontmatter(content)
  # Extract frontmatter
  if content =~ /\A(---\s*\n.*?\n?)^(---\s*$\n?)/m
    frontmatter = YAML.load($1)
    
    # Required fields
    required_fields = ['title', 'author_github', 'description', 'project_type']
    missing_fields = required_fields - frontmatter.keys
    
    if missing_fields.any?
      puts "Error: Missing required frontmatter fields: #{missing_fields.join(', ')}"
      return false
    end
    
    # Validate project_type
    unless ['docs-to-code', 'legacy-to-docs'].include?(frontmatter['project_type'])
      puts "Error: Invalid project_type. Must be either 'docs-to-code' or 'legacy-to-docs'"
      return false
    end
  else
    puts "Error: No frontmatter found"
    return false
  end
  
  true
end

def validate_paelladoc_blocks(content)
  # Find all paelladoc code blocks
  blocks = content.scan(/```paelladoc\n(.*?)```/m)
  
  blocks.each do |block|
    code = block[0]
    
    # Validate basic PAELLADOC syntax
    unless code =~ /^[A-Z_]+\s+".*?"(\s+.*?)?(\s+END)?$/m
      puts "Error: Invalid PAELLADOC command syntax in block:\n#{code}"
      return false
    end
  end
  
  true
end

def validate_required_sections(content)
  required_sections = [
    '## Overview',
    '## Development Approach',
    '## Problem Statement',
    '## Research & Validation',
    '## Product Requirements',
    '## Implementation'
  ]
  
  missing_sections = required_sections.reject { |section| content.include?(section) }
  
  if missing_sections.any?
    puts "Error: Missing required sections: #{missing_sections.join(', ')}"
    return false
  end
  
  true
end

# Main validation logic
Dir.glob('docs/**/*.md') do |file|
  next if file.include?('_templates/')
  
  puts "Validating #{file}..."
  content = File.read(file)
  
  valid = validate_frontmatter(content) &&
          validate_paelladoc_blocks(content) &&
          validate_required_sections(content)
  
  unless valid
    puts "Validation failed for #{file}"
    exit 1
  end
end

puts "All documentation files validated successfully!"
exit 0 