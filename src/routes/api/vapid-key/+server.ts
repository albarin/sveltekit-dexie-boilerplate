import { json } from '@sveltejs/kit';
import { VAPID_PUBLIC_KEY } from '$env/static/private';

export const GET = () => {
	return json({ data: VAPID_PUBLIC_KEY });
};
