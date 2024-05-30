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

export const checkPermission = () => {
  if (!('serviceWorker' in navigator)) {
    throw new Error("No support for service worker!")
  }

  if (!('Notification' in window)) {
    throw new Error("No support for notification API");
  }

  if (!('PushManager' in window)) {
    throw new Error("No support for Push API")
  }
  console.log("All good!")
}
export const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission)
  if (permission !== 'granted') {
    throw new Error("Notification permission not granted")
  }
}

export const sendNotification = async () => {
  navigator.serviceWorker.ready.then((registration) => {
    registration.showNotification("My First notification!");
  });
}