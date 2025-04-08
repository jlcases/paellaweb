require 'yaml'
require 'fileutils'
require 'mini_magick' rescue LoadError
require 'securerandom'

desc "Optimizar imágenes de posts"
task :optimize_post_images do
  puts "Procesando imágenes para posts..."
  
  # Asegurar que los directorios existen
  posts_images_dir = File.join(Dir.pwd, '_posts_images_original')
  FileUtils.mkdir_p(posts_images_dir) unless Dir.exist?(posts_images_dir)
  
  assets_images_dir = File.join(Dir.pwd, 'assets', 'images')
  FileUtils.mkdir_p(assets_images_dir) unless Dir.exist?(assets_images_dir)
  
  # Verificar si mini_magick está instalado
  begin
    require 'mini_magick'
  rescue LoadError
    puts "⚠️ Error: La gema 'mini_magick' no está instalada."
    puts "Ejecuta: gem install mini_magick"
    puts "O añade 'mini_magick' a tu Gemfile y ejecuta 'bundle install'"
    exit 1
  end
  
  # Tamaños responsivos a generar
  sizes = [320, 480, 768, 1024, 1200, 1920]
  
  # Procesamos todas las imágenes originales
  Dir.glob(File.join(posts_images_dir, '*.{jpg,jpeg,png,gif,webp}')).each do |img_path|
    begin
      filename = File.basename(img_path)
      name = File.basename(filename, ".*")
      ext = File.extname(filename).downcase
      
      # Copiar el archivo original
      orig_dest_path = File.join(assets_images_dir, filename)
      FileUtils.cp(img_path, orig_dest_path)
      puts "✓ Copiado: #{filename} a assets/images/"
      
      # Crear versión WebP y AVIF del original (sin redimensionar)
      image = MiniMagick::Image.open(img_path)
      original_width = image.width
      
      # WebP original
      webp_path = File.join(assets_images_dir, "#{name}.webp")
      image.format "webp"
      image.quality "85"
      image.write webp_path
      puts "✓ Generado: #{name}.webp"
      
      # AVIF original
      begin
        avif_path = File.join(assets_images_dir, "#{name}.avif")
        image = MiniMagick::Image.open(img_path) # Volver a abrir para AVIF
        image.format "avif"
        image.quality "85"
        image.write avif_path
        puts "✓ Generado: #{name}.avif"
      rescue => e
        puts "⚠️ AVIF no soportado: #{e.message}"
      end
      
      # Generar múltiples tamaños
      sizes.each do |width|
        # No generar tamaños más grandes que el original
        next if width >= original_width
        
        # Formato original redimensionado
        resized_img = MiniMagick::Image.open(img_path)
        resized_img.resize "#{width}x"
        resized_path = File.join(assets_images_dir, "#{name}_#{width}#{ext}")
        resized_img.write resized_path
        puts "✓ Generado: #{name}_#{width}#{ext}"
        
        # WebP redimensionado
        resized_img = MiniMagick::Image.open(img_path)
        resized_img.resize "#{width}x"
        resized_img.format "webp"
        resized_img.quality "85"
        resized_webp_path = File.join(assets_images_dir, "#{name}_#{width}.webp")
        resized_img.write resized_webp_path
        puts "✓ Generado: #{name}_#{width}.webp"
        
        # AVIF redimensionado
        begin
          resized_img = MiniMagick::Image.open(img_path)
          resized_img.resize "#{width}x"
          resized_img.format "avif"
          resized_img.quality "85"
          resized_avif_path = File.join(assets_images_dir, "#{name}_#{width}.avif")
          resized_img.write resized_avif_path
          puts "✓ Generado: #{name}_#{width}.avif"
        rescue => e
          puts "⚠️ AVIF no soportado para tamaño #{width}px: #{e.message}"
        end
      end
      
    rescue => e
      puts "❌ Error procesando #{filename}: #{e.message}"
    end
  end
  
  puts "¡Optimización de imágenes completada!"
  puts "Las imágenes se han copiado y convertido a múltiples tamaños y formatos en: assets/images/"
  puts "Formatos generados: Original, WebP, AVIF"
  puts "Tamaños generados: 320, 480, 768, 1024, 1200, 1920 pixeles (si aplica)"
end

desc "Crear directorio para imágenes originales de post"
task :prepare_post_images do
  posts_images_dir = File.join(Dir.pwd, '_posts_images_original')
  FileUtils.mkdir_p(posts_images_dir) unless Dir.exist?(posts_images_dir)
  
  # Crear un archivo .gitkeep para mantener el directorio en git
  gitkeep_file = File.join(posts_images_dir, '.gitkeep')
  FileUtils.touch(gitkeep_file) unless File.exist?(gitkeep_file)
  
  puts "Directorio para imágenes originales de posts creado en: #{posts_images_dir}"
  puts "Coloca tus imágenes en esta carpeta y luego ejecuta 'rake optimize_post_images'"
  puts "Nota: Las imágenes originales no se incluirán en el repositorio Git (.gitignore)"
end

desc "Instalar hooks de git"
task :install_hooks do
  hooks_dir = File.join(Dir.pwd, '.git', 'hooks')
  
  # Create pre-commit hook
  pre_commit_path = File.join(hooks_dir, 'pre-commit')
  File.open(pre_commit_path, 'w') do |file|
    file.puts "#!/usr/bin/env ruby"
    file.puts ""
    file.puts "images_changed = `git diff --cached --name-only --diff-filter=ACM | grep -E '\\.(jpg|jpeg|png|gif|webp)$'`"
    file.puts "posts_images_changed = `git diff --cached --name-only --diff-filter=ACM | grep -E '^_posts_images_original/.*\\.(jpg|jpeg|png|gif|webp)$'`"
    file.puts ""
    file.puts "if !posts_images_changed.empty?"
    file.puts "  puts \"🖼️ Se detectaron cambios en imágenes originales de posts...\""
    file.puts "  puts \"🔄 Generando versiones responsivas...\""
    file.puts "  system(\"rake optimize_post_images\")"
    file.puts "  puts \"✅ Imágenes optimizadas. Continúa el commit.\""
    file.puts "end"
    file.puts ""
    file.puts "exit 0"
  end
  
  # Make hook executable
  FileUtils.chmod(0755, pre_commit_path)
  
  puts "✅ Hooks de Git instalados correctamente."
end

desc "Configuración inicial completa para manejo de imágenes"
task :setup_images => [:prepare_post_images, :install_hooks] do
  puts "✅ Configuración de imágenes completada."
  puts ""
  puts "📋 Instrucciones de uso:"
  puts "1. Coloca tus imágenes originales en la carpeta _posts_images_original/"
  puts "2. Ejecuta 'rake optimize_post_images' para generar versiones responsivas"
  puts "3. O simplemente añádelas con 'git add' y haz commit - se optimizarán automáticamente"
  puts "4. ⚠️ Nota: Las imágenes originales NO se incluirán en Git (.gitignore)"
  puts ""
  puts "En tus posts, usa la etiqueta así:"
  puts "{% responsive_image path: _posts_images_original/nombre-imagen.jpg alt: 'Descripción de la imagen' %}"
  puts ""
  puts "Las imágenes responsivas se generarán en: assets/images/responsive/"
end

task :default => :setup_images 