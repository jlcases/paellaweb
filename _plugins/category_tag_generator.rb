module Jekyll
  class CategoryPageGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'category'
        dir = 'blog/categories'
        site.categories.each_key do |category|
          site.pages << CategoryPage.new(site, site.source, dir, category)
        end
      end
    end
  end

  class TagPageGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'tag'
        dir = 'blog/tags'
        # Normalize tags to lowercase and remove duplicates
        normalized_tags = {}
        site.tags.each do |tag, posts|
          normalized_tag = tag.to_s.downcase
          normalized_tags[normalized_tag] ||= []
          normalized_tags[normalized_tag].concat(posts)
        end
        normalized_tags.each do |tag, posts|
          site.pages << TagPage.new(site, site.source, dir, tag, posts)
        end
      end
    end
  end

  class CategoryPage < Page
    def initialize(site, base, dir, category)
      @site = site
      @base = base
      @dir = dir
      @name = "#{category.downcase.gsub(' ', '-')}.html"

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'category.html')
      self.data['title'] = "Category: #{category}"
      self.data['category'] = category
      self.data['permalink'] = "/#{dir}/#{category.downcase.gsub(' ', '-')}/"
    end
  end

  class TagPage < Page
    def initialize(site, base, dir, tag, posts = nil)
      @site = site
      @base = base
      @dir = dir
      @name = "#{tag.downcase.gsub(' ', '-')}.html"

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag.html')
      self.data['title'] = "Tag: #{tag.capitalize}"
      self.data['tag'] = tag
      self.data['posts'] = posts if posts
      self.data['permalink'] = "/#{dir}/#{tag.downcase.gsub(' ', '-')}/"
    end
  end
end 