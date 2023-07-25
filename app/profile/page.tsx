import getCurrentUser from '@/app/actions/getCurrentUser'
import getUserInfor from '@/app/actions/getUserInfor'
import Header from '@/app/components/header/Header'
import ProfileWrapper from '@/app/components/profile/ProfileWrapper'
import Sidebar from '@/app/components/sidebar/Sidebar'
import { userInfo } from 'os'
import React from 'react'

interface Iparams {
    userId: string
}

const Profile = async ({ params }: { params: Iparams }) => {
    const currentUser = await getCurrentUser()
    const getUser = await getUserInfor()
    return (
        <div className="main-wrapper">
            {/* Header */}
            <Header currentUser={currentUser!} />

            {/* Sidebar */}
            <Sidebar />
            <ProfileWrapper user={currentUser!} />
        </div>
    )
}

export default Profile