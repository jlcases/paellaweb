source "https://rubygems.org"

gem "jekyll", "~> 4.3"

# Plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.17.0"
  gem "jekyll-seo-tag", "~> 2.8.0"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
gem "webrick", "~> 1.8" 
gem 'jekyll-paginate', "~> 1.1.0"

# Add the responsive image plugin
gem "jekyll-responsive-image", "~> 1.6" # Usando la última versión sugerida