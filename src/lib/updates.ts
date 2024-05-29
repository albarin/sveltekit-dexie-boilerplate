export async function detectSWUpdate(): Promise<ServiceWorker | undefined> {
  const registration = await navigator.serviceWorker.ready;

  if (registration?.waiting) {
    return registration.waiting;
  }

  registration.addEventListener('updatefound', () => {
    const newSW = registration?.installing;
    newSW?.addEventListener('statechange', async () => {
      if (newSW.state === 'installed') {
        return newSW;
      }
    });
  });

  return undefined;
}
