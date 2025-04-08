require 'yaml'
require 'fileutils'

desc "Optimizar imágenes de posts"
task :optimize_post_images do
  puts "Procesando imágenes para posts..."
  
  # Asegurar que el directorio _posts_images existe
  posts_images_dir = File.join(Dir.pwd, '_posts_images')
  FileUtils.mkdir_p(posts_images_dir) unless Dir.exist?(posts_images_dir)
  
  # Ejecutar el generador de Jekyll con la bandera --regenerate-images
  system("bundle exec jekyll build --regenerate-images")
  
  # Mover las imágenes originales a processed
  processed_dir = File.join(posts_images_dir, 'processed')
  FileUtils.mkdir_p(processed_dir) unless Dir.exist?(processed_dir)
  
  # Mover solo imágenes, no directorios ni otros archivos
  Dir.glob(File.join(posts_images_dir, '*.{jpg,jpeg,png,gif,webp}')).each do |img|
    next if File.directory?(img)
    
    basename = File.basename(img)
    destination = File.join(processed_dir, basename)
    puts "Moviendo #{basename} a processed/"
    FileUtils.mv(img, destination)
  end
  
  puts "¡Optimización de imágenes completada!"
end

desc "Crear directorio para imágenes de post"
task :prepare_post_images do
  posts_images_dir = File.join(Dir.pwd, '_posts_images')
  FileUtils.mkdir_p(posts_images_dir) unless Dir.exist?(posts_images_dir)
  puts "Directorio para imágenes de posts creado en: #{posts_images_dir}"
  puts "Coloca tus imágenes en esta carpeta y luego ejecuta 'rake optimize_post_images'"
end

desc "Instalar hooks de git"
task :install_hooks do
  hooks_dir = File.join(Dir.pwd, '.git', 'hooks')
  
  # Create pre-commit hook
  pre_commit_path = File.join(hooks_dir, 'pre-commit')
  File.open(pre_commit_path, 'w') do |file|
    file.puts "#!/usr/bin/env ruby"
    file.puts ""
    file.puts "images_changed = `git diff --cached --name-only --diff-filter=ACM | grep -E '\\.(\(jpg|jpeg|png|gif|webp)$'`"
    file.puts "posts_images_changed = `git diff --cached --name-only --diff-filter=ACM | grep -E '^_posts_images/.*\\.(jpg|jpeg|png|gif|webp)$'`"
    file.puts ""
    file.puts "if !posts_images_changed.empty?"
    file.puts "  puts \"🖼️ Se detectaron cambios en imágenes de posts...\""
    file.puts "  puts \"🔄 Optimizando imágenes...\""
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
  puts "1. Coloca tus imágenes originales en la carpeta _posts_images/"
  puts "2. Ejecuta 'rake optimize_post_images' para procesarlas"
  puts "3. O simplemente añádelas con 'git add' y haz commit - se optimizarán automáticamente"
  puts ""
  puts "En tus posts, usa la etiqueta así:"
  puts "{% responsive_image path: path/to/image.jpg alt: 'Descripción de la imagen' %}"
end

task :default => :setup_images 