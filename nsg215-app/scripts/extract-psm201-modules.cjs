const fs = require('fs');
const path = require('path');

const srcPath = 'C:/Users/IKA/.gemini/antigravity/brain/9132d844-d908-46be-b21b-c3088d445952/.user_uploaded/media_1795438582576_9f925ab3.md';
const content = fs.readFileSync(srcPath, 'utf8');

// Match each block between ~~~json and ~~~ that contains { ... }
const regex = /~~~json\s*(\{[\s\S]*?\})\s*~~~/g;
let match;
let count = 0;

const contentDir = path.resolve('content/psm201');
const srcDir = path.resolve('nsg215-app/src/data/psm201');
fs.mkdirSync(contentDir, { recursive: true });
fs.mkdirSync(srcDir, { recursive: true });

while ((match = regex.exec(content)) !== null) {
  const jsonStr = match[1].trim();
  try {
    const parsed = JSON.parse(jsonStr);
    const modId = parsed.id;
    count++;
    const fileName = `module${modId}.json`;
    fs.writeFileSync(path.join(contentDir, fileName), JSON.stringify(parsed, null, 2), 'utf8');
    fs.writeFileSync(path.join(srcDir, fileName), JSON.stringify(parsed, null, 2), 'utf8');
    console.log(`Saved ${fileName} (id: ${parsed.id}, title: ${parsed.title}, ITQs: ${parsed.inTextQuestions?.length || 0}, SAQs: ${parsed.saqs?.length || 0})`);
  } catch (err) {
    console.error(`Error parsing block ${count + 1}:`, err.message);
  }
}

console.log(`Total extracted modules: ${count}`);
