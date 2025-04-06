# PAELLADOC Website

This is the official website for PAELLADOC, an AI documentation framework that helps solve context loss problems in AI development teams.

## Local Development

### Prerequisites

- Ruby (version 2.7.0 or higher recommended)
- RubyGems
- Bundler
- Jekyll (version 4.3.4)

### Setup

1. Clone this repository
```bash
git clone https://github.com/jlcases/paellaweb.git
cd paellaweb
```

2. Install dependencies
```bash
bundle install
```

3. Run the local development server
```bash
bundle exec jekyll serve
```

4. View the site at [http://localhost:4000](http://localhost:4000)

### Testing Changes

- The site will automatically rebuild when you make changes
- Refresh your browser to see updates
- Use the `--livereload` flag for automatic browser refreshing:
```bash
bundle exec jekyll serve --livereload
```

## Structure

- `_layouts/` - Contains HTML templates
- `_sass/` - Contains SCSS stylesheets
- `assets/` - Contains compiled CSS and other static assets
- `_data/` - Contains site data files
- `_config.yml` - Main Jekyll configuration file
- Other directories contain individual section pages

## Deployment

This site is deployed using GitHub Pages. Push changes to the main branch to deploy.

## Custom Domain

The site is configured to use [paelladoc.com](https://paelladoc.com).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 