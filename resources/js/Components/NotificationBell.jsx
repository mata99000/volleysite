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

        // Listen for private messages
        window.Echo.private(`private-messages.${window.Laravel.userId}`)
            .listen('PrivateMessageSent', (e) => {
                addNotification(e.message, e.clubName, e.withButtons);
            });

        return () => {
            window.Echo.leaveChannel(`private-messages.${window.Laravel.userId}`);
        };
    }, []);

    const addNotification = (message, clubName, withButtons) => {
        setNotifications((prevNotifications) => [
            ...prevNotifications,
            { message: message, clubName: clubName, withButtons: withButtons, id: Date.now() },
        ]);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const acceptInvitation = (clubName, index) => {
        fetch(`/clubs/${clubName}/accept-invitation`, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': window.Laravel.csrfToken,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message || 'Poziv je prihvaćen.');
            markNotificationAsRead(index); // Mark as read and remove
        })
        .catch(error => {
            console.error('Greška pri prihvatanju poziva:', error);
        });
    };

    const rejectInvitation = (clubName, index) => {
        fetch(`/clubs/${clubName}/reject-invitation`, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': window.Laravel.csrfToken,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message || 'Poziv je odbijen.');
            markNotificationAsRead(index); // Mark as read and remove
        })
        .catch(error => {
            console.error('Greška pri odbijanju poziva:', error);
        });
    };

    const markNotificationAsRead = (index) => {
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
                <div className="relative inline-flex w-fit">
                    <div className="flex items-center justify-center rounded-lg text-center text-white dark:text-gray-200">
                        <span className="[&>svg]:h-6 [&>svg]:w-6">
                            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.5 1C10.9477 1 10.5 1.44772 10.5 2V3H9.99998C7.23864 3 4.99999 5.23825 4.99999 7.99975V11C4.99999 11.7377 4.76718 12.5722 4.39739 13.4148C4.03165 14.2482 3.55876 15.0294 3.14142 15.6439C2.38188 16.7624 2.85216 18.5301 4.40564 18.8103C5.42144 18.9935 6.85701 19.2115 8.54656 19.3527C8.54454 19.4015 8.54352 19.4506 8.54352 19.5C8.54352 21.433 10.1105 23 12.0435 23C13.9765 23 15.5435 21.433 15.5435 19.5C15.5435 19.4482 15.5424 19.3966 15.5402 19.3453C17.1921 19.204 18.596 18.9903 19.5943 18.8103C21.1478 18.5301 21.6181 16.7624 20.8586 15.6439C20.4412 15.0294 19.9683 14.2482 19.6026 13.4148C19.2328 12.5722 19 11.7377 19 11V7.99975C19 5.23825 16.7613 3 14 3H13.5V2C13.5 1.44772 13.0523 1 12.5 1H11.5ZM12 19.5C12.5113 19.5 13.0122 19.4898 13.4997 19.4715C13.5076 20.2758 12.8541 20.9565 12.0435 20.9565C11.2347 20.9565 10.5803 20.2778 10.5872 19.4747C11.0473 19.491 11.5191 19.5 12 19.5ZM9.99998 5C8.34305 5 6.99999 6.34298 6.99999 7.99975V11C6.99999 12.1234 6.65547 13.2463 6.22878 14.2186C5.79804 15.2 5.25528 16.0911 4.79599 16.7675C4.78578 16.7825 4.78102 16.7969 4.77941 16.8113C4.77797 16.8242 4.77919 16.8362 4.78167 16.8458C6.3644 17.1303 9.00044 17.5 12 17.5C14.9995 17.5 17.6356 17.1303 19.2183 16.8458C19.2208 16.8362 19.222 16.8242 19.2206 16.8113C19.2189 16.7969 19.2142 16.7825 19.204 16.7675C18.7447 16.0911 18.2019 15.2 17.7712 14.2186C17.3445 13.2463 17 12.1234 17 11V7.99975C17 6.34298 15.6569 5 14 5H9.99998Z" fill="#0F0F0F"/>
                            </svg>
                        </span>
                    </div>
                </div>
                {notifications.length > 0 && (
                    <span className="absolute min-w-[10px] min-h-[10px] rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center top-[4%] right-[2%] translate-x-2/4 -translate-y-2/4 bg-red-500 text-white"></span>
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
                                    <span dangerouslySetInnerHTML={{ __html: notification.message }} />
                                    {notification.withButtons && (
                                        <div className="mt-2">
                                            <button
                                                onClick={() => acceptInvitation(notification.clubName, index)}
                                                className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-700"
                                            >
                                                Prihvati
                                            </button>
                                            <button
                                                onClick={() => rejectInvitation(notification.clubName, index)}
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                                            >
                                                Odbij
                                            </button>
                                        </div>
                                    )}
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