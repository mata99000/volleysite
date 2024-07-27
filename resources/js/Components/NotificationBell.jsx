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
            encrypted: true
        });

        window.Echo.channel('immediate-messages')
            .listen('ImmediateMessageSent', (e) => {
                setNotifications((prevNotifications) => [
                    ...prevNotifications,
                    e.message,
                ]);
            });

        return () => {
            window.Echo.leaveChannel('immediate-messages');
        };
    }, []);

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
                <span role="img" aria-label="notifications">🔔</span>
                {notifications.length > 0 && (
                    <span className="badge">{notifications.length}</span>
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
