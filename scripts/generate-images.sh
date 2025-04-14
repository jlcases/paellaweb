#!/bin/bash

echo "🖼️ Generating responsive images..."

# Ensure we're in the project root
cd "$(dirname "$0")/.." || exit

# Clean previous generated images
rm -rf assets/images/*_*.{png,jpg,jpeg,webp,avif}

# Run Jekyll build to generate responsive images
JEKYLL_ENV=development bundle exec jekyll build --config _config.yml

# Copy generated images from _site/assets/images to assets/images
cp -r _site/assets/images/* assets/images/

echo "✅ Responsive images generated successfully!"
echo "📝 Don't forget to commit the generated images in assets/images/" 