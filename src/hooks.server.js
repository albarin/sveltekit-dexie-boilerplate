
export const handle = async ({ event, resolve }) => {
    if (event.url.pathname.startsWith('/api')) {
        const authHeader = event.request.headers.get('authorization');

        if (!authHeader) {
            return new Response(null, { status: 401 });
        }
    }

    return resolve(event);
};