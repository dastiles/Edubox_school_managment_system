import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Header from '../../components/header/Header'
import getUpdatedUser from '../../actions/getUpdatedUser'
import ContentWrapper from '../../components/ContentWrapper'
import getStudents from '../../actions/getStudents'
import StudentListWrapper from './StudentListWrapper'

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
                    {students ? (
                        <StudentListWrapper students={students!} />
                    ) : <p>No students found</p>}

                </ContentWrapper>


            </div>
        </>
    )
}

export default StudentsView