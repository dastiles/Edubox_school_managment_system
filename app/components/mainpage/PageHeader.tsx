'use client'
import Link from 'next/link'
import React from 'react'

const PageHeader = () => {
    return (
        <div className="page-header">
            <div className="row">
                <div className="col-sm-12">
                    <div className="page-sub-header">
                        <h3 className="page-title">Welcome Admin!</h3>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link href="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item active">Admin</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageHeader