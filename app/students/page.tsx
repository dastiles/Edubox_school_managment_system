import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Header from '../components/header/Header'
import getUpdatedUser from '../actions/getUpdatedUser'
import ContentWrapper from '../components/ContentWrapper'
import StudentViewWrapper from './studentgrid/studentsview/components/StudentViewWrapper'
import getStudents from '../actions/getStudents'

const StudentsView = async () => {
    const user = await getUpdatedUser()
    const students = await getStudents()

    return (
        <>
            <div className="main-wrapper">
                {/* Header */}
                <Header currentUser={user!} />
                {/* Sidebar */}
                <Sidebar />
                {/* Page Wrapper */}

                <ContentWrapper title='Students' titleActive='All Students' href='/students' linkTitle='Student' >
                    <StudentViewWrapper students={students!} />
                </ContentWrapper>


            </div>
        </>
    )
}

export default StudentsView