const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const artDir = 'C:/Users/Dell/.gemini/antigravity/brain/2aa29747-a771-4713-9b7e-906e4d12baab';
const targetDir = path.resolve(__dirname, '../apps/web/public/images/gemstones');

fs.mkdirSync(targetDir, { recursive: true });

async function processImage(sourceFilename, targetFilename, width = 1600, height = 1200) {
  const sourcePath = path.join(artDir, sourceFilename);
  const targetPath = path.join(targetDir, targetFilename);
  
  if (!fs.existsSync(sourcePath)) {
    console.warn(`Source not found: ${sourcePath}`);
    return false;
  }
  
  await sharp(sourcePath)
    .resize(width, height, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 88, progressive: true })
    .toFile(targetPath);
    
  console.log(`Processed & saved: ${targetFilename} (${width}x${height})`);
  return true;
}

async function run() {
  console.log('=== Optimizing & Deploying Catalog Imagery ===');
  
  // 1. Faceted Single Stones Category Hero Banner
  // We use the vivid master-cut rubellite or faceted hessonite
  await processImage(
    'rubellite_tourmaline_master_cut_1794491258567.jpg',
    'category-faceted-single-stones.jpg',
    1600, 1000
  );

  // 2. Gemstone Lots Category Hero Banner
  // We use the Bangkok trading desk wholesale parcel arrangement
  await processImage(
    'libra_gems_wholesale_parcel_v2_1794491280253.jpg',
    'category-gemstone-lots.jpg',
    1600, 1000
  );

  // 3. Single Faceted Hessonite Garnet Product Imagery
  await processImage(
    'ceylon_hessonite_garnet_1794491238472.jpg',
    'hessonite-single-faceted.jpg',
    1400, 1050
  );
  await processImage(
    'ceylon_hessonite_garnet_1794491238472.jpg',
    'hessonite-single-table.jpg',
    1200, 1200
  );

  // 4. Single Faceted Afghanistan Rubellite (Update/Upgrade)
  await processImage(
    'rubellite_tourmaline_master_cut_1794491258567.jpg',
    'rubellite-single-faceted-master.jpg',
    1400, 1050
  );

  // 5. Curated Wholesale Faceted Lot Product Imagery
  await processImage(
    'libra_gems_wholesale_parcel_v2_1794491280253.jpg',
    'wholesale-faceted-lot-overview.jpg',
    1400, 1050
  );
  await processImage(
    'libra_gems_wholesale_parcel_1794491251027.jpg',
    'wholesale-faceted-lot-macro.jpg',
    1200, 900
  );

  // 6. Natural Matrix Turquoise Cabochon & Slab
  await processImage(
    'natural_matrix_turquoise_gemstone_1794491353330.jpg',
    'turquoise-cabochon-and-slab.jpg',
    1400, 1050
  );

  console.log('=== All Catalog Imagery Optimized Successfully ===');
}

run().catch(err => {
  console.error('Error optimizing imagery:', err);
  process.exit(1);
});
