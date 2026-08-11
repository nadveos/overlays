const fs = require('fs');
const buffer = fs.readFileSync('test_alpha.webm');
const hex = buffer.toString('hex');
if (hex.includes('53c0')) {
  console.log('Alpha chunk (53C0) found! It MIGHT have transparency.');
} else {
  console.log('No Alpha chunk found. It is OPAQUE.');
}
