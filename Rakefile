require 'yaml'
require 'fileutils'

desc "Optimizar imágenes de posts"
task :optimize_post_images do
  puts "Procesando imágenes para posts..."
  
  # Asegurar que los directorios existen
  posts_images_dir = File.join(Dir.pwd, '_posts_images_original')
  FileUtils.mkdir_p(posts_images_dir) unless Dir.exist?(posts_images_dir)
  
  responsive_dir = File.join(Dir.pwd, 'assets', 'images', 'posts_responsive')
  FileUtils.mkdir_p(responsive_dir) unless Dir.exist?(responsive_dir)
  
  # Ejecutar el generador de Jekyll con la bandera --regenerate-images
  system("bundle exec jekyll build --regenerate-images")
  
  # Notificar finalización
  puts "¡Optimización de imágenes completada!"
  puts "Las imágenes responsivas se han generado en: assets/images/posts_responsive/"
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
  puts "Las imágenes responsivas se generarán en: assets/images/posts_responsive/"
end

task :default => :setup_images 