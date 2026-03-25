# SF.gov Git Hash Browser Extension

Automatically displays the deployed git hash in the bottom-right corner of SF.gov pages.

## Features

- Automatically detects and displays the git hash on any SF.gov page
- Shows a subtle badge in the bottom-right corner (7-character short hash)
- Click the badge to copy the full hash to clipboard
- Only appears on pages that have the git hash
- Low opacity by default, becomes fully visible on hover

## Installation

### Chrome/Edge/Brave

1. Open your browser and go to extensions page:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
   - Brave: `brave://extensions`

2. Enable "Developer mode" (toggle in top-right corner)

3. Click "Load unpacked"

4. Navigate to and select the `browser-extension` folder in this repo

5. The extension should now be active!

### Firefox

1. Open Firefox and go to `about:debugging#/runtime/this-firefox`

2. Click "Load Temporary Add-on"

3. Navigate to the `browser-extension` folder and select `manifest.json`

4. The extension will be active until you restart Firefox (for permanent installation, the extension needs to be signed)

## Usage

Just browse to any SF.gov site:
- https://sf.gov
- https://web-training-ecs.dev.sf.gov
- Any other *.sf.gov domain

If the page has a git hash, you'll see a small badge in the bottom-right corner showing the first 7 characters of the hash (e.g., `28d4c1d`).

**Click the badge** to copy the full hash to your clipboard!

## Customization

You can customize the appearance by editing `styles.css`:

- **Position**: Change `bottom` and `right` values
- **Size**: Adjust `font-size` and `padding`
- **Opacity**: Modify the `opacity` value (0.6 = 60% transparent)
- **Colors**: Change `background` and `color` values

## Troubleshooting

**Badge not appearing:**
- Make sure the extension is enabled in your browser's extension manager
- Check the browser console for any errors
- Verify the page actually has the git hash by running in DevTools Console:
  ```javascript
  document.querySelector('footer[role="contentinfo"]')?.dataset.gitHash
  ```

**Extension not loading:**
- Make sure you selected the correct folder containing `manifest.json`
- Check for any syntax errors in the JSON files
- Try reloading the extension

## Uninstallation

1. Go to your browser's extensions page
2. Find "SF.gov Git Hash Display"
3. Click "Remove" or toggle it off
