const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [320, 480, 768, 1024, 1200, 1920];
const images = ['imagen-light', 'imagen-dark'];
const formats = ['webp', 'avif'];

async function generateImages() {
  // Asegurarse de que el directorio existe
  const responsiveDir = path.join(__dirname, 'assets', 'images', 'responsive');
  if (!fs.existsSync(responsiveDir)) {
    fs.mkdirSync(responsiveDir, { recursive: true });
  }

  for (const image of images) {
    const inputFile = path.join(__dirname, 'assets', 'images', `${image}.webp`);
    
    for (const size of sizes) {
      for (const format of formats) {
        const outputFile = path.join(responsiveDir, `${image}_${size}.${format}`);
        
        try {
          await sharp(inputFile)
            .resize(size, null, {
              withoutEnlargement: true,
              fit: 'contain'
            })
            [format]({
              quality: format === 'avif' ? 80 : 85,
              effort: 6
            })
            .toFile(outputFile);
          
          console.log(`Generated: ${outputFile}`);
        } catch (error) {
          console.error(`Error generating ${outputFile}:`, error);
        }
      }
    }
  }
}

generateImages().catch(console.error); 