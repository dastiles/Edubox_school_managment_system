import getCurrentUser from '@/app/actions/getCurrentUser'
import getCurrentUserById from '@/app/actions/getUserInfor'
import Header from '@/app/components/header/Header'
import ProfileWrapper from '@/app/components/profile/ProfileWrapper'
import Sidebar from '@/app/components/sidebar/Sidebar'





const Profile = async () => {
    const currentUser = await getCurrentUser()

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