'use client'

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

interface NotificationMessageProps {
    src: string
    title: string
    time: string
}

const NotificationMessage: React.FC<NotificationMessageProps> = ({
    src,
    title,
    time
}) => {
    return (
        <li className="notification-message">
            <Link href="#">
                <div className="media d-flex">
                    <span className="avatar avatar-sm flex-shrink-0">
                        <img
                            className="avatar-img rounded-circle"
                            alt="User Image"
                            src={src}
                        />
                    </span>
                    <div className="media-body flex-grow-1">
                        <p className="noti-details">
                            <span className="noti-title">{title}</span>
                        </p>
                        <p className="noti-time">
                            <span className="notification-time">
                                {time}
                            </span>
                        </p>
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default NotificationMessage