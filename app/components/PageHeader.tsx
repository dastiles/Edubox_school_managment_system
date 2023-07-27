'use client'
import Link from 'next/link'
import React from 'react'

interface PageHeaderProps {
    title: string
    href: string
    linkTitle: string
    titleActive: string
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    href,
    linkTitle,
    titleActive
}) => {
    return (

        <div className="page-header">
            <div className="row">
                <div className="col-sm-12">
                    <div className="page-sub-header">
                        <h3 className="page-title">{title}</h3>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link href={href}>{linkTitle}</Link>
                            </li>
                            <li className="breadcrumb-item active">{titleActive}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PageHeader