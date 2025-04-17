const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const sizes = [320, 480, 768, 1024, 1200, 1920, 2048];
const outputFormats = ['webp', 'avif', 'png']; // Añadido png como opción
const quality = {
  webp: 85,
  avif: 80,
  png: 85 // Calidad para png (sin pérdida, pero puede afectar compresión)
};

function getOutputPath(inputPath, size, format) {
  const dir = path.dirname(inputPath);
  const filename = path.basename(inputPath, path.extname(inputPath));
  return path.join(dir, `${filename}_${size}.${format}`);
}

async function processImage(inputPath) {
  let stats;
  try {
    stats = await fs.promises.stat(inputPath);
  } catch (err) {
    console.error(`Error reading input file ${inputPath}:`, err);
    return; // Skip if input file doesn't exist or isn't accessible
  }
  console.log(`Processing ${inputPath}...`);

  for (const size of sizes) {
    for (const format of outputFormats) {
      const outputPath = getOutputPath(inputPath, size, format);
      
      // Skip if output exists and is newer than input
      try {
        const outStats = await fs.promises.stat(outputPath);
        if (outStats.mtime >= stats.mtime) { // Use >= to be safe
          // console.log(`Skipping ${outputPath} (up to date)`); // Optional: Uncomment for verbose skipping logs
          continue;
        }
      } catch (err) {
        // Output doesn't exist or error reading it, continue processing
      }

      try {
        const imagePipeline = sharp(inputPath)
          .resize(size, null, { // Resize based on width, maintaining aspect ratio
            withoutEnlargement: true,
            fit: 'contain' // Ensures the whole image fits within the width, background might be added if aspect ratios differ significantly
          });

        // Apply format specific options
        imagePipeline[format]({
            quality: quality[format],
            effort: format === 'avif' ? 6 : undefined // effort option specific to avif
        });

        await imagePipeline.toFile(outputPath);
        
        console.log(`Generated: ${outputPath}`);
      } catch (error) {
        console.error(`Error generating ${outputPath} for ${inputPath}:`, error);
      }
    }
  }
}

async function generateImages() {
  console.log("Starting image generation...");
  // Get all images recursively from assets/images, excluding already processed ones
  const images = glob.sync('assets/images/**/*.{png,jpg,jpeg,webp,avif}', {
    ignore: [
      'assets/images/**/*_*.{png,jpg,jpeg,webp,avif}', // Ignore files with _SIZE suffix
      'assets/images/responsive/**' // Ignore the old responsive directory if it exists
      ]
  });

  console.log(`Found ${images.length} images to process.`);

  // Process images sequentially to avoid overwhelming the system
  for (const image of images) {
    await processImage(image);
  }
  console.log("Image generation complete.");
}

generateImages().catch(console.error); 