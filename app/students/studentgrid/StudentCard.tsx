'use client'
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'


interface StudentCardProps {
    src: string
    studentName: string
    link: string
    role: string
}
const StudentCard: React.FC<StudentCardProps> = ({
    src,
    studentName,
    link,
    role,
}) => {
    return (

        <div className="col-xl-3 col-lg-4 col-md-6 d-flex">
            <div className="card">
                <div className="card-body">
                    <div className="student-box flex-fill">
                        <div className="student-img">
                            <Link href={link}>
                                <img
                                    className="img-fluid"
                                    alt="Students Info"
                                    src={src}
                                />
                            </Link>
                        </div>
                        <div className="student-content pb-0">
                            <h5>
                                <Link href={link}>{studentName}</Link>
                            </h5>
                            <h6>{role}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentCard