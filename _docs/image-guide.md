# Guía de Imágenes para Posts en PAELLADOC

Esta guía explica el proceso para añadir imágenes a tus posts en el blog de PAELLADOC, asegurando que sean optimizadas, responsivas y accesibles.

## Procedimiento Recomendado

### 1. Preparación de Imágenes

- Coloca tus imágenes originales en la carpeta `_posts_images/` en la raíz del proyecto
- Formatos aceptados: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- **Recomendación**: Usa imágenes de al menos 1200px de ancho para mejor calidad
- **No es necesario** redimensionar o comprimir previamente, nuestro sistema lo hará por ti

### 2. Procesamiento Automático

Tus imágenes serán procesadas automáticamente de dos formas:

- **Opción 1:** Cuando añadas archivos con `git add` y hagas commit, el hook de pre-commit detectará las imágenes y las procesará automáticamente
- **Opción 2:** Ejecuta manualmente `rake optimize_post_images` para procesar todas las imágenes en la carpeta

### 3. Referencia en Markdown

En tu post, utiliza el tag de Jekyll para imágenes responsivas:

```markdown
{% responsive_image path: _posts_images/nombre-imagen.jpg alt: "Descripción accesible de la imagen" %}
```

Parámetros adicionales disponibles:
- `class`: Clases CSS para el elemento picture
- `image_class`: Clases CSS para el elemento img
- `width`: Ancho específico (opcional)
- `height`: Alto específico (opcional)
- `title`: Título para mostrar en hover
- `sizes`: Atributo sizes personalizado (por defecto es responsive)

### 4. Imágenes Destacadas

Para imágenes destacadas, añade en el frontmatter de tu post:

```yaml
---
layout: post
title: "Título de tu Post"
image: "_posts_images/nombre-imagen.jpg"
image_alt: "Descripción accesible de la imagen destacada"
---
```

## Proceso Técnico

Cuando añades imágenes, nuestro sistema:

1. Crea versiones optimizadas en diferentes tamaños (320px, 480px, 768px, 1024px, 1200px, 1920px)
2. Convierte las imágenes a formatos modernos (WebP, AVIF) para mejor rendimiento
3. Organiza las imágenes en directorios estructurados
4. Genera código HTML para `<picture>` y `<source>` con los breakpoints adecuados
5. Mueve tus imágenes originales a `_posts_images/processed/` para evitar duplicados

## Recomendaciones para Accesibilidad

- **Siempre** incluye texto alternativo descriptivo con `alt`
- Usa descripciones concisas pero informativas
- Para imágenes decorativas, usa `alt: ""` (no omitas el atributo)
- Si la imagen contiene texto, incluye ese texto en el alt

## Solución de Problemas

- Si tus imágenes no aparecen, verifica que estén en `_posts_images/`
- Si necesitas regenerar todas las imágenes, ejecuta `rake optimize_post_images`
- Si necesitas restablecer la configuración, ejecuta `rake setup_images`

## Configuración Avanzada

La configuración para el procesamiento de imágenes se encuentra en `_config.yml` bajo la clave `responsive_image`. Si necesitas ajustar parámetros como calidad o tamaños, consulta con el equipo de mantenimiento.
