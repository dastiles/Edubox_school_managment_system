'use client'
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'


const ZoomOutIn = () => {
    return (
        <li className="nav-item  has-arrow dropdown-heads ">
            <Link href="#" className="win-maximize maximize-icon">
                <img src='img/icons/header-icon-04.svg' alt="" />
            </Link>
        </li>
    )
}

export default ZoomOutIn