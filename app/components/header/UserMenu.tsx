'use client'
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Admin } from '@prisma/client';

interface UserMenuProps {
    user: Admin
}

const UserMenu: React.FC<UserMenuProps> = ({
    user
}) => {
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
                        src='/img/profiles/avatar-01.jpg'
                        width={31}
                        alt="user profile"
                    />
                    <div className="user-text">
                        <h6>{user.username}</h6>
                        <p className="text-muted mb-0">Administrator</p>
                    </div>
                </span>
            </Link>
            <div className="dropdown-menu">
                <div className="user-header">
                    <div className="avatar avatar-sm">
                        <img
                            src='/img/profiles/avatar-01.jpg'
                            alt="User Image"
                            className="avatar-img rounded-circle"
                        />
                    </div>
                    <div className="user-text">
                        <h6>{user.username}</h6>
                        <p className="text-muted mb-0">Administrator</p>
                    </div>
                </div>
                <Link className="dropdown-item" href={`/profile/${user.id}`}>
                    My Profile
                </Link>
                <Link className="dropdown-item" href="/inbox">
                    Inbox
                </Link>
                <Link className="dropdown-item" href="#" onClick={() => signOut()}>
                    Logout
                </Link>
            </div>
        </li>

    )
}

export default UserMenu