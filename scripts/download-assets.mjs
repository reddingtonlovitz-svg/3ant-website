import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

/**
 * Download a file from a URL to a local destination.
 * @param {string} url 
 * @param {string} dest 
 */
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);

    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (status code ${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {}); // cleanup
      reject(err);
    });
  });
}

/**
 * Main function to download assets from a JSON list.
 * @param {Array<{url: string, path: string}>} assets 
 */
async function downloadAssets(assets) {
  console.log(`Starting download of ${assets.length} assets...`);
  const results = await Promise.allSettled(
    assets.map(async (asset) => {
      const fullPath = path.resolve(process.cwd(), asset.path);
      const dir = path.dirname(fullPath);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      try {
        await downloadFile(asset.url, fullPath);
        console.log(`✓ Downloaded: ${asset.url} -> ${asset.path}`);
      } catch (err) {
        console.error(`✗ Failed: ${asset.url} - ${err.message}`);
      }
    })
  );

  const completed = results.filter(r => r.status === 'fulfilled').length;
  console.log(`\nFinished: ${completed}/${assets.length} downloads successful.`);
}

// Usage: 
// The agent generates the 'assets' array by inspecting the target page,
// then writes it here and runs the script.
const assetsToDownload = [
  // Example:
  // { url: 'https://example.com/logo.png', path: 'public/images/logo.png' }
];

if (assetsToDownload.length > 0) {
  downloadAssets(assetsToDownload);
} else {
  console.log("No assets to download. Add them to 'assetsToDownload' array.");
}
