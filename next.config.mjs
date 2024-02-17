// next.config.mjs
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { config as dotenvConfig } from 'dotenv';

// Get the directory path of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

dotenvConfig({ path: resolve(__dirname, '.env') });

const nextConfig = {
  // Your Next.js configuration options here
};

export default nextConfig;