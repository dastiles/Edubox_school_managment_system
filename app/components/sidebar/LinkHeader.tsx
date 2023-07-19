'use client'

import Link from "next/link"

interface LinkHeaderProps {
    isSideMenu: string
    toggleSidebar: (value: string) => void
    iconClass: string
    title: string
}

const LinkHeader: React.FC<LinkHeaderProps> = ({
    isSideMenu,
    toggleSidebar,
    iconClass,
    title
}) => {
    return (
        <Link
            href="#"
            className={isSideMenu == title ? "subdrop" : ""}
            onClick={() =>
                toggleSidebar(
                    isSideMenu == title ? "" : title
                )
            }
        >
            <i className={iconClass} /> <span> {title}</span>{" "}
            <span className="menu-arrow" />
        </Link>
    )
}

export default LinkHeader