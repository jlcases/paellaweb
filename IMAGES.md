# PAELLADOC Image Processing Guide

This guide explains how to correctly add and process images for the PAELLADOC blog and website.

## Adding Blog Post Images

1. **Place original images in the `_posts_images_original` directory**

   This directory contains your high-resolution source images.
   
   ```bash
   # Create directory if it doesn't exist yet
   rake prepare_post_images
   ```

2. **Generate responsive images for the web**

   ```bash
   rake optimize_post_images
   ```
   
   This will:
   - Copy the original image to `assets/images/`
   - Generate WebP and AVIF versions for better compression
   - Create multiple sizes of each format for responsive loading

3. **Reference images in your post**

   In your post's frontmatter, simply use the public image path:
   
   ```yaml
   ---
   layout: post
   title: "Your Post Title"
   # ...
   image: "/assets/images/your-image.png"
   image_alt: "Description of your image for accessibility"
   # ...
   ---
   ```

   **Note:** The templates will automatically generate responsive image HTML with all formats and sizes!

## How It Works (Automatic System)

Our templates are configured to automatically:

1. Take the image path you specified in frontmatter (`/assets/images/your-image.png`)
2. Generate responsive `<picture>` HTML with:
   - AVIF sources for modern browsers
   - WebP sources for older browsers
   - Original format fallback
   - Multiple sizes based on device viewport

All you need to do is provide the base image path - our template system handles the rest!

## Simple Approach for Contributors

For contributors, the workflow is extremely simple:

1. Add your original high-resolution image to `_posts_images_original/`
2. Run `rake optimize_post_images` to generate all formats and sizes
3. Reference the original image in your frontmatter with `/assets/images/your-image.png`

The system will automatically generate all required formats and sizes, and serve the most appropriate one to each visitor based on their device and browser capabilities.

## Image Formats and Sizes Generated

For each image (e.g., `image.png`), the system creates:

### Full-size versions in all formats:
- `/assets/images/image.png` - Original format
- `/assets/images/image.webp` - WebP format (better compression)
- `/assets/images/image.avif` - AVIF format (best compression)

### Resized versions in all formats:
- 320px width: `image_320.png`, `image_320.webp`, `image_320.avif`
- 480px width: `image_480.png`, `image_480.webp`, `image_480.avif`
- 768px width: `image_768.png`, `image_768.webp`, `image_768.avif`
- 1024px width: `image_1024.png`, `image_1024.webp`, `image_1024.avif`
- 1200px width: `image_1200.png`, `image_1200.webp`, `image_1200.avif`
- 1920px width: `image_1920.png`, `image_1920.webp`, `image_1920.avif`

*Note: Sizes larger than the original image will not be generated.*

## Using Custom Responsive Images in HTML Content

To use responsive images directly in your markdown content (beyond the featured image), you can use our include:

```liquid
{% include responsive-image.html path="/assets/images/your-image.png" alt="Description of image" %}
```

## Troubleshooting

If your images aren't appearing on the site:

1. Verify the image exists in both `_posts_images_original/` and `assets/images/`
2. Make sure the image path in your frontmatter exactly matches the filename
3. Rebuild the site with `bundle exec jekyll build` to update
4. Check the deployed site for any path issues

## Image Optimization Guidelines

For optimal performance:

1. Use descriptive filenames with hyphens (e.g., `team-meeting-diagram.png`)
2. Start with high-resolution images (at least 1920px wide if possible)
3. Use PNG for diagrams/screenshots and JPEG for photos
4. Keep originals under 5MB when possible for faster processing 