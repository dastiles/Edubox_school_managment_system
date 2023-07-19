'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideBarLinkProps {
    link: string
    title: string
}

const SideBarLink: React.FC<SideBarLinkProps> = ({
    link,
    title
}) => {
    let pathName = usePathname();
    return (
        <li>
            <Link
                href={link}
                className={`${link === pathName ? "active" : ""
                    }`}
            >
                {title}
            </Link>
        </li>
    )
}

export default SideBarLink