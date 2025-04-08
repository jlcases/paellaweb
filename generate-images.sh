#!/bin/bash

# Ruta de la imagen original
SRC_IMAGE="assets/images/imagen-min.png"

# Directorio de salida
OUT_DIR="assets/images/responsive"

# Crear directorio de salida si no existe
mkdir -p "$OUT_DIR"

# Tamaños a generar
SIZES=(320 480 768 1024 1200 1920)

# Nombres base para variantes
VARIANTS=("imagen")

# Función para generar imágenes WebP y AVIF
generate_images() {
  local variant=$1
  local infile=$2
  
  echo "Procesando $variant desde $infile..."
  
  for size in "${SIZES[@]}"; do
    # WebP (ampliamente soportado)
    echo "  Generando ${variant}_${size}.webp"
    convert "$infile" -resize "${size}x${size}" -quality 85 "$OUT_DIR/${variant}_${size}.webp"
    
    # AVIF (mejor compresión, menor soporte)
    echo "  Generando ${variant}_${size}.avif"
    convert "$infile" -resize "${size}x${size}" -quality 85 "$OUT_DIR/${variant}_${size}.avif"
  done
  
  echo "¡Proceso completado para $variant!"
}

# Generar imágenes para la variante principal
generate_images "imagen" "$SRC_IMAGE"

echo "¡Todas las imágenes han sido generadas con éxito!" 