import React from 'react'
import Header from '../components/header/Header'
import Sidebar from '../components/sidebar/Sidebar'
import getCurrentUser from '@/app/actions/getCurrentUser'
import StudentAddWrapper from './components/StudentAddWrapper'

const StudentAdd = async () => {
    const currentUser = await getCurrentUser()
    return (

        <>
            <div className="main-wrapper">
                {/* Header */}
                <Header currentUser={currentUser!} />

                {/* Sidebar */}
                <Sidebar />
                <StudentAddWrapper />
            </div>
        </>
    )
}

export default StudentAdd