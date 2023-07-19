/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'
import NotificationMessage from './NotificationMessage'
import "../../../assets/plugins/bootstrap/js/bootstrap.bundle.min.js"

const Notification = () => {
    return (
        <li className="nav-item dropdown noti-dropdown me-2">
            <Link
                href="#"
                className="dropdown-toggle nav-link header-nav-list"
                data-bs-toggle="dropdown"
            >
                <img src='/img/icons/header-icon-05.svg' alt="" />

            </Link>
            <div className="dropdown-menu notifications">
                <div className="topnav-dropdown-header">
                    <span className="notification-title">Notifications</span>
                    <Link href="#" className="clear-noti">
                        {" "}
                        Clear All{" "}
                    </Link>
                </div>
                <div className="noti-content">
                    <ul className="notification-list">
                        <NotificationMessage src='img/profiles/avatar-02.jpg' time='4 mins ago' title='Carlson Tech has approved your request' />
                        <NotificationMessage src='img/profiles/avatar-02.jpg' time='4 mins ago' title='Carlson Tech has approved your request' />
                        <NotificationMessage src='img/profiles/avatar-02.jpg' time='4 mins ago' title='Carlson Tech has approved your request' />
                        <NotificationMessage src='img/profiles/avatar-02.jpg' time='4 mins ago' title='Carlson Tech has approved your request' />
                    </ul>
                </div>
            </div>
        </li>
    )
}

export default Notification