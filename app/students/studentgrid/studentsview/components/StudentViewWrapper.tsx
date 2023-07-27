import Link from 'next/link'
import React from 'react'
import StudentCard from '../../StudentCard'
import { Student } from '@prisma/client'

interface StudentViewWrapperProps {
    students: Student[]
}

const StudentViewWrapper: React.FC<StudentViewWrapperProps> = ({
    students
}) => {
    return (
        <>
            <div className="row">
                <div className="col-sm-12">
                    <div className="card card-table comman-shadow">
                        <div className="card-body pb-0">
                            {/* Page Header */}
                            <div className="page-header">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h3 className="page-title">Students</h3>
                                    </div>

                                </div>
                            </div>
                            <div className="student-pro-list">
                                <div className="row">

                                    {students.map((student) => <StudentCard link={`/students/studentview/${student.id}`} key={student.id} studentName={student.name} role='Student' src='/img/profiles/avatar-07.jpg' />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default StudentViewWrapper