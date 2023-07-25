import Sidebar from '@/app/components/sidebar/Sidebar'
import React from 'react'
import getCurrentUser from "@/app/actions/getCurrentUser";
import Header from '@/app/components/header/Header';
import EditProfileWrapper from './components/EditProfileWrapper';
const EditProfile = async () => {

    const user = await getCurrentUser()
    return (
        <>
            <div className="main-wrapper">
                {/* Header */}
                <Header currentUser={user!} />

                {/* Sidebar */}
                <Sidebar />

                {/* Page Wrapper */}
                <EditProfileWrapper user={user!} />
            </div>
        </>
    )
}

export default EditProfile