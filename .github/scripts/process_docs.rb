#!/usr/bin/env ruby

require 'yaml'
require 'json'

# Get author info from command line argument
author_info = JSON.parse(ARGV[0])

def update_frontmatter(content, author_info)
  if content =~ /\A(---\s*\n.*?\n?)^(---\s*$\n?)/m
    frontmatter_content = $1
    frontmatter = YAML.load(frontmatter_content)
    
    # Add author information
    frontmatter['author'] = {
      'github' => author_info['username'],
      'avatar' => author_info['avatar_url'],
      'profile' => author_info['profile_url']
    }
    
    # Update last modified date
    frontmatter['last_modified'] = Time.now.strftime('%Y-%m-%d')
    
    # Replace old frontmatter with new
    new_frontmatter = frontmatter.to_yaml
    content.sub(/\A---.*?---\s*$/m, new_frontmatter)
  else
    content
  end
end

def process_paelladoc_blocks(content)
  # Process any PAELLADOC-specific syntax or commands
  content.gsub(/```paelladoc\n(.*?)```/m) do |match|
    code = $1
    # Here you could add additional processing for PAELLADOC blocks
    # For now, we'll just preserve them
    "```paelladoc\n#{code}```"
  end
end

# Process all markdown files in docs directory
Dir.glob('docs/**/*.md') do |file|
  next if file.include?('_templates/')
  
  puts "Processing #{file}..."
  content = File.read(file)
  
  # Update frontmatter with author info
  content = update_frontmatter(content, author_info)
  
  # Process PAELLADOC blocks
  content = process_paelladoc_blocks(content)
  
  # Write updated content back to file
  File.write(file, content)
end

puts "Documentation processing completed!"
exit 0 