import React from 'react'
import StudentCard from '../students/studentgrid/StudentCard'
import Link from 'next/link'
import { Teacher } from '@prisma/client'

interface TeachersViewWrapperProps {
    teachers: Teacher[]
}

const TeachersViewWrapper: React.FC<TeachersViewWrapperProps> = ({
    teachers
}) => {
    return (
        <>
            {/* /Page Header */}
            <div className="student-group-form">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by ID ..."
                            />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by Name ..."
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by Phone ..."
                            />
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="search-student-btn">
                            <button type="button" className="btn btn-primary">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12">
                    <div className="card card-table comman-shadow">
                        <div className="card-body pb-0">
                            {/* Page Header */}
                            <div className="page-header">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h3 className="page-title">Teachers</h3>
                                    </div>

                                </div>
                            </div>
                            <div className="student-pro-list">
                                <div className="row">

                                    {teachers.map((teacher) => <StudentCard link={`/teachers/teachersprofile/${teacher.id}`} key={teacher.id} studentName={teacher.name} role='Teacher' src='/img/profiles/avatar-07.jpg' />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default TeachersViewWrapper