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
end

desc "Instalar configuración para Git LFS"
task :setup_git_lfs do
  # Crear archivo .gitattributes si no existe
  gitattributes_path = File.join(Dir.pwd, '.gitattributes')
  
  unless File.exist?(gitattributes_path)
    File.open(gitattributes_path, 'w') do |file|
      file.puts "# Configuración Git LFS"
      file.puts "_posts_images_original/**/*.jpg filter=lfs diff=lfs merge=lfs -text"
      file.puts "_posts_images_original/**/*.jpeg filter=lfs diff=lfs merge=lfs -text"
      file.puts "_posts_images_original/**/*.png filter=lfs diff=lfs merge=lfs -text"
      file.puts "_posts_images_original/**/*.gif filter=lfs diff=lfs merge=lfs -text"
      file.puts "_posts_images_original/**/*.webp filter=lfs diff=lfs merge=lfs -text"
    end
    puts "✅ Archivo .gitattributes creado para Git LFS"
  else
    puts "ℹ️ Archivo .gitattributes ya existe, asegúrate de que incluya configuración para imágenes"
  end
  
  # Mostrar instrucciones para instalar y configurar Git LFS
  puts ""
  puts "📋 Para usar Git LFS con las imágenes originales:"
  puts "1. Instala Git LFS desde https://git-lfs.github.com/"
  puts "2. Ejecuta 'git lfs install' en este repositorio"
  puts "3. Si tienes imágenes existentes, ejecuta 'git lfs migrate import --include=\"_posts_images_original/**/*.jpg,*.jpeg,*.png,*.gif,*.webp\"'"
  puts ""
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
task :setup_images => [:prepare_post_images, :install_hooks, :setup_git_lfs] do
  puts "✅ Configuración de imágenes completada."
  puts ""
  puts "📋 Instrucciones de uso:"
  puts "1. Coloca tus imágenes originales en la carpeta _posts_images_original/"
  puts "2. Ejecuta 'rake optimize_post_images' para generar versiones responsivas"
  puts "3. O simplemente añádelas con 'git add' y haz commit - se optimizarán automáticamente"
  puts ""
  puts "En tus posts, usa la etiqueta así:"
  puts "{% responsive_image path: _posts_images_original/nombre-imagen.jpg alt: 'Descripción de la imagen' %}"
  puts ""
  puts "Las imágenes responsivas se generarán en: assets/images/posts_responsive/"
end

task :default => :setup_images 