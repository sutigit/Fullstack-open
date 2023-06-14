import React from 'react'

export default function Notification({ notification }) {
    if (notification === null) {
        return null
    }
    
    const notificationStyle = {
        color: notification.type === "notification" ? 'green' : 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        <div style={notificationStyle}>{ notification.message }</div>
    )
}
