# How to Add Images to PAELLADOC Blog Posts

Hello PAELLADOC community! We've implemented a robust image optimization system for blog contributions that follows Jekyll best practices.

## Image System Architecture

We've designed an intelligent image processing system that:
- Stores original high-resolution images separately using Git LFS
- Automatically generates responsive versions during build
- Creates multiple sizes and modern formats (WebP, AVIF)
- Ensures proper accessibility through HTML5 `<picture>` elements

## How to Add Images to Your Posts

### 1. Image Preparation

- Place your original images in the `_posts_images_original/` folder at the project root
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- **Recommendation**: Use images at least 1200px wide for best quality
- **No need** to resize or compress beforehand - Jekyll will do it for you
- Original images are managed with **Git LFS** for efficient repository handling

### 2. Automatic Processing

Your images will be processed automatically in two ways:

- **Option 1:** When you add files with `git add` and commit, the pre-commit hook will detect and process them
- **Option 2:** Run `rake optimize_post_images` manually to process all images in the folder

The responsive versions will be stored in `assets/images/posts_responsive/` organized by image name and size.

### 3. Referencing in Markdown

In your post, use the Jekyll responsive image tag:

```markdown
{% responsive_image path: _posts_images_original/image-name.jpg alt: "Accessible description of the image" %}
```

Additional parameters available:
- `class`: CSS classes for the picture element
- `image_class`: CSS classes for the img element
- `width`: Specific width (optional)
- `height`: Specific height (optional)
- `title`: Title to display on hover
- `sizes`: Custom sizes attribute (responsive by default)

### 4. Featured Images

For featured images, add in your post's frontmatter:

```yaml
---
layout: post
title: "Your Post Title"
image: "_posts_images_original/image-name.jpg"
image_alt: "Accessible description of the featured image"
---
```

## Technical Process

When you add images to the system:

1. Original high-resolution images are stored using Git LFS for efficient handling
2. During build, Jekyll generates optimized versions (320px to 1920px)
3. Images are converted to modern formats (WebP, AVIF) with fallbacks
4. HTML5 `<picture>` markup is generated with proper srcset and sizes attributes
5. The entire process is automated within the Jekyll build pipeline

## Benefits of This Architecture

- **Separate Original Files**: High-resolution images managed efficiently with Git LFS
- **Automatic Optimization**: Jekyll handles optimization during site build
- **Clean Separation**: Processed images kept separate from originals
- **Modern Formats**: Automatic support for WebP and AVIF with fallbacks
- **Jekyll Integration**: Seamless integration with Jekyll workflow

## Accessibility Recommendations

- **Always** include descriptive alt text
- Use concise but informative descriptions
- For decorative images, use `alt: ""` (don't omit the attribute)
- If the image contains text, include that text in the alt attribute

## Troubleshooting

- If your images don't appear, verify they're in `_posts_images_original/`
- If you need to regenerate all images, run `rake optimize_post_images`
- If you need to reset the configuration, run `rake setup_images`
- For Git LFS issues, refer to [Git LFS documentation](https://git-lfs.github.com/)

---

If you have any questions about this image system, please ask in this thread. Thank you for contributing to PAELLADOC! 