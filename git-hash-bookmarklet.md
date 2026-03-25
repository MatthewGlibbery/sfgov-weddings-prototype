# Git Hash Bookmarklet

A browser bookmarklet to quickly view the deployed git hash on SF.gov pages.

## Installation

1. **Chrome/Edge/Brave:**
   - Show your bookmarks bar (Cmd+Shift+B on Mac, Ctrl+Shift+B on Windows/Linux)
   - Right-click on the bookmarks bar and select "Add page" or "Add bookmark"
   - Name it: `Show Git Hash`
   - In the URL field, paste one of the bookmarklet codes below
   - Click "Save"

2. **Firefox:**
   - Show your bookmarks toolbar (Cmd+Shift+B on Mac, Ctrl+Shift+B on Windows/Linux)
   - Right-click on the bookmarks toolbar and select "New Bookmark"
   - Name it: `Show Git Hash`
   - In the Location field, paste one of the bookmarklet codes below
   - Click "Add"

## Usage

Navigate to any SF.gov page (e.g., https://web-training-ecs.dev.sf.gov/) and click the "Show Git Hash" bookmark.

## Bookmarklet Versions

### Simple Alert Version
Shows the git hash in a simple alert dialog:

```javascript
javascript:(function(){var footer=document.querySelector('footer[role="contentinfo"]');if(footer&&footer.dataset.gitHash){var hash=footer.dataset.gitHash;alert('Git Hash: '+hash);console.log('Git Hash:',hash);navigator.clipboard.writeText(hash).then(()=>console.log('Copied to clipboard!'));}else{alert('Git hash not found');}})();
```

### Pretty UI Version
Shows the git hash in a styled popup with copy button:

```javascript
javascript:(function(){var footer=document.querySelector('footer[role="contentinfo"]');if(footer&&footer.dataset.gitHash){var hash=footer.dataset.gitHash;var div=document.createElement('div');div.style.cssText='position:fixed;top:10px;right:10px;background:#1e293b;color:#fff;padding:16px 20px;border-radius:8px;font-family:monospace;font-size:14px;z-index:999999;box-shadow:0 4px 6px rgba(0,0,0,0.3);';div.innerHTML='<strong>Git Hash:</strong><br>'+hash+'<br><button style="margin-top:8px;padding:4px 8px;cursor:pointer;background:#3b82f6;color:#fff;border:none;border-radius:4px;" onclick="navigator.clipboard.writeText(\''+hash+'\');this.textContent=\'Copied!\'">Copy</button> <button style="margin-top:8px;padding:4px 8px;cursor:pointer;background:#ef4444;color:#fff;border:none;border-radius:4px;" onclick="this.parentElement.remove()">Close</button>';document.body.appendChild(div);console.log('Git Hash:',hash);}else{alert('Git hash not found');}})();
```

## How It Works

The bookmarklet:
1. Finds the footer element with `role="contentinfo"`
2. Reads the `data-git-hash` attribute
3. Displays the hash and copies it to your clipboard
4. Logs the hash to the browser console

## Troubleshooting

**"Git hash not found"**
- The page may not have loaded completely - refresh and try again
- The git hash may not be deployed yet (check that CloudFront is forwarding the Host header)
- Open DevTools Console (F12) and run: `document.querySelector('footer[role="contentinfo"]')?.dataset.gitHash`

**Bookmarklet doesn't work**
- Make sure you copied the entire code snippet (it should start with `javascript:`)
- Some browsers may remove `javascript:` when pasting - manually add it back if needed
- Try refreshing the page before clicking the bookmarklet
