import { DEXIE_CLIENT_ID, DEXIE_CLIENT_SECRET, DEXIE_CLOUD_URL } from "$env/static/private";
import type { PushSubscription } from "web-push";

const getToken = async () => {
  try {
    const response = await fetch(`${DEXIE_CLOUD_URL}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        scopes: [
          'GLOBAL_READ',
          'GLOBAL_WRITE',
          'ACCESS_DB',
        ],
        client_id: DEXIE_CLIENT_ID,
        client_secret: DEXIE_CLIENT_SECRET,
      }),
    })

    if (!response.ok) {
      console.error(`Failed to get token, status: ${response.status}`);
      return null;
    }

    const token = await response.json();
    return token.accessToken;
  } catch (error) {
    console.error(`Exception while getting token: ${error}`);
    return null;
  }
}

const getAllSubscriptions = async () => {
  const token = await getToken();
  if (!token) {
    return [];
  }

  try {
    const response = await fetch(`${DEXIE_CLOUD_URL}/my/subscriptions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(`Failed to get subscriptions, status: ${response.status}`);
      return [];
    }

    return response.json();
  } catch (error) {
    console.error(`Exception while getting subscriptions: ${error}`);
    return [];
  }
}

const getSubscription = async (user: string): Promise<PushSubscription | null> => {
  const token = await getToken();
  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${DEXIE_CLOUD_URL}/my/subscriptions?user=${user}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(`Failed to get subscriptions, status: ${response.status}`);
      return null;
    }

    const data = await response.json();
    if (data.length === 0) {
      return null;
    }

    return data[0];
  }
  catch (error) {
    console.error(`Exception while getting subscription: ${error}`);
    return null;
  }
};

const createSubscription = async (subscription: PushSubscription) => {
  const token = await getToken();
  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${DEXIE_CLOUD_URL}/my/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(subscription),
    });

    if (!response.ok) {
      console.error(`Failed to create subscription, status: ${response.status}`);
      return null;
    }

    return response.json();
  } catch (error) {
    console.error(`Exception while creating subscription: ${error}`);
    return null;
  }
}

const deleteSubscription = async (id: string) => {
  const token = await getToken();
  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${DEXIE_CLOUD_URL}/my/subscriptions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(`Failed to delete subscription ${id}, status: ${response.status}`);
      return null;
    }

    return response.json();
  } catch (error) {
    console.error(`Exception while deleting subscription ${id}: ${error}`);
    return null;
  }
}

const createNotification = async (user: string, message: string) => {
  const token = await getToken();
  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${DEXIE_CLOUD_URL}/all/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        message,
        read: false,
        owner: user,
        realmId: user,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`Failed to create notification, status: ${response.status}, response: ${text}`);

      return null;
    }

    return response.json();
  } catch (error) {
    console.error(`Exception while creating notification: ${error}`);
    return null;
  }
}

export default {
  getSubscription,
  getAllSubscriptions,
  createSubscription,
  deleteSubscription,
  createNotification,
}