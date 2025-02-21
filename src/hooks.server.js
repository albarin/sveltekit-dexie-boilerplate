import { API_KEY } from '$env/static/private';

export const handle = async ({ event, resolve }) => {
    if (event.url.pathname.startsWith('/api')) {
        const authHeader = event.request.headers.get('authorization');

        if (authHeader !== `Bearer ${API_KEY}`) {
            return new Response(null, { status: 401 });
        }
    }

    return resolve(event);
};