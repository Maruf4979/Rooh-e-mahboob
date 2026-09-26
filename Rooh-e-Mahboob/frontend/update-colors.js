const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

// Replace `--secondary: #febd69;` and `--secondary-container: #f0c14b;` in the `:root` pseudo-class (light theme)
// We will target the first occurrence which is inside `:root` block, leaving the `.dark` block untouched.

let rootStart = css.indexOf(':root {');
let rootEnd = css.indexOf('}', rootStart);
let rootBlock = css.substring(rootStart, rootEnd);

rootBlock = rootBlock.replace(/--secondary:\s*#febd69;/, '--secondary: #e47911;');
rootBlock = rootBlock.replace(/--secondary-container:\s*#f0c14b;/, '--secondary-container: #cc6600;');

css = css.substring(0, rootStart) + rootBlock + css.substring(rootEnd);

fs.writeFileSync('app/globals.css', css);
console.log('Colors updated in globals.css');
