'use client'

interface LogoProps {
    src: string
    width?: number,
    height?: number,

}

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo: React.FC<LogoProps> = ({
    src,
    width,
    height
}) => {
    return (
        <Link href="/" className={`logo ${width === 30 && "logo-small"}`}>
            <Image
                width={width}
                height={height}
                alt='logo'
                src={src}

            />
        </Link>
    )
}

export default Logo