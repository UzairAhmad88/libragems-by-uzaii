/**
 * Root Server Entrypoint for Hostinger / cPanel Node.js Application Managers
 *
 * Allows Hostinger to start the application when configured with:
 * - Application Root: Repository root (e.g. /home/uXXXX/public_html or /home/uXXXX/nodejs)
 * - Application Startup File: server.js
 *
 * It seamlessly launches the standalone Next.js production server.
 */

const path = require('path');
const fs = require('fs');

const standaloneServer = path.join(__dirname, 'apps', 'web', '.next', 'standalone', 'server.js');

if (!fs.existsSync(standaloneServer)) {
  console.error('[Libra Gems] Error: Standalone server build output not found.');
  console.error(`[Libra Gems] Expected at: ${standaloneServer}`);
  console.error('[Libra Gems] Please execute "npm run build" to generate the standalone production build.');
  process.exit(1);
}

require(standaloneServer);
