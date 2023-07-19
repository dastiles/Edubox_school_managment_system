'use client'
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

const UserMenu = () => {
    return (

        <li className="nav-item dropdown has-arrow new-user-menus">
            <Link
                href="#"
                className="dropdown-toggle nav-link"
                data-bs-toggle="dropdown"
            >
                <span className="user-img">
                    <img
                        className="rounded-circle"
                        src='img/profiles/avatar-01.jpg'
                        width={31}
                        alt="Ryan Taylor"
                    />
                    <div className="user-text">
                        <h6>Ryan Taylor</h6>
                        <p className="text-muted mb-0">Administrator</p>
                    </div>
                </span>
            </Link>
            <div className="dropdown-menu">
                <div className="user-header">
                    <div className="avatar avatar-sm">
                        <img
                            src='img/profiles/avatar-01.jpg'
                            alt="User Image"
                            className="avatar-img rounded-circle"
                        />
                    </div>
                    <div className="user-text">
                        <h6>Ryan Taylor</h6>
                        <p className="text-muted mb-0">Administrator</p>
                    </div>
                </div>
                <Link className="dropdown-item" href="/profile">
                    My Profile
                </Link>
                <Link className="dropdown-item" href="/inbox">
                    Inbox
                </Link>
                <Link className="dropdown-item" href="/auth/register">
                    Logout
                </Link>
            </div>
        </li>

    )
}

export default UserMenu