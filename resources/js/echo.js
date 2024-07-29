import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true,
  encrypted: true
});

window.Echo.connector.pusher.connection.bind('connected', () => {
  console.log('Connected to Pusher');
});

window.Echo.connector.pusher.connection.bind('disconnected', () => {
  console.log('Disconnected from Pusher');
});

window.Echo.connector.pusher.connection.bind('error', (err) => {
  console.error('Pusher error:', err);
});

window.Echo.connector.pusher.connection.bind('pusher:subscription_succeeded', (data) => {
  console.log('Subscribed to channel:', data);
});

window.Echo.channel('immediate-messages')
  .listen('ImmediateMessageSent', (e) => {
    console.log('Message received:', e.message);
  });
