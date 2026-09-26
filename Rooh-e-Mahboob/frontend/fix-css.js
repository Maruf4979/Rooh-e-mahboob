const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

// Replace `--outline` text colors with `--on-surface-variant`
css = css.replace(/color:\s*var\(--outline\);/g, 'color: var(--on-surface-variant);');

// Make active sidebar link primary color instead of secondary (light orange)
css = css.replace(/\.account-sidebar a\.active \{\s*color:\s*var\(--secondary\);/g, '.account-sidebar a.active {\n  color: var(--primary);');

// Make account stats values primary color instead of secondary
css = css.replace(/\.account-stat \.value \{([\s\S]*?)color:\s*var\(--secondary\);/g, '.account-stat .value {$1color: var(--primary);');

// Darken the --on-surface-variant a little bit in light theme for better visibility
// It was #565959, let's make it #444444
css = css.replace(/--on-surface-variant:\s*#565959;/g, '--on-surface-variant: #444444;');

// Fix the member tier color in tier cards (secondary is light orange, making it dark)
css = css.replace(/\.tier-discount \{\s*font-size:\s*2\.5rem;\s*font-weight:\s*800;\s*color:\s*var\(--secondary\);/g, '.tier-discount {\n  font-size: 2.5rem;\n  font-weight: 800;\n  color: var(--primary);');

fs.writeFileSync('app/globals.css', css);
console.log('CSS updated successfully');
