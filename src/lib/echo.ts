import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import type { ChannelAuthorizationCallback } from 'pusher-js'

type ChannelAuthData = Parameters<ChannelAuthorizationCallback>[1];

declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}

window.Pusher = Pusher;

export const echoClient = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 8080,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 8080,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
    authorizer: (channel: { name: string }) => ({
        authorize: (socketId: string, callback: ChannelAuthorizationCallback) => {
            fetch(`${import.meta.env.VITE_API_URL}/broadcasting/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('katrium_token')}`,
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    socket_id: socketId,
                    channel_name: channel.name,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Broadcasting auth failed: ${response.status}`);
                    }
                    return response.json() as Promise<ChannelAuthData>;
                })
                .then((data) => callback(null, data))
                .catch((error) => {
                    const err = error instanceof Error ? error : new Error(String(error));
                    callback(err, { auth: '' });
                });
        },
    }),
});