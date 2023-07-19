'use client'

interface ClientOnlyProps {
    children: React.ReactNode
}

import { useEffect, useState } from 'react'

const ClientOnly: React.FC<ClientOnlyProps> = ({
    children
}) => {
    const [mounted, isMounted] = useState(false)

    useEffect(() => {
        isMounted(true)
    }, [mounted])

    if (!mounted) return null

    return (
        <>{children}</>
    )
}

export default ClientOnly