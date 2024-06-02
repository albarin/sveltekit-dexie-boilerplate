export async function unsubscribe(): Promise<boolean> {
  if (!('serviceWorker' in navigator)) {
    return false;
  }

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    return false;
  }

  try {
    const jsonSubscription = JSON.parse(JSON.stringify(subscription));

    const res = await fetch(`/api/subscriptions/${jsonSubscription.keys.p256dh}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error(`Failed to unsubscribe, status: ${res.status}`);
      return false;
    }
    return await subscription?.unsubscribe();
  } catch (error) {
    console.error(`Exception while unsubscribing: ${error}`);
    return false;
  }
}

export async function subscribe(user: string | undefined): Promise<PushSubscription | null> {
  if (!('serviceWorker' in navigator)) {
    return null;
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    return null;
  }

  const vapidKey = await getVapidKey();

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: vapidKey
  });

  try {
    const response = await fetch('/api/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: JSON.parse(JSON.stringify(subscription)).keys.p256dh,
        user: user || '',
        subscription,
      }),
    });

    if (!response.ok) {
      console.error(`Failed to create subscription, status: ${response.status}`);
      return null;
    }

    return subscription;
  } catch (err) {
    console.error('Error fetching vapid key: ', err);
  }

  return null;
};

export async function getSubscription(): Promise<PushSubscription | null> {
  if (!('serviceWorker' in navigator)) {
    return null;
  }

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();

  return subscription;
}

async function getVapidKey(): Promise<string> {
  try {
    const res = await fetch('/api/vapid-key');

    if (!res.ok) {
      console.error(`Failed to fetch vapid key, status: ${res.status}`);
      return '';
    }

    const { data: vapidKey } = await res.json();
    return vapidKey;
  } catch (error) {
    console.error(`Exception while fetching vapid key: ${error}`);
    return '';
  }
}

// export const checkPermission = () => {
//   if (!('serviceWorker' in navigator)) {
//     throw new Error("No support for service worker!")
//   }

//   if (!('Notification' in window)) {
//     throw new Error("No support for notification API");
//   }

//   if (!('PushManager' in window)) {
//     throw new Error("No support for Push API")
//   }
// }

// export const requestNotificationPermission = async () => {
//   const permission = await Notification.requestPermission();

//   if (permission !== 'granted') {
//     throw new Error("Notification permission not granted")
//   }
// }