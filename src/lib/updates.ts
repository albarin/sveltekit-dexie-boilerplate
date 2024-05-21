export async function detectSWUpdate() {
  const registration = await navigator.serviceWorker.ready;

  if (registration?.waiting) {
    if (confirm('A new app version is available. Reload to update?')) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  }

  registration.addEventListener('updatefound', () => {
    const newSW = registration?.installing;
    newSW?.addEventListener('statechange', async () => {
      if (newSW.state === 'installed') {
        if (confirm('A new app version is available. Reload to update?')) {
          newSW.postMessage({ type: 'SKIP_WAITING' });
          window.location.reload();
        }
      }
    });
  });
}
