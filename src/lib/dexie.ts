import { DEXIE_CLOUD_URL, ORIGIN } from "$env/static/private";
import type { PushSubscription } from "web-push";

const getAllSubscriptions = async (token: string) => {
  try {
    const response = await fetch(`${DEXIE_CLOUD_URL}/my/subscriptions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Origin': ORIGIN,
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

const getSubscription = async (user: string, token: string, source: string = 'my'): Promise<PushSubscription | null> => {
  try {
    const response = await fetch(`${DEXIE_CLOUD_URL}/${source}/subscriptions?user=${user}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Origin': ORIGIN,
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

const getSubscriptionFromAll = async (user: string, token: string): Promise<PushSubscription | null> => {
  return getSubscription(user, token, 'all');
}

const createSubscription = async (subscription: PushSubscription, token: string) => {
  try {
    const response = await fetch(`${DEXIE_CLOUD_URL}/my/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Origin': ORIGIN,
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

const deleteSubscription = async (id: string, token: string) => {
  try {
    const response = await fetch(`${DEXIE_CLOUD_URL}/my/subscriptions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Origin': ORIGIN,
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

const createNotification = async (user: string, message: string, token: string) => {
  try {
    const response = await fetch(`${DEXIE_CLOUD_URL}/all/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Origin': ORIGIN,
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
  getSubscriptionFromAll,
  getAllSubscriptions,
  createSubscription,
  deleteSubscription,
  createNotification,
}