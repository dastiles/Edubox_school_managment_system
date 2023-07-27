import getStudentById from '@/app/actions/getStudentById'
import getUpdatedUser from '@/app/actions/getUpdatedUser'
import ContentWrapper from '@/app/components/ContentWrapper'
import Header from '@/app/components/header/Header'
import Sidebar from '@/app/components/sidebar/Sidebar'
import React from 'react'
import StudentViewWrapper from './StudentViewWrapper'


interface Iparams {
    studentId: string
}
const StudentView = async ({ params }: { params: Iparams }) => {
    const user = await getUpdatedUser()
    const student = await getStudentById(params)

    return (
        <>
            <div className="main-wrapper">
                {/* Header */}
                <Header currentUser={user!} />
                {/* Sidebar */}
                <Sidebar />
                {/* Page Wrapper */}

                <ContentWrapper title='Student Details' titleActive='Student Details' href='/students' linkTitle='Student' >
                    <StudentViewWrapper student={student!} />
                </ContentWrapper>


            </div>
        </>
    )
}

export default StudentView
