# PAELLADOC Website

This is the official website for PAELLADOC, an AI documentation framework that helps solve context loss problems in AI development teams.

## Features

- Clean, minimal design inspired by Apple's aesthetic
- Mobile-responsive layout for all devices
- Focus on content and readability
- Fast loading with optimized assets
- Accessibility-first approach

## Development

### Prerequisites

- Ruby 2.7.0 or higher
- Bundler
- Jekyll 4.2.0 or higher

### Setup

1. Clone the repository
```bash
git clone https://github.com/jlcases/paelladocweb.git
cd paelladocweb
```

2. Install dependencies
```bash
bundle install
```

3. Start the development server
```bash
bundle exec jekyll serve
```

4. Visit `http://localhost:4000` to see the site.

### Directory Structure

- `_layouts/`: HTML templates
- `_includes/`: Reusable HTML components
- `_sass/`: SCSS stylesheets
- `assets/`: Static assets like CSS, JS, and images
- `_data/`: YAML files with site data
- `_posts/`: Blog posts (if applicable)
- `_site/`: Generated site (do not edit)

### CSS Architecture

The CSS follows a component-based architecture with:

- `_sass/base.scss`: Base styles and variables
- `_sass/layout.scss`: Layout components (header, footer, etc.)
- `_sass/components.scss`: UI components (buttons, cards, etc.)

## Deployment

The site is deployed automatically when changes are pushed to the main branch. The site uses GitHub Pages for hosting.

## Configuration

The site is configured in `_config.yml`. Main settings:

- `title`: Site title
- `description`: Site description
- `url`: Site URL

## Custom Domain

The site is configured to use [paelladoc.com](https://paelladoc.com).

## License

This project is licensed under the MIT License.

## Credits

- Design: PAELLADOC Design Team
- Development: PAELLADOC Engineering Team

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

[CONTRIBUTING_TO_BLOG.md](CONTRIBUTING_TO_BLOG.md): Explains how to contribute content to the blog. 