import fs from 'fs';
import path from 'path';

const API_URL = 'http://localhost:3000/api/resume'; // Make sure your dev server is running!
const OUTPUT_PATH = path.join(__dirname, '../public/Resume_Escarlan_John_Lester.pdf');

async function downloadResume() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch resume PDF: ${res.statusText}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(OUTPUT_PATH, buffer);
  console.log('Resume PDF saved to public/Resume_Escarlan_John_Lester.pdf');
}

downloadResume().catch(err => {
  console.error(err);
  process.exit(1);
}); 