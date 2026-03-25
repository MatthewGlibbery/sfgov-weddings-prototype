// Wait for page to load
(function() {
  function displayGitHash() {
    const footer = document.querySelector('footer[role="contentinfo"]');

    if (!footer || !footer.dataset.gitHash) {
      return;
    }

    const hash = footer.dataset.gitHash;
    const shortHash = hash.substring(0, 7);

    // Check if badge already exists
    if (document.getElementById('git-hash-badge')) {
      return;
    }

    // Create badge element
    const badge = document.createElement('div');
    badge.id = 'git-hash-badge';
    badge.className = 'git-hash-badge';
    badge.title = `Git Hash: ${hash}\nClick to copy`;
    badge.textContent = shortHash;

    // Click to copy
    badge.addEventListener('click', () => {
      navigator.clipboard.writeText(hash).then(() => {
        const originalText = badge.textContent;
        badge.textContent = '✓ Copied';
        badge.classList.add('copied');
        setTimeout(() => {
          badge.textContent = originalText;
          badge.classList.remove('copied');
        }, 1500);
      });
    });

    document.body.appendChild(badge);
    console.log('[SF.gov Git Hash]', hash);
  }

  // Try immediately
  displayGitHash();

  // Try again after a short delay in case DOM isn't fully ready
  setTimeout(displayGitHash, 500);
  setTimeout(displayGitHash, 1000);
})();
