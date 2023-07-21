'use client'

/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react'
import Logo from './Logo';
import Search from './Search';
import Notification from './Notification';
import ZoomOutIn from './ZoomOutIn';
import UserMenu from './UserMenu';
import { usePathname } from 'next/navigation';
import { Admin } from '@prisma/client';

interface HeaderProps {
    currentUser: Admin
}

const Header: React.FC<HeaderProps> = ({
    currentUser
}) => {
    const [openNotification, setOpenNotification] = useState(false)
    const location = usePathname()
    console.log(location)

    const toggleNotification = useCallback(() => {
        setOpenNotification((value) => !value)
    }, [])
    const handlesidebar = () => {
        document.body.classList.toggle("mini-sidebar");
    };

    const handlesidebarmobilemenu = () => {
        document.body.classList.toggle('slide-nav');
    }

    useEffect(() => {
        const handleClick = () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }

        const maximizeBtn = document.querySelector('.win-maximize');
        maximizeBtn?.addEventListener('click', handleClick);

        return () => {
            maximizeBtn?.removeEventListener('click', handleClick);
        };

    }, []);
    return (
        <>
            {/* HEADER */}
            <div className="header">
                {/* Logo */}
                <div className="header-left">
                    <Logo src='/img/logo.png' width={164} height={52} />
                    <Logo src='/img/logo-small.png' width={30} height={30} />
                </div>
                {/* /Logo */}
                <div className="menu-toggle">
                    <Link href="#" id="toggle_btn" onClick={handlesidebar}>
                        <i className="fas fa-bars" />
                    </Link>
                </div>
                {/* Search Bar */}
                <Search />
                {/* /Search Bar */}
                {/* Mobile Menu Toggle */}
                <Link href="#" className="mobile_btn" id="mobile_btn" onClick={() => handlesidebarmobilemenu()}>
                    <i className="fas fa-bars" />
                </Link>
                {/* /Mobile Menu Toggle */}
                {/* Header Right Menu */}
                <ul className='nav user-menu'>
                    <Notification />
                    <ZoomOutIn />
                    <UserMenu user={currentUser} />
                </ul>
            </div>
        </>
    )
}

export default Header