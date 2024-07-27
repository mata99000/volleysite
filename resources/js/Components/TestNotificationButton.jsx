import React from 'react';
import axios from 'axios';

const TestNotificationButton = () => {
    const createTestNotification = () => {
        axios.post('/test-notification', {}, {
            headers: {
                'X-CSRF-TOKEN': window.Laravel.csrfToken
            }
        })
        .then(response => {
            console.log(response.data.message);
        })
        .catch(error => {
            console.error('Error creating test notification:', error);
        });
    };

    return (
        <button onClick={createTestNotification} className="test-notification-button">
            Create Test Notification
        </button>
    );
};

export default TestNotificationButton;
