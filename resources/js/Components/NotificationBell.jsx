import React, { useState, useEffect } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const csrfToken = window.Laravel.csrfToken;

        fetch('/notifications', {
            method: 'GET',
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setNotifications(data);
        })
        .catch(error => {
            console.error('Error fetching notifications:', error);
        });

        window.Pusher = Pusher;

        window.Echo = new Echo({
            broadcaster: 'pusher',
            key: import.meta.env.VITE_PUSHER_APP_KEY,
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
            forceTLS: true,
            encrypted: true,
            authorizer: (channel, options) => {
                return {
                    authorize: (socketId, callback) => {
                        fetch("/broadcasting/auth", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "X-CSRF-TOKEN": csrfToken
                            },
                            body: JSON.stringify({
                                socket_id: socketId,
                                channel_name: channel.name
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.auth) {
                                callback(false, data);
                            } else {
                                callback(true, data);
                            }
                        })
                        .catch(error => {
                            console.error('Error authorizing:', error);
                            callback(true, error);
                        });
                    }
                };
            }
        });

        // Listen for public messages
        window.Echo.channel('public-messages')
            .listen('PublicMessageSent', (e) => {
                addNotification(e.message);
            });

        // Listen for private messages
        window.Echo.private(`private-messages.${window.Laravel.userId}`)
            .listen('PrivateMessageSent', (e) => {
                addNotification(e.message);
            });

        return () => {
            window.Echo.leaveChannel('public-messages');
            window.Echo.leaveChannel(`private-messages.${window.Laravel.userId}`);
        };
    }, []);

    const addNotification = (message) => {
        setNotifications((prevNotifications) => [
            ...prevNotifications,
            { message: message, read: false, id: Date.now() }, // Koristimo Date.now() za privremeni ID
        ]);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const removeNotification = (index) => {
        const notification = notifications[index];
        fetch(`/notifications/${notification.id}/read`, {
            method: 'PATCH',
            headers: {
                'X-CSRF-TOKEN': window.Laravel.csrfToken,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setNotifications((prevNotifications) => {
                const newNotifications = [...prevNotifications];
                newNotifications.splice(index, 1);
                return newNotifications;
            });
        })
        .catch(error => {
            console.error('Error marking notification as read:', error);
        });
    };

    const clearAllNotifications = () => {
        notifications.forEach((notification, index) => {
            fetch(`/notifications/${notification.id}/read`, {
                method: 'PATCH',
                headers: {
                    'X-CSRF-TOKEN': window.Laravel.csrfToken,
                    'Content-Type': 'application/json'
                }
            })
            .catch(error => {
                console.error('Error marking notification as read:', error);
            });
        });
        setNotifications([]);
    };

    return (
        <div className="notification-bell">
            <button onClick={toggleDropdown}>
            <div className="relative inline-flex">
                <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                    alt="profile picture"
                    className="inline-block relative object-cover object-center !rounded-full w-12 h-12 -mt-2" />
                </div>
                {notifications.length > 0 && (
                    // <span className="badge">{notifications.length}</span>
                    <span
                        className="absolute min-w-[12px] min-h-[12px] rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center top-[4%] right-[2%] translate-x-2/4 -translate-y-2/4 bg-red-500 text-white">
                    </span>
                )}
            </button>
            {isDropdownOpen && (
                <div className="dropdown">
                    {notifications.length === 0 ? (
                        <div className="dropdown-item">No notifications</div>
                    ) : (
                        <>
                            {notifications.map((notification, index) => (
                                <div key={index} className="dropdown-item">
                                    {notification.message}
                                    <button onClick={() => removeNotification(index)} className="remove-button">
                                        &times;
                                    </button>
                                </div>
                            ))}
                            <div className="dropdown-item">
                                <button onClick={clearAllNotifications} className="clear-button">
                                    Clear All
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
